import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
//import livereload from 'rollup-plugin-livereload';
import browsersync from 'rollup-plugin-browsersync';
import { terser } from 'rollup-plugin-terser';
import historyApiFallback from 'connect-history-api-fallback'
import replace from '@rollup/plugin-replace';
import css from 'rollup-plugin-css-only'
const rimraf = require('rimraf')


// remove folders
rimraf('./public/build', () => { console.log('public/build removed') })
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'esm',
		name: 'app',
		dir: 'public/build/'
	},
	plugins: [
        replace({ CLOUDINARY_API_KEY: process.env.CLOUDINARY_KEY, HOOK_ATELIER: process.env.HOOK_ATELIER}),
        css({ output: 'public/css/imported.css' }),
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file - better for performance
			css: css => {
				css.write('public/css/bundle.css');
			}
		}),
		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
        commonjs(),
        !production && browsersync({
            server: {
                baseDir: "public",
                middleware: [ historyApiFallback() ]
            }
        }),
		// In dev mode, call `npm run start` once
		// the bundle has been generated
		//!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		//!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
		}
	};
}
