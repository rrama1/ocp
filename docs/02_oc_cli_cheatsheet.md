# ⚡ Concept Guide 02: `oc` CLI EX280 Master Cheatsheet

Speed is crucial for passing the EX280 exam. You should minimize manual YAML typing and generate 90% of manifests using `oc` imperative commands with `--dry-run=client -o yaml`.

---

## 1. Authentication & Context Management

```bash
# Login to OpenShift Cluster
oc login -u developer -p developer https://api.crc.testing:6443
oc login -u kubeadmin -p <password> https://api.crc.testing:6443

# Check active user and cluster status
oc whoami
oc cluster-info

# Switch projects (namespaces)
oc project <project-name>
oc get projects

# Create a new OpenShift Project (annotated namespace)
oc new-project dev-app --display-name="Development Team"
```

---

## 2. Speed Manifest Generation (`--dry-run=client -o yaml`)

```bash
# Generate Pod YAML
oc run web-pod --image=quay.io/bitnami/nginx:latest --dry-run=client -o yaml > pod.yaml

# Generate Deployment YAML with replica count and port
oc create deployment api-server --image=quay.io/bitnami/express:latest --replicas=3 --port=8080 --dry-run=client -o yaml > deployment.yaml

# Generate Service YAML (ClusterIP)
oc expose deployment api-server --port=8080 --target-port=8080 --dry-run=client -o yaml > service.yaml

# Generate ConfigMap from literal values
oc create configmap app-config --from-literal=DB_HOST=postgres --from-literal=DB_PORT=5432 --dry-run=client -o yaml > cm.yaml

# Generate Secret from literal values
oc create secret generic app-secret --from-literal=PASSWORD=SuperSecret123 --dry-run=client -o yaml > secret.yaml

# Generate ServiceAccount
oc create sa app-sa --dry-run=client -o yaml > sa.yaml
```

---

## 3. RBAC & Identity Administration (`oc adm policy`)

```bash
# Add Role to User in CURRENT Project (local scope)
oc adm policy add-role-to-user edit developer -n dev-app
oc adm policy add-role-to-user view user1 -n dev-app
oc adm policy add-role-to-user admin team-lead -n dev-app

# Remove Role from User
oc adm policy remove-role-from-user edit developer -n dev-app

# Add ClusterRole to User (cluster-wide scope)
oc adm policy add-cluster-role-to-user cluster-reader user1

# Manage Groups
oc adm groups new dev-group user1 user2
oc adm groups add-users dev-group user3
oc adm policy add-role-to-group edit dev-group -n dev-app

# Grant Security Context Constraint (SCC) to ServiceAccount
oc adm policy add-scc-to-user anyuid -z app-sa -n dev-app
oc adm policy add-scc-to-user privileged -z deploy-sa -n dev-app
```

---

## 4. Routes & Exposing Workloads

```bash
# Expose Service as HTTP Unsecured Route
oc expose svc api-server --hostname=api.apps.crc.testing -n dev-app

# Create Edge TLS Route
oc create route edge api-edge --service=api-server --hostname=api-edge.apps.crc.testing --cert=tls.crt --key=tls.key

# Create Passthrough TLS Route
oc create route passthrough api-pass --service=secure-service --hostname=secure.apps.crc.testing

# Create Re-encrypt TLS Route
oc create route reencrypt api-reenc --service=secure-service --dest-ca-cert=backend-ca.crt
```

---

## 5. Storage & Volume Management (`oc set volume`)

```bash
# Create PersistentVolumeClaim (PVC)
oc create pvc my-data-pvc --claim-class=gp2 --access-mode=ReadWriteOnce --size=2Gi --dry-run=client -o yaml > pvc.yaml

# Mount PVC into existing Deployment
oc set volume deployment/api-server --add --name=data-vol --type=pvc --claim-name=my-data-pvc --mount-path=/var/data

# Mount Secret as Environment Variables
oc set env deployment/api-server --from=secret/app-secret

# Mount ConfigMap as Environment Variables
oc set env deployment/api-server --from=configmap/app-config
```

---

## 6. Resource Management & Scaling

```bash
# Set Resource Limits & Requests on a Deployment
oc set resources deployment/api-server --requests=cpu=100m,memory=128Mi --limits=cpu=500m,memory=512Mi

# Configure Horizontal Pod Autoscaler (HPA)
oc autoscale deployment/api-server --min=2 --max=8 --cpu-percent=80

# Create ResourceQuota
oc create quota project-limits --hard=pods=10,services=5,requests.cpu=2,requests.memory=4Gi,persistentvolumeclaims=3

# Set Probes (Liveness / Readiness)
oc set probe deployment/api-server --liveness --get-url=http://:8080/healthz --initial-delay-seconds=10
```

---

## 7. Troubleshooting & Debugging Commands

```bash
# Real-time pod log streaming
oc logs -f deployment/api-server

# Inspect Pod events and detailed status
oc describe pod <pod-name>

# Execute interactive shell inside running container
oc exec -it <pod-name> -- /bin/sh

# Launch an interactive debug pod with elevated privileges or cloned environment
oc debug deployment/api-server
oc debug node/<node-name>

# Check node utilization
oc adm top nodes
oc adm top pods -A
```
