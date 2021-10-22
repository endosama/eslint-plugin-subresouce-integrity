const path = require("path")
const { RuleTester } = require("eslint")
const {
  noSubresourceIntegrity,
} = require("../../../lib/rules/no-subresource-integrity")

const NODE_MODULES = "../../../node_modules"

const htmlRuleTester = new RuleTester({
  parser: path.join(__dirname, NODE_MODULES, "@html-eslint/parser"),
})

htmlRuleTester.run(
  "HTML - should have integrity attribute for every import",
  noSubresourceIntegrity,
  {
    valid: [
      {
        code: `<script integrity="123" src="http://google.com/file.js" />`,
      },
    ],
    invalid: [
      {
        code: `<script src="http://google.com/file.js" />`,
        errors: [
          {
            message:
              "Remote resources should have an integrity attribute with SHA code - 'http://google.com/file.js'",
          },
        ],
      },
      {
        code: `function() {
				return <html>
					<head>
						<script src="http://google.com/file.js" />
					</head>
					<body></body>
				</html>
			}`,
        errors: [
          {
            message:
              "Remote resources should have an integrity attribute with SHA code - 'http://google.com/file.js'",
          },
        ],
      },
      {
        code: `import React from "react";

			const Component = () => {
				return (
					<React.Fragment>
						<div>
							<script src="http://google.com/react.js" />
						</div>
						<body></body>
					</React.Fragment>
				);
			};
			`,
        errors: [
          {
            message:
              "Remote resources should have an integrity attribute with SHA code - 'http://google.com/react.js'",
          },
        ],
      },
    ],
  }
)

const tsRuleTester = new RuleTester({
  parser: path.join(__dirname, NODE_MODULES, "@typescript-eslint/parser"),
  parserOptions: { ecmaFeatures: { jsx: true } },
})

tsRuleTester.run(
  "TS - should have integrity attribute for every import",
  noSubresourceIntegrity,
  {
    valid: [
      {
        code: `import React from "react";

			const Component = () => {
				return (
					<React.Fragment>
						<div>
							<script integrity="eee" src="http://google.com/react.js" />
						</div>
						<body></body>
					</React.Fragment>
				);
			};
			
		`,
      },
    ],
    invalid: [
      {
        code: `import React from "react";

			const Component = () => {
				return (
					<React.Fragment>
						<div>
							<script src="http://google.com/react.js" />
						</div>
						<body></body>
					</React.Fragment>
				);
			};
			
			`,
        errors: [
          {
            message:
              "Remote resources should have an integrity attribute with SHA code - 'http://google.com/react.js'",
          },
        ],
      },
    ],
  }
)
