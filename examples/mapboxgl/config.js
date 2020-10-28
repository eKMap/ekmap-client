/* 
 * MapboxGL
 */
var identification = {
    name: "MapboxGL"
};

var exampleConfig = {
    ekmapServer: {
        name: "eKMap Server",
        name_en: "eKMap Server",
        content: {
            map: {
                name: "Map service",
                name_en: "Map service",
                content: [
                    {
                        name: "Map Find Service",
                        name_en: "Map Find Service",
                        thumbnail: "mapService_find.png",
                        fileName: "mapService_find"
                    },
                    {
                        name: "Bounds query",
                        name_en: "Bounds query",
                        thumbnail: "mapService_queryByBound.png",
                        fileName: "mapService_queryByBound"
                    },
                    {
                        name: "Geometry query",
                        name_en: "Geometry query",
                        thumbnail: "mapService_queryByGeometry.png",
                        fileName: "mapService_queryByGeometry"
                    },
                    {
                        name: "Identify",
                        name_en: "Identify",
                        thumbnail: "mapService_identify.png",
                        fileName: "mapService_identify"
                    },
                    {
                        name: "Image Tile ZYX",
                        name_en: "Image Tile ZYX",
                        thumbnail: "mapService_ImageTileZYX.png",
                        fileName: "mapService_ImageTileZYX"
                    },
                ]
            },
            data: {
                name: "Data service",
                name_en: "Data service",
                content: [
                    {
                        name: "Bounds query",
                        name_en: "Bounds query",
                        thumbnail: "featureService_queryByBound.png",
                        fileName: "featureService_getFeaturesByBound"
                    },
                    {
                        name: "Geometry query",
                        name_en: "Geometry query",
                        thumbnail: "featureService_queryByGeometry.png",
                        fileName: "featureService_getFeaturesByGeometry"
                    },
                    {
                        name: "Apply Edits",
                        name_en: "Apply Edits",
                        thumbnail: "featureService_applyEditsFeatures.png",
                        fileName: "featureService_applyEditsFeatures"
                    },
                    {
                        name: "Add Features",
                        name_en: "Add Features",
                        thumbnail: "featureService_addFeatures.png",
                        fileName: "featureService_addFeatures"
                    },
                    {
                        name: "Update Features",
                        name_en: "Update Features",
                        thumbnail: "featureService_updateFeatures.png",
                        fileName: "featureService_updateFeatures"
                    },
                    {
                        name: "Delete Features",
                        name_en: "Delete Features",
                        thumbnail: "featureService_deleteFeatures.png",
                        fileName: "featureService_deleteFeatures"
                    },
                ]
            },
            vectortile: {
                name: "Vector Tile Services",
                name_en: "Vector Tile Services",
                content: [
                    {
                        name: "Mapbox Vector Tile",
                        name_en: "Mapbox Vector Tile",
                        thumbnail: "vectorTile_Map.png",
                        fileName: "vectorTile_Map"
                    },
                    {
                        name: "Mapbox Vector Tile Overlay",
                        name_en: "Mapbox Vector Tile Overlay",
                        thumbnail: "vectorTile_Map_overlay.png",
                        fileName: "vectorTile_Map_overlay"
                    },
                    {
                        name: "Mapbox Vector Tile Hover",
                        name_en: "Mapbox Vector Tile Hover",
                        thumbnail: "vectorTile_Map_hover.gif",
                        fileName: "vectorTile_Map_hover"
                    },
                    {
                        name: "Mapbox Vector Tile Select",
                        name_en: "Mapbox Vector Tile Select",
                        thumbnail: "vectorTile_Map_select.gif",
                        fileName: "vectorTile_Map_select"
                    }

                ]
            },
            control: {
                name: "Control",
                name_en: "Control",
                content: [
                    {
                        name: "Legend Control",
                        name_en: "Legend Control",
                        thumbnail: "control_legendControl.png",
                        fileName: "control_legendControl"
                    },
                    {
                        name: "Feature Infomation Control",
                        name_en: "Feature Infomation ",
                        thumbnail: "control_featureInfomationControl.png",
                        fileName: "control_featureInfomationControl"
                    }
                ]
            }
        }
    },
    viz: {
        name: "Visualization",
        name_en: "Visualization",
        content: {
            tile: {
                name: "Tiled map",
                name_en: "Tiled map",
                version: "",
                content: [
                    // {
                    //     name: "Admin map",
                    //     name_en: "Admin map",
                    //     thumbnail: "tiledMap_adminmap.png",
                    //     fileName: "tiledMap_adminmap"
                    // },
                    // {
                    //     name: "Road map",
                    //     name_en: "Road map",
                    //     thumbnail: "tiledMap_roadMap.png",
                    //     fileName: "tiledMap_roadmap"
                    // },
                    {
                        name: "OSM Standard",
                        name_en: "OSM Standard",
                        thumbnail: "tiledMap_osmMap.png",
                        fileName: "tiledMap_osmMap"
                    }

                ]
            },
            heat: {
                name: "Heat map",
                name_en: "Heat map",
                version: "",
                content: [
                    {
                        name: "random points",
                        name_en: "random points",
                        version: "",
                        thumbnail: "heatMapLayer_mbgl.png",
                        fileName: "heatMapLayer_mbgl"
                    },
                    {
                        name: "Heatmap Layer",
                        name_en: "Heatmap Layer",
                        version: "",
                        thumbnail: "heatMapLayerBTS.png",
                        fileName: "heatMapLayer"
                    },
                ]
            },
            cluster: {
                name: "Cluster",
                name_en: "Cluster",
                version: "",
                content: [
                    {
                        name: "Cluster",
                        name_en: "Marker cluster",
                        version: "",
                        thumbnail: "cluster.gif",
                        fileName: "cluster"
                    }
                ]
            },
            animation: {
                name: "Animation",
                name_en: "Animation",
                content: [
                    {
                        name: "flashing points",
                        name_en: "flashing points",
                        thumbnail: "animation_flashing_point.gif",
                        fileName: "animation_flashing_point"
                    },
                    {
                        name: "point",
                        name_en: "point",
                        thumbnail: "animation_point.png",
                        fileName: "animation_point"
                    }
                ]
            },
            ECharts: {
                name: "ECharts",
                name_en: "ECharts",
                content: [
                    {
                        name: "line chart",
                        name_en: "line chart",
                        thumbnail: "echarts_lineMarker.gif",
                        fileName: "echarts_lineMarker"
                    },
                    {
                        name: "bar chart",
                        name_en: "bar chart",
                        thumbnail: "echarts_bar.gif",
                        fileName: "echarts_bar"
                    },
                    {
                        name: "scatter chart",
                        name_en: "scatter chart",
                        thumbnail: "echarts_scatter.gif",
                        fileName: "echarts_scatter"
                    },
                    {
                        name: "pie chart",
                        name_en: "pie chart",
                        thumbnail: "echarts_pie.gif",
                        fileName: "echarts_pie"
                    }
                ]
            },
            HightChart: {
                name: "Hight Chart",
                name_en: "Hight Chart",
                content: [
                    {
                        name: "bar highcharts",
                        name_en: "bar highcharts",
                        thumbnail: "highcharts_bar.gif",
                        fileName: "highcharts_bar"
                    },
                    {
                        name: "line highcharts",
                        name_en: "line highcharts",
                        thumbnail: "highcharts_line.gif",
                        fileName: "highcharts_line"
                    },
                    {
                        name: "pie highcharts",
                        name_en: "pie highcharts",
                        thumbnail: "highcharts_pie.gif",
                        fileName: "highcharts_pie"
                    },
                ]
            },
            ChartOnline: {
                name: "Chart Online",
                name_en: "Chart Online",
                content: [
                    {
                        name: "Data rain",
                        name_en: "Data rain",
                        thumbnail: "data_rain.png",
                        fileName: "data_rain"
                    }
                ]
            },
            threejs: {
                name: "threejs",
                name_en: "threejs",
                content: [
                    {
                        name: "buildings",
                        name_en: "buildings",
                        version: "",
                        thumbnail: "threejsLayer_buildings.png",
                        fileName: "threejsLayer_buildings"
                    },
                    {
                        name: "airplane(gltf)",
                        name_en: "airplane(gltf)",
                        version: "",
                        thumbnail: "threejsLayer_airplane.gif",
                        fileName: "threejsLayer_airplane"
                    }
                ]
            },
            LayerChart: {
                name: "Layer Chart",
                name_en: "Layer Chart",
                content: [
                    {
                        name: "Layer Chart",
                        name_en: "Layer Chart",
                        thumbnail: "layerChart.png",
                        fileName: "layerChart"
                    },
                    {
                        name: "Water HightChart",
                        name_en: "Water HightChart",
                        thumbnail: "highcharts_lineWater.png",
                        fileName: "highcharts_lineWater"
                    }
                ]
            },
            '3DLayer': {
                name: "3D Layer",
                name_en: "3D Layer",
                content: [
                    {
                        name: "3D buildings",
                        name_en: "3D buildings",
                        version: "",
                        thumbnail: "data_3D.gif",
                        fileName: "data_3D"
                    }
                ]
            },
            Realtime: {
                name: "Realtime",
                name_en: "Realtime",
                content: [
                    {
                        name: "Realtime Water",
                        name_en: "Realtime Water",
                        thumbnail: "realtime_water.gif",
                        fileName: "realtime_water"
                    },
                    {
                        name: "Realtime Satellite Image",
                        name_en: "Realtime Satellite Image",
                        thumbnail: "realtime_satelliteImage.gif",
                        fileName: "realtime_satelliteImage"
                    },
                    {
                        name: "Realtime Car",
                        name_en: "Realtime Car",
                        thumbnail: "realtime_car.gif",
                        fileName: "realtime_car"
                    }
                ]
            },
            Timeline: {
                name: "Timeline",
                name_en: "Timeline",
                content: [
                    {
                        name: "Timeline Coronavirus (Heatmap)",
                        name_en: "Timeline Coronavirus (Heatmap)",
                        thumbnail: "timeline_heatMapCov.gif",
                        fileName: "timeline_heatMapCov"
                    },
                    {
                        name: "Timeline Coronavirus (Area)",
                        name_en: "Timeline Coronavirus (Area)",
                        thumbnail: "timeline_fillCov.gif",
                        fileName: "timeline_fillCov"
                    },
                    {
                        name: "Timeline Coronavirus (Buffer)",
                        name_en: "Timeline Coronavirus (Buffer)",
                        thumbnail: "timeline_bufferCov.gif",
                        fileName: "timeline_bufferCov"
                    }
                ]
            },
            Video: {
                name: "Video",
                name_en: "Video",
                content: [
                    {
                        name: "Video Storm",
                        name_en: "Video Storm",
                        thumbnail: "video_storm.gif",
                        fileName: "video_storm"
                    }
                ]
            },
            StoryMap: {
                name: "Story Map",
                name_en: "Story Map",
                content: [
                    {
                        name: "Vinhomes real estate",
                        name_en: "Vinhomes real estate",
                        thumbnail: "storyMap_vinhomes.gif",
                        fileName: "storyMap_vinhomes"
                    }
                ]
            },
            MapTour: {
                name: "Map Tour",
                name_en: "Map Tour",
                content: [
                    {
                        name: "Tour Hue - Hoi An - Da Nang",
                        name_en: "Tour Hue - Hoi An - Da Nang",
                        thumbnail: "mapTour.gif",
                        fileName: "mapTour"
                    }
                ]
            },

        }
    },
    clientspatial: {
        name: "Client spatial analysis",
        name_en: "Client spatial analysis",
        content: {
            turfjs: {
                name: "turfjs",
                name_en: "turfjs",
                content: [
                    {
                        name: "Hexagon",
                        name_en: "Hexagon",
                        thumbnail: "turfjs_Hexagon.png",
                        fileName: "turfjs_Hexagon"
                    },
                    {
                        name: "Voronoi",
                        name_en: "Voronoi",
                        thumbnail: "turfjs_Voronoi.png",
                        fileName: "turfjs_Voronoi"
                    },
                    {
                        name: "Buffer",
                        name_en: "Buffer",
                        thumbnail: "turfjs_Buffer.png",
                        fileName: "turfjs_Buffer"
                    },
                    {
                        name: "Data Storm",
                        name_en: "Data Storm",
                        thumbnail: "data_storm.png",
                        fileName: "data_storm"
                    }
                ]
            }
        }
    },
    control: {
        name: "Control",
        name_en: "Control",
        content: {
            BasicControl: {
                name: "Control",
                name_en: "Basic Control",
                content: [
                    {
                        name: "Navigation Control",
                        name_en: "Navigation Control",
                        thumbnail: "control_navigationControl.png",
                        fileName: "control_navigationControl"
                    },
                    {
                        name: "Scale Control",
                        name_en: "Scale Control",
                        thumbnail: "control_scaleControl.png",
                        fileName: "control_scaleControl"
                    },
                    {
                        name: "Fullscreen Control",
                        name_en: "Fullscreen Control",
                        thumbnail: "control_fullscreenControl.png",
                        fileName: "control_fullscreenControl"
                    },
                    {
                        name: "Geolocate Control",
                        name_en: "Geolocate Control",
                        thumbnail: "control_geolocateControl.png",
                        fileName: "control_geolocateControl"
                    },
                    {
                        name: "Attribution Control",
                        name_en: "Attribution Control",
                        thumbnail: "control_attributionControl.png",
                        fileName: "control_attributionControl"
                    }
                ]
            },
            AdvancedControl: {
                name: "Control",
                name_en: "Advanced Control",
                content: [
                    {
                        name: "Draw Control",
                        name_en: "Draw Control",
                        thumbnail: "control_drawControl.png",
                        fileName: "control_drawControl"
                    },
                    {
                        name: "Swipe between maps",
                        name_en: "Swipe between maps",
                        thumbnail: "control_swipeBetweenMap.png",
                        fileName: "control_swipeBetweenMap"
                    },
                    {
                        name: "Side By Side",
                        name_en: "Side By Side",
                        thumbnail: "control_sideBySide.png",
                        fileName: "control_sideBySide"
                    },
                    {
                        name: "Snapshot maps",
                        name_en: "Snapshot maps",
                        thumbnail: "control_snapShotControl.png",
                        fileName: "control_snapShotControl"
                    }]
            }
        }
    }
};

//icon css sideBar
var sideBarIconConfig = {
    ekmapServer: "fa-globe",
    viz: "fa-map",
    clientspatial: "fa-object-group",
    control: "fa-sliders"
};


var exampleIconConfig = {
    ekmapServer: "fa-server",
    viz: "fa-map",
    control: "fa-sliders"
};
window.mapboxglExampleConfig = exampleConfig;
