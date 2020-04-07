const { parse, walk } = require("svelte/compiler");
const path = require("path");
const fs = require("fs");

function flatten(arr) {
  return arr.reduce(function(flat, toFlatten) {
    return flat.concat(
      Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
    );
  }, []);
}

function getProp(node, attr) {
  if (!node.attributes) return false;

  return (node.attributes.find(a => a.name === attr) || {}).value;
}

function getPath(name, root = "./src/components") {
  return path.resolve(root, name, "variants.js");
}

const defs = {};

function getComponent(name) {
  try {
    let componentPath = getPath(name);
    if (!fs.existsSync(componentPath)) {
      componentPath = getPath(name, "./node_modules/smelte/src/components");
    }
    return require(componentPath);
  } catch (e) {
    return {
      all: color => [`text-${color}-500`]
    };
  }
}

function classesPerComponent(colors) {
  return Object.keys(colors).reduce((acc, component) => {
    const def = defs[component] || getComponent(component);

    defs[component] = def;

    const classes = [...colors[component]].map(c =>
      Object.keys(def).map(k => def[k](c))
    );

    return [...acc, ...classes];
  }, []);
}

module.exports = function extractor(content) {
  let ast;
  const usedColors = {};
  const usedComponents = new Set();

  try {
    ast = parse(content);
  } catch {}

  walk(ast, {
    enter: function(node) {
      const color = getProp(node, "color");

      if (node.type === "InlineComponent") {
        usedComponents.add(node.name);
      }

      if (color && color[0].data) {
        if (!usedColors[node.name]) {
          usedColors[node.name] = new Set(["primary", "white", "gray"]);
        }

        usedColors[node.name].add(color[0].data);
      }
    }
  });

  const fromClasses = content.match(/class:[A-Za-z0-9-_]+/g) || [];
  const defaultComponentClasses =
    content.match(/lasses = ("[a-zA-Z0-9-_ ]+")/g) || [];

  return [
    ...(content.match(/[A-Za-z0-9-_:\/]+/g) || []),
    ...fromClasses.map(c => c.replace("class:", "")),
    ...flatten(classesPerComponent(usedColors)),
    ...defaultComponentClasses.map(c =>
      c.replace('lasses = "', "").replace('"', "")
    )
  ];
};
