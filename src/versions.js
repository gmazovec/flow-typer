import fs from "node:fs";

export const versions = { flow: "" };

const pkgUri = [import.meta.resolve('flow-bin/package.json')];
if (pkgUri[0]) {
	const pkgPath = decodeURI(pkgUri[0]).substr(7);
	const pkg = JSON.parse(fs.readFileSync(pkgPath).toString());
	versions.flow = pkg.version;
}

