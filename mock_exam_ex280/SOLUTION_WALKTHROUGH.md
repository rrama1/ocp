# 🔑 EX280 Mock Exam Solution Walkthrough

This guide provides exact step-by-step `oc` CLI commands and YAML specifications to achieve 300/300 on the EX280 Mock Exam.

---

### Task 01: Configure User Group & Project RBAC
```bash
oc new-project ex280-finance
oc adm groups new finance-admins manager1 lead1
oc adm policy add-role-to-group admin finance-admins -n ex280-finance
oc adm policy add-role-to-user view auditor1 -n ex280-finance
```

---

### Task 02: ServiceAccount & SCC Allocation
```bash
oc new-project ex280-security
oc create sa sa-privileged-app -n ex280-security
oc adm policy add-scc-to-user anyuid -z sa-privileged-app -n ex280-security
```
Apply Pod YAML:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: custom-uid-pod
  namespace: ex280-security
spec:
  serviceAccountName: sa-privileged-app
  containers:
  - name: nginx
    image: quay.io/bitnami/nginx:latest
    securityContext:
      runAsUser: 1001
```

---

### Task 03: Persistent Volume Claim & Volume Mounting
```bash
oc new-project ex280-storage
oc create pvc db-data-pvc --access-mode=ReadWriteOnce --size=1Gi -n ex280-storage
```
Apply Deployment YAML:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: db-app
  namespace: ex280-storage
spec:
  replicas: 1
  selector:
    matchLabels:
      app: db-app
  template:
    metadata:
      labels:
        app: db-app
    spec:
      containers:
      - name: mariadb
        image: quay.io/bitnami/mariadb:latest
        env:
        - name: MARIADB_ROOT_PASSWORD
          value: secretpass
        volumeMounts:
        - name: db-vol
          mountPath: /bitnami/mariadb
      volumes:
      - name: db-vol
        persistentVolumeClaim:
          claimName: db-data-pvc
```

---

### Task 04: Secrets & ConfigMaps Injection
```bash
oc new-project ex280-config
oc create secret generic api-credentials --from-literal=API_KEY=key998877 --from-literal=API_SECRET=sec443322 -n ex280-config
oc create configmap app-settings --from-literal=ENVIRONMENT=production --from-literal=LOG_LEVEL=debug -n ex280-config

oc create deployment backend-api --image=quay.io/bitnami/nginx:latest -n ex280-config
oc set env deployment/backend-api --from=secret/api-credentials -n ex280-config
oc set env deployment/backend-api --from=configmap/app-settings -n ex280-config
```

---

### Task 05: Secure TLS Edge Route
```bash
oc new-project ex280-ingress
oc create deployment web-svc --image=quay.io/bitnami/nginx:latest --port=8080 -n ex280-ingress
oc expose deployment web-svc --port=8080 --target-port=8080 -n ex280-ingress

openssl req -x509 -newkey rsa:2048 -keyout tls.key -out tls.crt -days 365 -nodes -subj "/CN=web-finance.apps.crc.testing"

oc create route edge web-edge-route --service=web-svc --hostname=web-finance.apps.crc.testing --cert=tls.crt --key=tls.key -n ex280-ingress
```

---

### Task 06: Network Policy Microservice Isolation
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: isolate-db
  namespace: ex280-security
spec:
  podSelector:
    matchLabels:
      app: mariadb
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          role: backend
```

---

### Task 07: Source-to-Image (S2I) Deployment
```bash
oc new-project ex280-s2i
oc new-app https://github.com/sclorg/nodejs-ex.git --name=node-app -n ex280-s2i
oc expose svc/node-app -n ex280-s2i
```

---

### Task 08: ResourceQuota Capping
```bash
oc new-project ex280-quota
oc create quota project-quota --hard=pods=5,requests.cpu=1,requests.memory=2Gi,persistentvolumeclaims=2 -n ex280-quota
```

---

### Task 09: LimitRange Defaults Enforcement
```yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: container-limits
  namespace: ex280-quota
spec:
  limits:
  - default:
      cpu: 500m
      memory: 512Mi
    defaultRequest:
      cpu: 100m
      memory: 128Mi
    type: Container
```

---

### Task 10: Horizontal Pod Autoscaler (HPA)
```bash
oc autoscale deployment backend-api --min=2 --max=6 --cpu-percent=70 -n ex280-config
```

---

### Task 11: Node Labeling & Scheduling
```bash
oc label node <node-name> tier=gold --overwrite
oc set node-selector deployment/db-app tier=gold -n ex280-storage
```

---

### Task 12: Node Taints & Tolerations
```bash
oc adm taint node <node-name> dedicated=finance:NoSchedule
```
Add to `db-app` deployment spec:
```yaml
spec:
  template:
    spec:
      tolerations:
      - key: "dedicated"
        operator: "Equal"
        value: "finance"
        effect: "NoSchedule"
```

---

### Task 13: Node Maintenance & Drain
```bash
oc adm node cordon <node-name>
oc adm node drain <node-name> --ignore-daemonsets --delete-emptydir-data
oc adm node uncordon <node-name>
```

---

### Task 14: Troubleshooting Broken Deployment
Grant `anyuid` SCC to ServiceAccount or specify `fsGroup: 1000670000` in deployment `securityContext`.

---

### Task 15: CronJob Scheduled Execution
```bash
oc new-project ex280-jobs
oc create cronjob log-cleanup --image=quay.io/bitnami/nginx:latest --schedule="*/15 * * * *" -- -c "echo Cleanup completed at \$(date)" -n ex280-jobs
```
