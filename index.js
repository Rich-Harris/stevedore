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

	if ( process.env.CI === 'true' ) {
		// make this a no-op in CI environments
		tick = function () {}
	} else {
		tick = function () {
			var frame = frames[ i++ % frames.length ];
			process.stderr.write( '\u001b[s' + frame + ' ' + message + '\u001b[u\u001b[0G' );
		};
	}

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
