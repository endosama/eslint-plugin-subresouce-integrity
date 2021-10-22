const { getAttributes } = require("../utils/getAttributes")

const hasMissingIntegrityAttribute = (attributes) => {
  if (attributes) {
    const srcAttr = attributes.find((n) => n.name === "src")
    if (srcAttr) {
      const isRemoteSrc =
        srcAttr.value.includes("http://") || srcAttr.value.includes("https://")
      const integrityAttr = attributes.find((n) => n.name === "integrity")
      if (isRemoteSrc && !integrityAttr) {
        return srcAttr.value
      }
    }
  }
}

module.exports = {
  noSubresourceIntegrity: {
    meta: {
      type: "problem",
      docs: {
        description: "missing integrity attribute from external dependency",
        category:
          "Possible injection of malicious code from 3rd party libraries",
        recommended: true,
        url: "https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity",
      },
      schema: [],
      messages: {
        MISSING_INTEGRITY:
          "Remote resources should have an integrity attribute with SHA code - '{{ link }}'",
      },
    },
    create: (context) => {
      return {
        Script(node) {
          const attributeValue = hasMissingIntegrityAttribute(node.attrs)
          if (attributeValue) {
            context.report({
              node,
              data: {
                link: attributeValue,
              },
              messageId: "MISSING_INTEGRITY",
            })
          }
        },
        "JSXElement[openingElement.name.name=/^script/]": (node) => {
          const attributes = getAttributes(node.openingElement)
          const attributeValue = hasMissingIntegrityAttribute(attributes)
          if (attributeValue) {
            context.report({
              node,
              data: {
                link: attributeValue,
              },
              messageId: "MISSING_INTEGRITY",
            })
          }
        },
      }
    },
  },
}
