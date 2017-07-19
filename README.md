# Hermes, the notifier

![Hermes notifier header](https://github.com/NascHQ/hermes-notifier/raw/master/css/header.png?raw=true)

Hermes is a notification message manager.  
It deals with your messages in your page's interface.  
It manages **multiple messages** at a time.  
It's cleaner, ligher.  
It allows you to use _react components_ within the message, making it a powerfull tool.

It can be used to replace other messagers. Has a lighter, malleable design and animations.  
You can even manage messages by id or simulate a loading controller.

Take a look.

![Messages example](https://github.com/NascHQ/reactive-hermes/raw/master/css/6.gif)

See **how** to do this in the [examples below](#examples).  
Test it **live**, in the [demo tool](https://naschq.github.io/reactive-hermes/demo/dist/index.html).

## Installing

```
npm install --save reactive-hermes
```

## Using it

You need to import and add the `HermesComponent` to your interface.  
You should do that **once**, let's say, in your root page for example.

```js
import { HermesComponent } from 'reactive-hermes'

[...]

<HermesComponent />
```

Now, you can access the global `Hermes` object, or import it in your modules and then use its API, described below.

## API

Let's see some of the cool things you can do with it!

### Props

You can send some props to enforce a default behavior:

- defaultDuration: An integer representing the duration of the message in seconds. By default, it will not close itself.
- updateTitleCounter: Boolean. If present, will update the page's title adding the number of open notifications. Like `(2) Page Title`.
- playAudio: Boolean/AudioObject. You can simply use the `playAudio` attribute in the tag to use a default audio or pass a value to it with an Audio Object (to customize the audio).
- animate: Animates all the message icons, except for messages that overwrite it.

```js
<HermesComponent
  defaultDuration={999}
  updateTitleCounter
  playAudio={new Audio(...)}
  animate />
```

### Methods

These are methods you can acces at `Hermes`:

- _Hermes.message(String)_  
This is an easy way to show a message.

- _Hermes.message(Object)_  
This is the advanced way to show messages.  
It accepts an object with:

  - **type**: It may be `default`, `warn/warning`, `error/fail`, `info` or `success`
  - **body**: This is the message itself. It may be a _ReactComponent_ or a _String_
  - **[id]**: An optional id for the message
  - **[playAudio]**: Overwrites the global `playAudio` attribute for this particular message. May be `true/false` or an _AudioObject_
  - **[duration]**: The duration in _seconds_ for the message to close itself. This will overwrite the _defaultDuration_ global attribute.
  - **[locked]**: Hides the "x" button to close the message. Requires an `id`. May only be closed programatically
  - **[animate]**: Enabled the animation for the message icon

- _Hermes.updateMessage(Object)_  
Allows you to update an existing message. If the message is not opened, it will be shown.  
The object **must** have an `id` for the message to be updated.

- _Hermes.closeMessage(String/Number)_  
Closes an open message with the given `id`

### Aliases

Aliases work just like the methods, but using different default values.

- _Hermes.info(message[, options])_  
Equivalent to use `Hermes.message` passing type 'info'.
- _Hermes.warn(message[, options])_ OR _Hermes.warning(message[, options])_  
Equivalent to use `Hermes.message` passing type 'warn'.
- _Hermes.error(message[, options])_ OR _Hermes.fail(message[, options])_  
Equivalent to use `Hermes.message` passing type 'error'.
- _Hermes.success(message[, options])_  
Equivalent to use `Hermes.message` passing type 'success'.

## Compatibility

Are you using methods like `showWarning` and `showSuccess`?  
No problem, you can just import them from `Hermes` too!

```
import { showerror, showSuccess } from 'reactive-hermes'
```

## Examples

See some ways you can show messages

#### Showing a warning:
```js
let message = 'You have been warned!';
Hermes.warn(message);
// show the warning, animating its icon
Hermes.warn(message, { animate: true });
Hermes.message({
  type: 'warn',
  body: message
})
```
Result:  
![Messages example](https://github.com/NascHQ/reactive-hermes/raw/master/css/2.gif)

#### Showing an error:
```js
let message = 'Something is out of order';
Hermes.fail(message);
Hermes.error(message);
Hermes.error(message, { /* options */ });
Hermes.message({
  type: 'error',
  body: message
})
```
Result:  
![Messages example](https://github.com/NascHQ/reactive-hermes/raw/master/css/3.gif)

#### Showing an info:
```js
let message = 'Info messages, wohoo!!';
Hermes.info(message);
// show info and play audio
Hermes.info(message, { playAudio: true });
Hermes.message({
  type: 'info',
  body: message
})
```
Result:  
![Messages example](https://github.com/NascHQ/reactive-hermes/raw/master/css/4.gif)

#### Showing a locked message:
```js
let message = 'Yet another useless message';
Hermes.message({
  body: message,
  id: 'myMessageId',
  locked: true
})
```
Result:  
![Messages example](https://github.com/NascHQ/reactive-hermes/raw/master/css/5.gif)

#### Updating a message programatically:
```js
let message = 'Saving...';
Hermes.message({
  body: message,
  id: 'savingMsg',
  locked: true,
  animate: true
})
```
Then, some time later...
```js
Hermes.updateMessage({
  body: 'Saved',
  id: 'savingMsg',
  locked: true,
  animate: false,
  duration: 3 // 3 seconds
})
```

Result:  
![Messages example](https://github.com/NascHQ/reactive-hermes/raw/master/css/7.gif)

#### Showing message containing a _ReactComponent_:
```js
Hermes.message(<div>Content here :)</div>)
// or
Hermes.message({
  // ...
  body: <SomeComponent prop1={val} />
  // ...
})
```
Result:  
![Messages example](https://github.com/NascHQ/reactive-hermes/raw/master/css/8.gif)

## Customizing styles

You can add changes to the following CSS selectors:

- **#hermes-container:** The container in which all the messages will be appended to
- **.hermes-notif:** Each of the notifications
- **.hermes-remove-message:** The `x` button in unlocked messages, to close them
- **.hermes-error/.hermes-warn/.hermes-info/.hermes-default:** Same as _.hermes-notif_, but selected by message type

## Contributing

Feel free to contribute to this project by sending _Pull Requests_, reporting problems or even sending suggestions.  
Just remember to follow the community terms/rules/good practices :)

#### How to contribute

Once you've cloned the project...  

Install:  
```npm install```

Start the server (this will also enable the live/hot reload for the component):  
```npm start```

Make chages:  
Work in the `src/` files, or in the `demos/src/` files, or in `css/` files.

Build:  
```npm run build```

Then push it and open a PR :)

