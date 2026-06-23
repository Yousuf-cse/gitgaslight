import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest({
  manifest_version: 3,
  name: "GitHub-Contribution-Inverter",
  version: "0.0.1",
  description: "Invert GitHub contribution graph.",
  permissions: [
    'storage'
  ],
  host_permissions:[
    "https://github.com/*"
  ],
  action: {
    default_title: "Toggle GitHub Contributions"
  },
  content_scripts: [{
    matches: ["https://github.com/*"],
    js: ['src/content/main.jsx'],
    run_at: "document_idle",
  }],
  background: {
    service_worker: "src/background/index.js",
    type:"module"
  }
})
