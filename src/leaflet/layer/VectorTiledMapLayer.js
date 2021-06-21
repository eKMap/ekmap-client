import { Util } from '../core/Util';
import L from 'leaflet';
import vectorTileLayer from 'leaflet-vector-tile-layer';
import convertStyle from '../../../dist/stylefunction'

export class VectorTiledMapLayer{
    constructor(options) {
        this.options = options ? options : {};
        if (options) {
            options = Util.setOptions(this, options);
            if (options.url) {
                options = Util.getUrlParams(options);
                this.url = Util.cleanUrl(options.url)
                this.tileUrl = (options.proxy ? options.proxy + '?' : '') + this.url + 'tile/{z}/{y}/{x}.pbf';
                this.styleUrl = this.url + 'resources/styles'
            }
            if (options.token) {
                this.tileUrl += ('?token=' + this.options.token);
                this.styleUrl += ('?token=' + this.options.token);
            }
        }
        // this.map = '';
        // this.arr = [];
        // this.name = [];
        // this.objectLayer = {};
        // this.layerPointLine = [];
        // this.featuresCheck = '';
        // this.layer = null;
        // this.urlFeatureService = options.url.replace("VectorTileServer", "FeatureServer")
        // this.urlMapService = options.url.replace("VectorTileServer", "MapServer")
    }

