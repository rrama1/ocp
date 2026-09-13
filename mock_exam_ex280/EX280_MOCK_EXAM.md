# 🏆 Red Hat EX280 Practical Mock Exam

**Exam Title**: Red Hat Certified Specialist in OpenShift Administration (EX280 Mock)  
**Time Limit**: 3 Hours (180 Minutes)  
**Passing Score**: 210 / 300 (70%)  

---

## 📌 Exam General Guidelines & Rules

1. All work must persist across node reboots or pod restarts.
2. Unless specified otherwise, create resources in the indicated project names.
3. Use `--dry-run=client -o yaml` whenever possible to save time.

---

## 📝 Exam Tasks & Scenarios

### Task 01: Configure User Group & Project RBAC
- Create a project named `ex280-finance`.
- Create a group named `finance-admins` containing users `manager1` and `lead1`.
- Assign the `admin` role to `finance-admins` group in `ex280-finance`.
- Assign the `view` role to user `auditor1` in `ex280-finance`.

### Task 02: ServiceAccount & SCC Allocation
- Create a project named `ex280-security`.
- Create a ServiceAccount named `sa-privileged-app` in `ex280-security`.
- Grant the `anyuid` SCC to `sa-privileged-app`.
- Deploy a pod named `custom-uid-pod` using image `quay.io/bitnami/nginx:latest` that runs with container UID `1001` under ServiceAccount `sa-privileged-app`.

### Task 03: Persistent Volume Claim & Volume Mounting
- Create a project named `ex280-storage`.
- Create a PVC named `db-data-pvc` with `1Gi` storage and `ReadWriteOnce` access mode.
- Deploy a Deployment named `db-app` using image `quay.io/bitnami/mariadb:latest` with env var `MARIADB_ROOT_PASSWORD=secretpass`.
- Mount `db-data-pvc` to path `/bitnami/mariadb` inside the container.

### Task 04: Secrets & ConfigMaps Injection
- Create a project named `ex280-config`.
- Create a Secret named `api-credentials` with `API_KEY=key998877` and `API_SECRET=sec443322`.
- Create a ConfigMap named `app-settings` with `ENVIRONMENT=production` and `LOG_LEVEL=debug`.
- Deploy a Deployment named `backend-api` with image `quay.io/bitnami/nginx:latest` and inject ALL keys from both Secret and ConfigMap as environment variables.

### Task 05: Secure TLS Edge Route
- Create a project named `ex280-ingress`.
- Deploy a service named `web-svc` running Nginx on container port 8080.
- Create an **Edge TLS Route** named `web-edge-route` for `web-svc` with hostname `web-finance.apps.crc.testing` using a dummy TLS certificate and key.

### Task 06: Network Policy Microservice Isolation
- In project `ex280-security`, apply a NetworkPolicy named `isolate-db` to pod labeled `app=mariadb`.
- Block all incoming traffic except traffic coming from pods with label `role=backend`.

### Task 07: Source-to-Image (S2I) Deployment
- Create a project named `ex280-s2i`.
- Deploy a Node.js web application from Git URL `https://github.com/sclorg/nodejs-ex.git` using S2I.
- Name the application `node-app`.
- Expose `node-app` as an unencrypted HTTP route.

### Task 08: ResourceQuota Capping
- Create a project named `ex280-quota`.
- Configure a ResourceQuota named `project-quota` restricting:
  - Maximum pods: `5`
  - Maximum CPU requests: `1` core
  - Maximum Memory requests: `2Gi`
  - Maximum PVCs: `2`

### Task 09: LimitRange Defaults Enforcement
- In project `ex280-quota`, create a LimitRange named `container-limits` that enforces:
  - Default CPU Request: `100m` | Default CPU Limit: `500m`
  - Default Memory Request: `128Mi` | Default Memory Limit: `512Mi`

### Task 10: Horizontal Pod Autoscaler (HPA)
- In project `ex280-config`, configure an HPA on deployment `backend-api`:
  - Minimum replicas: `2`
  - Maximum replicas: `6`
  - Target CPU utilization: `70%`

### Task 11: Node Labeling & Scheduling
- Label cluster worker node `crc-worker` (or your primary node) with `tier=gold`.
- In project `ex280-storage`, update deployment `db-app` so it only schedules onto nodes with label `tier=gold`.

### Task 12: Node Taints & Tolerations
- Apply a taint to worker node `crc-worker` with key `dedicated=finance:NoSchedule`.
- Update deployment `db-app` with a toleration so it can run on the tainted node.

### Task 13: Node Maintenance & Drain
- Demonstrate node maintenance: Cordon node `crc-worker` to prevent new pod scheduling.
- Safely drain pods from the node ignoring DaemonSets.
- Uncordon the node after maintenance.

### Task 14: Troubleshooting Broken Deployment
- Fix a broken deployment named `failing-app` in project `ex280-debug` where pods are failing due to a `CrashLoopBackOff` caused by incorrect permissions on `/app/data`.

### Task 15: CronJob Scheduled Execution
- Create a project named `ex280-jobs`.
- Create a CronJob named `log-cleanup` running every 15 minutes (`*/15 * * * *`).
- The job should run container `quay.io/bitnami/nginx:latest` and execute command `echo "Cleanup completed at $(date)"`.
