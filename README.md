# transform-json-import-to-inline-object-as-const
Experimental project to figure out how to make a custom TypeScript transformation from a json import to an inline object as const.

To try it out:
- `clone repository`
- `yarn`

To build:
- `yarn ttsc --outDir ./build`

Challenges as described in this [SO post](https://stackoverflow.com/questions/65147262/typescript-custom-transformation-from-import-json-to-inline-object-as-cons)
- How to configure VS Code use the custom transformation of `import c from './some.json';` to `const c = { "test": "Hello world!" } as const;`, e.g. for type checking and intellisense support
- How to configure build to use type during type checking

