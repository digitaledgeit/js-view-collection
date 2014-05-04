/**
 * View collection
 * @constructor
 */
var ViewCollection = require('view').create({

	/**
	 * Initialises the view
	 * @param {options} options
	 */
	init: function() {
		this.views = [];
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
	 * Gets whether the collection contains a view
	 * @returns {boolean}
	 */
	contains: function(view) {
		return this.views.indexOf(view) !== -1;
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
		this.el.prependChild(view.el);

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
		this.el.appendChild(view.el);

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
	}

});

module.exports = ViewCollection;