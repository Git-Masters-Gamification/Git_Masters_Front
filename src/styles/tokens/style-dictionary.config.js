/* eslint-env node */

/**
 * 🔧 Configuración extendida de Style Dictionary (modo ESM)
 * Genera builds para tema claro y tema oscuro (.theme--dark)
 */

import { fileURLToPath } from "url";
import path from "path";
import StyleDictionary from "style-dictionary";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildPath = path.join(__dirname, "build/");

/**
 * 📦 Configuración múltiple: light + dark
 * Cada una se procesa por separado
 */
const configs = [
  {
    name: "light",
    source: [path.join(__dirname, "properties.json")],
    platforms: {
      scss: {
        transformGroup: "scss",
        buildPath: path.join(buildPath, "scss/"),
        files: [
          {
            destination: "_tokens.scss",
            format: "scss/variables",
            options: { outputReferences: true },
          },
        ],
      },
      css: {
        transformGroup: "css",
        buildPath: path.join(buildPath, "css/"),
        files: [
          {
            destination: "tokens.css",
            format: "css/variables",
            options: { outputReferences: true },
          },
        ],
      },
      json: {
        transformGroup: "js",
        buildPath: path.join(buildPath, "json/"),
        files: [
          {
            destination: "tokens.json",
            format: "json",
          },
        ],
      },
    },
  },
  {
    name: "dark",
    source: [path.join(__dirname, "properties.dark.json")],
    platforms: {
      css: {
        transformGroup: "css",
        buildPath: path.join(buildPath, "css/"),
        files: [
          {
            destination: "tokens-dark.css",
            format: "css/variables",
            options: {
              selector: ".theme--dark", // genera .theme--dark { --color-... }
              outputReferences: true,
            },
          },
        ],
      },
    },
  },
];

// 🚀 Ejecutar ambos builds
for (const cfg of configs) {
  console.log(`\n🏗️  Generando tokens para: ${cfg.name} theme...`);
  const SD = new StyleDictionary(cfg);
  SD.buildAllPlatforms();
}

export default configs;