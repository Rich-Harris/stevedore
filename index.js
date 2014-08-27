module.exports = function ( options ) {

	var loader, message, frames, interval, timeout, i = 0, tick, update;

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

	tick = function () {
		var frame = frames[ i++ % frames.length ];

		process.stdout.clearLine();
		process.stdout.cursorTo( 0 );
		process.stdout.write( frame + ' ' + message );
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
			process.stdout.clearLine();
			process.stdout.cursorTo( 0 );
			clearTimeout( timeout );
		}
	};

	return loader;
};
