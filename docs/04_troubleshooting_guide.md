# 🛠️ Concept Guide 04: Systematic OpenShift Troubleshooting

In the EX280 exam, 20-30% of scenarios involve fixing pre-existing broken deployments or resolving deployment failures.

---

## 1. Quick Diagnostic Decision Tree

```
                     Pod Status Check (`oc get pods`)
                                   |
         +-------------------------+-------------------------+
         |                         |                         |
[ CrashLoopBackOff ]       [ ImagePullBackOff ]         [ Pending ]
         |                         |                         |
 Check logs & probes       Check image name &         Check PVC, Quota,
 `oc logs <pod>`          registry secrets           Node taints/limits
```

---

## 2. Common Failures & Standard Fixes

### A. Pod in `CrashLoopBackOff` or `Error`
- **Root Causes**:
  - Application crash inside container (missing env var or configuration file).
  - Permission denied writing to filesystem (SCC restriction / UID mismatch).
  - Failed Liveness/Readiness probe.
- **Diagnostic Steps**:
  ```bash
  # Check container exit logs
  oc logs <pod-name> --previous
  
  # Inspect failed probe messages or events
  oc describe pod <pod-name>
  ```
- **Fixes**:
  - If permission denied: Grant `anyuid` SCC to Pod's ServiceAccount or fix `securityContext.fsGroup`.
  - If missing env var: Inject Secret/ConfigMap using `oc set env`.
  - Adjust probe delay `oc set probe deployment/<name> --liveness --initial-delay-seconds=30`.

### B. Pod in `Pending`
- **Root Causes**:
  - Unbound PVC or missing StorageClass.
  - Insufficient node CPU/Memory (ResourceQuota exceeded).
  - Unsatisfied NodeSelector, Taint, or NodeAffinity.
- **Diagnostic Steps**:
  ```bash
  oc describe pod <pod-name>
  # Look under 'Events' at the bottom of the output
  ```
- **Fixes**:
  - Check PVC status `oc get pvc`. Ensure PVC request size doesn't exceed StorageClass capacity.
  - Check quota limit `oc get quota`. Adjust pod `requests.cpu` and `requests.memory`.
  - Check node taints `oc get nodes -o custom-columns=NAME:.metadata.name,TAINTS:.spec.taints`.

### C. `Permission Denied` when mounting PVC or writing data
- **Root Cause**: OpenShift `restricted-v2` SCC assigns an arbitrary UID (e.g. `1000670000`). If volume folder is owned by `root:root` (UID 0), writes will fail.
- **Fix**:
  Add `fsGroup` to deployment `spec.template.spec.securityContext`:
  ```yaml
  spec:
    template:
      spec:
        securityContext:
          fsGroup: 1000670000
  ```
  Or grant `anyuid` SCC to the ServiceAccount.

### D. Route Returns `503 Service Unavailable`
- **Root Causes**:
  - Route target port does not match Service port.
  - Service targetPort does not match Pod containerPort.
  - Pod readiness probe failed, leaving no active endpoints in the Service.
- **Diagnostic Steps**:
  ```bash
  # Verify Service Endpoints exist
  oc get endpoints <service-name>
  ```
- **Fix**: Align containerPort, Service targetPort, and Route targetPort.
