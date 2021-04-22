import { ScaleLine } from './control';
import BaseLayerControl from "./control/BaseLayer";
import Legend from "./control/Legend";
import FeatureInfomation from "./control/FeatureInfomation";
import SnapShot from "./control/SnapShot";
import Reverse from "./control/Reverse";
import Geocoder from "./control/Geocoder";
import TreeLayer from "./control/TreeLayer";
import TreeLayerGroup from "./control/TreeLayerGroup"
import Location from "./control/Location";
import Target from "./control/Target";
import CanvasBase from "./control/CanvasBase";
import Magnify from "./control/Magnify";
import Clip from "./control/Clip";



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
import { WFS } from './layer/WFS';
import { WMTS } from './layer/WMTS';
import { VectorTiledMapLayer } from './layer/VectorTiledMapLayer';
import { DomOverlay } from './layer/DomOverlay';
import { ImageMapLayer } from './layer/ImageMapLayer';
import Overlay from './layer/Overlay';
import PerspectiveMap from './map/PerspectiveMap';

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
    ol.ekmap.overlay = window.ol.ekmap.overlay || {};
    ol.ekmap.interaction = window.ol.ekmap.interaction || {};

    // control
    ol.ekmap.control.ScaleLine = ScaleLine;
    ol.ekmap.control.BaseLayer = BaseLayerControl;
    ol.ekmap.control.Legend = Legend;
    ol.ekmap.control.FeatureInfomation = FeatureInfomation;
    ol.ekmap.control.SnapShot = SnapShot;
    ol.ekmap.control.Reverse = Reverse;
    ol.ekmap.control.Geocoder = Geocoder;
    ol.ekmap.control.TreeLayer = TreeLayer;
    ol.ekmap.control.TreeLayerGroup = TreeLayerGroup;
    ol.ekmap.control.Location = Location;
    ol.ekmap.control.Target = Target;
    ol.ekmap.control.CanvasBase = CanvasBase;
    ol.ekmap.overlay.Magnify = Magnify;
    ol.ekmap.interaction.Clip = Clip;


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
    ol.ekmap.WFS = WFS;
    ol.layer.HeatMapLayer = HeatMapLayer;
    ol.layer.AnimatedCluster = AnimatedCluster;
    ol.ekmap.VectorTiledMapLayer = VectorTiledMapLayer;
    ol.ekmap.BasemapArcgisLayer = BasemapArcgisLayer;
    ol.ekmap.DomOverlay = DomOverlay;
    ol.ekmap.Overlay = Overlay;
    ol.ekmap.PerspectiveMap = PerspectiveMap
    ol.ekmap.ImageMapLayer = ImageMapLayer

    // service
    ol.ekmap.MapService = MapService;
    ol.ekmap.ServiceBase = ServiceBase;
    ol.ekmap.IdentifyFeatures = IdentifyFeatures;
    ol.ekmap.FeatureService = FeatureService;

}
export * from './control';
export * from './layer';