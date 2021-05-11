import VectorLayer from 'ol/layer/Vector';

/**
 * @class ol.ekmap.AnimatedCluster
 * @classdesc The AnimatedCluster class.
 * @category  Layer
 * @extends {ol.layer.Vector}
 * @param {olx.layer.AnimatedClusterOptions=} options
 */
export class AnimatedCluster extends VectorLayer {

    constructor(options) {
        var options = options || {};
        super(options)
            // VectorLayer.call(this, options);

        this.oldcluster = new ol.source.Vector();
        this.clusters = [];
        this.animation = { start: false };
        this.set('animationDuration', typeof(options.animationDuration) == 'number' ? options.animationDuration : 700);
        this.set('animationMethod', options.animationMethod || ol.easing.easeOut);

        // Save cluster before change
        this.getSource().on('change', this.saveCluster.bind(this));
        // Animate the cluster
        this.on('precompose', this.animate.bind(this));
        this.on('postcompose', this.postanimate.bind(this));
    };

    saveCluster() {
        this.oldcluster.clear();
        if (!this.get('animationDuration')) return;
        var features = this.getSource().getFeatures();
        if (features.length && features[0].get('features')) {
            this.oldcluster.addFeatures(this.clusters);
            this.clusters = features.slice(0);
            this.sourceChanged = true;
        }
    }

    getClusterForFeature(f, cluster) {
        for (var j = 0, c; c = cluster[j]; j++) {
            var features = cluster[j].get('features');
            if (features && features.length) {
                for (var k = 0, f2; f2 = features[k]; k++) {
                    if (f === f2) {
                        return cluster[j];
                    }
                }
            }
        }
        return false;
    }


    stopAnimation() {
        this.animation.start = false;
        this.animation.cA = [];
        this.animation.cB = [];
    }


    animate(e) {
        var duration = this.get('animationDuration');
        if (!duration) return;
        var resolution = e.frameState.viewState.resolution;
        var a = this.animation;
        var time = e.frameState.time;

        // Start a new animation, if change resolution and source has changed
        if (a.resolution != resolution && this.sourceChanged) {
            var extent = e.frameState.extent;
            if (a.resolution < resolution) {
                extent = ol.extent.buffer(extent, 100 * resolution);
                a.cA = this.oldcluster.getFeaturesInExtent(extent);
                a.cB = this.getSource().getFeaturesInExtent(extent);
                a.revers = false;
            } else {
                extent = ol.extent.buffer(extent, 100 * resolution);
                a.cA = this.getSource().getFeaturesInExtent(extent);
                a.cB = this.oldcluster.getFeaturesInExtent(extent);
                a.revers = true;
            }
            a.clusters = [];
            for (var i = 0, c0; c0 = a.cA[i]; i++) {
                var f = c0.get('features');
                if (f && f.length) {
                    var c = this.getClusterForFeature(f[0], a.cB);
                    if (c) a.clusters.push({ f: c0, pt: c.getGeometry().getCoordinates() });
                }
            }
            // Save state
            a.resolution = resolution;
            this.sourceChanged = false;

            // No cluster or too much to animate
            if (!a.clusters.length || a.clusters.length > 1000) {
                this.stopAnimation();
                return;
            }
            // Start animation from now
            time = a.start = (new Date()).getTime();
        }

        // Run animation
        if (a.start) {
            var vectorContext = e.vectorContext;
            var d = (time - a.start) / duration;
            // Animation ends
            if (d > 1.0) {
                this.stopAnimation();
                d = 1;
            }
            d = this.get('animationMethod')(d);
            // Animate
            var style = this.getStyle();
            var stylefn = (typeof(style) == 'function') ? style : style.length ? function() { return style; } : function() { return [style]; };
            // Layer opacity
            e.context.save();
            e.context.globalAlpha = this.getOpacity();
            // Retina device
            var ratio = e.frameState.pixelRatio;
            for (var i = 0, c; c = a.clusters[i]; i++) {
                var pt = c.f.getGeometry().getCoordinates();
                if (a.revers) {
                    pt[0] = c.pt[0] + d * (pt[0] - c.pt[0]);
                    pt[1] = c.pt[1] + d * (pt[1] - c.pt[1]);
                } else {
                    pt[0] = pt[0] + d * (c.pt[0] - pt[0]);
                    pt[1] = pt[1] + d * (c.pt[1] - pt[1]);
                }
                // Draw feature
                var st = stylefn(c.f, resolution);
                /* Preserve pixel ration on retina */
                var geo = new ol.geom.Point(pt);
                for (var k = 0; s = st[k]; k++) {
                    var sc;
                    // OL < v4.3 : setImageStyle doesn't check retina
                    var imgs = ol.Map.prototype.getFeaturesAtPixel ? false : s.getImage();
                    if (imgs) {
                        sc = imgs.getScale();
                        imgs.setScale(sc * ratio);
                    }
                    // OL3 > v3.14
                    if (vectorContext.setStyle) {
                        vectorContext.setStyle(s);
                        vectorContext.drawGeometry(geo);
                    }
                    // older version
                    else {
                        vectorContext.setImageStyle(imgs);
                        vectorContext.setTextStyle(s.getText());
                        vectorContext.drawPointGeometry(geo);
                    }
                    if (imgs) imgs.setScale(sc);
                }
                /*/
                var f = new ol.Feature(new ol.geom.Point(pt));
                for (var k=0; s=st[k]; k++)
                {	var imgs = s.getImage();
                	var sc = imgs.getScale(); 
                	imgs.setScale(sc*ratio); // drawFeature don't check retina
                	vectorContext.drawFeature(f, s);
                	imgs.setScale(sc);
                }
                /**/
            }
            e.context.restore();
            // tell OL3 to continue postcompose animation
            e.frameState.animate = true;

            // Prevent layer drawing (clip with null rect)
            e.context.save();
            e.context.beginPath();
            e.context.rect(0, 0, 0, 0);
            e.context.clip();
            this.clip_ = true;
        }

        return;
    }

    postanimate(e) {
        if (this.clip_) {
            e.context.restore();
            this.clip_ = false;
        }
    }
}