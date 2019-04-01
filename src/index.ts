/**
 * Elements creation arguments
 * @param tag (required) The tag of the element such as div, script, style
 * @param text (optional) The text to add to the element content.
 * @param html (optional) The html to add to the element content.
 * @param attribs (optional) Array of Attributes and values to add to the element.
 * @param children (optional) child elements to add to the current element.
 * @example
```ts
var args: IElementCreate = {
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
      scroll: false // attribute will be ignored because its value is false
    },
    children: [{
        tag: 'textarea',
        attribs: {
          id: appSettings.tinyId,
          rows: '18',
          cols: '66'
          disabled: true // attribute will be written as disabled=""
        }
      }]
  }]
}
```
 */
export interface IElementCreate {
  /**
   * The tag of the element such as div, script, style
   */
  tag: string;
  /**
   * text only to add to the element content.
   */
  text?: string;
  /**
   * html to add to the element content.
   */
  html?: string;
  /**
   * Any extra attributes to apply to element such as id, scrolling
   * An attribute on an element can be string or boolean value.
   * If the value is boolean then the attribue will only be added if the value of the element is true.
   * Attributes with a value of false will be ignnored!
   * Adding an attribute with the value of '' (Empty.String) is tha same as adding with a value of true
   */
  attribs?: { [key: string]: string | boolean };
  children?: IElementCreate[];
}
/**
 * Determins where the element will be loaded
 * @param head Represents the head of the document
 * @param body Represents the body of the document
 * @param other Represents unknow part of the doucment
 */
export enum ElLocation {
  /**
   * Represents the head of the document
   */
  head,
  /**
   * Represents the body of the document
   */
  body,
  /**
   * Represents the unknow part of the document
   */
  other,
}
/**
 * Creates HTMLElement with nested child elements
 * @param eArgs The arguments that contain element(s) to add.
 * @returns HTMLElement  
 * An attribute on an element can be string or boolean value.  
 * If the value is boolean then the attribue will only be added if the value of the element is true.  
 * Attributes with a value of false will be ignnored!  
 * Adding an attribute with the value of '' (Empty.String) is tha same as adding with a value of true
 * @example
```ts
var args: IElementCreate = {
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
      scroll: false // attribute will be ignored because its value is false
    },
    children: [{
        tag: 'textarea',
        attribs: {
          id: appSettings.tinyId,
          rows: '18',
          cols: '66'
          disabled: true // attribute will be written as disabled=""
        }
      }]
  }]
};
var el = elementsCreate(args);
elementAddToDoc(el);
```
 */
export const elementsCreate = (eArgs: IElementCreate): HTMLElement => {
  const parentEl: HTMLElement = elementCreate(eArgs);
  if (eArgs.children) {
    addElementRecursive(parentEl, eArgs.children);
  }
  return parentEl;
};

/**
 * Creates an Html element
 * @param eArgs {IElementCreate} Extra parameters such as type and any other parameters
 * @returns {HTMLElement} Element with any extra attributes set
 *
 * To created nested html elements see elementsCreate.
 * An attribute on an element can be string or boolean value.
 * If the value is boolean then the attribue will only be added if the value of the element is true.
 * Attributes with a value of false will be ignnored!
 * Adding an attribute with the value of '' (Empty.String) is tha same as adding with a value of true
 */
const elementCreate = (eArgs: IElementCreate): HTMLElement => {
  const htmlNode: HTMLElement = genericCreateElement(eArgs.tag); // D.createElement('script');
  if (eArgs.attribs) {
    for (const key in eArgs.attribs) {
      if (eArgs.attribs.hasOwnProperty(key)) {
        const value = eArgs.attribs[key];
        if (typeof value === 'boolean') {
          if (value === true) {
            htmlNode.setAttribute(key, '');
          }
        } else {
          htmlNode.setAttribute(key, value.toString());
        }
      }
    }
  }
  if (eArgs.html && eArgs.html.length > 0) {
    htmlNode.innerHTML = eArgs.html;
  }
  if (eArgs.text && eArgs.text.length > 0) {
    htmlNode.textContent = eArgs.text;
  }
  return htmlNode;
};

const genericCreateElement = <T extends HTMLElement>(tag: string): T => {
  const D: Document = document;
  const node: T = (D as any).createElement(tag);
  return node;
};

/**
 * Recursivly creates html with child elements
 * @param parentElement The Element or Extended element to add child elements to
 * @param eArgs an array including tag and attributes to add to elements.
 */
const addElementRecursive = (parentElement: Element, eArgs: IElementCreate[] | undefined): void => {
  if (eArgs && eArgs.length > 0) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < eArgs.length; i++) {
      const el = eArgs[i];
      const childEl = elementCreate(el);
      parentElement.appendChild(childEl);
      if (el.children) {
        addElementRecursive(childEl, eArgs[i].children);
      }
    }
  }
};
/**
 * Adds Html element to the document
 * @param el {HTMLElement} The html element to add to the document
 * @param location The location in the document to add the element. Default location is head
 * @returns The element tha was added to the documet
 */
export const elementAddToDoc = (el: HTMLElement, location: ElLocation = ElLocation.head): HTMLElement => {
  const D: Document = document;
  let targ: Element;
  switch (location) {
    case ElLocation.body:
      targ = D.getElementsByTagName('body')[0] || D.body;
      break;
    case ElLocation.head:
      targ = D.getElementsByTagName('head')[0] || D.head;
      break;
    default:
      targ = D.getElementsByTagName('body')[0] || D.body || D.documentElement;
      break;
  }
  targ.appendChild(el);
  return el;
};
/**
 * Creates a new Html element and adds it ot the document
 * @param eArgs The arguments that contain element(s) to add.
 * @param location The location in the document to add the element. Default location is head.
 * @returns The Html element that was added to the document
 */
export const elementAddNewToDoc = (eArgs: IElementCreate, location: ElLocation = ElLocation.head): HTMLElement => {
  const el: HTMLElement = elementsCreate(eArgs);
  return elementAddToDoc(el, location);
};
