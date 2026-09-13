# 🧪 Lab 03: Secure Routes & NetworkPolicies

## Objectives
1. Create a project named `gamma-secure`.
2. Deploy a web service `secure-api` on port 8080.
3. Create an Edge TLS Route exposing `secure-api`.
4. Implement a NetworkPolicy that isolates pods in `gamma-secure`, allowing ingress ONLY from pods labeled `role=frontend`.

---

## Step-by-Step Task Instructions

### Task 1: Create Project and Service
```bash
oc new-project gamma-secure
oc create deployment secure-api --image=quay.io/bitnami/nginx:latest --port=8080 -n gamma-secure
oc expose deployment secure-api --port=8080 --target-port=8080 -n gamma-secure
```

### Task 2: Create Self-Signed TLS Certificate & Edge Route
```bash
# Generate dummy TLS certs for testing
openssl req -x509 -newkey rsa:2048 -keyout tls.key -out tls.crt -days 365 -nodes -subj "/CN=secure-api.apps.crc.testing"

# Create Edge TLS Route
oc create route edge secure-edge-route --service=secure-api --hostname=secure-api.apps.crc.testing --cert=tls.crt --key=tls.key -n gamma-secure
```

### Task 3: Apply NetworkPolicy Isolation
Apply the following policy to block all external pod traffic except from `role=frontend`:

```yaml
apiVersion: networking.k8s.io/v1
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
      port: 8080
```

---

## Verification Commands
```bash
# Verify route creation
oc get routes -n gamma-secure

# Verify NetworkPolicy
oc get netpol -n gamma-secure
```
