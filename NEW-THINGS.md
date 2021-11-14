# RANDOM NEW THINGS

**content**

- arrow functions
- callbacks
- className
- createElement()
- createTextNode()
- DOM API
- element.clientHeight()
- elemeny.scrollHeigh()
- element.scrollTop()
- em, rem
- findIndex()
- flex-grow, flex-shrink
- forEach()
- math.floor()
- on()
- an observable
- publish()
- RANDOMIZER
- return
- RxJS
- splice()
- subscribe()

___ 

## arrow => functions

```js
// Traditional Anonymous Function
function (a){
  return a + 100;
}

// Arrow Function Break Down

// 1. Remove the word "function" and place arrow between the argument and opening body bracket
(a) => {
  return a + 100;
}

// 2. Remove the body braces and word "return" -- the return is implied.
(a) => a + 100;

// 3. Remove the argument parentheses
a => a + 100;
```

___

# CALLBACKS

MDN: A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.

**SYNCHRONOUS CALLBACK example (executed immediately):** 

```js
function greeting(name) {
  	alert('Hello ' + name);
}

function processUserInput(callback) {
 	 var name = prompt('Please enter your name.');
 	callback(name);
}

processUserInput(greeting);
```

**ASYNCHRONOUS CALLBACKS**

Callbacks are often used after asynchronous operation has completed.
example: 
	 - callback function executed inside s `.then()` block chained ontho the endo of a promise after promise fulfills or rejects
	- used in  web API’s ( fetch() )

[MDN](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)

___

## className

The `className` property of the Element interface gets and sets the value of the class attribute of the specified element.
___

## createElement

___

## createTextNode()

adds text to HTML elements

`var text = document.createTextNode(data);`

	_text_  = text node
	_data_ = string containing the data to be put in the text node

___

## DOM API

DOM connects web pages to scripts or programming languages by representing the structure of a document—such as the HTML representing a web page—in memory

**use APIs to create web content and application**

ACCESSING THE DOM

You don't have to do anything special to begin using the DOM. You use the API directly in JavaScript from within what is called a script, a program run by a browser.

When you create a script, whether inline in a <script> element or included in the web page, you can immediately begin using the API for the document or window objects to manipulate the document itself, or any of the various elements in the web page (the descendant elements of the document).

[INTRO TO DOM - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)

___

## element.clientHeight()

-- read-only property
-- zero for elements with no CSS or inline layout boxes
-- otherwise, it's the inner height of an element in pixels
-- includes padding but excludes borders, margins, and horizontal scrollbars (if present)

**calculated as:**

CSS height + CSS padding - height of horizontal scrollbar (if present)

