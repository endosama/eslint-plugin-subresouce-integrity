# eslint-plugin-subresource-integrity

Check missing integrity attributes in external scripts injected in an HTML page.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-subresource-integrity`:

```sh
npm install eslint-plugin-subresource-integrity --save-dev
```

## Usage

Add `subresource-integrity` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "subresource-integrity"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "subresource-integrity/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here
