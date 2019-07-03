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

	__webpack_require__(1468);
	module.exports = __webpack_require__(1468);


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }),

/***/ 19:
/***/ (function(module, exports) {

	module.exports = require("../kendo.core");

/***/ }),

/***/ 1468:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(f, define){
	  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(19)], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function(){

	(function($, undefined) {
	    var kendo = window.kendo,
	        extend = $.extend,
	        Class = kendo.Class,
	        EXTENSIONS = {
	            svg: ".svg",
	            png: ".png"
	        };

	    var ErrorDialog = Class.extend({
	        init: function (options) {
	            this.options = extend(options, {
	                actions: [{
	                    text: options.messages.dialogs.okText
	                }]
	            });
	            this._dialog = $("<div />")
	                    .kendoDialog(this.options)
	                    .getKendoDialog();
	        },
	        open: function () {
	            this._dialog.center().open();
	        }
	    });

	    var ExportAsDialog = Class.extend({
	        init: function (options) {
	            this.options = extend(options, this.options, {
	                fileFormats: [{
	                    description: options.messages.dialogs.exportAsDialog.png,
	                    extension: EXTENSIONS.png
	                }, {
	                    description: options.messages.dialogs.exportAsDialog.svg,
	                    extension: EXTENSIONS.svg
	                }],
	                title: options.messages.dialogs.exportAsDialog.title,
	                open: function() {
	                    this.center();
	                }
	            });
	            this._initializeDialog();
	            return this;
	        },
	        options: {
	            extension: EXTENSIONS.png,
	            autoFocus: true,
	            resizable: false,
	            modal: {
	                preventScroll: true
	            },
	            width: "90%",
	            maxWidth: 520,
	            template:
	                "<div class='k-edit-label'><label>#: messages.exportAsDialog.labels.fileName #:</label></div>" +
	                "<div class='k-edit-field'>" +
	                    "<input class='k-textbox' data-bind='value: name' />" +
	                "</div>" +
	                "<div>" +
	                    "<div class='k-edit-label'><label>#: messages.exportAsDialog.labels.saveAsType #:</label></div>" +
	                    "<div class='k-edit-field'>" +
	                    "<select data-role='dropdownlist' class='k-file-format' " +
	                        "data-text-field='description' " +
	                        "data-value-field='extension' " +
	                        "data-bind='value: extension, source: fileFormats' />" +
	                    "</div>" +
	                "</div>" +
	                "<div class='k-edit-label'><label>#: messages.exportAsDialog.labels.page #:</label></div>" +
	                "<div class='k-edit-field'>" +
	                    "<input data-role='numerictextbox' data-format='n0' data-min='1' data-max='#: total #' data-bind='value: page' />" +
	                "</div>" +
	                "<div class='k-action-buttons'>" +
	                    "<button class='k-button k-primary' data-bind='click: apply'>#: messages.save #</button>" +
	                    "<button class='k-button' data-bind='click: close'>#: messages.cancel #</button>" +
	                "</div>"
	        },
	        _updateModel: function (options) {
	            if (options.pagesCount) {
	                this.viewModel.set("pagesCount", options.pagesCount);
	            }
	            if (options.page) {
	                this.viewModel.set("page", options.page);
	            }
	        },
	        _initializeDialog: function () {
	            var that = this;
	            var options = that.options;
	            var dialogMessages = options.messages.dialogs;
	            var dialog = $("<div class='k-pdf-viewer-window k-action-window k-popup-edit-form' />")
	                    .append(kendo.template(options.template)({
	                        total: options.pagesCount,
	                        messages: dialogMessages
	                    }))
	                    .kendoWindow(options)
	                    .getKendoWindow();

	            that.viewModel = kendo.observable({
	                title: dialogMessages.exportAsDialog.title,
	                name: dialogMessages.exportAsDialog.defaultFileName,
	                extension: options.extension,
	                fileFormats: options.fileFormats,
	                pagesCount: options.pagesCount,
	                page: 1,
	                apply: that.apply.bind(this),
	                close: function () {
	                    dialog.close();
	                }
	            });

	            that._dialog = dialog;

	            kendo.bind(dialog.element, that.viewModel);
	            return dialog;
	        },
	        open: function() {
	            this._dialog.center().open();
	        },
	        apply: function() {
	            this._dialog.close();
	            this.options.apply({
	                fileName: this.viewModel.name + this.viewModel.extension,
	                extension: this.viewModel.extension,
	                page: this.viewModel.page
	            });
	        }
	    });

	    extend(kendo.pdfviewer, {
	        dialogs: {
	            ErrorDialog: ErrorDialog,
	            ExportAsDialog: ExportAsDialog
	        }
	    });
	})(window.kendo.jQuery);

	return window.kendo;
	}, __webpack_require__(3));

/***/ })

/******/ });