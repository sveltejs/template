# Deploy Svelte to Render

This is a project template for [Svelte](https://svelte.dev) apps running on Render. It is forked from at https://github.com/sveltejs/template. See the [minor changes](https://github.com/render-examples/svelte/compare/f92a0a4dfda3a4eff6474ca242c8aea4be9260d1...HEAD) made to the template to allow it to run on Render. A `render.yaml` was added to make the define the service as [Infrastructure-as-Code](https://render.com/docs/infrastructure-as-code), but it is not required.

See Render's [Svelte deploy guide](https://render.com/docs/deploy-svelte) for more details.

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit render-examples/svelte svelte-app
cd svelte-app
```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*


## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

## Building

To create an optimised version of the app:

```bash
npm run build
```

## Using TypeScript

This template comes with a script to set up a TypeScript development environment, you can run it immediately after cloning the template with:

```bash
node scripts/setupTypeScript.js
```

Or remove the script via:

```bash
rm scripts/setupTypeScript.js
```

## Deploying to the web

To deploy this example to Render, please see the guide at https://render.com/docs/deploy-svelte#deploy-svelte-components-in-a-static-site.
