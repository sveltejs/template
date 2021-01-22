import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import { spawn } from 'child_process';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) {
			/* On linux, server.kill() only kills the parent shell (sh) process but not the child sirv instance
			   See https://nodejs.org/docs/latest-v14.x/api/child_process.html#child_process_subprocess_kill_signal
			   Passing the negation of PID of a detached process to 'kill' stops all its children */ 
			try {
				spawn('kill', ['--', `-${server.pid}`]);
			} catch (_) {
				server.kill();
			}
		}
	}

	return {
		writeBundle() {
			if (server) return;
			server = spawn('npm', ['start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				detached: true,
			});
			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		},
		/* Rollup restarts on detecting changes to this config file.
		   This hook makes sure the previously started sirv instance is stopped before starting a new one */
		closeWatcher: toExit,
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

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

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
