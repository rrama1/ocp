export const APP_METADATA = {
  title: "OpenShift EX280 Mastery Kit",
  subtitle: "Red Hat Certified Specialist in OpenShift Administration",
  version: "1.0.0",
  passingScore: 210,
  maxScore: 300,
  timeLimitMinutes: 180
};

export const STUDY_SCHEDULE_WEEKS = [
  {
    id: "week1",
    title: "Week 1: Core Architecture, CLI Mastery, Authentication & RBAC",
    color: "#22c55e",
    days: [
      { id: "day1", dayNum: 1, title: "OpenShift vs. Kubernetes Architecture", docRef: "doc-01", task: "Read concept guide 01 and understand RHCOS, Ignition, Router, OAuth, and Cluster Operators." },
      { id: "day2", dayNum: 2, title: "oc CLI Speed & Manifest Generation", docRef: "doc-02", task: "Practice --dry-run=client -o yaml command generation for Pods, Deployments, Services, Secrets, and ConfigMaps." },
      { id: "day3", dayNum: 3, title: "User & Group Management & HTPasswd Provider", docRef: "doc-03", task: "Understand OAuth configuration and practice oc adm groups new & add-users." },
      { id: "day4", dayNum: 4, title: "OpenShift RBAC (Roles & RoleBindings)", docRef: "doc-03", task: "Master oc adm policy add-role-to-user and add-role-to-group." },
      { id: "day5", dayNum: 5, title: "ServiceAccounts & SecurityContextConstraints (SCC)", docRef: "doc-03", task: "Learn default SCCs (restricted-v2, anyuid, privileged) and assign them to ServiceAccounts." },
      { id: "day6", dayNum: 6, title: "Hands-on Lab 01: RBAC & Security", labRef: "lab-01", task: "Complete Lab 01 exercise covering project creation, user groups, and SCC assignment." },
      { id: "day7", dayNum: 7, title: "Week 1 Speed Quiz & Drill", docRef: "doc-02", task: "Test yourself on RBAC policies and group commands without referencing notes." }
    ]
  },
  {
    id: "week2",
    title: "Week 2: Storage, Networking, Routes & Microservice Isolation",
    color: "#eab308",
    days: [
      { id: "day8", dayNum: 8, title: "Persistent Storage Fundamentals", docRef: "doc-02", task: "Understand PVs, PVCs, StorageClasses, and access modes (ReadWriteOnce, ReadWriteMany)." },
      { id: "day9", dayNum: 9, title: "Mounting Storage & Handling Permissions", docRef: "doc-02", task: "Attach PVCs with oc set volume and fix file permission issues using fsGroup." },
      { id: "day10", dayNum: 10, title: "Hands-on Lab 02: Storage & PVC", labRef: "lab-02", task: "Complete Lab 02 exercise creating PVCs and mounting them to Nginx deployments." },
      { id: "day11", dayNum: 11, title: "Services, Ingress, and OpenShift Routes", docRef: "doc-01", task: "Master HTTP, Edge TLS, Passthrough TLS, and Re-encryption Routes." },
      { id: "day12", dayNum: 12, title: "NetworkPolicies & Pod Isolation", docRef: "doc-02", task: "Write NetworkPolicy manifests isolating namespaces and pod ingress traffic." },
      { id: "day13", dayNum: 13, title: "Hands-on Lab 03: Routes & NetworkPolicy", labRef: "lab-03", task: "Complete Lab 03 exercise configuring Edge TLS routes and network isolation." },
      { id: "day14", dayNum: 14, title: "Week 2 Network Troubleshooting Review", docRef: "doc-04", task: "Practice oc exec, oc debug, and inspecting endpoints for 503 errors." }
    ]
  },
  {
    id: "week3",
    title: "Week 3: S2I Builds, ImageStreams, Scaling & Operators",
    color: "#38bdf8",
    days: [
      { id: "day15", dayNum: 15, title: "Source-to-Image (S2I) Architecture", docRef: "doc-01", task: "Understand BuildConfigs, ImageStreams, S2I builders, and oc new-app workflow." },
      { id: "day16", dayNum: 16, title: "S2I Build Triggers & Environment Injection", docRef: "doc-02", task: "Trigger manual builds with oc start-build and stream logs with -f." },
      { id: "day17", dayNum: 17, title: "Resource Management (ResourceQuotas & LimitRanges)", docRef: "doc-02", task: "Configure ResourceQuotas for pods/CPU/memory and enforce default LimitRanges." },
      { id: "day18", dayNum: 18, title: "Horizontal Pod Autoscaling (HPA)", docRef: "doc-02", task: "Configure HPA using oc autoscale based on CPU target thresholds." },
      { id: "day19", dayNum: 19, title: "Operators & Operator Lifecycle Manager (OLM)", docRef: "doc-01", task: "Understand OperatorHub, Subscriptions, CatalogSources, and OperatorGroups." },
      { id: "day20", dayNum: 20, title: "Resource Scaling & Quota Drills", docRef: "doc-02", task: "Practice setting pod resource limits, requests, and project-wide caps." },
      { id: "day21", dayNum: 21, title: "Week 3 Build & Quota Drill", docRef: "doc-02", task: "Test creating S2I builds with custom environment variables and triggers." }
    ]
  },
  {
    id: "week4",
    title: "Week 4: Node Management, Troubleshooting & EX280 Mock Exam",
    color: "#ee0000",
    days: [
      { id: "day22", dayNum: 22, title: "Node Scheduling (Labels, Selectors, Taints)", docRef: "doc-02", task: "Practice node labeling, nodeSelector, taints, and tolerations." },
      { id: "day23", dayNum: 23, title: "Node Maintenance & Draining", docRef: "doc-02", task: "Master oc adm node cordon, drain, and uncordon procedures." },
      { id: "day24", dayNum: 24, title: "OpenShift Systematic Troubleshooting", docRef: "doc-04", task: "Read Guide 04 and debug CrashLoopBackOff, ImagePullBackOff, and PVC pending states." },
      { id: "day25", dayNum: 25, title: "Mock Exam Preparation & Time Strategy", docRef: "mock-exam", task: "Review exam guidelines and time budgeting (12 mins per task)." },
      { id: "day26", dayNum: 26, title: "EX280 Full Mock Exam (Attempt 1)", docRef: "mock-exam", task: "Take the 15-scenario mock exam under a 3-hour timer." },
      { id: "day27", dayNum: 27, title: "Mock Exam Grading & Solution Walkthrough", docRef: "exam-solution", task: "Compare your solutions against the 300/300 walkthrough guide." },
      { id: "day28", dayNum: 28, title: "Speed Retest on Failing Tasks", docRef: "mock-exam", task: "Re-run any scenario that took more than 10 minutes." },
      { id: "day29", dayNum: 29, title: "CLI Speed Drills & Command Practice", docRef: "doc-02", task: "Achieve 100% speed on oc adm policy and oc set volume commands." },
      { id: "day30", dayNum: 30, title: "Final Readiness Check & Exam Day Strategy", docRef: "doc-01", task: "Rest, review CLI syntax, and get ready to pass Red Hat EX280!" }
    ]
  }
];

