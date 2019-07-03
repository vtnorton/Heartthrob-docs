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

	__webpack_require__(1469);
	module.exports = __webpack_require__(1469);


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }),

/***/ 1469:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(f, define){
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1470)], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function(){

	(function($, undefined) {
	    var extend = $.extend,
	        drawing = kendo.drawing,
	        Group = drawing.Group,
	        Surface = drawing.Surface,
	        RENDER = "render",
	        Class = kendo.Class;

	    var geometryTypes = {
	        Path: "path",
	        MultiPath: "multipath",
	        Rect: "rect",
	        Image: "image",
	        Text: "text"
	    };

	    var Page = Class.extend({
	        init: function (options, viewer) {
	            this.viewer = viewer;
	            this.processor = options.processor;
	            this.options = options;
	            this.pageNumber = options.number;

	            this.element = $("<div class='k-page' />");
	            this.element.attr(kendo.attr("number"), this.pageNumber);

	            this._updatePageSize(options);
	            this.width = options.width;
	            this.height = options.height;
	        },
	        resize: function (ratio) {
	            var pageElement = this.element;

	            this._updatePageSize({
	                width: Math.min(pageElement.width() * ratio, this.width),
	                height: Math.min(pageElement.height() * ratio, this.height)
	            });
	        },
	        _updatePageSize: function (size) {
	            this.element
	                    .width(size.width)
	                    .height(size.height);
	        },
	        destroy: function () {
	            kendo.destroy(this.element);
	        }
	    });

	    var DPLPage = Page.extend({
	        draw: function () {
	            var that = this,
	                geometries = that.options.geometries;

	            that.group = new Group();
	            that.surface.draw(that.group);

	            that._drawGeometries(geometries);

	            that.viewer.trigger(RENDER, { page: this });
	            kendo.ui.progress(that.element, false);
	        },
	        load: function () {
	            var that = this;

	            if (that.loaded || !that.processor)
	            {
	                return;
	            }

	            that.processor.fetchPageData(that.pageNumber).then(function (data) {
	                that.options = data;
	                that._initSurface();
	                that.draw();
	            });

	            that.loaded = true;
	        },
	        _initSurface: function () {
	            var size = {
	                width: this.element.width(),
	                height: this.element.height()
	            };
	            var surfaceOptions = extend({ width: this.width, height: this.height }, this.viewer.options.view);
	            this.surface = new Surface(this.element, surfaceOptions);
	            this._updatePageSize(size);
	        },
	        _drawGeometries: function (geometries) {
	            var that = this,
	                kGeometry;

	            if (!geometries) {
	                return;
	            }

	            for (var i = 0; i <= geometries.length; i++) {
	                var geometry = geometries[i];

	                if (!geometry) {
	                    continue;
	                }

	                switch (geometry.type) {
	                    case geometryTypes.Path:
	                    case geometryTypes.MultiPath:
	                        kGeometry = that._drawPath(geometry);
	                        break;
	                    case geometryTypes.Rect:
	                        kGeometry = that._drawRect(geometry);
	                        break;
	                    case geometryTypes.Image:
	                        kGeometry = that._drawImage(geometry);
	                        break;
	                    case geometryTypes.Text:
	                        kGeometry = that._drawText(geometry);
	                        break;
	                    default:
	                        kGeometry = null;
	                        break;
	                }

	                if (kGeometry)
	                {
	                    that.group.append(kGeometry);
	                }
	            }
	        },
	        _drawRect: function (geometry)
	        {
	            var rectGeo = new kendo.geometry.Rect(geometry.point, geometry.size);

	            return new drawing.Rect(rectGeo, {
	                transform: this._getMatrix(geometry.transform),
	                fill: geometry.fillOptions,
	                stroke: geometry.strokeOptions
	            });
	        },

	        _drawImage: function (geometry)
	        {
	            var imageRect =  new kendo.geometry.Rect(geometry.point, geometry.size);
	            return new drawing.Image(geometry.src, imageRect,  {
	                transform: this._getMatrix(geometry.transform)
	            });
	        },

	        _drawText: function (geometry)
	        {
	            var options = {
	                transform: this._getMatrix(geometry.transform),
	                stroke: geometry.strokeOptions,
	                fill: geometry.fillOptions,
	                font: geometry.font
	            };
	            return new kendo.drawing.Text(geometry.content, geometry.point, options);
	        },

	        _drawPath: function (geometry)
	        {
	            var options = {
	                transform: this._getMatrix(geometry.transform),
	                stroke: geometry.strokeOptions,
	                fill: geometry.fillOptions
	            };
	            var path = new drawing.MultiPath(options);

	            for (var i = 0; i < geometry.paths.length; i++) {
	                var subPath = geometry.paths[i];

	                if (!subPath.segments)
	                {
	                    return;
	                }

	                path.moveTo.apply(path, subPath.point);

	                for (var j = 0; j < subPath.segments.length; j++) {
	                    var segment = subPath.segments[j];
	                    var drawAction = segment.points.length === 1 ? path.lineTo : path.curveTo;
	                    drawAction.apply(path, segment.points);
	                }

	                if (subPath.closed) {
	                    path.close();
	                }
	            }

	            return path;
	        },

	        _getMatrix: function (transform) {
	            var matrix = Object.create(kendo.geometry.Matrix.prototype);
	            kendo.geometry.Matrix.apply(matrix, transform);
	            return matrix;
	        }
	    });

	    var PDFJSPage = Page.extend({
	        init: function(options, viewer) {
	            var that = this,
	                canvas;

	            canvas = $("<canvas style='width: 100%; height: 100%;' />");
	            that.canvas = canvas.get(0);

	            Page.fn.init.call(that, options, viewer);

	            that.canvas.width = that.width;
	            that.canvas.height = that.height;
	            that.element.append(canvas);
	        },
	        load: function ()
	        {
	            var that = this;

	            if (that.loaded) {
	                return;
	            }

	            if (that.processor) {
	                that.processor.fetchPageData(that.pageNumber).then(function (page) {
	                    return page.render({
	                        canvasContext: that.canvas.getContext('2d'),
	                        viewport: page.getViewport({scale: 4/3})
	                    }).promise.then(function () {
	                        that.viewer.trigger(RENDER, { page: that });
	                    });
	                });
	            }

	            that.loaded = true;
	        }
	    });

	    extend(kendo.pdfviewer.dpl, {
	        geometryTypes: geometryTypes,
	        Page: DPLPage
	    });
	    extend(kendo.pdfviewer.pdfjs, {
	        Page: PDFJSPage
	    });
	})(window.kendo.jQuery);

	return window.kendo;

	}, __webpack_require__(3));

/***/ }),

/***/ 1470:
/***/ (function(module, exports) {

	module.exports = require("../kendo.drawing");

/***/ })

/******/ });