[img example](https://www.pinterest.com/pin/475340935679590950/)

___

## element.scrollHeigh()

-- read-only property is a measurement of the height of an element's content, including content not visible on the screen due to overflow

[img example](https://www.pinterest.com/pin/475340935679590985/)

___

## element.scrollTop()

-- property that gets or sets the number of pixels that an element's content is scrolled vertically
-- measurement of the distance from the element's top to its topmost visible content

Can be set to any integer value, with certain caveats:

  - if the element can't be scrolled (e.g. it has no overflow or if the element has a property of "non-scrollable"), `scrollTop` is 0
  - `scrollTop` doesn't respond to negative values; instead, it sets itself back to 0
  - if set to a value greater than the maximum available for the element, `scrollTop` settles itself to the maximum value

___

## em, rem

- rem values are relative to the root html element, not to the parent element
- if font-size of the root element is 16px then 1 rem = 16px for all elements

- if font-size is not explicitly defined in root element then 1rem will be equal to the default font-size provided by the browser **(usually 16px)**


___

## findIndex()

The findIndex() method **returns the index of the first element in the array that satisfies the provided testing function.**

Otherwise, it returns -1, indicating that no element passed the test.
___

## flex-grow & flex-shrink
___

## forEach()

-- method that executes a provided function once for each array element.
___

## math.floor()

The Math.floor() function returns the largest integer less than or equal to a given number.


___

## on() method

JQUERY
similar to `addEventListener`

`.on( events [, selector ] [, data ], handler )`
returns: JQUERY

Attach an event handler function for one or more events to the selected elements.

`addEventListener()` is a method of a normal DOM element 
`on()` is a jQuery object method
    a jQuery object can represent more than one element and when you use the `on()` method you are attaching and event handler to every element in the collection

[on() method documentation](https://api.jquery.com/on/)

'on' method registers a handler, which is callback function with specific signature.
Once an event is triggered, a handler is called.
It receives necessary data as function parameters (commonly event object).

jQuery and Node event emitter aren't related in any way, they both have on method because it's a conventional way for a method that adds event handlers.

A naive implementation that shows how it works:

```js
const emitter = {
  handlers: {},

  on(eventName, handler) {
    if (!this.handlers[eventName])
      this.handlers[eventName] = [];

    this.handlers[eventName].push(handler);
  },

  emit(eventName, data) {
    for (const handler of this.handlers[eventName])
      handler(data);
  }
};

emitter.on('foo', data => console.log(data.text));

emitter.emit('foo', { text: 'Foo event triggered' });
```

- As of jQuery version 1.7, the on() method is the new replacement for the bind(), live() and delegate() methods. This method brings a lot of consistency to the API, and we recommend that you use this method, as it simplifies the jQuery code base.

- to remove event handlers, use the off() method.

- to attach an event that only runs once and then removes itself, use the one() method.

___

## observable

ANGULAR

**Using observables to pass values:**

Observables provide support for passing messages between parts of your application. They are used frequently in Angular and are a technique for event handling, asynchronous programming, and handling multiple values.


[Angular](https://angular.io/guide/observables)

___

## publish()

* deprecated *

Returns a `ConnectableObservable`, which is a variety of Observable that waits until its connect method is called before it begins emitting items to those Observers that have subscribed to it.
___

## RANDOMIZER

The number 16,777,215 is the total possible combinations of RGB(255,255,255) which is 32 bit colour.

  ffffff = 16,777,215
  16 (hexadecimal)

  ``js

  // varijanta 1
  function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  //varijanta 2
  function randomColor() {
    return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
  }
  ``

[Random Hex Color Code Generator in JavaScript](https://www.paulirish.com/2009/random-hex-color-code-snippets/)

___

## return

-- statement that ends function execution and specifies a value to be returned to the function caller

___

## RxJS

**Reactive Extension for Javascript**

It is a JS library that uses observables to work with reactive programming that deals with asynchronous data calls, callbacks and event-based programs.
RxJS can be used with other Javascript libraries and frameworks. It integrates well into Angular.

React belongs to "Javascript UI Libraries" category of the tech stack, while **RxJS can be primarily classified under "Concurrency Frameworks"**. React and RxJS are both open source tools.

The **concurrency** utilities packages provide a powerful, extensible framework of high-performance threading utilities such as thread pools and blocking queues. This package frees the programmer from the need to craft these utilities by hand, in much the same manner the collections framework did for data structures.
___

## splice()

The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
___

## subscribe()

ANGULAR

The .subscribe() function is similar to the Promise.then(), .catch() and .finally() methods in jQuery, but instead of dealing with promises it deals with Observables.

That means it will subscribe itself to the observable of interest (which is getTasks() in your case) and wait until it is successful and then execute the first passed callback function which in your case is:

  ```
  tasks => {
      console.log(tasks);
  }
  ``` 

If you want it to run some logic on error (similar to .catch()) or on complete (similar to.finally()) you can pass that logic to the subscribe as following:

  ```
  observable.subscribe(
    value => somethingToDoOnlyOnSuccess(value),
    error => somethingToDoOnlyOnError(error),
    () => somethingToDoAlways()
  );
  ```


**Subscriber function**
This is the function that is executed when a consumer calls the subscribe() method.
The subscriber function defines how to obtain or generate values or messages to be published.

___

