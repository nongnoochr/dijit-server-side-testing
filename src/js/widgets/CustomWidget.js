define([
	"dojo/_base/declare",
	"dijit/_WidgetBase",
	"dijit/_OnDijitClickMixin",
	"dijit/_TemplatedMixin",
	"dojo/text!./templates/CustomWidget.html"
],function(declare, _WidgetBase, _OnDijitClickMixin, _TemplatedMixin, template){

	return declare([_WidgetBase, _OnDijitClickMixin, _TemplatedMixin], {
		//	set our template
		templateString: template,

		//	some properties
		baseClass: "someWidget",
		title: 'Button Widget',	//	we'll set this from the widget def

		//	hidden counter
		_counter: 0,

		constructor: function(opt) {
			if (opt) {
				this.title = opt.title ? opt.title : this.title;
			}
			
		},

		//	define an onClick handler
		_onClick: function(){

			// Increment the internal counter
			++this._counter;

			var titleText = this._getTextOnClick();
			this.titleNode.innerHTML = titleText;

		},

		postCreate: function(){
			this.titleNode.innerHTML = this.title;
		},

		_getTextOnClick: function() {

			var outText = '';

			if(this._counter > 1){
				outText = this.title + " was clicked " + this._counter + " times.";
			} else {
				outText= this.title + " was clicked!";
			}

			return outText;

		}
	});
});