import express from 'express';
import { join } from 'path';

const app = express();
const port = 4200;

// Ruta al build del navegador
const browserDist = join(process.cwd(), 'dist/frontend/browser');
const indexHtml = join(browserDist, 'index.html');

// Servir archivos estáticos
app.use(express.static(browserDist));

// ⚠️ IMPORTANTE: usar '/*' y NO '*'
app.get(/.*/, (req, res) => {
  res.sendFile(indexHtml);
});

app.listen(port, () => {
  console.log(`Servidor SSR escuchando en http://localhost:${port}`);
});
