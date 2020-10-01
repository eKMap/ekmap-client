import { Util } from '../core/Util';
import mapboxgl from 'mapbox-gl';

/**
 * @class mapboxgl.ekmap.GeoJSONLayer
 * @classdesc The GeoJSONLayer class.
 * @category  Layer
 * @extends {mapboxgl.Evented}
 */
export class GeoJSONLayer extends mapboxgl.Evented {


    constructor(map) {
        super(map);
        this.map = map;
        this.layer = {
            'id': layerName,
            'type': 'circle',
            'source': sourceName,
            'paint': {
                'circle-radius': 10,
                'circle-color': '#0000ff'
            },
            'filter': ['==', '$type', 'Point']
        }; 
    }

    source(data) {
        var me = this;
        var sourceName = 'layer' + me.guid12();
        me.map.addSource(sourceName, {
            'type': 'geojson',
            'data': null
        });
        var sourceLayer = me.map.getSource(sourceName);
        sourceLayer.setData(data);
        this.layer.id = this.layer.source = sourceName;
        return this;
    }

    size(size) {

        return this;
    }

    guid12() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + s4();
    }
}

mapboxgl.ekmap.GeoJSONLayer = GeoJSONLayer;
