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

## math.floor()

The Math.floor() function returns the largest integer less than or equal to a given number.


___

# CALLBACKS
___

## get random color function

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

`createTextNode()`

___

{ } braces after const
___

`className`

___

`createMemberElement`

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

## subscribe() method

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

## observable

ANGULAR

**Using observables to pass values:**

Observables provide support for passing messages between parts of your application. They are used frequently in Angular and are a technique for event handling, asynchronous programming, and handling multiple values.


[Angular](https://angular.io/guide/observables)


___

