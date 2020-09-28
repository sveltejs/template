
# svelte app with Gitpod setup

[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/gitpod-io/sveltejs-template)

This is a project template for [Svelte](https://svelte.dev) apps. 

## Special config for Gitpod to make rollup work

Rollup needs to know how to reach the livereload endpoint. To configure that we need to do two things in our config:

1) set an environment variable
```
export CLIENT_URL="$(gp url 35729)/livereload.js?snipver=1&port=443"
```
2) pass the env value to the livereload module in [`rollup.config.js:65`](https://github.com/gitpod-io/sveltejs-template/blob/587088aae9cb7331c27591b7f8cef9d58c037e46/rollup.config.js#L66-L69)
```js
		!production && livereload({
            watch: 'public',
            clientUrl: process.env.CLIENT_URL
        }),
```

This will set `CLIENT_URL` with the workspace url of `35729` (default port for livereload).

