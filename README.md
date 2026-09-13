# 🚀 OpenShift EX280 Mastery & Certification Kit

Welcome to your **1-Month OpenShift EX280 Mastery Kit**. This repository is designed to transform you into a confident OpenShift Administrator and prepare you to pass the **Red Hat Certified Specialist in OpenShift Administration (EX280)** exam.

---

## 📅 1-Month Strategic Roadmap

| Week | Focus Area | Key Objectives |
| :--- | :--- | :--- |
| **Week 1** | **Core Architecture & Security** | `oc` CLI speed, Projects, RBAC, Users/Groups, SCCs, ServiceAccounts, OAuth |
| **Week 2** | **Storage & Networking** | PV/PVC, StorageClasses, Services, Ingress, Edge/Re-encrypt Routes, NetworkPolicies |
| **Week 3** | **Builds, Scaling & Operators** | S2I (Source-to-Image), BuildConfigs, ImageStreams, LimitRanges, Quotas, HPA, OLM |
| **Week 4** | **Node Management & Exam Simulation** | Taints/Tolerations, Node Draining, Troubleshooting, 3-Hour EX280 Mock Exam |

---

## 🛠️ Lab Environment Options

To practice the hands-on labs and mock exam:

### Option A: Red Hat OpenShift Local (CRC - Recommended for Local Machine)
- **What it is**: Official single-node OpenShift 4.x running in a VM on your machine.
- **Requirements**: Windows 10/11 Pro/Enterprise (Hyper-V enabled), 16GB RAM (assign 9-11GB to CRC), 4 vCPUs.
- **Download**: [Red Hat Developers - OpenShift Local](https://developers.redhat.com/products/openshift-local/overview)
- **Quick Commands**:
  ```powershell
  crc setup
  crc start
  crc console # Opens Web Console
  oc login -u developer -p developer https://api.crc.testing:6443
  oc login -u kubeadmin -p <password> https://api.crc.testing:6443
  ```

### Option B: Red Hat Developer Sandbox (Free Cloud Environment)
- **What it is**: Free 30-day cloud cluster provided by Red Hat.
- **Setup**: Sign up at [Red Hat Developer Sandbox](https://developers.redhat.com/developer-sandbox).
- **Access**: Copy login command from Web Console ("Copy login command") and paste into your terminal.

### Option C: Minikube / Kind with `oc` CLI
- **What it is**: Lightweight Kubernetes cluster with the OpenShift CLI installed.
- **Notes**: Supports Kubernetes native objects (Deployments, Secrets, ConfigMaps, PVCs, RBAC, NetworkPolicies). OpenShift specific objects (Routes, BuildConfigs, SCCs) require OpenShift CRC or Sandbox.

---

## 📂 Repository Structure

- `STUDY_SCHEDULE.md`: Day-by-day 30-day checklist.
- `docs/`: Technical breakdown of concepts, architectural diagrams, CLI cheatsheets, and troubleshooting procedures.
- `labs/`: Guided hands-on lab exercises with starter YAMLs and solution checks.
- `mock_exam_ex280/`: Complete 15-scenario hands-on practical exam with a full solution walkthrough.

---

## 🎓 Next Steps
Start by reviewing [`STUDY_SCHEDULE.md`](STUDY_SCHEDULE.md) and [`docs/01_openshift_vs_kubernetes.md`](docs/01_openshift_vs_kubernetes.md).
