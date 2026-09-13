import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets from Vite build directory
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback all routes to index.html for Single Page Application client routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 OpenShift EX280 Mastery App running on port ${PORT}`);
  console.log(`Ready for production access on Render, Vercel, or Docker!`);
});
