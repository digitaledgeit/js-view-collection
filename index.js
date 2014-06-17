var View = require('view');

/**
 * View collection
 * @constructor
 */
module.exports = View.extend({

	/**
	 * Initialise the view
	 * @param {object} 				options 		The view options
	 * @param {HTMLElement|object} 	options.el 		The view element
	 * @param {options} 			options.views 	The view collection
	 */
	init: function(options) {
		this.views = [];

		if (options && options.views) {
			for (var i=0; i<options.views.length; ++i) {
				this.append(options.views[i]);
			}
		}

	},

	/**
	 * Get the number of views
	 * @returns {integer}
	 */
	count: function() {
		return this.views.length;
	},

	/**
	 * Get whether the collection contains a view
	 * @returns {boolean}
	 */
	contains: function(view) {
		return this.views.indexOf(view) !== -1;
	},

	/**
	 * Return the view at the index
	 * @param   {int} index
	 * @returns {View}
	 */
	at: function(index) {
		return this.views[index];
	},
	
	/**
	 * Get the first view
	 * @returns {View}
	 */
	first: function() {
		return this.views[0];
	},

	/**
	 * Get the last view
	 * @returns {View}
	 */
	last: function() {
		return this.views[this.views.length-1];
	},

	/**
	 * Find the index of a view
	 * @param   {View} view
	 * @returns {int}
	 */
	indexOf: function(view) {

		if (!view instanceof View) {
			throw new Error('Parameter is not a view')
		}

		return this.views.indexOf(view);
	},

	/**
	 * Prepend the view to the collection
	 * @param   {View} view
	 * @returns {ViewCollection}
	 */
	prepend: function(view) {

		if (!view instanceof View) {
			throw new Error('Parameter is not a view')
		}

		//set the parent view
		view.parent = this;

		//append the view to the array
		this.views.unshift(view);

		//append the view to the element
		if (this.el.parentNode !== view.el) {
			this.el.prependChild(view.el);
		}

		//proxy events
		var self = this;
		var emit = view.emit;
		view.emit = function(type) {

			//emit the event on the view
			emit.apply(view, arguments);

			//convert the args to an array and add the view as the first argument
			var args = Array.prototype.slice.call(arguments);
			args.shift();
			args.unshift('proxied:'+type, view);

			//emit the event on the collection
			return self.emit.apply(self, args);
		};

		return this;
	},

	/**
	 * Append the view to the collection
	 * @param   {View} view
	 * @returns {ViewCollection}
	 */
	append: function(view) {

		if (!view instanceof View) {
			throw new Error('Parameter is not a view')
		}

		//set the parent view
		view.parent = this;

		//append the view to the array
		this.views.push(view);

		//append the view to the element
		if (this.el.parentNode !== view.el) {
			this.el.appendChild(view.el);
		}

		//proxy events
		var self = this;
		var emit = view.emit;
		view.emit = function(type) {

			//emit the event on the view
			emit.apply(view, arguments);

			//convert the args to an array and add the view as the first argument
			var args = Array.prototype.slice.call(arguments);
			args.shift();
			args.unshift('proxied:'+type, view);

			//emit the event on the collection
			return self.emit.apply(self, args);
		};

		return this;
	},

	/**
	 * Remove the view from the collection
	 * @param   {View} view
	 * @returns {ViewCollection}
	 */
	remove: function(view) {

		if (!view instanceof View) {
			throw new Error('Parameter is not a view')
		}

		//find the view
		var index = this.views.indexOf(view);

		//if the view is contained in the collection then remove it
		if (index !== -1) {

			//remove the view from the array
			this.views.splice(index, 1);

			//remove the view from the element
			this.el.removeChild(view.el);

		}

		return this;
	},

	/**
	 * Removes all the views from the collection
	 * @returns {ViewCollection}
	 */
	removeAll: function() {
		while (this.views.length > 0) {
			this.remove(this.views[0]);
		}
		return this;
	},

	/**
	 * Iterate the collection passing each view to the callback
	 * @param   {function} callback
	 * @returns {ViewCollection}
	 */
	each: function(callback) {
		for (var i=0; i<this.views.length; ++i) {
			callback.call(this, this.views[i], i);
		}
		return this;
	}

});