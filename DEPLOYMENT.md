# 🌐 OpenShift EX280 Mastery App - Deployment Guide

This interactive web application can be deployed for **free** on open-source friendly hosting platforms like **Render.com**, **Vercel**, **Netlify**, or deployed in a container using **Docker**, **Podman**, or **Red Hat OpenShift**.

---

## 🚀 Option 1: Deploy to Render.com (Recommended Free Hosting)

Render provides free hosting for web services with automatic TLS, custom domain support, and continuous deployment from Git.

### Step 1: Push Repository to GitHub / GitLab
```bash
git init
git add .
git commit -m "Initial commit for OpenShift EX280 Mastery Web App"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/openshift-ex280-mastery.git
git push -u origin main
```

### Step 2: Deploy using Render Blueprint (1-Click)
1. Sign up or log into [Render.com](https://render.com).
2. Click **New +** on the top right -> Select **Blueprint**.
3. Connect your GitHub repository.
4. Render will automatically read [`render.yaml`](render.yaml), run `npm install && npm run build`, and deploy the application.
5. You will get a live HTTPS URL like `https://openshift-ex280-mastery.onrender.com` accessible from any browser anywhere!

---

## ⚡ Option 2: Deploy to Vercel or Netlify (Static SPA Deployment)

### Vercel:
1. Install Vercel CLI or import via [vercel.com](https://vercel.com).
2. Set **Framework Preset**: `Vite`.
3. Build Command: `npm run build`
4. Output Directory: `dist`

### Netlify:
1. Connect Git repository on [netlify.com](https://netlify.com).
2. Build Command: `npm run build`
3. Publish directory: `dist`

---

## 🐳 Option 3: Deploy via Docker Container (Any Server / Cloud)

You can containerize the app and run it on any server (AWS EC2, DigitalOcean, Linode, Railway, Fly.io):

```bash
# Build the container image
docker build -t openshift-ex280-app .

# Run the container on port 3000
docker run -d -p 3000:3000 --name ex280-mastery openshift-ex280-app
```

Access the app in your browser at `http://localhost:3000` or your server's IP address.

---

## 🔴 Option 4: Deploy Directly into Red Hat OpenShift / CRC

Since you are learning OpenShift, you can deploy this application onto your own OpenShift cluster or Red Hat Developer Sandbox!

```bash
# 1. Create a project
oc new-project ex280-app-demo

# 2. Deploy using S2I or Docker build strategy
oc new-app https://github.com/YOUR_USERNAME/openshift-ex280-mastery.git --name=ex280-mastery-web

# 3. Expose service to create a public Route
oc expose svc/ex280-mastery-web

# 4. View your live Route URL
oc get route ex280-mastery-web
```

---

## 🛠️ Local Development & Testing

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production SPA
npm run build

# Run production server locally
npm start
```