export const CONCEPT_DOCS = [
  {
    id: "doc-01",
    title: "01. OpenShift vs. Kubernetes Architecture",
    category: "Architecture",
    readTime: "8 min read",
    content: `# 📘 Concept Guide 01: OpenShift vs. Kubernetes Architecture

To be a top-tier OpenShift Administrator, you must understand **what OpenShift adds on top of Kubernetes** and how Red Hat's enterprise abstraction layer operates under the hood.

---

## 1. High-Level Comparison

| Feature / Abstraction | Vanilla Kubernetes | Red Hat OpenShift (OCP 4.x) |
| :--- | :--- | :--- |
| **Underlying OS** | Any Linux (Ubuntu, RHEL, Debian) | **Red Hat Enterprise Linux CoreOS (RHCOS)** |
| **CLI Tool** | \`kubectl\` | \`oc\` (Superset of kubectl with additional commands) |
| **Primary Project Isolation** | \`Namespace\` | \`Project\` (Annotated Namespace with self-provisioning & quotas) |
| **Container Security Model** | Pod Security Standards | **Security Context Constraints (SCC)** |
| **Authentication & Users** | External IDP / X.509 certs | **Built-in OAuth Server** + HTPasswd / LDAP / Keycloak |
| **Ingress / Edge Traffic** | Ingress Controller | **OpenShift Router (HAProxy)** via **Route** objects |
| **Built-in Application Build** | Manual / Tekton | **Source-to-Image (S2I)** + **BuildConfig** + **ImageStream** |
| **Operator Management** | Manual Helm / Manifests | **Operator Lifecycle Manager (OLM)** & OperatorHub |
| **Container Registry** | External Registry | **Integrated OpenShift Image Registry** |

---

## 2. Key OpenShift Architectural Components

\`\`\`
+-------------------------------------------------------------------------+
|                        OPENSHIFT CLUSTER PLATFORM                       |
+-------------------------------------------------------------------------+
|  [ Web Console ]    [ Integrated Registry ]    [ Built-in OAuth ]       |
+-------------------------------------------------------------------------+
|  [ Ingress / HAProxy Router ]    [ Operator Lifecycle Manager (OLM) ]   |
+-------------------------------------------------------------------------+
|  [ KUBERNETES CONTROL PLANE ] (etcd, kube-apiserver, kube-scheduler)   |
+-------------------------------------------------------------------------+
|  [ CLUSTER OPERATORS ] (Machine API, Network Operator, Storage Op)      |
+-------------------------------------------------------------------------+
|  [ RHCOS OPERATING SYSTEM ] (Immutability, Ignition, OSTree updates)    |
+-------------------------------------------------------------------------+
\`\`\`

### A. RHCOS & Ignition
- OpenShift 4 control plane and worker nodes run **Red Hat Enterprise Linux CoreOS (RHCOS)**.
- Operating system updates are atomic and managed directly by the cluster using \`MachineConfigOperator\` (MCO).

### B. Security Context Constraints (SCC)
- In standard Kubernetes, containers often run as \`root\` unless restricted.
- OpenShift **forbids containers from running as root by default**.
- Each pod is evaluated against an SCC. The default SCC for workloads is \`restricted-v2\` (allocates arbitrary unprivileged UID range like \`1000670000/10000\`).

### C. OpenShift Routes vs. Kubernetes Ingress
- A **Route** exposes a \`Service\` externally via HAProxy router.
- Types of Routes:
  1. **Unsecured (HTTP)**: Port 80 traffic routed directly to Service.
  2. **Edge Termination**: TLS is terminated at the OpenShift Router (HAProxy).
  3. **Passthrough Termination**: TLS is NOT terminated at Router; raw encrypted bytes pass straight to Pod.
  4. **Re-encryption Termination**: Router terminates external TLS, then re-encrypts connection to backend Pod.

### D. Source-to-Image (S2I)
- S2I is a toolkit that takes source code from Git, injects it into a builder image (Python, Node.js, Java), compiles the application, and produces a container image automatically inside the cluster.
`
  },
  {
    id: "doc-02",
    title: "02. oc CLI EX280 Master Cheatsheet",
    category: "CLI Tools",
    readTime: "10 min read",
    content: `# ⚡ Concept Guide 02: oc CLI EX280 Master Cheatsheet

Speed is crucial for passing the EX280 exam. Generate 90% of manifests using \`oc\` imperative commands with \`--dry-run=client -o yaml\`.

---

## 1. Authentication & Context Management

\`\`\`bash
# Login to OpenShift Cluster
oc login -u developer -p developer https://api.crc.testing:6443
oc login -u kubeadmin -p <password> https://api.crc.testing:6443

# Check active user and cluster status
oc whoami
oc cluster-info

# Switch projects (namespaces)
oc project <project-name>
oc get projects

# Create a new OpenShift Project
oc new-project dev-app --display-name="Development Team"
\`\`\`

---

## 2. Speed Manifest Generation (--dry-run=client -o yaml)

\`\`\`bash
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
\`\`\`

---

## 3. RBAC & Identity Administration (oc adm policy)

\`\`\`bash
# Add Role to User in CURRENT Project (local scope)
oc adm policy add-role-to-user edit developer -n dev-app
oc adm policy add-role-to-user view user1 -n dev-app
oc adm policy add-role-to-user admin team-lead -n dev-app

# Manage Groups
oc adm groups new dev-group user1 user2
oc adm policy add-role-to-group edit dev-group -n dev-app

# Grant Security Context Constraint (SCC) to ServiceAccount
oc adm policy add-scc-to-user anyuid -z app-sa -n dev-app
\`\`\`

---

## 4. Routes & Exposing Workloads

\`\`\`bash
# Expose Service as HTTP Unsecured Route
oc expose svc api-server --hostname=api.apps.crc.testing -n dev-app

# Create Edge TLS Route
oc create route edge api-edge --service=api-server --hostname=api-edge.apps.crc.testing --cert=tls.crt --key=tls.key

# Create Passthrough TLS Route
oc create route passthrough api-pass --service=secure-service --hostname=secure.apps.crc.testing
\`\`\`
`
  },
  {
    id: "doc-03",
    title: "03. Security, SCCs, RBAC & Authentication",
    category: "Security",
    readTime: "9 min read",
    content: `# 🔐 Concept Guide 03: Security, SCCs, RBAC & Authentication

Security is the #1 tested topic on the EX280 exam. OpenShift enforces strict multi-tenancy and container isolation out of the box.

---

## 1. Security Context Constraints (SCC) Explained

| SCC Name | Description | Key Permissions |
| :--- | :--- | :--- |
| \`restricted-v2\` | **Default for user pods**. | Allocates random assigned UID/GID. Blocks privileged mode, host ports, host volumes, and root (\`runAsUser: 0\`). |
| \`anyuid\` | Allows pods to run as any UID (including root \`0\`). | Useful when legacy images require UID 0. |
| \`nonroot\` | Requires container to run with a non-zero UID. | Forces container to provide a non-root UID. |
| \`privileged\` | Complete access to host node. | Equivalent to root on the host node. |

### How to Grant an SCC to a Workload

\`\`\`bash
# 1. Create a ServiceAccount
oc create sa custom-app-sa -n my-project

# 2. Grant the SCC permission to the ServiceAccount
oc adm policy add-scc-to-user anyuid -z custom-app-sa -n my-project
\`\`\`

---

## 2. HTPasswd Identity Provider Setup

\`\`\`bash
# 1. Create htpasswd file
htpasswd -c -B -b /tmp/htpasswd developer secretpassword
htpasswd -B -b /tmp/htpasswd adminuser adminpassword

# 2. Create secret in openshift-config
oc create secret generic htpasswd-secret --from-file=htpasswd=/tmp/htpasswd -n openshift-config
\`\`\`
`
  },
  {
    id: "doc-04",
    title: "04. Systematic OpenShift Troubleshooting",
    category: "Troubleshooting",
    readTime: "7 min read",
    content: `# 🛠️ Concept Guide 04: Systematic OpenShift Troubleshooting

In the EX280 exam, 20-30% of scenarios involve fixing pre-existing broken deployments or resolving deployment failures.

---

## 1. Diagnostic Decision Tree

\`\`\`
                     Pod Status Check (\`oc get pods\`)
                                   |
         +-------------------------+-------------------------+
         |                         |                         |
[ CrashLoopBackOff ]       [ ImagePullBackOff ]         [ Pending ]
         |                         |                         |
  Check logs & probes       Check image name &         Check PVC, Quota,
  \`oc logs <pod>\`          registry secrets           Node taints/limits
\`\`\`

---

## 2. Common Failures & Fixes

### A. CrashLoopBackOff
- Diagnostic: \`oc logs <pod-name> --previous\` and \`oc describe pod <pod-name>\`
- Fix: Grant \`anyuid\` SCC if permission denied or add \`fsGroup\`.

### B. Pending Pods
- Diagnostic: Check \`oc get pvc\` and \`oc describe pod <pod>\` under Events.
- Fix: Verify StorageClass and node taints.

### C. 503 Service Unavailable on Route
- Diagnostic: \`oc get endpoints <service-name>\`
- Fix: Align containerPort, Service targetPort, and Route targetPort.
`
  }
];

