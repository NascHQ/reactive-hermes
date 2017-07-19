# Hermes, the notifier

![Hermes notifier header](https://github.com/NascHQ/hermes-notifier/blob/master/css/header.png?raw=true)

Hermes is a notification message manager.  
It deals with your messages in your page's interface.

It can be used to replace other messagers. Has a lighter, malleable design and animations.  
You can even manage messages by id, simulate a loading controller or show an entire _react component_ in it.

Take a look.

## Installing

```
**TODO**
```

## Using it

You need to import and add the `HermesComponent` to your interface.  
You should do that **once**, let's say, in your root page for example.

```js
import { HermesComponent } from 'hermes'

[...]

<HermesComponent />
```

Now, you can access the global `Hermes` object, or import it in your modules and then use its API, described below.

## API

Let's see some of the cool things you can do with it!

### Props

You can send some props to enforce a default behavior:

- defaultDuration: An integer representing the duration of the message in seconds. By default, it will not close itself.
- updateTitleCounter: Boolean. If present, will update the page's title adding the number of open notifications.
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
import { showerror, showSuccess } from 'hermes'
```

