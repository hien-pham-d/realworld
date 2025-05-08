let
  nixpkgs = fetchTarball "https://github.com/NixOS/nixpkgs/tarball/nixos-24.11";
  pkgs = import nixpkgs { config = {}; overlays = [];};
in

pkgs.mkShell {
  packages = with pkgs; [
    cowsay
    lolcat

    nodejs_22
    yarn
    sqlite
    prisma-engines

    typescript-language-server
    nodePackages.prettier
    eslint
  ];

  # Environment Variables
  GREETING = "Welcome to the realworld project!";

  # Startup command
  shellHook = ''
    echo $GREETING | lolcat

    export PRISMA_QUERY_ENGINE_LIBRARY="${pkgs.prisma-engines}/lib/libquery_engine.node"
    export PRISMA_QUERY_ENGINE_BINARY="${pkgs.prisma-engines}/bin/query-engine"
    export PRISMA_SCHEMA_ENGINE_BINARY="${pkgs.prisma-engines}/bin/schema-engine"
    export PRISMA_FMT_BINARY="${pkgs.prisma-engines}/bin/prisma-fmt"
  '';
}