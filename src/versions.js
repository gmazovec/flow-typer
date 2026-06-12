export const versions = { flow: "" };

import("flow-bin/package.json", { with: { type: "json" }, assert: { type: "json" }})
  .then((pkg) => {
    versions.flow = pkg.default.version;
  })
  .catch((err) => {
    if (err.code === "ERR_MODULE_NOT_FOUND") {
      console.error("flow-bin package not used");
    } else {
      console.log(err.message);
    }
  });

