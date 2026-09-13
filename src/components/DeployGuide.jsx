import React, { useState } from 'react';
import { CloudUpload, Server, Globe, Container, Terminal, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';

export default function DeployGuide() {
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div>
      {/* Header Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, var(--bg-secondary) 0%, rgba(238, 0, 0, 0.12) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--accent-red)', fontWeight: 700, fontSize: '0.85rem' }}>
          <CloudUpload size={18} /> Open Source Cloud Deployment
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.2rem' }}>Deploy Anywhere to Access in Browser</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.3rem' }}>
          This application is pre-configured with zero-config deployment manifests for free open-source friendly platforms including <strong>Render.com</strong>, <strong>Vercel</strong>, <strong>Netlify</strong>, <strong>Docker</strong>, and <strong>Red Hat OpenShift</strong>.
        </p>
      </div>

      {/* Option 1: Render.com */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Server size={22} color="var(--accent-blue)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Option A: Render.com (Recommended Free Hosting)</h3>
          </div>
          <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: 'var(--accent-green)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
            1-Click Blueprint
          </span>
        </div>

        <ol style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'grid', gap: '0.75rem' }}>
          <li>
            <strong>Push this project to your GitHub account</strong>:
            <div style={{ margin: '0.5rem 0' }}>
              <pre style={{ margin: 0, fontSize: '0.85rem' }}>
                <code>git init && git add . && git commit -m "Deploy EX280 Mastery App"
git remote add origin https://github.com/YOUR_USERNAME/openshift-ex280-mastery.git
git push -u origin main</code>
              </pre>
            </div>
          </li>
          <li>
            Go to <a href="https://render.com" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-blue)' }}>Render.com</a> and sign up for a free account.
          </li>
          <li>
            Click <strong>New +</strong> &rarr; <strong>Blueprint</strong>. Connect your GitHub repository.
          </li>
          <li>
            Render will automatically detect <code>render.yaml</code>, build the SPA, start the Node server, and generate a free public URL (e.g. <code>https://openshift-ex280-mastery.onrender.com</code>)!
          </li>
        </ol>
      </div>

      {/* Option 2: Docker / Container */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Container size={22} color="var(--accent-yellow)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Option B: Container / Docker / OpenShift</h3>
          </div>
          <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: 'var(--accent-blue)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
            Universal Container
          </span>
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
          Build and run the container locally with Docker, Podman, or deploy into your OpenShift CRC cluster!
        </p>

        <pre style={{ margin: 0, fontSize: '0.85rem' }}>
          <code>{`# 1. Build Docker image
docker build -t openshift-ex280-app .

# 2. Run locally on port 3000
docker run -p 3000:3000 openshift-ex280-app

# 3. Deploy to OpenShift Cluster
oc new-project ex280-app-demo
oc new-app https://github.com/YOUR_USERNAME/openshift-ex280-mastery.git --name=ex280-web
oc expose svc/ex280-web`}</code>
        </pre>
      </div>

      {/* Option 3: Vercel / Netlify */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <Globe size={22} color="var(--accent-green)" />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Option C: Vercel / Netlify (Static SPA Deploy)</h3>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
          Deploy as a static frontend on Vercel or Netlify. Set the Build Command to <code>npm run build</code> and Output Directory to <code>dist</code>.
        </p>
      </div>
    </div>
  );
}
