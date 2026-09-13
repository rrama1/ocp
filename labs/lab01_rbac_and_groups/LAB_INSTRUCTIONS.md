# 🧪 Lab 01: RBAC, Groups, ServiceAccounts & SCCs

## Objectives
1. Create a project named `alpha-billing`.
2. Create two user groups: `finance-devs` and `finance-ops`.
3. Assign `edit` role to `finance-devs` in `alpha-billing`.
4. Create a ServiceAccount named `sa-legacy-app` in `alpha-billing`.
5. Grant the `anyuid` SCC to `sa-legacy-app`.
6. Deploy a pod using `sa-legacy-app` running as UID 0 (root).

---

## Step-by-Step Task Instructions

### Task 1: Create Project
```bash
oc new-project alpha-billing
```

### Task 2: Create Groups & Add Users
```bash
oc adm groups new finance-devs developer user1
oc adm groups new finance-ops ops1 ops2
```

### Task 3: Assign Local Role
```bash
oc adm policy add-role-to-group edit finance-devs -n alpha-billing
```

### Task 4: Create ServiceAccount & Grant SCC
```bash
oc create sa sa-legacy-app -n alpha-billing
oc adm policy add-scc-to-user anyuid -z sa-legacy-app -n alpha-billing
```

### Task 5: Deploy Workload using SA
Apply the following pod manifest:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: root-legacy-pod
  namespace: alpha-billing
spec:
  serviceAccountName: sa-legacy-app
  containers:
  - name: app
    image: quay.io/bitnami/nginx:latest
    securityContext:
      runAsUser: 0
```

---

## Verification Commands
```bash
# Check group membership
oc get groups

# Verify RBAC policy in namespace
oc get rolebindings -n alpha-billing

# Check Pod status (Must be Running)
oc get pod root-legacy-pod -n alpha-billing
```
