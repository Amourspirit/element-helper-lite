# element-helper-lite

![GitHub package.json version](https://img.shields.io/github/package-json/v/Amourspirit/element-helper-lite.svg) ![GitHub](https://img.shields.io/github/license/Amourspirit/element-helper-lite.svg)

## Installation

```bash
$ npm i -D element-helper-lite
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