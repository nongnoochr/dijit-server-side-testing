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
		title: 'Widget Title',	//	we'll set this from the widget def

		//	hidden counter
		_counter: 1,
		_firstClicked: false,

		constructor: function(opt) {
			if (opt) {
				this.title = opt.title ? opt.title : this.title;
			}
			
		},

		//	define an onClick handler
		_onClick: function(){
			if(this._firstClicked){
				this.titleNode.innerHTML = this.title + " was clicked " + (++this._counter) + " times.";
			} else {
				this.titleNode.innerHTML = this.title + " was clicked!";
				this._firstClicked = true;
			}
		},

		postCreate: function(){
			this.titleNode.innerHTML = this.title;
		}
	});
});