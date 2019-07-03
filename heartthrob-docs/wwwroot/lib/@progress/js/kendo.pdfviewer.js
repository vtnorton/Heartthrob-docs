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

	module.exports = __webpack_require__(1271);


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }),

/***/ 1271:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(f, define){
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(1272),
	        __webpack_require__(1273),
	        __webpack_require__(1274),
	        __webpack_require__(1275),
	        __webpack_require__(1276),
	        __webpack_require__(1277)
	    ], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function(){

	var __meta__ = { // jshint ignore:line
	    id: "pdfviewer",
	    name: "PDFViewer",
	    category: "web",
	    description: "PDFViewer to display pdfs in the browser",
	    depends: ["core", "window", "dialog", "toolbar"]
	};

	(function($, undefined) {
	    var NS = ".kendoPDFViewer",
	        kendo = window.kendo,
	        ui = kendo.ui,
	        proxy = $.proxy,
	        extend = $.extend,
	        drawing = kendo.drawing,
	        Page,
	        Widget = ui.Widget,
	        progress = kendo.ui.progress,
	        SCROLL = "scroll",
	        RENDER = "render",
	        OPEN = "open",
	        ERROR = "error",
	        FOCUS = "focus",
	        WHITECOLOR = "#ffffff",
	        TABINDEX = "tabindex",
	        PROCESSORS = {
	            pdfjs: "pdfjs",
	            dpl: "dpl"
	        },
	        styles = {
	            viewer: "k-pdf-viewer k-widget",
	            scroller: "k-canvas k-list-scroller"
	        };

	    var PDFViewer = Widget.extend({
	        init: function(element, options) {
	            var that = this;

	            Widget.fn.init.call(that, element, kendo.deepExtend({}, this.options, options));

	            that._wrapper();

	            if (that.options.toolbar) {
	                that._renderToolbar();
	            }

	            that.wrapper.on(FOCUS, proxy(that._focus, that));
	            that._initProcessor(options || {});
	            that._renderPageContainer();
	            that._loadDocument();

	            that._tabindex();
	            kendo.notify(that, kendo.ui);
	        },

	        events: [
	            RENDER,
	            OPEN,
	            ERROR
	        ],

	        options: {
	            name: "PDFViewer",
	            view: {
	                type: "canvas"
	            },
	            pdfjsProcessing: {
	                file: null
	            },
	            dplProcessing: {
	                read: {
	                    url: null,
	                    type: "GET",
	                    dataType: "json",
	                    pageField: "pageNumber"
	                },
	                upload: {
	                    url: null,
	                    saveField: "file"
	                },
	                download: {
	                    url: null
	                },
	                loadOnDemand: false
	            },
	            toolbar: {
	                items: []
	            },
	            width: 1000,
	            height: 1200,
	            page: 1,
	            defaultPageSize: {
	                width: 794,
	                height: 1123
	            },
	            messages: {
	                defaultFileName: "Document",
	                toolbar: {
	                    open: "Open",
	                    exportAs: "Export",
	                    download: "Download",
	                    pager:  {
	                        first: "Go to the first page",
	                        previous: "Go to the previous page",
	                        next: "Go to the next page",
	                        last: "Go to the last page",
	                        of: " of {0} ",
	                        page: "page",
	                        pages: "pages"
	                    }
	                },
	                errorMessages: {
	                    notSupported: "Only pdf files allowed.",
	                    parseError: "PDF file fails to process.",
	                    notFound: "File is not found."
	                },
	                dialogs: {
	                    exportAsDialog: {
	                        title: "Export...",
	                        defaultFileName: "Document",
	                        pdf: "Portable Document Format (.pdf)",
	                        png: "Portable Network Graphics (.png)",
	                        svg: "Scalable Vector Graphics (.svg)",
	                        labels: {
	                            fileName: "File name",
	                            saveAsType: "Save as",
	                            page: "Page"
	                        }
	                    },
	                    okText: "OK",
	                    save: "Save",
	                    cancel: "Cancel"
	                }
	            }
	        },

	        _wrapper: function () {
	            var that = this,
	                options = that.options;

	            that.wrapper = that.element;

	            that.wrapper
	                    .width(options.width)
	                    .height(options.height)
	                    .addClass(styles.viewer);

	            that._resizeHandler = kendo.onResize(function() {
	                that.resize();
	            });
	        },

	        _focus: function (e) {
	            if (this.toolbar) {
	                this.toolbar.wrapper.focus();
	            } else {
	                this.pageContainer.focus();
	            }
	            e.preventDefault();
	        },

	        _initProcessor: function (options) {
	            var that = this,
	                processingOptions;

	            processingOptions = options.dplProcessing ? that.options.dplProcessing : that.options.pdfjsProcessing;
	            that.processingLib = options.dplProcessing ? PROCESSORS.dpl : PROCESSORS.pdfjs;

	            that.processor = new kendo.pdfviewer[that.processingLib].processor(processingOptions, that);
	            Page = kendo.pdfviewer[that.processingLib].Page;
	        },

	        _renderToolbar: function () {
	            var that = this,
	                options = that.options;

	            var toolbarOptions = {
	                pager: {
	                    messages: options.messages.toolbar.pager
	                },
	                resizable: true,
	                items: options.toolbar.items,
	                width: options.width,
	                action: that.execute.bind(that),
	                messages: options.messages.toolbar
	            };

	            var toolbarElement = $("<div />");
	            toolbarElement.appendTo(that.element);
	            that.toolbar = new kendo.pdfviewer.Toolbar(toolbarElement, toolbarOptions);
	        },

	        _initErrorDialog: function (options) {
	            var that = this;

	            if (!that._errorDialog) {
	                options = extend(options, {
	                    messages: that.options.messages
	                });
	                var dialogInstance = new kendo.pdfviewer.dialogs.ErrorDialog(options);
	                that._errorDialog = dialogInstance._dialog;
	            }
	            return that._errorDialog;
	        },

	        _renderPageContainer: function () {
	            var that = this;

	            if (!that.pageContainer) {
	                that.pageContainer = $("<div />");
	                that.pageContainer.addClass(styles.scroller);
	                that.pageContainer.attr(TABINDEX, 0);
	                that.wrapper.append(that.pageContainer);

	            }
	        },

	        _triggerError: function (options) {
	            var dialog = this._initErrorDialog();
	            extend(options, {
	                dialog: dialog
	            });

	            if (this.pageContainer) {
	                progress(this.pageContainer, false);
	            }

	            if (this.trigger(ERROR, options))
	            {
	                return;
	            }

	            dialog.open().content(options.message);
	        },

	        _renderPages: function () {
	            var that = this,
	                document = that.document,
	                pagesData;

	            that.pages = [];

	            if (!document || !document.total) {
	                that._renderBlankPage();
	                return;
	            }

	            pagesData = document.pages;

	            for (var i = 1; i <= document.total; i++) {
	                var viewerPage,
	                    pageData = {
	                        processor: that.processor,
	                        number: i
	                    };

	                if (pagesData && pagesData.length) {
	                    pageData = extend(pageData, pagesData[i - 1]);
	                }

	                viewerPage = new Page(pageData, that);
	                that.pages.push(viewerPage);
	                that.pageContainer.append(viewerPage.element);
	            }

	            if (that.pages.length > 1) {
	                that.pageContainer.on(SCROLL + NS, proxy(that._scroll, that));
	            }
	        },

	        _renderBlankPage: function () {
	            this._blankPage = new Page(this.options.defaultPageSize, this);

	            this.pageContainer.append(this._blankPage.element);

	            this._updatePager(1, 1);
	        },

	        _updatePager: function (pageNumber, total) {
	            if (!this.toolbar || !this.toolbar.pager) {
	                return;
	            }

	            this.toolbar.pager.setOptions({
	                page: pageNumber,
	                total: total
	            });
	        },

	        _resize: function () {
	            var that = this;
	            var containerWidth;
	            var containerHeight;
	            var loadedPagesHeight = 0;
	            var ratio;

	            containerWidth = that.pageContainer[0].clientWidth;
	            containerHeight = that.pageContainer[0].clientHeight;

	            if (!that.pages || !that.pages.length) {
	                if (that._blankPage)
	                {
	                    ratio = containerWidth / that._blankPage.element.width();
	                    that._blankPage.resize(ratio);
	                }
	                return;
	            }

	            if (that.toolbar) {
	                that.toolbar.resize(true);
	            }

	            that._visiblePagesCount = 1;

	            that.pages.forEach(function (page) {
	                ratio = containerWidth / page.element.width();

	                page.resize(ratio);
	                loadedPagesHeight += page.element.height();

	                if (loadedPagesHeight < containerHeight &&
	                        page.pageNumber > 1) {
	                    that._visiblePagesCount++;
	                }
	            });
	        },

	        _scroll: function () {
	            var that = this,
	                containerScrollHeight = that.pageContainer[0].scrollHeight,
	                containerHeight = that.pageContainer.height(),
	                containerScrollTop = that.pageContainer.scrollTop(),
	                containerOffsetTop = that.pageContainer.offset().top,
	                pageNum = that.options.page,
	                pageIndex = pageNum - 1,
	                total = that.pages.length,
	                pageToLoad = pageNum,
	                currentPage = that.pages[pageIndex],
	                currentPageTop = currentPage.element.offset().top - containerOffsetTop,
	                currentPageHeight = currentPage.element.height(),
	                previousPage, prevPageTop, prevPageHeight,
	                scrollDirection = containerScrollTop - that._prevScrollTop > 0 ? 1 : -1;

	                if (that._preventScroll) {
	                    that._preventScroll = false;
	                    return;
	                }

	                if (scrollDirection == -1 && that.pages[pageIndex + scrollDirection]) {
	                    previousPage = that.pages[pageIndex - that._visiblePagesCount] || that.pages[pageIndex + scrollDirection];
	                    prevPageTop = previousPage.element.offset().top - containerOffsetTop;
	                    prevPageHeight = previousPage.element.height();
	                }

	                if (Math.abs(containerScrollTop - (that._prevScrollTop || 0)) > containerHeight) {
	                    pageToLoad = Math.floor(containerScrollTop * (1 / (containerScrollHeight / total))) + 1;
	                } else if (currentPageTop < 0 && Math.abs(currentPageTop) >= currentPageHeight / 2 && scrollDirection === 1) {
	                    pageToLoad++;
	                } else if (previousPage && Math.abs(prevPageTop) <= prevPageHeight / 2) {
	                    pageToLoad--;
	                }

	                if (pageNum !== pageToLoad && pageToLoad >= 1 && pageToLoad <= total) {
	                    that.options.page = pageToLoad;

	                    that._loadVisiblePages();
	                    that._updatePager(pageToLoad, total);
	                }

	                that._prevScrollTop = containerScrollTop;
	        },

	        execute: function (options) {
	            var commandOptions = extend({ viewer: this }, options.options);
	            var command = new kendo.pdfviewer[options.command](commandOptions);
	            command.exec();
	        },


	        _loadDocument: function () {
	            var that = this;
	            var page = that.options.page;

	            progress(that.pageContainer, true);
	            that.processor.fetchDocument().done(function (document) {
	                that._clearPages();
	                that.document = document;

	                that._renderPages();
	                that.resize(true);

	                if (document) {
	                    page = page >= 1 && page <= document.total ? page : 1;
	                    that.activatePage(page);
	                }

	                progress(that.pageContainer, false);
	            });
	        },

	        loadPage: function (number) {
	            var page = this.pages && this.pages[number - 1];

	            if (page) {
	                page.load();
	            }
	        },

	        activatePage: function (number) {
	            var page = this.pages && this.pages[number - 1];
	            var currentScrollTop = this.pageContainer.scrollTop();

	            if (!page) {
	                return;
	            }

	            this.options.page = number;
	            this._loadVisiblePages();

	            this._preventScroll = true;
	            this.pageContainer.scrollTop(currentScrollTop + page.element.position().top);
	            this._updatePager(number, this.pages.length);
	        },

	        _loadVisiblePages: function () {
	            var pagesCount = this.pages && this.pages.length;
	            var minVisiblePageNum = this.options.page;
	            var maxVisiblePageNum = Math.min(minVisiblePageNum + this._visiblePagesCount, pagesCount);

	            for (var i = minVisiblePageNum; i <= maxVisiblePageNum; i++)
	            {
	                this.loadPage(i);
	            }
	        },

	        fromFile: function (file) {
	            this.processor._updateDocument(file);
	            this._loadDocument();
	        },

	        exportImage: function (options) {
	            var that = this;
	            var pageNumber = options.page;
	            var page = that.pages[pageNumber - 1] || that._blankPage;
	            var rootGroup = new drawing.Group();

	            page.load();

	            var background = kendo.drawing.Path.fromRect(new kendo.geometry.Rect([0, 0], [page.width, page.height]), {
	                fill: {
	                    color: WHITECOLOR
	                },
	                stroke: null
	            });

	            progress(that.pageContainer, true);
	            rootGroup.append(background, page.group);

	            drawing.exportImage(rootGroup).done(function (data) {
	                progress(that.pageContainer, false);
	                kendo.saveAs({
	                    dataURI: data,
	                    fileName: options.fileName,
	                    proxyURL: options.proxyURL || "",
	                    forceProxy: options.forceProxy,
	                    proxyTarget: options.proxyTarget
	                });
	            });
	        },

	        exportSVG: function (options) {
	            var that = this;
	            var pageNumber = options.page;
	            var page = that.pages[pageNumber - 1] || that._blankPage;

	            progress(that.pageContainer, true);

	            page.load();

	            drawing.exportSVG(page.group).done(function (data) {
	                progress(that.pageContainer, false);
	                kendo.saveAs({
	                    dataURI: data,
	                    fileName: options.fileName,
	                    proxyURL: options.proxyURL || "",
	                    forceProxy: options.forceProxy,
	                    proxyTarget: options.proxyTarget
	                });
	            });
	        },

	        setOptions: function (options)
	        {
	            var that = this;

	            if (options.pdfjsProcessing || options.dplProcessing) {
	                that._initProcessor();
	            }

	            options = $.extend(that.options, options);

	            Widget.fn.setOptions.call(that, options);

	            if (options.page) {
	                that.activatePage(options.page);
	            }

	            if (options.width) {
	                that.element.width(options.width);
	            }

	            if (options.height) {
	                that.element.height(options.height);
	            }
	        },

	        destroy: function ()
	        {
	            kendo.unbindResize(this._resizeHandler);

	            //destroy nested components
	            if (this._errorDialog) {
	                this._errorDialog.destroy();
	            }

	            if (this._saveDialog) {
	                this._saveDialog.destroy();
	            }

	            if (this._upload) {
	                this._upload.destroy();
	            }

	            if (this.toolbar) {
	                this.toolbar.unbind();
	                this.toolbar.destroy();
	                this.toolbar = null;
	            }

	            if (this.pages && this.pages.length) {
	                this.pages.forEach(function (page) {
	                    page.destroy();
	                });
	                this.pages = [];
	            }

	            this.pageContainer.off(NS);

	            Widget.fn.destroy.call(this);
	        },

	        _clearPages: function () {
	            this.pages = [];
	            this.document = null;
	            this.options.page = 1;
	            this.pageContainer.empty();
	            this.pageContainer.off(SCROLL + NS);
	            this.pageContainer.scrollTop(0);
	        }
	    });

	    ui.plugin(PDFViewer);
	})(window.kendo.jQuery);

	return window.kendo;

	}, __webpack_require__(3));


/***/ }),

/***/ 1272:
/***/ (function(module, exports) {

	module.exports = require("./pdf-viewer/processors/pdfjs-processor");

/***/ }),

/***/ 1273:
/***/ (function(module, exports) {

	module.exports = require("./pdf-viewer/processors/dpl-processor");

/***/ }),

/***/ 1274:
/***/ (function(module, exports) {

	module.exports = require("./pdf-viewer/toolbar");

/***/ }),

/***/ 1275:
/***/ (function(module, exports) {

	module.exports = require("./pdf-viewer/page");

/***/ }),

/***/ 1276:
/***/ (function(module, exports) {

	module.exports = require("./pdf-viewer/dialogs");

/***/ }),

/***/ 1277:
/***/ (function(module, exports) {

	module.exports = require("./pdf-viewer/commands");

/***/ })

/******/ });