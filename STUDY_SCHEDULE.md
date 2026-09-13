# 📅 30-Day OpenShift EX280 Mastery & Study Schedule

Track your daily progress below by marking completed tasks with `[x]`.

---

## 🟢 Week 1: Core Architecture, CLI Mastery, Authentication & RBAC

- [ ] **Day 1: OpenShift vs. Kubernetes Architecture**
  - Read [`docs/01_openshift_vs_kubernetes.md`](docs/01_openshift_vs_kubernetes.md).
  - Understand Control Plane components, Machine API, Cluster Operators, Router, OAuth, Integrated Registry.
- [ ] **Day 2: `oc` CLI Mastery & Command Generation**
  - Read [`docs/02_oc_cli_cheatsheet.md`](docs/02_oc_cli_cheatsheet.md).
  - Practice `--dry-run=client -o yaml` generation for Pods, Deployments, Services, ConfigMaps, Secrets.
- [ ] **Day 3: User & Group Management & HTPasswd Identity Provider**
  - Understand OAuth configuration in `cluster` scope.
  - Practice creating users, groups, and adding members (`oc adm groups new`, `oc adm groups add-users`).
- [ ] **Day 4: OpenShift RBAC (Roles & RoleBindings)**
  - Differentiate between Roles/ClusterRoles and RoleBindings/ClusterRoleBindings.
  - Master `oc adm policy add-role-to-user` and `oc adm policy add-role-to-group`.
- [ ] **Day 5: ServiceAccounts & SecurityContextConstraints (SCC)**
  - Read [`docs/03_security_scc_rbac.md`](docs/03_security_scc_rbac.md).
  - Learn default SCCs (`restricted-v2`, `anyuid`, `privileged`, `nonroot`).
  - Grant SCC permissions to ServiceAccounts (`oc adm policy add-scc-to-user`).
- [ ] **Day 6: Hands-on Lab 01**
  - Complete [`labs/lab01_rbac_and_groups/`](labs/lab01_rbac_and_groups/).
- [ ] **Day 7: Week 1 Review & Speed Quiz**
  - Test yourself on RBAC commands without looking at documentation.

---

## 🟡 Week 2: Storage, Networking, Routes & Microservice Isolation

- [ ] **Day 8: Persistent Storage Fundamentals**
  - Understand PV, PVC, StorageClass, Access Modes (`ReadWriteOnce`, `ReadWriteMany`, `ReadOnlyMany`).
  - Learn dynamic vs static provisioning.
- [ ] **Day 9: Mounting Storage & Permissions**
  - Attach PVCs to Deployments and StatefulSets (`oc set volume`).
  - Handle pod file permission issues with `fsGroup` and `supplementalGroups` in `securityContext`.
- [ ] **Day 10: Hands-on Lab 02**
  - Complete [`labs/lab02_storage_pvc/`](labs/lab02_storage_pvc/).
- [ ] **Day 11: Services, Ingress, and OpenShift Routes**
  - Services: ClusterIP, NodePort, LoadBalancer.
  - OpenShift Routes: HTTP (Unsecured), TLS Edge Termination, TLS Passthrough, TLS Re-encryption.
- [ ] **Day 12: NetworkPolicies & Multi-tenant Pod Isolation**
  - Default ingress/egress policy behavior.
  - Isolating namespaces and restricting pod-to-pod traffic via label selectors.
- [ ] **Day 13: Hands-on Lab 03**
  - Complete [`labs/lab03_routes_and_netpol/`](labs/lab03_routes_and_netpol/).
- [ ] **Day 14: Week 2 Review & Network Troubleshooting**
  - Practice `oc exec`, `oc debug`, netcat/curl pod connectivity testing.

---

## 🔵 Week 3: S2I Builds, ImageStreams, Scaling & Operators

- [ ] **Day 15: Source-to-Image (S2I) Architecture**
  - Understand BuildConfigs, ImageStreams, S2I Builders (Node.js, Python, Java, Quarks).
  - Commands: `oc new-app`, `oc start-build`, `oc logs -f bc/<name>`.
- [ ] **Day 16: Hands-on Lab 04**
  - Complete [`labs/lab04_s2i_builds/`](labs/lab04_s2i_builds/).
- [ ] **Day 17: Resource Management (ResourceQuotas & LimitRanges)**
  - Define CPU/Memory requests and limits per container.
  - Multi-tenant namespace capping using `ResourceQuota` and default enforcing with `LimitRange`.
- [ ] **Day 18: Horizontal Pod Autoscaling (HPA)**
  - Configure HPA based on CPU/Memory metrics target thresholds (`oc autoscale`).
- [ ] **Day 19: Hands-on Lab 05**
  - Complete [`labs/lab05_resource_quotas_hpa/`](labs/lab05_resource_quotas_hpa/).
- [ ] **Day 20: Operators & Operator Lifecycle Manager (OLM)**
  - OperatorHub, CatalogSources, Subscriptions, OperatorGroups, CSV (ClusterServiceVersion).
  - Installing operators via CLI.
- [ ] **Day 21: Week 3 Review & Build/Quota Drills**
  - Practice creating S2I builds with custom environment variables and triggers.

---

## 🔴 Week 4: Node Management, Troubleshooting & EX280 Mock Exam

- [ ] **Day 22: Node Scheduling (Labels, Selectors, Taints & Tolerations)**
  - Labeling nodes (`oc label node`).
  - Scheduling workloads onto specific nodes (`nodeSelector`, `nodeAffinity`).
  - Tainting nodes (`oc adm taint node`) and adding tolerations to pods.
- [ ] **Day 23: Node Maintenance & Draining**
  - Cordoning nodes (`oc adm node cordon`).
  - Draining nodes safely (`oc adm node drain --ignore-daemonsets`).
- [ ] **Day 24: Hands-on Lab 06**
  - Complete [`labs/lab06_node_scheduling/`](labs/lab06_node_scheduling/).
- [ ] **Day 25: OpenShift Systematic Troubleshooting**
  - Read [`docs/04_troubleshooting_guide.md`](docs/04_troubleshooting_guide.md).
  - Debugging CrashLoopBackOff, ImagePullBackOff, Pending storage, OOMKilled pods, RBAC errors.
- [ ] **Day 26: EX280 Mock Exam Prep & Time Strategy**
  - Set up a clean cluster project/namespace.
  - Review exam rules and time budgeting (12 minutes per scenario).
- [ ] **Day 27: EX280 Full Mock Exam (First Attempt)**
  - Take [`mock_exam_ex280/EX280_MOCK_EXAM.md`](mock_exam_ex280/EX280_MOCK_EXAM.md) under 3-hour timer.
- [ ] **Day 28: Review Mock Exam Results & Self-Grading**
  - Compare solutions against [`mock_exam_ex280/SOLUTION_WALKTHROUGH.md`](mock_exam_ex280/SOLUTION_WALKTHROUGH.md).
  - Identify weak areas.
- [ ] **Day 29: EX280 Speed Drills & Weak Point Retest**
  - Re-run failing exam tasks, targeting under 5 minutes per question.
- [ ] **Day 30: Final Readiness Check & Exam Day Strategy**
  - Rest, review CLI flags, and get ready to pass EX280!
