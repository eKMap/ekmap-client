import { ScaleLine } from './control';
import { BaseLayer } from './control';

import { TiledVietNamMapLayer } from './layer'
import { TileLayer } from './layer/TileLayer';
import { TiledRoadMapLayer } from './layer/TiledRoadMapLayer';
import { TiledOSMapLayer } from './layer/TiledOSMapLayer';
import { TiledMapLayer } from './layer/TiledMapLayer';
import { TiledAdminMapLayer } from './layer/TiledAdminMapLayer';
import { FeatureLayer } from './layer/FeatureLayer';


import { Util } from './core/Util';
import { Parse } from './core/Parse';
import { MapService } from './services/MapService';
import { ServiceBase } from './services/ServiceBase';
import { IdentifyFeatures } from './services/IdentifyFeatures';
import { FeatureService } from './services/FeatureService';

if (window && window.ol) {
    let ol = window.ol;
    ol.ekmap = window.ol.ekmap || {};
    ol.ekmap.control = window.ol.ekmap.control || {};
    // control
    ol.ekmap.control.ScaleLine = ScaleLine;
    ol.ekmap.control.BaseLayer = BaseLayer;


    // core
    ol.ekmap.Util = Util;
    ol.ekmap.Parse = Parse;
    ol.ekmap.Request = Request;

    // mapping

    // layer
    ol.ekmap.TiledVietNamMapLayer = TiledVietNamMapLayer;
    ol.ekmap.TileLayer = TileLayer;
    ol.ekmap.TiledRoadMapLayer = TiledRoadMapLayer;
    ol.ekmap.TiledOSMapLayer = TiledOSMapLayer;
    ol.ekmap.TiledAdminMapLayer = TiledAdminMapLayer;
    ol.ekmap.TiledMapLayer = TiledMapLayer;
    ol.ekmap.FeatureLayer = FeatureLayer;

    // service
    ol.ekmap.MapService = MapService;
    ol.ekmap.ServiceBase = ServiceBase;
    ol.ekmap.IdentifyFeatures = IdentifyFeatures;
    ol.ekmap.FeatureService = FeatureService;

}
export * from './control';
export * from './layer';