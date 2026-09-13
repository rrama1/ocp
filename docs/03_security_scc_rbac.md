# 🔐 Concept Guide 03: OpenShift Security, SCCs, RBAC & Authentication

Security is the #1 tested topic on the EX280 exam. OpenShift enforces strict multi-tenancy and container isolation out of the box.

---

## 1. Security Context Constraints (SCC) Explained

In Kubernetes, Pod Security Standards regulate permissions. OpenShift uses **Security Context Constraints (SCCs)** to control what actions a pod can perform and what system resources it can access.

### Standard OpenShift Pre-defined SCCs

| SCC Name | Description | Key Permissions |
| :--- | :--- | :--- |
| `restricted-v2` | **Default for user pods**. Highly secure. | Allocates random assigned UID/GID. Blocks privileged mode, host ports, host volumes, and root (`runAsUser: 0`). |
| `anyuid` | Allows pods to run as any UID (including root `0`). | Useful when legacy images require UID 0 or custom users without grant of host privileges. |
| `nonroot` | Requires container to run with a non-zero UID. | Forces container to provide a non-root UID specified in Dockerfile or manifest. |
| `hostmount-anyuid` | Allows host path volume mounts (`hostPath`) and any UID. | Useful for monitoring or storage agents needing node disk access. |
| `privileged` | Complete access to host node. | Equivalent to root on the host node. Highest risk. |

### How to Grant an SCC to a Workload

You assign SCCs to **ServiceAccounts** attached to Pods/Deployments:

```bash
# 1. Create a ServiceAccount
oc create sa custom-app-sa -n my-project

# 2. Grant the SCC permission to the ServiceAccount
oc adm policy add-scc-to-user anyuid -z custom-app-sa -n my-project

# 3. Associate ServiceAccount in Deployment spec:
# spec:
#   template:
#     spec:
#       serviceAccountName: custom-app-sa
```

---

## 2. RBAC: Users, Groups, Roles & Bindings

OpenShift RBAC maps **Subjects** (Users, Groups, ServiceAccounts) to **Roles** (Rules) via **RoleBindings**.

### Role Scopes

- **Local Roles & RoleBindings**: Apply *only* within a specific Project/Namespace.
- **ClusterRoles & ClusterRoleBindings**: Apply across *all* projects cluster-wide.

### Common Default Roles

- `admin`: Full administrative access within a project (can manage permissions within project).
- `edit`: Can create, modify, delete workloads and storage within project (cannot edit RBAC).
- `view`: Read-only access to project resources.

### RBAC Command Cheatsheet

```bash
# Add 'edit' role to user 'developer' in project 'finance'
oc adm policy add-role-to-user edit developer -n finance

# Create a group and assign 'admin' role
oc adm groups new backend-devs alice bob
oc adm policy add-role-to-group admin backend-devs -n finance

# Check permissions for a user
oc adm policy who-can get pods -n finance
```

---

## 3. Configuring Authentication: HTPasswd Identity Provider

On EX280, you are often required to configure user authentication via HTPasswd.

### Steps to Configure HTPasswd OAuth in OpenShift:

1. **Install htpasswd tool & create user file**:
   ```bash
   htpasswd -c -B -b /tmp/htpasswd developer secretpassword
   htpasswd -B -b /tmp/htpasswd adminuser adminpassword
   ```

2. **Create Secret in `openshift-config` namespace**:
   ```bash
   oc create secret generic htpasswd-secret --from-file=htpasswd=/tmp/htpasswd -n openshift-config
   ```

3. **Update Cluster OAuth Custom Resource (`oauth/cluster`)**:
   ```yaml
   apiVersion: config.openshift.io/v1
   kind: OAuth
   metadata:
     name: cluster
   spec:
     identityProviders:
     - name: htpasswd_provider
       mappingMethod: claim
       type: HTPasswd
       htpasswd:
         fileData:
           name: htpasswd-secret
   ```

4. **Apply configuration & verify login**:
   ```bash
   oc apply -f oauth.yaml
   # Wait for Authentication ClusterOperator to roll out
   oc get clusteroperator authentication
   ```
