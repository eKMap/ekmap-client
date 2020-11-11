
import mapboxgl from 'mapbox-gl';
import { Util } from '../core/Util';
import { TileLayer } from './TileLayer';

/**
 * @class mapboxgl.ekmap.BasemapArcgisLayer
 * @classdesc The BasemapArcgisLayer class use some arcgis layer and url of them from {@link https://github.com/Esri/esri-leaflet/blob/master/src/Layers/BasemapLayer.js|source}.
 * @category  Layer
 * @param {string} basemapType basemapType refers to the specific basemap you'd like to add. <br>Use one of "Streets", "Topographic", "Oceans", "OceansLabels", "NationalGeographic", "Physical", "Gray", "GrayLabels", "DarkGray", "DarkGrayLabels", "Imagery", "ImageryLabels", "ImageryTransportation", "ImageryClarity", "ImageryFirefly", ShadedRelief", "ShadedReliefLabels", "Terrain", "TerrainLabels" or "USATopo".
 * @extends {mapboxgl.ekmap.TileLayer}
 * @example
 * var map = new mapboxgl.Map({
 *     container: 'map1',
 *     center: [103.9, 22.2],
 *     zoom: 6
 * });
 * var baseMap = new mapboxgl.ekmap.BasemapArcgisLayer('Topographic')
 *   .addTo(map);
 */

var tileProtocol = (window.location.protocol !== 'https:') ? 'http:' : 'https:';

export class BasemapArcgisLayer extends TileLayer {

    constructor(basemapType) {
        super();
        var config;
        var tiles = {
            Streets: {
                urlTemplate: tileProtocol + '//server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer',
                options: {
                    attribution: 'USGS, NOAA',
                    attributionUrl: 'https://static.arcgis.com/attribution/World_Street_Map'
                }
            },
            Topographic: {
                urlTemplate: tileProtocol + '//server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer',
                options: {
                    attribution: 'USGS, NOAA',
                    attributionUrl: 'https://static.arcgis.com/attribution/World_Topo_Map'
                }
            },
            Oceans: {
                urlTemplate: tileProtocol + '//server.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer',
                options: {
                    attribution: 'USGS, NOAA',
                    attributionUrl: 'https://static.arcgis.com/attribution/Ocean_Basemap'
                }
            },
            OceansLabels: {
                urlTemplate: tileProtocol + '//server.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer',
                options: {
                    attribution: ''
                }
            },
            NationalGeographic: {
                urlTemplate: tileProtocol + '//server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer',
                options: {
                    attribution: 'National Geographic, DeLorme, HERE, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, increment P Corp.'
                }
            },
            DarkGray: {
                urlTemplate: tileProtocol + '//server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer',
                options: {
                    attribution: 'HERE, DeLorme, MapmyIndia, &copy; OpenStreetMap contributors'
                }
            },
            DarkGrayLabels: {
                urlTemplate: tileProtocol + '//server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer',
                options: {
                    attribution: ''
                }
            },
            Gray: {
                urlTemplate: tileProtocol + '//server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer',
                options: {
                    attribution: 'HERE, DeLorme, MapmyIndia, &copy; OpenStreetMap contributors'
                }
            },
            GrayLabels: {
                urlTemplate: tileProtocol + '//server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer',
                options: {
                    attribution: ''
                }
            },
            Imagery: {
                urlTemplate: tileProtocol + '//server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
                options: {
                    attribution: 'DigitalGlobe, GeoEye, i-cubed, USDA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community',
                    attributionUrl: 'https://static.arcgis.com/attribution/World_Imagery'
                }
            },
            ImageryLabels: {
                urlTemplate: tileProtocol + '//server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer',
                options: {
                    attribution: ''
                }
            },
            ImageryTransportation: {
                urlTemplate: tileProtocol + '//server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer',
                options: {
                    attribution: ''
                }
            },
            ShadedRelief: {
                urlTemplate: tileProtocol + '//server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer',
                options: {
                    attribution: 'USGS'
                }
            },
            ShadedReliefLabels: {
                urlTemplate: tileProtocol + '//server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places_Alternate/MapServer',
                options: {
                    attribution: ''
                }
            },
            Terrain: {
                urlTemplate: tileProtocol + '//server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer',
                options: {
                    attribution: 'USGS, NOAA'
                }
            },
            TerrainLabels: {
                urlTemplate: tileProtocol + '//server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer',
                options: {
                    attribution: ''
                }
            },
            USATopo: {
                urlTemplate: tileProtocol + '//server.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer',
                options: {
                    attribution: 'USGS, National Geographic Society, i-cubed'
                }
            },
            ImageryClarity: {
                urlTemplate: tileProtocol + '//clarity.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer',
                options: {
                    attribution: 'Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community'
                }
            },
            Physical: {
                urlTemplate: tileProtocol + '//server.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer',
                options: {
                    attribution: 'U.S. National Park Service'
                }
            },
            ImageryFirefly: {
                urlTemplate: tileProtocol + '//fly.maptiles.arcgis.com/arcgis/rest/services/World_Imagery_Firefly/MapServer',
                options: {
                    attribution: 'Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community',
                    attributionUrl: 'https://static.arcgis.com/attribution/World_Imagery'
                }
            }
        }
        if (typeof basemapType === 'string' && tiles[basemapType]) {
            config = tiles[basemapType];
        } else {
            throw new Error('mapboxgl.viegis.BasemapArcgisLayer: Invalid parameter. Use one of "Streets", "Topographic", "Oceans", "OceansLabels", "NationalGeographic", "Physical", "Gray", "GrayLabels", "DarkGray", "DarkGrayLabels", "Imagery", "ImageryLabels", "ImageryTransportation", "ImageryClarity", "ImageryFirefly", ShadedRelief", "ShadedReliefLabels", "Terrain", "TerrainLabels" or "USATopo"');
        }
        if (this.options.token && config.urlTemplate.indexOf('token=') === -1) {
            config.urlTemplate += ('?token=' + this.options.token);
        }

        this.TileLayer = new mapboxgl.ekmap.TileLayer({
            url: config.urlTemplate,
            attribution: "<a href='"+config.options.attributionUrl+"' target='_blank'>"+config.options.attribution+"</a>"
        })
        
    }

    /**
     * @function mapboxgl.ekmap.BasemapArcgisLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {mapboxgl.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        return this.TileLayer.addTo(map);
    }
}

mapboxgl.ekmap.BasemapArcgisLayer = BasemapArcgisLayer;
