import { ScaleLine } from './control';
import { BaseLayer } from './control';
import { TiledVietNamMapLayer } from './layer'
if (window && window.ol) {
    let ol = window.ol;
    ol.ekmap = window.ol.ekmap || {};
    ol.ekmap.control = window.ol.ekmap.control || {};
    // control
    ol.ekmap.control.ScaleLine = ScaleLine;
    ol.ekmap.control.BaseLayer = BaseLayer;
    ol.ekmap.TiledVietNamMapLayer = TiledVietNamMapLayer;
    // core

    // mapping

    // overlay

    // service
}
export * from './control';
export * from './layer';