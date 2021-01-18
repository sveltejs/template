// @ts-check

/** This script modifies the project to support IE11

/**  To work on this script:
  rm -rf test-template template && git clone sveltejs/template test-template && node scripts/setupIE11.js test-template
*/

const fs = require("fs")
const path = require("path")
const { argv } = require("process")

const projectRoot = argv[2] || path.join(__dirname, "..")

const babelOptions = `{
			extensions: ['.js', '.mjs', '.html', '.svelte'],
			babelHelpers: 'runtime',
			exclude: ['node_modules/@babel/**', 'node_modules/core-js/**'],
			presets: [[
				'@babel/preset-env', {
					targets: { ie: '11' },
					useBuiltIns: 'usage',
					corejs: { "version": 3, "proposals": true }
				}
			]],
			plugins: [
				'@babel/plugin-syntax-dynamic-import',
				['@babel/plugin-transform-runtime', { useESModules: true }]
			]
		}`

// Add deps to pkg.json
const packageJSON = JSON.parse(fs.readFileSync(path.join(projectRoot, "package.json"), "utf8"))
packageJSON.devDependencies = Object.assign(packageJSON.devDependencies, {
  "@babel/core": "^7.0.0",
  "@babel/plugin-syntax-dynamic-import": "^7.0.0",
  "@babel/plugin-transform-runtime": "^7.0.0",
  "@babel/preset-env": "^7.0.0",
  "@rollup/plugin-babel": "^5.0.0",
  "core-js": "^3.0.0"
})

// Write the package JSON
fs.writeFileSync(path.join(projectRoot, "package.json"), JSON.stringify(packageJSON, null, "  "))

// Edit rollup config
const rollupConfigPath = path.join(projectRoot, "rollup.config.js")
let rollupConfig = fs.readFileSync(rollupConfigPath, "utf8")

// Edit imports
rollupConfig = rollupConfig.replace(`'rollup-plugin-css-only';`, `'rollup-plugin-css-only';\nimport babel from '@rollup/plugin-babel';`)

// Add preprocessor
rollupConfig = rollupConfig.replace(
  'commonjs(),',
  `commonjs(),\n\t\tbabel(${babelOptions}),`
);

fs.writeFileSync(rollupConfigPath, rollupConfig)

// Delete this script, but not during testing
if (!argv[2]) {
  // Remove the script
  fs.unlinkSync(path.join(__filename))

  // Check for Mac's DS_store file, and if it's the only one left remove it
  const remainingFiles = fs.readdirSync(path.join(__dirname))
  if (remainingFiles.length === 1 && remainingFiles[0] === '.DS_store') {
    fs.unlinkSync(path.join(__dirname, '.DS_store'))
  }

  // Check if the scripts folder is empty
  if (fs.readdirSync(path.join(__dirname)).length === 0) {
    // Remove the scripts folder
    fs.rmdirSync(path.join(__dirname))
  }
}

// Adds the extension recommendation
fs.mkdirSync(path.join(projectRoot, ".vscode"), { recursive: true })
fs.writeFileSync(path.join(projectRoot, ".vscode", "extensions.json"), `{
  "recommendations": ["svelte.svelte-vscode"]
}
`)

console.log("Converted to build IE11 compatible bundle.")

if (fs.existsSync(path.join(projectRoot, "node_modules"))) {
  console.log("\nYou will need to re-run your dependency manager to get started.")
}
