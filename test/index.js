var assert = require('assert');

var View;
try {
	View = require('view');
} catch (e) {
	View = require('digitaledgeit~js-view');
}

var ViewCollection;
try {
	ViewCollection = require('..');
} catch (e) {
	ViewCollection = require('view-collection');
}

describe('ViewCollection', function() {

	it('should forward an event', function(done) {

		var view = new View();
		var collection = new ViewCollection();

		collection.on('view:test', function() {
			assert.equal(arguments[0], view);
			done();
		});
		collection.append(view);

		view.emit('test');

	});

});