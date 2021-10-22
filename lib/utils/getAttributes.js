module.exports = {
  getAttributes: (element) => {
    return element.attributes.map((attr) => ({
      name: attr.name.name,
      value: attr.value.value,
    }))
  },
}
