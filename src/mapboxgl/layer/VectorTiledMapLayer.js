import { feature } from '@turf/turf';
import mapboxgl from 'mapbox-gl';
import { Util } from '../core/Util';

/**
 * @class mapboxgl.ekmap.VectorTiledMapLayer
 * @classdesc The VectorTiledMapLayer class.
 * @category Layer
 * @param {Object} options Construction parameters.
 * @param {string} options.url 
 * @param {string} options.token Will use this token to authenticate all calls to the service.
 * @extends {mapboxgl.Evented}
 */
export class VectorTiledMapLayer extends mapboxgl.Evented {
    constructor(options) {
        super();
        this.options = options ? options : {};
        if (options) {
            options = Util.setOptions(this, options);
            if (options.url)
                this.tileUrl = options.url
        }
        if (options.token)
            this.tileUrl += ('?token=' + this.options.token);
        this.map = '';
        this.arr = [];
    }

    /**
     * @function mapboxgl.ekmap.VectorTiledMapLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {mapboxgl.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        this.map = map;
        var me = this;
        map.setStyle(this.tileUrl);
        //Style point,line,polygon
        me.fire('loadend', me);
        map.on('load', function() {
            var layers = map.getStyle().layers;
            var listLayer = [];
            layers.forEach(layer => {
                var idCheck = layer.id % 2;
                if (!isNaN(idCheck)) {
                    listLayer.push(layer)
                    me.arr.push(layer.id)
                }
            });
            listLayer.forEach(layer => {
                if (layer.type == 'fill')
                    map.addLayer({
                        "id": "areaSelect",
                        "source": layer.source,
                        "type": "line",
                        "source-layer": layer.id,
                        'layout': {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        'paint': {
                            'line-color': [
                                'case', ['boolean', ['feature-state', 'hover'], false],
                                '#484896',
                                'transparent'
                            ],
                            'line-width': 2,
                        }
                    });
                if (layer.type == 'line')
                    map.addLayer({
                        "id": "lineSelect",
                        "source": layer.source,
                        "type": "line",
                        "source-layer": layer.id,
                        'layout': {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        'paint': {
                            'line-color': [
                                'case', ['boolean', ['feature-state', 'hover'], false],
                                'blue',
                                'transparent'
                            ],
                            'line-width': 2,
                        }
                    });
                if (layer.type == 'circle')
                    map.addLayer({
                        'id': 'pointSelect',
                        'type': 'circle',
                        "source": layer.source,
                        "source-layer": layer.id,
                        'paint': {
                            "circle-color": "red",
                            "circle-stroke-color": [
                                'case', ['boolean', ['feature-state', 'hover'], false],
                                '#00ffff',
                                'transparent'
                            ],
                            "circle-stroke-width": 3,
                        },
                    });
            });
        })
        return this;
    }

    /**
     * @function mapboxgl.ekmap.MapService.prototype.queryByGeometry
     * @description  Is an abstraction for the find API included in Map Services. It provides a chainable API for building request parameters and executing find tasks.。
     * @param {Object} geometry The geometry to apply as the spatial filter. The structure of the geometry is the same as the structure of the JSON geometry objects returned by the ArcGIS REST API. In addition to the JSON structures, for envelopes and points, you can specify the geometry with a simpler comma-separated syntax.
     * @param {RequestCallback} callback The callback of result data returned by the server side.
     */
    queryByGeometry(polygon, callback) {
        var polygonBoundingBox = turf.bbox(polygon);

        var southWest = [polygonBoundingBox[0], polygonBoundingBox[1]];
        var northEast = [polygonBoundingBox[2], polygonBoundingBox[3]];

        var northEastPointPixel = this.map.project(northEast);
        var southWestPointPixel = this.map.project(southWest);
        var features = this.map.queryRenderedFeatures([southWestPointPixel, northEastPointPixel], {
            layers: this.arr
        });
        console.log(features)
        features.forEach(feature => {
            if (!(undefined === turf.intersect(feature, polygon))) {
                if (feature.sourceLayer == '480')
                    this.map.setFeatureState({
                        source: '35',
                        sourceLayer: '480',
                        id: feature.id
                    }, {
                        hover: true
                    });
                if (feature.sourceLayer == '479')
                    this.map.setFeatureState({
                        source: '35',
                        sourceLayer: '479',
                        id: feature.id
                    }, {
                        hover: true
                    });
                if (feature.sourceLayer == '478')
                    this.map.setFeatureState({
                        source: '35',
                        sourceLayer: '478',
                        id: feature.id
                    }, {
                        hover: true
                    });
            }
        });
        return callback(features);
    }
}

mapboxgl.ekmap.VectorTiledMapLayer = VectorTiledMapLayer;