import React from 'react';
import { Server, Shield, Network, ArrowRight, Database, Lock, Cpu, Layers, RefreshCw, HardDrive } from 'lucide-react';

export function OpenShiftArchDiagram() {
  return (
    <div className="card" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', margin: '1.5rem 0' }}>
      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-red)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Layers size={18} /> Red Hat OpenShift 4 Platform Layered Architecture
      </div>

      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {/* Layer 1: Access */}
        <div style={{ background: 'rgba(238, 0, 0, 0.1)', border: '1px solid rgba(238, 0, 0, 0.3)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ff4d4d', fontWeight: 600, fontSize: '0.85rem' }}>
            <Server size={16} /> Web Console
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ff4d4d', fontWeight: 600, fontSize: '0.85rem' }}>
            <Database size={16} /> Integrated Image Registry
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ff4d4d', fontWeight: 600, fontSize: '0.85rem' }}>
            <Lock size={16} /> Built-in OAuth Server
          </div>
        </div>

        {/* Layer 2: Routing & Operators */}
        <div style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-blue)', fontWeight: 600, fontSize: '0.85rem' }}>
            <Network size={16} /> HAProxy Ingress Router
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-blue)', fontWeight: 600, fontSize: '0.85rem' }}>
            <Cpu size={16} /> Operator Lifecycle Manager (OLM)
          </div>
        </div>

        {/* Layer 3: Kubernetes Core */}
        <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
          <div style={{ color: 'var(--accent-green)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.3rem' }}>
            KUBERNETES CONTROL PLANE (etcd, kube-apiserver, kube-scheduler, controller-manager)
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Manages cluster state, workloads, RBAC, SCC security, and dynamic storage provisioning.
          </div>
        </div>

        {/* Layer 4: RHCOS OS */}
        <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', padding: '0.85rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
          <div style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.85rem' }}>
            RED HAT ENTERPRISE LINUX COREOS (RHCOS) & IGNITION
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Immutable OS managed automatically via MachineConfigOperator (MCO).
          </div>
        </div>
      </div>
    </div>
  );
}

export function SfgArchDiagram() {
  return (
    <div className="card" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', margin: '1.5rem 0' }}>
      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Network size={18} /> IBM Sterling File Gateway (SFG) Data Flow Architecture
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem', alignItems: 'center' }}>
        {/* Step 1 */}
        <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', padding: '0.85rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-blue)', textTransform: 'uppercase' }}>1. Producer</div>
          <div style={{ fontWeight: 700, fontSize: '0.85rem', marginTop: '0.2rem' }}>AcmePayables</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>SFTP / AS2</div>
        </div>

        <ArrowRight size={20} color="var(--text-muted)" style={{ justifySelf: 'center' }} />

        {/* Step 2 */}
        <div style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '0.85rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-blue)', textTransform: 'uppercase' }}>2. Mailbox /Inbox</div>
          <div style={{ fontWeight: 700, fontSize: '0.85rem', marginTop: '0.2rem' }}>Arrive Event</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>FileGatewayArrival</div>
        </div>

        <ArrowRight size={20} color="var(--text-muted)" style={{ justifySelf: 'center' }} />

        {/* Step 3 */}
        <div style={{ background: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.3)', padding: '0.85rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-yellow)', textTransform: 'uppercase' }}>3. RCT Routing</div>
          <div style={{ fontWeight: 700, fontSize: '0.85rem', marginTop: '0.2rem' }}>Regex & Transform</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Filename Rename</div>
        </div>

        <ArrowRight size={20} color="var(--text-muted)" style={{ justifySelf: 'center' }} />

        {/* Step 4 */}
        <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '0.85rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-green)', textTransform: 'uppercase' }}>4. Consumer</div>
          <div style={{ fontWeight: 700, fontSize: '0.85rem', marginTop: '0.2rem' }}>GlobalBank</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Mailbox /Outbox</div>
        </div>
      </div>
    </div>
  );
}

export function RouteTypesDiagram() {
  return (
    <div className="card" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', margin: '1.5rem 0' }}>
      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-green)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Network size={18} /> OpenShift Route TLS Termination Modes Visual Flow
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {/* Edge TLS */}
        <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--accent-blue)', marginBottom: '0.4rem' }}>
            1. Edge Termination
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.8rem' }}>
            <span style={{ background: 'rgba(56, 189, 248, 0.15)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--accent-blue)' }}>Client (HTTPS)</span>
            <ArrowRight size={14} />
            <span style={{ background: 'rgba(238, 0, 0, 0.15)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#ff4d4d' }}>HAProxy Router (TLS Terminated)</span>
            <ArrowRight size={14} />
            <span style={{ background: 'rgba(34, 197, 94, 0.15)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--accent-green)' }}>Pod (HTTP Port 8080)</span>
          </div>
        </div>

        {/* Passthrough TLS */}
        <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--accent-yellow)', marginBottom: '0.4rem' }}>
            2. Passthrough Termination
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.8rem' }}>
            <span style={{ background: 'rgba(234, 179, 8, 0.15)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--accent-yellow)' }}>Client (HTTPS)</span>
            <ArrowRight size={14} />
            <span style={{ background: 'var(--bg-card-hover)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--text-muted)' }}>HAProxy Router (Raw Pass Bytes)</span>
            <ArrowRight size={14} />
            <span style={{ background: 'rgba(234, 179, 8, 0.15)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--accent-yellow)' }}>Pod (TLS Terminated at Container)</span>
          </div>
        </div>

        {/* Re-encrypt TLS */}
        <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--accent-green)', marginBottom: '0.4rem' }}>
            3. Re-encryption Termination
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.8rem' }}>
            <span style={{ background: 'rgba(34, 197, 94, 0.15)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--accent-green)' }}>Client (Public TLS)</span>
            <ArrowRight size={14} />
            <span style={{ background: 'rgba(238, 0, 0, 0.15)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#ff4d4d' }}>Router (Decrypt & Re-encrypt)</span>
            <ArrowRight size={14} />
            <span style={{ background: 'rgba(34, 197, 94, 0.15)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--accent-green)' }}>Pod (Internal TLS)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