export const LAB_EXERCISES = [
  {
    id: "lab-01",
    title: "Lab 01: RBAC, Groups, ServiceAccounts & SCCs",
    category: "Security & RBAC",
    estimatedTime: "20 mins",
    tasks: [
      { id: "t1", title: "Create project 'alpha-billing'", command: "oc new-project alpha-billing" },
      { id: "t2", title: "Create groups 'finance-devs' and 'finance-ops'", command: "oc adm groups new finance-devs developer user1\noc adm groups new finance-ops ops1 ops2" },
      { id: "t3", title: "Assign 'edit' role to 'finance-devs'", command: "oc adm policy add-role-to-group edit finance-devs -n alpha-billing" },
      { id: "t4", title: "Create ServiceAccount 'sa-legacy-app' and grant 'anyuid' SCC", command: "oc create sa sa-legacy-app -n alpha-billing\noc adm policy add-scc-to-user anyuid -z sa-legacy-app -n alpha-billing" },
      { id: "t5", title: "Deploy root container using sa-legacy-app", command: `apiVersion: v1
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
      runAsUser: 0` }
    ],
    verification: "oc get groups\noc get rolebindings -n alpha-billing\noc get pod root-legacy-pod -n alpha-billing"
  },
  {
    id: "lab-02",
    title: "Lab 02: Storage, PVCs & File Permissions",
    category: "Storage",
    estimatedTime: "25 mins",
    tasks: [
      { id: "t1", title: "Create project 'beta-storage' and 1Gi PVC 'app-pvc'", command: "oc new-project beta-storage\noc create pvc app-pvc --access-mode=ReadWriteOnce --size=1Gi -n beta-storage" },
      { id: "t2", title: "Deploy Nginx web-store mounting app-pvc at /usr/share/nginx/html", command: `apiVersion: apps/v1
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
          claimName: app-pvc` },
      { id: "t3", title: "Verify file write capability into volume", command: "oc exec deployment/web-store -n beta-storage -- sh -c \"echo 'Hello OpenShift' > /usr/share/nginx/html/index.html\"\noc exec deployment/web-store -n beta-storage -- cat /usr/share/nginx/html/index.html" }
    ],
    verification: "oc get pvc -n beta-storage\noc describe deployment web-store -n beta-storage"
  },
  {
    id: "lab-03",
    title: "Lab 03: Secure Routes & NetworkPolicies",
    category: "Networking",
    estimatedTime: "25 mins",
    tasks: [
      { id: "t1", title: "Create project 'gamma-secure' & expose deployment on 8080", command: "oc new-project gamma-secure\noc create deployment secure-api --image=quay.io/bitnami/nginx:latest --port=8080 -n gamma-secure\noc expose deployment secure-api --port=8080 --target-port=8080 -n gamma-secure" },
      { id: "t2", title: "Generate TLS cert & create Edge TLS Route", command: "openssl req -x509 -newkey rsa:2048 -keyout tls.key -out tls.crt -days 365 -nodes -subj \"/CN=secure-api.apps.crc.testing\"\noc create route edge secure-edge-route --service=secure-api --hostname=secure-api.apps.crc.testing --cert=tls.crt --key=tls.key -n gamma-secure" },
      { id: "t3", title: "Apply NetworkPolicy allowing ingress ONLY from role=frontend", command: `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-only
  namespace: gamma-secure
spec:
  podSelector:
    matchLabels:
      app: secure-api
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          role: frontend
    ports:
    - protocol: TCP
      port: 8080` }
    ],
    verification: "oc get routes -n gamma-secure\noc get netpol -n gamma-secure"
  }
];

