/**
 * @fileoverview Check missing integrity attributes in external scripts injected in an HTML page.
 * @author Andrea Piras (https://github.com/endosama/)
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");


