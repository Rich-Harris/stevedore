# stevedore

Display a loading animation in the terminal:

```bash
[ ===] loading...
[====] loading...
[=== ] loading...
[==  ] loading...
```


## Installation

```bash
npm i stevedore
```


## Usage

```js
var stevedore = require( 'stevedore' );
var loader = stevedore();

// later...
loader.stop();
```

## Options

You can pass in options like so:

```js
var loader = stevedore({
	message: 'loading...',       // text to display after the animation frame
	interval: 200                // interval between frames
	frames: '-\\|/'.split( '' )  // an array of frames
});
```

You can adjust these options on the fly:

```js
var loader = stevedore({
	message: 'initialising...',
	interval: 200
});

// later...
loader.message( 'reticulating splines...' ).interval( 100 );
```

By default, the loader will update every 100 milliseconds. You can manually instruct it to tick instead:

```js
stream.on( 'data', loader.tick );
```

This will prevent the loader from automatically ticking in future.



## License

MIT
