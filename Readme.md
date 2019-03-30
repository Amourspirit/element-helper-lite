# element-helper-lite

![GitHub package.json version](https://img.shields.io/github/package-json/v/Amourspirit/element-helper-lite.svg) [![Codecov Coverage](https://img.shields.io/codecov/c/github/Amourspirit/element-helper-lite/coverage.svg?style=flat-square)](https://codecov.io/gh/Amourspirit/element-helper-lite/)

## Installation

```bash
$ npm install element-helper-lite
```

### Methods
```ts
const elementsCreate: (eArgs: IElementCreate) => HTMLElement
const elementAddToDoc: (el: HTMLElement, location: ElLocation) => void
const elementAddNewToDoc: (eArgs: IElementCreate, location: ElLocation) => HTMLElement
```

### Enums

```ts
enum ElLocation
```

### Interfaces

```ts
interface IElementCreate
```

### Example

```ts
const args: IElementCreate = {
  tag: 'div',
  attribs: {
    id: 'tinybox',
    class: 'gmbox gmbox-window'
  },
  children: [{
    tag: 'div',
    attribs: {
      class: 'gmclose'
    }
  },
  {
    tag: 'div',
    attribs: {
      id: appSettings.fullScreenRealId,
    },
    children: [{
        tag: 'textarea',
        attribs: {
          id: appSettings.tinyId,
          rows: '18',
          cols: '66'
        }
      }]
  },
  {
    tag: 'div',
    attribs: { id: 'za_one', class: 'za' }
  }]
}
elementAddNewToDoc(args, ElLocation.head);
```