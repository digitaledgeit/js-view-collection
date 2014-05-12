/**
 * View collection
 * @constructor
 */
module.exports = require('view').create({

	/**
	 * Initialises the view
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
	 * Gets the number of views
	 * @returns {integer}
	 */
	count: function() {
		return this.views.length;
	},

	/**
	 * Gets whether the collection contains a view
	 * @returns {boolean}
	 */
	contains: function(view) {
		return this.views.indexOf(view) !== -1;
	},

	/**
	 * Returns the view at the index
	 * @param   {int} index
	 * @returns {View}
	 */
	at: function(index) {
		return this.views[index];
	},
	
	/**
	 * Gets the first view
	 * @returns {View}
	 */
	first: function() {
		return this.views[0];
	},

	/**
	 * Gets the last view
	 * @returns {View}
	 */
	last: function() {
		return this.views[this.views.length-1];
	},

	/**
	 * Prepends the view to the collection
	 * @param   {View} view
	 * @returns {ViewCollection}
	 */
	prepend: function(view) {

		//set the parent view
		view.parent = this;

		//append the view to the array
		this.views.unshift(view);

		//append the view to the element
		if (this.el.parentNode !== view.el) {
			this.el.prependChild(view.el);
		}

		return this;
	},

	/**
	 * Appends the view to the collection
	 * @param   {View} view
	 * @returns {ViewCollection}
	 */
	append: function(view) {

		//set the parent view
		view.parent = this;

		//append the view to the array
		this.views.push(view);

		//append the view to the element
		if (this.el.parentNode !== view.el) {
			this.el.appendChild(view.el);
		}

		return this;
	},

	/**
	 * Removes the view from the collection
	 * @param   {View} view
	 * @returns {ViewCollection}
	 */
	remove: function(view) {

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
	 * Iterates the collection passing each view to the callback
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