export const CLI_CHEATSHEET_CATEGORIES = [
  {
    name: "Cluster & Auth",
    commands: [
      { title: "Login to Cluster", cmd: "oc login -u developer -p developer https://api.crc.testing:6443" },
      { title: "Who Am I", cmd: "oc whoami" },
      { title: "Cluster Info", cmd: "oc cluster-info" },
      { title: "Create Project", cmd: "oc new-project dev-team --display-name='Development Team'" },
      { title: "Switch Project", cmd: "oc project dev-team" }
    ]
  },
  {
    name: "Manifest Generation",
    commands: [
      { title: "Dry-run Pod", cmd: "oc run web-pod --image=quay.io/bitnami/nginx:latest --dry-run=client -o yaml > pod.yaml" },
      { title: "Dry-run Deployment", cmd: "oc create deployment api-server --image=quay.io/bitnami/express:latest --replicas=3 --port=8080 --dry-run=client -o yaml > deploy.yaml" },
      { title: "Dry-run Service", cmd: "oc expose deployment api-server --port=8080 --target-port=8080 --dry-run=client -o yaml > svc.yaml" },
      { title: "Dry-run ConfigMap", cmd: "oc create configmap app-config --from-literal=KEY=VALUE --dry-run=client -o yaml > cm.yaml" },
      { title: "Dry-run Secret", cmd: "oc create secret generic app-secret --from-literal=PASSWORD=secret123 --dry-run=client -o yaml > secret.yaml" }
    ]
  },
  {
    name: "RBAC & Security",
    commands: [
      { title: "Grant Project Role to User", cmd: "oc adm policy add-role-to-user edit developer -n dev-team" },
      { title: "Create Group & Add Users", cmd: "oc adm groups new dev-group user1 user2" },
      { title: "Grant Role to Group", cmd: "oc adm policy add-role-to-group admin dev-group -n dev-team" },
      { title: "Grant SCC to ServiceAccount", cmd: "oc adm policy add-scc-to-user anyuid -z my-sa -n dev-team" }
    ]
  },
  {
    name: "Routes & Storage",
    commands: [
      { title: "Expose Unsecured Route", cmd: "oc expose svc api-server --hostname=api.apps.crc.testing" },
      { title: "Create Edge TLS Route", cmd: "oc create route edge api-edge --service=api-server --hostname=api-edge.apps.crc.testing --cert=tls.crt --key=tls.key" },
      { title: "Create PVC", cmd: "oc create pvc my-pvc --claim-class=gp2 --access-mode=ReadWriteOnce --size=2Gi" },
      { title: "Mount PVC to Deployment", cmd: "oc set volume deployment/api-server --add --name=data-vol --type=pvc --claim-name=my-pvc --mount-path=/var/data" }
    ]
  },
  {
    name: "Scaling & Maintenance",
    commands: [
      { title: "Autoscale (HPA)", cmd: "oc autoscale deployment/api-server --min=2 --max=8 --cpu-percent=80" },
      { title: "Label Node", cmd: "oc label node node1 tier=gold --overwrite" },
      { title: "Cordon Node", cmd: "oc adm node cordon node1" },
      { title: "Drain Node", cmd: "oc adm node drain node1 --ignore-daemonsets --delete-emptydir-data" },
      { title: "Uncordon Node", cmd: "oc adm node uncordon node1" }
    ]
  }
];

