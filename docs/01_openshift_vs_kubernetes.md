# 📘 Concept Guide 01: OpenShift vs. Kubernetes Architecture

To be a top-tier OpenShift Administrator, you must understand **what OpenShift adds on top of Kubernetes** and how Red Hat's enterprise abstraction layer operates under the hood.

---

## 1. High-Level Comparison

| Feature / Abstraction | Vanilla Kubernetes | Red Hat OpenShift (OCP 4.x) |
| :--- | :--- | :--- |
| **Underlying OS** | Any Linux (Ubuntu, RHEL, Debian) | **Red Hat Enterprise Linux CoreOS (RHCOS)** |
| **CLI Tool** | `kubectl` | `oc` (Superset of kubectl with additional commands) |
| **Primary Project Isolation** | `Namespace` | `Project` (An annotated Kubernetes Namespace with user self-provisioning templates & default quotas) |
| **Container Security Model** | Pod Security Standards / Admission Controls | **Security Context Constraints (SCC)** |
| **Authentication & Users** | External Identity Provider (X.509 certs, OIDC) | **Built-in OAuth Server** + HTPasswd / LDAP / Keycloak Identity Providers |
| **Ingress / Edge Traffic** | Ingress Controller (Nginx, Traefik) | **OpenShift Router (HAProxy)** via **Route** objects (and native Ingress) |
| **Built-in Application Build** | Requires Docker/Kaniko/Tekton pipelines | **Source-to-Image (S2I)** + **BuildConfig** + **ImageStream** |
| **Operator Management** | Manual Helm / Manifests | Integrated **Operator Lifecycle Manager (OLM)** & OperatorHub |
| **Container Registry** | External (DockerHub, Quay, ECR) | **Integrated OpenShift Image Registry** |

---

## 2. Key OpenShift Architectural Components

```
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
```

### A. RHCOS & Ignition
- OpenShift 4 control plane and worker nodes run **Red Hat Enterprise Linux CoreOS (RHCOS)**.
- Operating system updates are atomic and managed directly by the cluster using `MachineConfigOperator` (MCO).

### B. Security Context Constraints (SCC)
- In standard Kubernetes, containers often run as `root` unless restricted.
- OpenShift **forbids containers from running as root by default**.
- Each pod is evaluated against an SCC. The default SCC for workloads is `restricted-v2` (allocates arbitrary unprivileged UID range like `1000670000/10000`).

### C. OpenShift Routes vs. Kubernetes Ingress
- A **Route** exposes a `Service` externally via HAProxy router.
- Types of Routes:
  1. **Unsecured (HTTP)**: Port 80 traffic routed directly to Service.
  2. **Edge Termination**: TLS is terminated at the OpenShift Router (HAProxy). Traffic between Router and Pod is plain HTTP.
  3. **Passthrough Termination**: TLS is NOT terminated at Router; raw encrypted bytes pass straight to the Pod (Pod must handle TLS certificate).
  4. **Re-encryption Termination**: Router terminates external TLS using public cert, then opens a *new* TLS connection to the backend Pod using internal CA cert.

### D. Source-to-Image (S2I)
- S2I is a toolkit that takes source code from Git, injects it into a builder image (e.g., Python 3.9, Node.js 18), compiles/builds the application, and produces a ready-to-run container image automatically inside the cluster.
- Components:
  - `BuildConfig` (`bc`): Defines *where* source code comes from and *how* to build it.
  - `ImageStream` (`is`): Tracks container images and triggers redeployments when new tags are pushed.
