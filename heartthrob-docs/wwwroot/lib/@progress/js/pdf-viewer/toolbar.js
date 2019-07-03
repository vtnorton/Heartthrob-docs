module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1476);
	module.exports = __webpack_require__(1476);


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }),

/***/ 19:
/***/ (function(module, exports) {

	module.exports = require("../kendo.core");

/***/ }),

/***/ 1476:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(f, define){
	  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(19), __webpack_require__(1477), __webpack_require__(1478)], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function(){

	(function($, undefined) {
	    var kendo = window.kendo,
	        extend = $.extend,
	        proxy = $.proxy,
	        ACTION = "action",
	        FLATBUTTONCLASS = "k-flat",
	        KEYDOWN = "keydown",
	        Item = kendo.toolbar.Item,
	        ToolBar = kendo.ui.ToolBar;

	    var DefaultTools = {
	        pager: { type: "pager", overflow: "never", command: "PageChangeCommand" },
	        spacer: { type: "spacer" },
	        open: { type: "button", text: "Open", showText: "overflow", name: "open", icon: "folder-open", command: "OpenCommand" },
	        download: { type: "button", text: "Download", showText: "overflow", name: "download", icon: "download", command: "DownloadCommand" }
	    };

	    var AllTools = extend({}, DefaultTools, {
	        exportAs: { type: "button", text: "Export", showText: "overflow", name: "exportAs", icon: "image-export", command: "ExportCommand" }
	    });

	    var ToolbarPager = Item.extend({
	        init: function(options, toolbar) {
	            var pagerElement = $("<div />");

	            this.options = extend(true, options, toolbar.options.pager);

	            this.toolbar = toolbar;

	            this.toolbar.pager = new kendo.pdfviewer.Pager(pagerElement, extend({}, options, {
	                change: proxy(this._change, this)
	            }));

	            this.element = pagerElement;
	            this.element.on(KEYDOWN, proxy(this._keydown, this));

	            this.attributes();
	            this.addUidAttr();
	            this.addOverflowAttr();
	        },
	        _change: function (e) {
	            if (this.options.change && this.options.change(e.page))
	            {
	                return;
	            }

	            this.toolbar.action({
	                command: "PageChangeCommand",
	                options: {
	                    value: e.page
	                }
	            });
	        },
	        _keydown: function (e) {
	            var that = this,
	                target = $(e.target),
	                keyCode = e.keyCode,
	                children = that.element.find(":kendoFocusable"),
	                targetIndex = children.index(target),
	                direction = e.shiftKey ? -1 : 1;

	            if (keyCode === kendo.keys.TAB && children[targetIndex + direction])
	            {
	                children[targetIndex + direction].focus();
	                e.preventDefault();
	                e.stopPropagation();
	            }
	        }
	    });

	    kendo.toolbar.registerComponent("pager", ToolbarPager);

	    var ViewerToolBar = ToolBar.extend({
	        init: function(element, options) {
	            var that = this;
	            var items = options.items && options.items.length ? options.items : Object.keys(DefaultTools);

	            that.options = options;

	            options.items = that._updateItems(items);
	            ToolBar.fn.init.call(that, element, options);

	            that.bind({
	                click: that._click
	            });
	        },
	        events: [
	            ACTION
	        ],
	        _updateItems: function (items) {
	            var messages = this.options.messages;

	            return items.map(function (tool) {
	                var toolOptions = $.isPlainObject(tool) ? tool : AllTools[tool];
	                var options;
	                var toolName =  toolOptions.name;

	                if (toolOptions.type != "pager") {
	                    options = {
	                        name: toolName,
	                        attributes: {
	                            "aria-label": messages[toolName],
	                            "title": messages[toolName],
	                            "data-command": toolOptions.command,
	                            "class": FLATBUTTONCLASS
	                        },
	                        overflow: toolOptions.overflow
	                    };
	                } else {
	                    options = {
	                        overflow: "never"
	                    };
	                }

	                kendo.deepExtend(toolOptions, options);
	                return toolOptions;
	            });
	        },
	        _click: function (e)
	        {
	            var command = $(e.target).data("command");

	            if (!command) {
	                return;
	            }

	            this.action({
	                command: command,
	                options: e.options
	            });
	        },
	        action: function (args)
	        {
	            this.trigger(ACTION, args);
	        },
	        destroy: function () {
	            if (this.pager) {
	                this.pager.destroy();
	            }
	            ToolBar.fn.destroy.call(this);
	        }
	    });


	    extend(kendo.pdfviewer, {
	        Toolbar: ViewerToolBar,
	        DefaultTools: DefaultTools
	    });
	})(window.kendo.jQuery);

	return window.kendo;
	}, __webpack_require__(3));

/***/ }),

/***/ 1477:
/***/ (function(module, exports) {

	module.exports = require("../kendo.toolbar");

/***/ }),

/***/ 1478:
/***/ (function(module, exports) {

	module.exports = require("./pager");

/***/ })

/******/ });