/**
 * @fileoverview Check missing integrity attributes in external scripts injected in an HTML page.
 * @author Andrea Piras (https://github.com/endosama/)
 */
"use strict"

const noSubresourceIntegrity = require("./rules/no-subresource-integrity")

// import all rules in lib/rules
module.exports.rules = {
  rules: {
    "missing-subresource-integrity": noSubresourceIntegrity,
  },
  configs: {
    recommeneded: {
      plugins: ["security"],
      rules: {
        "subresource-integrity/missing-subresource-integrity": "error",
      },
    },
  },
}
