{
  description = "See saw scraper";
  # Use the unstable nixpkgs to use the latest set of node packages
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/master";

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem
    (system: let
      pkgs = import nixpkgs {
        inherit system;
      };
    in {
      devShells.default = pkgs.mkShell {
        buildInputs = [
          pkgs.nodejs-16_x
          pkgs.nodePackages.typescript
          pkgs.nodePackages.web-ext
          pkgs.nodePackages.typescript-language-server
        ];
        shellHook = ''
          alias gst='git status'
          alias gd='git diff'
          alias gc='git commit'
          :q() {
            exit
          }
        '';
    };
  });
}
