{
  description = "A very basic flake";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:nixos/nixpkgs/nixos-21.05";
  };

  outputs = { self, nixpkgs, flake-utils }: 
  flake-utils.lib.eachDefaultSystem (system:
  let
    pkgs = nixpkgs.legacyPackages.${system};
    nodeDependencies = (import ./overrides.nix { inherit pkgs; }).shell.nodeDependencies;
  in
  rec {
    packages = flake-utils.lib.flattenTree {
      svelte-template = pkgs.stdenv.mkDerivation {
        name = "svelte-template";
        src = ./.;

        buildInputs = let
          p = pkgs;
        in
        [
          p.nodePackages.npm
        ];

        configurePhase = ''
          ln -s ${nodeDependencies}/lib/node_modules ./node_modules;
          export PATH="${nodeDependencies}/.bin:$PATH";
        '';

        buildPhase = ''
          npm run build;
        '';

        installPhase = ''
          cp -r public $out/
        '';
      };
    };

    defaultPackage = packages.svelte-template;
  });
}
