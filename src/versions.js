import fs from "node:fs";

export const versions = { flow: "" };

if (import.meta.resolve) {
  const pkgUri = [import.meta.resolve('flow-bin/package.json')];
  if (pkgUri[0]) {
    pkgUri[0] = await Promise.resolve(pkgUri[0]);
    const pkgPath = decodeURI(pkgUri[0]).substr(7);
    const pkg = JSON.parse(fs.readFileSync(pkgPath).toString());
    versions.flow = pkg.version;
  }
} else {
  if (process && process.release.name === "node") {
    console.info("flow-typer: enable feature flag --experimental-import-meta-resolve");
  }
}

