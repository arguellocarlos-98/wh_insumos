import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const logDir = path.join(process.cwd(), "logs");
const combinedDir = path.join(logDir, "combined");
const errorDir = path.join(logDir, "error");

// Obtener últimos N archivos .log (ignorando *.json)
const getLatestFiles = (dir, limit = 20) => {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.log'))  // <-- filtra solo .log
    .map(file => ({
      name: file,
      time: fs.statSync(path.join(dir, file)).mtime.getTime(),
    }))
    .sort((a, b) => b.time - a.time)
    .slice(0, limit)
    .map(f => f.name);
};

// Dashboard de logs con visor integrado y buscador
router.get("/", (req, res) => {
  const combinedFiles = getLatestFiles(combinedDir);
  const errorFiles = getLatestFiles(errorDir);

  const html = `
  <html>
  <head>
    <title>Logs Dashboard</title>
    <style>
      body { font-family: monospace; padding: 20px; background: #1e1e1e; color: #eee; }
      h1 { text-align: center; }
      .container { display: flex; gap: 50px; }
      .logs { flex: 1; }
      input { width: 100%; padding: 5px; margin-bottom: 5px; }
      select { width: 100%; padding: 5px; margin-bottom: 10px; }
      #logContent { background: #000; padding: 10px; height: 500px; overflow-y: scroll; border-radius: 5px; white-space: pre-wrap; }
      .ERROR { color: red; font-weight: bold; }
      .WARN { color: orange; font-weight: bold; }
      .INFO { color: lightgreen; }
      button { margin-top: 5px; padding: 5px 10px; }
    </style>
  </head>
  <body>
    <h1>Logs Dashboard</h1>
    <div class="container">
      <div class="logs">
        <h2>Combined Logs</h2>
        <input type="text" id="searchCombined" placeholder="Buscar archivo...">
        <select id="combinedSelect" size="10">
          ${combinedFiles.map(f => `<option value="${f}">${f}</option>`).join("")}
        </select>
        <button onclick="loadLog('combined')">Cargar</button>
      </div>
      <div class="logs">
        <h2>Error Logs</h2>
        <input type="text" id="searchError" placeholder="Buscar archivo...">
        <select id="errorSelect" size="10">
          ${errorFiles.map(f => `<option value="${f}">${f}</option>`).join("")}
        </select>
        <button onclick="loadLog('error')">Cargar</button>
      </div>
    </div>

    <h2>Contenido del Log</h2>
    <div id="logContent">Seleccione un archivo y presione "Cargar"</div>

    <script>
      // Filtrar select por input
      function filterSelect(inputId, selectId) {
        const filter = document.getElementById(inputId).value.toLowerCase();
        const select = document.getElementById(selectId);
        for (let i = 0; i < select.options.length; i++) {
          const option = select.options[i];
          option.style.display = option.value.toLowerCase().includes(filter) ? "" : "none";
        }
      }

      document.getElementById("searchCombined").addEventListener("keyup", () => filterSelect("searchCombined", "combinedSelect"));
      document.getElementById("searchError").addEventListener("keyup", () => filterSelect("searchError", "errorSelect"));

      async function loadLog(type) {
        const select = type === 'error' ? document.getElementById('errorSelect') : document.getElementById('combinedSelect');
        const filename = select.value;
        if (!filename) return;
        const res = await fetch('/logs/view/' + type + '/' + filename);
        let text = await res.text();
        // Resaltado básico de niveles
        text = text.replace(/ERROR/g, '<span class="ERROR">ERROR</span>')
                   .replace(/WARN/g, '<span class="WARN">WARN</span>')
                   .replace(/INFO/g, '<span class="INFO">INFO</span>');
        document.getElementById('logContent').innerHTML = text;
        document.getElementById('logContent').scrollTop = document.getElementById('logContent').scrollHeight;
      }
    </script>
  </body>
  </html>
  `;
  res.send(html);
});

// Ruta para obtener contenido del log
router.get("/view/:type/:filename", (req, res) => {
  const { type, filename } = req.params;
  const dir = type === "error" ? errorDir : combinedDir;
  const filePath = path.join(dir, filename);

  if (!fs.existsSync(filePath)) return res.status(404).send("Archivo no encontrado");

  const content = fs.readFileSync(filePath, "utf-8")
                      .replace(/</g, "&lt;")
                      .replace(/>/g, "&gt;");
  res.send(content);
});

export default router;
