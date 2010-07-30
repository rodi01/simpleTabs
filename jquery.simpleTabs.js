/* --
http://github.com/oncemade/simpleTabs
Simple Tabs for jQuery.
Written by Rodrigo Soares (oncemade{at}gmail.com) Jul 2010.
jQuery Plugin Framework by Keith Wood (http://keith-wood.name/pluginFramework.html)

Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and
MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses.
Please attribute the author if you use it.
-- */

;(function($) {
var PROP_NAME = 'simpleTabs',
	getters = ['settings'];

function SimpleTabs() {
	this._defaults = {
		selectedClass: 'selected',
		beforeLoad: function(element){},
		afterLoad: function(element){}
	};
}

$.fn.simpleTabs = function(options) {
	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if ($.inArray(options, getters) > -1) { 
		return $.simpleTabs['_' + options + 'SimpleTabs']. 
		apply($.simpleTabs, [this[0]].concat(otherArgs)); 
	} 
	return this.each(function() { 
		if (typeof options == 'string') { 
			$.simpleTabs['_' + options + 'SimpleTabs']. 
			apply($.simpleTabs, [this].concat(otherArgs)); 
		} 
		else { 
			$.simpleTabs._attachSimpleTabs(this, options || {});
		} 
	});
};

$.extend(SimpleTabs.prototype, {
	setDefaults: function(settings) {
		$.extend(this._defaults, settings || {});
		return this;
	},
	_attachSimpleTabs: function(target, settings){
		target = $(target);
		var inst = {settings: $.extend({}, this._defaults)};
		inst.settings.tabContentWrapper = target.parent();
		$.data(target[0], PROP_NAME, inst);
		this._changeSimpleTabs(target, settings);
		this._simpleTabs(target, settings);
	},

	_changeSimpleTabs: function(target, settings, value) {
		target = $(target);
		settings = settings || {}; 
		if (typeof settings == 'string') { 
			var name = settings; 
			settings = {};
			settings[name] = value;
		} 
		var inst = target.data(PROP_NAME);
		$.extend(inst.settings, settings);
		this._simpleTabs(target); 
	},

	_simpleTabs: function(target, settings){
		var inst = target.data(PROP_NAME),
			tabs = target.find('a');
		
		tabs.live('click',function(e) {
			var that = $(this),
				whereTo = that.attr('href');
			//fire callback before switiching tab
			inst.settings.beforeLoad(that);
			tabs.parent().removeClass(inst.settings.selectedClass);
			$('.tabContent', inst.settings.tabContentWrapper).removeClass(inst.settings.selectedClass);
			that.parent().addClass(inst.settings.selectedClass);
			$(whereTo).addClass(inst.settings.selectedClass);
			//fire callback after switiching tab
			inst.settings.beforeLoad(that);
			return false;
		});
	},
	
	_destroySimpleTabs: function (target) {
		target = $(target);
		var tabs = target.find('a');
		target.removeData(PROP_NAME);
		tabs.die();
	},

	_settingsSimpleTabs: function(target) {
		var inst = $.data(target, PROP_NAME);
		return inst.settings;
	}
});

$.simpleTabs = new SimpleTabs();

})(jQuery);