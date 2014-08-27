module.exports = function ( options ) {

	var loader, message, frames, interval, timeout, i = 0, tick, update, stream, tty, CARRIAGE_RETURN;

	options = options || {};

	message = options.message || '';
	frames = options.frames || [
		'[    ]',
		'[   =]',
		'[  ==]',
		'[ ===]',
		'[====]',
		'[=== ]',
		'[==  ]',
		'[=   ]'
	];
	interval = options.interval || 100;

	stream = process.stderr;
	tty = stream.isTTY;

	// thanks, https://github.com/isaacs/char-spinner/blob/master/spin.js
	CARRIAGE_RETURN = stream.isTTY ? '\u001b[0G' : '\u000d';

	tick = function () {
		var frame = frames[ i++ % frames.length ];
		stream.write( frame + ' ' + message + CARRIAGE_RETURN );
	};

	update = function () {
		tick();

		if ( interval ) {
			timeout = setTimeout( update, interval );
		}
	};

	update();

	loader = {
		tick: function () {
			interval = null;
			tick();
		},

		message: function ( _ ) {
			message = _;
			return loader;
		},

		frames: function ( _ ) {
			frames = _;
			return loader;
		},

		interval: function ( _ ) {
			interval = _;
			return loader;
		},

		stop: function () {
			clearTimeout( timeout );
		}
	};

	return loader;
};
