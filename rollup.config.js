import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

const production = !process.env.ROLLUP_WATCH;

const format = process.env.FORMAT || 'iife';
const isUmd = format && format === 'umd';
const isEs = format && format === 'es';

const inputFile = (isUmd || isEs) ? 'src/components.js' : 'src/main.js';
const outputCssFile = (isUmd || isEs) ? 'dist/bundle.css' : 'public/bundle.css';

let outputFile;
switch (format) {
	case 'iife':
		outputFile = 'public/bundle.js';
		break;
	case 'es':
		outputFile = 'dist/bundle.es.js';
		break;
	case 'umd':
		outputFile = 'dist/bundle.umd.js';
		break;
}

export default {
	input: inputFile,
	output: {
		sourcemap: true,
		format: format,
		file: outputFile
	},
	name: 'app',
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				css.write(outputCssFile);
			},

			// this results in smaller CSS files
			cascade: false
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve(),
		commonjs(),

		// If we're building for production (npm run build
		// instead of npm run dev), transpile and minify
		production && isUmd && buble({ exclude: 'node_modules/**' }),
		production && isUmd && uglify()
	]
};
