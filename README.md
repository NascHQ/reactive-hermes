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

<HermesComponent [defaultDuration={999}] [updateTitleCounter] />
```

Now, you can access the global `Hermes` object, or import it in your modules and then use its API, described below.

## API

Let's see some of the cool things you can do with it!

### Props

You can send some props to enforce a default behavior:

- defaultDuration: An integer representing the duration of the message in seconds. By default, it will not close itself.
- updateTitleCounter: Boolean. If present, will update the page's title adding the number of open notifications.

### Methods

These are methods you can acces at `Hermes`:

**TODO**

## Compatibility

Are you using methods like `showWarning` and `showSuccess`?  
No problem, you can just import them from `Hermes` too!

```
import { showerror, showSuccess } from 'hermes'
```