export const MOCK_EXAM_QUESTIONS = [
  {
    id: "q1",
    points: 20,
    title: "Task 01: Configure User Group & Project RBAC",
    description: "Create project 'ex280-finance'. Create group 'finance-admins' with users manager1 and lead1. Assign 'admin' role to group and 'view' role to user auditor1.",
    solutionCmd: `oc new-project ex280-finance
oc adm groups new finance-admins manager1 lead1
oc adm policy add-role-to-group admin finance-admins -n ex280-finance
oc adm policy add-role-to-user view auditor1 -n ex280-finance`
  },
  {
    id: "q2",
    points: 20,
    title: "Task 02: ServiceAccount & SCC Allocation",
    description: "Create project 'ex280-security'. Create SA 'sa-privileged-app' and grant 'anyuid' SCC. Deploy pod 'custom-uid-pod' running with container UID 1001.",
    solutionCmd: `oc new-project ex280-security
oc create sa sa-privileged-app -n ex280-security
oc adm policy add-scc-to-user anyuid -z sa-privileged-app -n ex280-security

# Pod spec snippet:
# spec:
#   serviceAccountName: sa-privileged-app
#   containers:
#   - name: nginx
#     image: quay.io/bitnami/nginx:latest
#     securityContext:
#       runAsUser: 1001`
  },
  {
    id: "q3",
    points: 20,
    title: "Task 03: Persistent Volume Claim & Volume Mounting",
    description: "Create project 'ex280-storage'. Create PVC 'db-data-pvc' (1Gi, ReadWriteOnce). Deploy MariaDB deployment 'db-app' mounting PVC to /bitnami/mariadb.",
    solutionCmd: `oc new-project ex280-storage
oc create pvc db-data-pvc --access-mode=ReadWriteOnce --size=1Gi -n ex280-storage
# Attach volume:
oc set volume deployment/db-app --add --name=db-vol --type=pvc --claim-name=db-data-pvc --mount-path=/bitnami/mariadb -n ex280-storage`
  },
  {
    id: "q4",
    points: 20,
    title: "Task 04: Secrets & ConfigMaps Injection",
    description: "Create project 'ex280-config'. Create Secret 'api-credentials' and ConfigMap 'app-settings'. Inject ALL keys into deployment 'backend-api'.",
    solutionCmd: `oc new-project ex280-config
oc create secret generic api-credentials --from-literal=API_KEY=key998877 --from-literal=API_SECRET=sec443322 -n ex280-config
oc create configmap app-settings --from-literal=ENVIRONMENT=production --from-literal=LOG_LEVEL=debug -n ex280-config
oc create deployment backend-api --image=quay.io/bitnami/nginx:latest -n ex280-config
oc set env deployment/backend-api --from=secret/api-credentials -n ex280-config
oc set env deployment/backend-api --from=configmap/app-settings -n ex280-config`
  },
  {
    id: "q5",
    points: 20,
    title: "Task 05: Secure TLS Edge Route",
    description: "Create project 'ex280-ingress'. Deploy Nginx service 'web-svc' on port 8080. Create Edge TLS route 'web-edge-route' for web-finance.apps.crc.testing.",
    solutionCmd: `oc new-project ex280-ingress
oc create deployment web-svc --image=quay.io/bitnami/nginx:latest --port=8080 -n ex280-ingress
oc expose deployment web-svc --port=8080 --target-port=8080 -n ex280-ingress
openssl req -x509 -newkey rsa:2048 -keyout tls.key -out tls.crt -days 365 -nodes -subj "/CN=web-finance.apps.crc.testing"
oc create route edge web-edge-route --service=web-svc --hostname=web-finance.apps.crc.testing --cert=tls.crt --key=tls.key -n ex280-ingress`
  },
  {
    id: "q6",
    points: 20,
    title: "Task 06: Network Policy Microservice Isolation",
    description: "In project 'ex280-security', apply NetworkPolicy 'isolate-db' restricting ingress to pods labeled app=mariadb so only role=backend pods can connect.",
    solutionCmd: `apiVersion: networking.k8s.io/v1
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
          role: backend`
  },
  {
    id: "q7",
    points: 20,
    title: "Task 07: Source-to-Image (S2I) Deployment",
    description: "In project 'ex280-s2i', deploy Node.js application 'node-app' from https://github.com/sclorg/nodejs-ex.git using S2I and expose an unencrypted HTTP route.",
    solutionCmd: `oc new-project ex280-s2i
oc new-app https://github.com/sclorg/nodejs-ex.git --name=node-app -n ex280-s2i
oc expose svc/node-app -n ex280-s2i`
  },
  {
    id: "q8",
    points: 20,
    title: "Task 08: ResourceQuota Capping",
    description: "In project 'ex280-quota', create ResourceQuota 'project-quota' capping pods=5, requests.cpu=1, requests.memory=2Gi, PVCs=2.",
    solutionCmd: `oc new-project ex280-quota
oc create quota project-quota --hard=pods=5,requests.cpu=1,requests.memory=2Gi,persistentvolumeclaims=2 -n ex280-quota`
  },
  {
    id: "q9",
    points: 20,
    title: "Task 09: LimitRange Defaults Enforcement",
    description: "In project 'ex280-quota', create LimitRange 'container-limits' enforcing default request CPU 100m/Mem 128Mi and default limit CPU 500m/Mem 512Mi.",
    solutionCmd: `apiVersion: v1
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
    type: Container`
  },
  {
    id: "q10",
    points: 20,
    title: "Task 10: Horizontal Pod Autoscaler (HPA)",
    description: "In project 'ex280-config', autoscale deployment 'backend-api' with min=2, max=6, CPU target 70%.",
    solutionCmd: `oc autoscale deployment backend-api --min=2 --max=6 --cpu-percent=70 -n ex280-config`
  },
  {
    id: "q11",
    points: 20,
    title: "Task 11: Node Labeling & Scheduling",
    description: "Label worker node with tier=gold. Update deployment 'db-app' in ex280-storage to schedule exclusively onto nodes with tier=gold.",
    solutionCmd: `oc label node <node-name> tier=gold --overwrite
oc set node-selector deployment/db-app tier=gold -n ex280-storage`
  },
  {
    id: "q12",
    points: 20,
    title: "Task 12: Node Taints & Tolerations",
    description: "Apply taint dedicated=finance:NoSchedule to worker node. Add a matching toleration to deployment 'db-app'.",
    solutionCmd: `oc adm taint node <node-name> dedicated=finance:NoSchedule
# Add to pod template spec:
# spec:
#   tolerations:
#   - key: "dedicated"
#     operator: "Equal"
#     value: "finance"
#     effect: "NoSchedule"`
  },
  {
    id: "q13",
    points: 20,
    title: "Task 13: Node Maintenance & Drain",
    description: "Demonstrate node maintenance: Cordon worker node, safely drain pods ignoring DaemonSets, then uncordon node.",
    solutionCmd: `oc adm node cordon <node-name>
oc adm node drain <node-name> --ignore-daemonsets --delete-emptydir-data
oc adm node uncordon <node-name>`
  },
  {
    id: "q14",
    points: 20,
    title: "Task 14: Troubleshooting Broken Deployment",
    description: "Fix broken deployment 'failing-app' in ex280-debug failing due to CrashLoopBackOff on /app/data permissions.",
    solutionCmd: `oc adm policy add-scc-to-user anyuid -z default -n ex280-debug
# OR add fsGroup to deployment securityContext:
# securityContext:
#   fsGroup: 1000670000`
  },
  {
    id: "q15",
    points: 20,
    title: "Task 15: CronJob Scheduled Execution",
    description: "In project 'ex280-jobs', create CronJob 'log-cleanup' running every 15 mins (*/15 * * * *) executing echo 'Cleanup completed'.",
    solutionCmd: `oc new-project ex280-jobs
oc create cronjob log-cleanup --image=quay.io/bitnami/nginx:latest --schedule="*/15 * * * *" -- -c "echo Cleanup completed at \$(date)" -n ex280-jobs`
  }
];
