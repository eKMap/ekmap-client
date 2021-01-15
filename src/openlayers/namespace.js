import { ScaleLine } from './control';
import ol_control_BaseLayer from "./control/BaseLayer"

import { TiledVietNamMapLayer } from './layer'
import { TileLayer } from './layer/TileLayer';
import { TiledRoadMapLayer } from './layer/TiledRoadMapLayer';
import { TiledOSMapLayer } from './layer/TiledOSMapLayer';
import { TiledMapLayer } from './layer/TiledMapLayer';
import { TiledAdminMapLayer } from './layer/TiledAdminMapLayer';
import { FeatureLayer } from './layer/FeatureLayer';
import { HeatMapLayer } from './layer/HeatMapLayer';
import { BasemapArcgisLayer } from './layer/BasemapArcgisLayer';
import { AnimatedCluster } from './layer/AnimatedCluster';
import { WMS } from './layer/WMS';
import { WMTS } from './layer/WMTS';
import { VectorTiledMapLayer } from './layer/VectorTiledMapLayer';
import { DomOverlay } from './layer/DomOverlay';
import { Overlay } from './layer/Overlay';

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
    ol.ekmap.control.BaseLayer = ol_control_BaseLayer;


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
    ol.ekmap.WMS = WMS;
    ol.ekmap.WMTS = WMTS;
    ol.layer.HeatMapLayer = HeatMapLayer;
    ol.layer.AnimatedCluster = AnimatedCluster;
    ol.ekmap.VectorTiledMapLayer = VectorTiledMapLayer;
    ol.ekmap.BasemapArcgisLayer = BasemapArcgisLayer;
    ol.ekmap.DomOverlay = DomOverlay;
    ol.ekmap.Overlay = Overlay;

    // service
    ol.ekmap.MapService = MapService;
    ol.ekmap.ServiceBase = ServiceBase;
    ol.ekmap.IdentifyFeatures = IdentifyFeatures;
    ol.ekmap.FeatureService = FeatureService;

}
export * from './control';
export * from './layer';