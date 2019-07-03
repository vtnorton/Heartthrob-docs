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

	__webpack_require__(1467);
	module.exports = __webpack_require__(1467);


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }),

/***/ 19:
/***/ (function(module, exports) {

	module.exports = require("../kendo.core");

/***/ }),

/***/ 1467:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(f, define){
	  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(19)], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function(){

	(function($, undefined) {
	    var kendo = window.kendo,
	        proxy = $.proxy,
	        extend = $.extend,
	        parseJSON = $.parseJSON,
	        progress = kendo.ui.progress,
	        Class = kendo.Class,
	        OPEN = "open";

	    var Command = Class.extend({
	        init: function(options) {
	            this.options = options;
	            this.viewer = options.viewer;
	            this.errorMessages = this.viewer.options.messages.errorMessages;
	        }
	    });

	    var OpenCommand = Command.extend({
	        init: function(options) {
	            Command.fn.init.call(this, options);
	            this.upload = this.viewer.processor.upload;
	        },
	        exec: function () {
	            (this.viewer._upload || this._initUpload()).element.click();
	        },
	        _initUpload: function () {
	            var uploadOptions = {
	                select: proxy(this._onSelect, this),
	                success: proxy(this._onSuccess, this),
	                error: proxy(this._onError, this),
	                complete: proxy(this._onComplete, this),
	                showFileList: false,
	                multiple: false,
	                validation: {
	                    allowedExtensions: [".pdf"]
	                }
	            };

	            if (this.upload) {
	                extend(uploadOptions, {
	                    async: {
	                        saveUrl:  this.upload.url,
	                        autoUpload: true,
	                        saveField: this.upload.saveField
	                    }
	                });
	            }

	            var upload = $('<input name="files" accept=".pdf" type="file" />').kendoUpload(uploadOptions).getKendoUpload();
	            this.viewer._upload = upload;

	            return upload;
	        },
	        _onComplete: function () {
	            progress(this.viewer.pageContainer, false);
	        },
	        _onSuccess: function(e) {
	            var json = parseJSON(e.response);

	            if ($.isPlainObject(json)) {
	                this.viewer.processor.fromJSON(json);
	            }
	            else {
	                this.viewer._triggerError({
	                    error: json,
	                    message: this.errorMessages.parseError
	                });
	            }
	        },
	        _onError: function(e) {
	            this.viewer._triggerError({
	                error: e.XMLHttpRequest.responseText,
	                message: this.errorMessages.notSupported
	            });
	        },
	        _onSelect: function (e) {
	            var that = this;
	            var fileToUpload = e.files[0];

	            progress(that.viewer.pageContainer, true);

	            if (that.viewer.trigger(OPEN, { file: fileToUpload }) || that.upload) {
	                return;
	            } else if (fileToUpload.extension.toLowerCase() !== ".pdf") {
	                that.viewer._triggerError({
	                    error: fileToUpload,
	                    message: that.errorMessages.notSupported
	                });
	                return;
	            }

	            var reader = new FileReader();
	            reader.onload = function(e) {
	                var document = e.target.result;
	                that.viewer.fromFile(document);
	            };
	            reader.onerror = function () {
	                that.viewer._triggerError({
	                    error: fileToUpload,
	                    message: that.errorMessages.parseError
	                });
	            };

	            reader.readAsArrayBuffer(fileToUpload.rawFile);
	        }
	    });

	    var PageChangeCommand = Command.extend({
	        exec: function () {
	            var pageNumber = this.options.value;

	            this.viewer.activatePage(pageNumber);
	        }
	    });

	    var DownloadCommand = Command.extend({
	        exec: function () {
	            if (!this.viewer.document) {
	                this.viewer._triggerError({
	                    message: this.errorMessages.notFound
	                });
	                return;
	            }

	            var fileName = (this.viewer.document.info && this.viewer.document.info.title) ||
	                            this.viewer.options.messages.defaultFileName;

	            this.viewer.processor.downloadFile(fileName);
	        }
	    });

	    var ExportCommand = Command.extend({
	        init: function(options) {
	            options = $.extend(options, this.options);
	            Command.fn.init.call(this, options);
	        },
	        exec: function() {
	            var dialog = (this.viewer._saveDialog || this._initDialog());

	            dialog._updateModel({
	                pagesCount: (this.viewer.document && this.viewer.document.total) || 1,
	                page: this.viewer.options.page
	            });

	            dialog.open();
	        },
	        apply: function (viewModel) {
	            var extension = viewModel.extension;

	            if (extension === ".png") {
	                this.viewer.exportImage(viewModel);
	            } else if (extension === ".svg") {
	                this.viewer.exportSVG(viewModel);
	            }
	        },
	        _initDialog: function () {
	            this.viewer._saveDialog = new kendo.pdfviewer.dialogs.ExportAsDialog({
	                apply: this.apply.bind(this),
	                pagesCount: (this.viewer.document && this.viewer.document.total) || 1,
	                messages: this.viewer.options.messages
	            });
	            return this.viewer._saveDialog;
	        }
	    });

	    extend(kendo.pdfviewer, {
	        OpenCommand: OpenCommand,
	        PageChangeCommand: PageChangeCommand,
	        DownloadCommand: DownloadCommand,
	        ExportCommand: ExportCommand
	    });

	})(window.kendo.jQuery);

	return window.kendo;

	}, __webpack_require__(3));

/***/ })

/******/ });