    /**
     * @function ol.ekmap.VectorTiledMapLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {ol.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        var me = this;
        const tileLayer = vectorTileLayer(this.tileUrl, {
        });
        fetch(this.styleUrl)
        .then(r => r.json())
        .then((glStyle) => {
      convertStyle(tileLayer,glStyle,'145')
      tileLayer.addTo(map);

  })
        return this;
    }

    // convertStyle(tileLayer,glStyle,source){
    //     const allLayers = this.derefLayers(glStyle.layers);
    //     const layersBySourceLayer = {};
    //     const mapboxLayers = [];
    //     let mapboxSource;
    //     for (let i = 0, ii = allLayers.length; i < ii; ++i) {
    //         const layer = allLayers[i];
    //         const layerId = layer.id;
    //         if (typeof source == 'string' && layer.source == source ||
    //             source.indexOf(layerId) !== -1) {
    //           const sourceLayer = layer['source-layer'];
    //           if (!mapboxSource) {
    //             mapboxSource = layer.source;
    //             const source = glStyle.sources[mapboxSource];
    //             if (!source) {
    //               throw new Error(`Source "${mapboxSource}" is not defined`);
    //             }
    //             const type = source.type;
    //             if (type !== 'vector' && type !== 'geojson') {
    //               throw new Error(`Source "${mapboxSource}" is not of type "vector" or "geojson", but "${type}"`);
    //             }
    //           }
    //           let layers = layersBySourceLayer[sourceLayer];
    //           if (!layers) {
    //             layers = layersBySourceLayer[sourceLayer] = [];
    //           }
    //           layers.push({
    //             layer: layer,
    //             index: i
    //           });
    //           mapboxLayers.push(layerId);
    //         }
    //         // TODO revisit when diffing gets added
    //         // delete functionCache[layerId];
    //         // delete filterCache[layerId];
    //       }
    // }

    // styleFunction(feature, resolution) {
    //     var me = this;
    //     const properties = feature.getProperties();
    //     console.log(layersBySourceLayer)
    
    //     const layers = layersBySourceLayer['1902'];
    //     if (!layers) {
    //       return;
    //     }
    //     let zoom = resolutions.indexOf(resolution);
    //     if (zoom == -1) {
    //       zoom = Util.getZoomForResolution(resolution, resolutions);
    //     }
    //     const type = types[feature.getGeometry().getType()];
    //     const f = {
    //       properties: properties,
    //       type: type
    //     };
    //     let stylesLength = -1;
    //     let featureBelongsToLayer;
    //     for (let i = 0, ii = layers.length; i < ii; ++i) {
    //       const layerData = layers[i];
    //       const layer = layerData.layer;
    //       const layerId = layer.id;
    
    //       const layout = layer.layout || emptyObj;
    //       const paint = layer.paint || emptyObj;
    //       if (layout.visibility === 'none' || ('minzoom' in layer && zoom < layer.minzoom) ||
    //           ('maxzoom' in layer && zoom >= layer.maxzoom)) {
    //         continue;
    //       }
    //       const filter = layer.filter;
    //       if (!filter || Util.evaluateFilter(layerId, filter, f, zoom)) {
    //         featureBelongsToLayer = layer;
    //         let color, opacity, fill, stroke, strokeColor, style;
    //         const index = layerData.index;
    //         if (type == 3 && (layer.type == 'fill' || layer.type == 'fill-extrusion')) {
    //           opacity = getValue(layer, 'paint', layer.type + '-opacity', zoom, f);
    //           if (layer.type + '-pattern' in paint) {
    //             const fillIcon = getValue(layer, 'paint', layer.type + '-pattern', zoom, f);
    //             if (fillIcon) {
    //               const icon = typeof fillIcon === 'string'
    //                 ? fromTemplate(fillIcon, properties)
    //                 : fillIcon.toString();
    //               if (spriteImage && spriteData && spriteData[icon]) {
    //                 ++stylesLength;
    //                 style = styles[stylesLength];
    //                 if (!style || !style.getFill() || style.getStroke() || style.getText()) {
    //                   style = styles[stylesLength] = new Style({
    //                     fill: new Fill()
    //                   });
    //                 }
    //                 fill = style.getFill();
    //                 style.setZIndex(index);
    //                 const icon_cache_key = icon + '.' + opacity;
    //                 let pattern = patternCache[icon_cache_key];
    //                 if (!pattern) {
    //                   const spriteImageData = spriteData[icon];
    //                   const canvas = createCanvas(spriteImageData.width, spriteImageData.height);
    //                   const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext('2d'));
    //                   ctx.globalAlpha = opacity;
    //                   ctx.drawImage(
    //                     spriteImage,
    //                     spriteImageData.x,
    //                     spriteImageData.y,
    //                     spriteImageData.width,
    //                     spriteImageData.height,
    //                     0,
    //                     0,
    //                     spriteImageData.width,
    //                     spriteImageData.height
    //                   );
    //                   pattern = ctx.createPattern(canvas, 'repeat');
    //                   patternCache[icon_cache_key] = pattern;
    //                 }
    //                 fill.setColor(pattern);
    //               }
    //             }
    //           } else {
    //             color = colorWithOpacity(getValue(layer, 'paint', layer.type + '-color', zoom, f), opacity);
    //             if (color) {
    //               if (layer.type + '-outline-color' in paint) {
    //                 strokeColor = colorWithOpacity(getValue(layer, 'paint', layer.type + '-outline-color', zoom, f), opacity);
    //               }
    //               if (!strokeColor) {
    //                 strokeColor = color;
    //               }
    //               ++stylesLength;
    //               style = styles[stylesLength];
    //               if (!style || !(style.getFill() && style.getStroke()) || style.getText()) {
    //                 style = styles[stylesLength] = new Style({
    //                   fill: new Fill(),
    //                   stroke: new Stroke()
    //                 });
    //               }
    //               fill = style.getFill();
    //               fill.setColor(color);
    //               stroke = style.getStroke();
    //               stroke.setColor(strokeColor);
    //               stroke.setWidth(1);
    //               style.setZIndex(index);
    //             }
    //           }
    //         }
    //         if (type != 1 && layer.type == 'line') {
    //           color = !('line-pattern' in paint) && 'line-color' in paint ?
    //             colorWithOpacity(getValue(layer, 'paint', 'line-color', zoom, f), getValue(layer, 'paint', 'line-opacity', zoom, f)) :
    //             undefined;
    //           const width = getValue(layer, 'paint', 'line-width', zoom, f);
    //           if (color && width > 0) {
    //             ++stylesLength;
    //             style = styles[stylesLength];
    //             if (!style || !style.getStroke() || style.getFill() || style.getText()) {
    //               style = styles[stylesLength] = new Style({
    //                 stroke: new Stroke()
    //               });
    //             }
    //             stroke = style.getStroke();
    //             stroke.setLineCap(getValue(layer, 'layout', 'line-cap', zoom, f));
    //             stroke.setLineJoin(getValue(layer, 'layout', 'line-join', zoom, f));
    //             stroke.setMiterLimit(getValue(layer, 'layout', 'line-miter-limit', zoom, f));
    //             stroke.setColor(color);
    //             stroke.setWidth(width);
    //             stroke.setLineDash(paint['line-dasharray'] ?
    //               getValue(layer, 'paint', 'line-dasharray', zoom, f).map(function(x) {
    //                 return x * width;
    //               }) : null);
    //             style.setZIndex(index);
    //           }
    //         }
    
    //         let hasImage = false;
    //         let text = null;
    //         let placementAngle = 0;
    //         let icon, iconImg, skipLabel;
    //         if ((type == 1 || type == 2) && 'icon-image' in layout) {
    //           const iconImage = getValue(layer, 'layout', 'icon-image', zoom, f);
    //           if (iconImage) {
    //             icon = typeof iconImage === 'string'
    //               ? fromTemplate(iconImage, properties)
    //               : iconImage.toString();
    //             let styleGeom = undefined;
    //             if (spriteImage && spriteData && spriteData[icon]) {
    //               const iconRotationAlignment = getValue(layer, 'layout', 'icon-rotation-alignment', zoom, f);
    //               if (type == 2) {
    //                 const geom = feature.getGeometry();
    //                 // ol package and ol-debug.js only
    //                 if (geom.getFlatMidpoint || geom.getFlatMidpoints) {
    //                   const extent = geom.getExtent();
    //                   const size = Math.sqrt(Math.max(
    //                     Math.pow((extent[2] - extent[0]) / resolution, 2),
    //                     Math.pow((extent[3] - extent[1]) / resolution, 2))
    //                   );
    //                   if (size > 150) {
    //                     //FIXME Do not hard-code a size of 150
    //                     const midpoint = geom.getType() === 'MultiLineString' ? geom.getFlatMidpoints() : geom.getFlatMidpoint();
    //                     if (!renderFeature) {
    //                       renderFeatureCoordinates = [NaN, NaN];
    //                       renderFeature = new RenderFeature('Point', renderFeatureCoordinates, [], {}, null);
    //                     }
    //                     styleGeom = renderFeature;
    //                     renderFeatureCoordinates[0] = midpoint[0];
    //                     renderFeatureCoordinates[1] = midpoint[1];
    //                     const placement = getValue(layer, 'layout', 'symbol-placement', zoom, f);
    //                     if (placement === 'line' && iconRotationAlignment === 'map') {
    //                       const stride = geom.getStride();
    //                       const coordinates = geom.getFlatCoordinates();
    //                       for (let i = 0, ii = coordinates.length - stride; i < ii; i += stride) {
    //                         const x1 = coordinates[i];
    //                         const y1 = coordinates[i + 1];
    //                         const x2 = coordinates[i + stride];
    //                         const y2 = coordinates[i + stride + 1];
    //                         const minX = Math.min(x1, x2);
    //                         const minY = Math.min(y1, y2);
    //                         const maxX = Math.max(x1, x2);
    //                         const maxY = Math.max(y1, y2);
    //                         if (midpoint[0] >= minX && midpoint[0] <= maxX &&
    //                             midpoint[1] >= minY && midpoint[1] <= maxY) {
    //                           placementAngle = Math.atan2(y1 - y2, x2 - x1);
    //                           break;
    //                         }
    //                       }
    //                     }
    //                   }
    //                 }
    //               }
    //               if (type !== 2 || styleGeom) {
    //                 const iconSize = getValue(layer, 'layout', 'icon-size', zoom, f);
    //                 const iconColor = paint['icon-color'] !== undefined ? getValue(layer, 'paint', 'icon-color', zoom, f) : null;
    //                 if (!iconColor || iconColor.a !== 0) {
    //                   let icon_cache_key = icon + '.' + iconSize;
    //                   if (iconColor !== null) {
    //                     icon_cache_key += '.' + iconColor;
    //                   }
    //                   iconImg = iconImageCache[icon_cache_key];
    //                   if (!iconImg) {
    //                     const spriteImageData = spriteData[icon];
    //                     if (iconColor !== null) {
    //                       // cut out the sprite and color it
    //                       const canvas = createCanvas(spriteImageData.width, spriteImageData.height);
    //                       const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext('2d'));
    //                       ctx.drawImage(
    //                         spriteImage,
    //                         spriteImageData.x,
    //                         spriteImageData.y,
    //                         spriteImageData.width,
    //                         spriteImageData.height,
    //                         0,
    //                         0,
    //                         spriteImageData.width,
    //                         spriteImageData.height
    //                       );
    //                       const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //                       for (let c = 0, cc = data.data.length; c < cc; c += 4) {
    //                         const a = iconColor.a;
    //                         if (a !== 0) {
    //                           data.data[c] = iconColor.r * 255 / a;
    //                           data.data[c + 1] = iconColor.g * 255 / a;
    //                           data.data[c + 2] = iconColor.b * 255 / a;
    //                         }
    //                         data.data[c + 3] = a;
    //                       }
    //                       ctx.putImageData(data, 0, 0);
    //                       iconImg = iconImageCache[icon_cache_key] = new Icon({
    //                         img: canvas,
    //                         imgSize: [canvas.width, canvas.height],
    //                         scale: iconSize / spriteImageData.pixelRatio
    //                       });
    //                     } else {
    //                       iconImg = iconImageCache[icon_cache_key] = new Icon({
    //                         img: spriteImage,
    //                         imgSize: spriteImgSize,
    //                         size: [spriteImageData.width, spriteImageData.height],
    //                         offset: [spriteImageData.x, spriteImageData.y],
    //                         rotateWithView: iconRotationAlignment === 'map',
    //                         scale: iconSize / spriteImageData.pixelRatio
    //                       });
    //                     }
    //                   }
    //                 }
    //                 if (iconImg) {
    //                   ++stylesLength;
    //                   style = styles[stylesLength];
    //                   if (!style || !style.getImage() || style.getFill() || style.getStroke()) {
    //                     style = styles[stylesLength] = new Style();
    //                   }
    //                   style.setGeometry(styleGeom);
    //                   iconImg.setRotation(placementAngle + deg2rad(getValue(layer, 'layout', 'icon-rotate', zoom, f)));
    //                   iconImg.setOpacity(getValue(layer, 'paint', 'icon-opacity', zoom, f));
    //                   iconImg.setAnchor(anchor[getValue(layer, 'layout', 'icon-anchor', zoom, f)]);
    //                   style.setImage(iconImg);
    //                   text = style.getText();
    //                   style.setText(undefined);
    //                   style.setZIndex(index);
    //                   hasImage = true;
    //                   skipLabel = false;
    //                 }
    //               } else {
    //                 skipLabel = true;
    //               }
    //             }
    //           }
    //         }
    
    //         if (type == 1 && 'circle-radius' in paint) {
    //           ++stylesLength;
    //           style = styles[stylesLength];
    //           if (!style || !style.getImage() || style.getFill() || style.getStroke()) {
    //             style = styles[stylesLength] = new Style();
    //           }
    //           const circleRadius = getValue(layer, 'paint', 'circle-radius', zoom, f);
    //           const circleStrokeColor = colorWithOpacity(getValue(layer, 'paint', 'circle-stroke-color', zoom, f), getValue(layer, 'paint', 'circle-stroke-opacity', zoom, f));
    //           const circleColor = colorWithOpacity(getValue(layer, 'paint', 'circle-color', zoom, f), getValue(layer, 'paint', 'circle-opacity', zoom, f));
    //           const circleStrokeWidth = getValue(layer, 'paint', 'circle-stroke-width', zoom, f);
    //           const cache_key = circleRadius + '.' + circleStrokeColor + '.' +
    //             circleColor + '.' + circleStrokeWidth;
    //           iconImg = iconImageCache[cache_key];
    //           if (!iconImg) {
    //             iconImg = iconImageCache[cache_key] = new Circle({
    //               radius: circleRadius,
    //               stroke: circleStrokeColor && circleStrokeWidth > 0 ? new Stroke({
    //                 width: circleStrokeWidth,
    //                 color: circleStrokeColor
    //               }) : undefined,
    //               fill: circleColor ? new Fill({
    //                 color: circleColor
    //               }) : undefined
    //             });
    //           }
    //           style.setImage(iconImg);
    //           text = style.getText();
    //           style.setText(undefined);
    //           style.setGeometry(undefined);
    //           style.setZIndex(index);
    //           hasImage = true;
    //         }
    
    //         let label;
    //         if ('text-field' in layout) {
    //           const textField = getValue(layer, 'layout', 'text-field', zoom, f).toString();
    //           label = fromTemplate(textField, properties).trim();
    //           opacity = getValue(layer, 'paint', 'text-opacity', zoom, f);
    //         }
    //         if (label && opacity && !skipLabel) {
    //           if (!hasImage) {
    //             ++stylesLength;
    //             style = styles[stylesLength];
    //             if (!style || !style.getText() || style.getFill() || style.getStroke()) {
    //               style = styles[stylesLength] = new Style();
    //             }
    //             style.setImage(undefined);
    //             style.setGeometry(undefined);
    //           }
    //           if (!style.getText()) {
    //             style.setText(text || new Text({
    //               padding: [2, 2, 2, 2]
    //             }));
    //           }
    //           text = style.getText();
    //           const textSize = Math.round(getValue(layer, 'layout', 'text-size', zoom, f));
    //           const fontArray = getValue(layer, 'layout', 'text-font', zoom, f);
    //           const textLineHeight = getValue(layer, 'layout', 'text-line-height', zoom, f);
    //           const font = mb2css(getFonts ? getFonts(fontArray) : fontArray, textSize, textLineHeight);
    //           const textTransform = layout['text-transform'];
    //           if (textTransform == 'uppercase') {
    //             label = label.toUpperCase();
    //           } else if (textTransform == 'lowercase') {
    //             label = label.toLowerCase();
    //           }
    //           const maxTextWidth = getValue(layer, 'layout', 'text-max-width', zoom, f);
    //           const letterSpacing = getValue(layer, 'layout', 'text-letter-spacing', zoom, f);
    //           const wrappedLabel = type == 2 ? applyLetterSpacing(label, letterSpacing) : wrapText(label, font, maxTextWidth, letterSpacing);
    //           text.setText(wrappedLabel);
    //           text.setFont(font);
    //           text.setRotation(deg2rad(getValue(layer, 'layout', 'text-rotate', zoom, f)));
    //           const textAnchor = getValue(layer, 'layout', 'text-anchor', zoom, f);
    //           const placement = (hasImage || type == 1) ? 'point' : getValue(layer, 'layout', 'symbol-placement', zoom, f);
    //           text.setPlacement(placement);
    //           let textHaloWidth = getValue(layer, 'paint', 'text-halo-width', zoom, f);
    //           const textOffset = getValue(layer, 'layout', 'text-offset', zoom, f);
    //           const textTranslate = getValue(layer, 'paint', 'text-translate', zoom, f);
    //           // Text offset has to take halo width and line height into account
    //           let vOffset = 0;
    //           let hOffset = 0;
    //           if (placement == 'point') {
    //             let textAlign = 'center';
    //             if (textAnchor.indexOf('left') !== -1) {
    //               textAlign = 'left';
    //               hOffset = textHaloWidth;
    //             } else if (textAnchor.indexOf('right') !== -1) {
    //               textAlign = 'right';
    //               hOffset = -textHaloWidth;
    //             }
    //             text.setTextAlign(textAlign);
    //             const textRotationAlignment = getValue(layer, 'layout', 'text-rotation-alignment', zoom, f);
    //             text.setRotateWithView(textRotationAlignment == 'map');
    //           } else {
    //             text.setMaxAngle(deg2rad(getValue(layer, 'layout', 'text-max-angle', zoom, f)) * label.length / wrappedLabel.length);
    //             text.setTextAlign();
    //             text.setRotateWithView(false);
    //           }
    //           let textBaseline = 'middle';
    //           if (textAnchor.indexOf('bottom') == 0) {
    //             textBaseline = 'bottom';
    //             vOffset = -textHaloWidth - (0.5 * (textLineHeight - 1)) * textSize;
    //           } else if (textAnchor.indexOf('top') == 0) {
    //             textBaseline = 'top';
    //             vOffset = textHaloWidth + (0.5 * (textLineHeight - 1)) * textSize;
    //           }
    //           text.setTextBaseline(textBaseline);
    //           text.setOffsetX(textOffset[0] * textSize + hOffset + textTranslate[0]);
    //           text.setOffsetY(textOffset[1] * textSize + vOffset + textTranslate[1]);
    //           textColor.setColor(colorWithOpacity(getValue(layer, 'paint', 'text-color', zoom, f), opacity));
    //           text.setFill(textColor);
    //           const haloColor = colorWithOpacity(getValue(layer, 'paint', 'text-halo-color', zoom, f), opacity);
    //           if (haloColor) {
    //             textHalo.setColor(haloColor);
    //             // spec here : https://docs.mapbox.com/mapbox-gl-js/style-spec/#paint-symbol-text-halo-width
    //             // Halo width must be doubled because it is applied around the center of the text outline
    //             textHaloWidth *= 2;
    //             // 1/4 of text size (spec) x 2
    //             const halfTextSize = 0.5 * textSize;
    //             textHalo.setWidth(textHaloWidth <= halfTextSize ? textHaloWidth : halfTextSize);
    //             text.setStroke(textHalo);
    //           } else {
    //             text.setStroke(undefined);
    //           }
    //           const textPadding = getValue(layer, 'layout', 'text-padding', zoom, f);
    //           const padding = text.getPadding();
    //           if (textPadding !== padding[0]) {
    //             padding[0] = padding[1] = padding[2] = padding[3] = textPadding;
    //           }
    //           style.setZIndex(index);
    //         }
    //       }
    //     }
    
    //     if (stylesLength > -1) {
    //       styles.length = stylesLength + 1;
    //       if (recordLayer) {
    //         if (typeof feature.set === 'function') {
    //           // ol/Feature
    //           feature.set('mapbox-layer', featureBelongsToLayer);
    //         } else {
    //           // ol/render/Feature
    //           feature.getProperties()['mapbox-layer'] = featureBelongsToLayer;
    //         }
    //       }
    //       return styles;
    //     }
    //   };

    // derefLayers(layers) {
    //     layers = layers.slice();
    //     var map = Object.create(null);
    //     for (var i = 0; i < layers.length; i++) {
    //         map[layers[i].id] = layers[i];
    //     }
    //     for (var i$1 = 0; i$1 < layers.length; i$1++) {
    //         if ('ref' in layers[i$1]) {
    //             layers[i$1] = this.deref(layers[i$1], map[layers[i$1].ref]);
    //         }
    //     }
    //     return layers;
    // }

    // deref(layer, parent) {
    //     var result = {};
    //     for (var k in layer) {
    //         if (k !== 'ref') {
    //             result[k] = layer[k];
    //         }
    //     }
    //     refProperties.forEach(function (k) {
    //         if (k in parent) {
    //             result[k] = parent[k];
    //         }
    //     });
    //     return result;
    // }
}

L.ekmap.VectorTiledMapLayer = VectorTiledMapLayer;