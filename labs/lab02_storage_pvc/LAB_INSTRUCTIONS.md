# 🧪 Lab 02: Storage, PVCs & File Permissions

## Objectives
1. Create a project named `beta-storage`.
2. Create a PersistentVolumeClaim named `app-pvc` with 1Gi size, `ReadWriteOnce` access mode.
3. Deploy an Nginx application named `web-store` mounting `app-pvc` at `/usr/share/nginx/html`.
4. Ensure the pod has correct write permissions to the mount path without failing security checks.

---

## Step-by-Step Task Instructions

### Task 1: Create Project & PVC
```bash
oc new-project beta-storage
oc create pvc app-pvc --access-mode=ReadWriteOnce --size=1Gi -n beta-storage
```

### Task 2: Create Deployment with Volume Mount
Apply the following deployment manifest:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-store
  namespace: beta-storage
spec:
  replicas: 1
  selector:
    matchLabels:
      app: web-store
  template:
    metadata:
      labels:
        app: web-store
    spec:
      securityContext:
        fsGroup: 1000670000
      containers:
      - name: nginx
        image: quay.io/bitnami/nginx:latest
        ports:
        - containerPort: 8080
        volumeMounts:
        - name: data-vol
          mountPath: /usr/share/nginx/html
      volumes:
      - name: data-vol
        persistentVolumeClaim:
          claimName: app-pvc
```

### Task 3: Verify File Write Capabilities
```bash
oc exec deployment/web-store -n beta-storage -- sh -c "echo 'Hello from OpenShift Storage' > /usr/share/nginx/html/index.html"
oc exec deployment/web-store -n beta-storage -- cat /usr/share/nginx/html/index.html
```

---

## Verification Commands
```bash
oc get pvc -n beta-storage
oc describe deployment web-store -n beta-storage
```
