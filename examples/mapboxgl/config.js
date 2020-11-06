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
                        fileName: "mapService_find",
                        subject: "Use the find API included in Map Services. It provides a chainable API for building request parameters and executing find tasks.",
                        description: ""
                    },
                    {
                        name: "Bounds query",
                        name_en: "Bounds query",
                        thumbnail: "mapService_queryByBound.png",
                        fileName: "mapService_queryByBound",
                        subject: "Use queryByBound of mapboxgl.ekmap.FeatureLayer to query points in any bound.",
                        description: ""
                    },
                    {
                        name: "Geometry query",
                        name_en: "Geometry query",
                        thumbnail: "mapService_queryByGeometry.png",
                        fileName: "mapService_queryByGeometry",
                        subject: "Use queryByGeometry of mapboxgl.ekmap.FeatureLayer to query points in any geometry.",
                        description: ""
                    },
                    {
                        name: "Identify",
                        name_en: "Identify",
                        thumbnail: "mapService_identify.png",
                        fileName: "mapService_identify",
                        subject: "Use identify of mapboxgle.ekmap.TiledMapLayer resource to discover features at a geographic location",
                        description: ""
                    },
                    {
                        name: "Image Tile ZYX",
                        name_en: "Image Tile ZYX",
                        thumbnail: "mapService_ImageTileZYX.png",
                        fileName: "mapService_ImageTileZYX",
                        subject: "Use mapboxgl.ekmap.TiledMapLayer to add image tile ZYX to your map.",
                        description: ""
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
                        fileName: "featureService_getFeaturesByBound",
                        subject: "Use getFeaturesByBound of mapboxgl.ekmap.FeatureLayer to query points in any bound.",
                        description: ""

                    },
                    {
                        name: "Geometry query",
                        name_en: "Geometry query",
                        thumbnail: "featureService_queryByGeometry.png",
                        fileName: "featureService_getFeaturesByGeometry",
                        subject: "Use getFeaturesByGeometry of mapboxgl.ekmap.FeatureLayer to query points in any geometry.",
                        description: ""
                    },
                    {
                        name: "Apply Edits",
                        name_en: "Apply Edits",
                        thumbnail: "featureService_applyEditsFeatures.png",
                        fileName: "featureService_applyEditsFeatures",
                        subject: "Use applyEditsFeatures of mapboxgl.ekmap.FeatureLayer to add, edit, or delete operations.",
                        description: ""
                    },
                    {
                        name: "Add Features",
                        name_en: "Add Features",
                        thumbnail: "featureService_addFeatures.png",
                        fileName: "featureService_addFeatures",
                        subject: "Use addFeatures of mapboxgl.ekmap.FeatureLayer to add points to the map.",
                        description: ""
                    },
                    {
                        name: "Update Features",
                        name_en: "Update Features",
                        thumbnail: "featureService_updateFeatures.png",
                        fileName: "featureService_updateFeatures",
                        subject: "Use updateFeatures of mapboxgl.ekmap.FeatureLayer to update location points on the map.",
                        description: ""
                    },
                    {
                        name: "Delete Features",
                        name_en: "Delete Features",
                        thumbnail: "featureService_deleteFeatures.png",
                        fileName: "featureService_deleteFeatures",
                        subject: "Use deleteFeatures of mapboxgl.ekmap.FeatureLayer to delete points on the map.",
                        description: ""
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
                        fileName: "vectorTile_Map",
                        subject: "Use mapboxgl.ekmap.VectorTiledMapLayer to add vector tile.",
                        description: ""
                    },
                    {
                        name: "Mapbox Vector Tile Overlay",
                        name_en: "Mapbox Vector Tile Overlay",
                        thumbnail: "vectorTile_Map_overlay.png",
                        fileName: "vectorTile_Map_overlay",
                        subject: "Add vector tile overlay to the map.",
                        description: ""
                    },
                    {
                        name: "Mapbox Vector Tile Hover",
                        name_en: "Mapbox Vector Tile Hover",
                        thumbnail: "vectorTile_Map_hover.gif",
                        fileName: "vectorTile_Map_hover",
                        subject: "Using events and feature states to create a per feature hover effect.",
                        description: ""
                    },
                    {
                        name: "Mapbox Vector Tile Select",
                        name_en: "Mapbox Vector Tile Select",
                        thumbnail: "vectorTile_Map_select.gif",
                        fileName: "vectorTile_Map_select",
                        subject: "Vector tile select on the map.",
                        description: ""
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
                        fileName: "control_legendControl",
                        subject: "Use control legend of mapboxgl.ekmap.control. It returns the legend information for all layers in the service. Each layer's legend information includes the symbol images and labels for each symbol.",
                        description: ""
                    },
                    {
                        name: "Feature Infomation Control",
                        name_en: "Feature Infomation ",
                        thumbnail: "control_featureInfomationControl.png",
                        fileName: "control_featureInfomationControl",
                        subject: "Use control featureInfomation of mapboxgl.ekmap.control to retrieve the selected object.",
                        description: ""
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
                        name: "Viet Nam Map",
                        name_en: "Viet Nam Map",
                        thumbnail: "tiledMap_vnMap.png",
                        fileName: "tiledMap_vnMap",
                        subject: "Use mapboxgl.ekmap.TiledVietNamMapLayer",
                        description: ""
                    },
                    {
                        name: "OSM Standard",
                        name_en: "OSM Standard",
                        thumbnail: "tiledMap_osmMap.png",
                        fileName: "tiledMap_osmMap",
                        subject: "Use mapboxgl.ekmap.TiledOSMapLayer",
                        description: ""
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
                        fileName: "heatMapLayer_mbgl",
                        subject: "Add layer heatmap to the map (random points) using a heatmap layer.",
                        description: ""
                    },
                    {
                        name: "Heatmap Layer",
                        name_en: "Heatmap Layer",
                        version: "",
                        thumbnail: "heatMapLayer.png",
                        fileName: "heatMapLayer",
                        subject: "Use mapboxgl.ekmap.HeatMapLayer add layer heatmap to the map",
                        description: ""
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
                        fileName: "cluster",
                        subject: "Use Mapbox GL JS' built-in functions to visualize points as clusters.",
                        description: ""
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
                        fileName: "animation_flashing_point",
                        subject: "Add an animated icon to the map that was generated at runtime with a Canvas.",
                        description: ""
                    },
                    {
                        name: "point",
                        name_en: "point",
                        thumbnail: "animation_point.gif",
                        fileName: "animation_point",
                        subject: "Animate the position of a point by updating a GeoJSON source on each frame.",
                        description: ""
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
                        fileName: "echarts_lineMarker",
                        subject: "Use echarts to display line chart.",
                        description: ""
                    },
                    {
                        name: "bar chart",
                        name_en: "bar chart",
                        thumbnail: "echarts_bar.gif",
                        fileName: "echarts_bar",
                        subject: "Use echarts to display bar chart.",
                        description: ""
                    },
                    {
                        name: "scatter chart",
                        name_en: "scatter chart",
                        thumbnail: "echarts_scatter.gif",
                        fileName: "echarts_scatter",
                        subject: "Use echarts to display scatter chart.",
                        description: ""
                    },
                    {
                        name: "pie chart",
                        name_en: "pie chart",
                        thumbnail: "echarts_pie.gif",
                        fileName: "echarts_pie",
                        subject: "Use echarts to display pie chart.",
                        description: ""
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
                        fileName: "highcharts_bar",
                        subject: "Use highcharts to display bar.",
                        description: ""
                    },
                    {
                        name: "line highcharts",
                        name_en: "line highcharts",
                        thumbnail: "highcharts_line.gif",
                        fileName: "highcharts_line",
                        subject: "Use highcharts to display line.",
                        description: ""
                    },
                    {
                        name: "pie highcharts",
                        name_en: "pie highcharts",
                        thumbnail: "highcharts_pie.gif",
                        fileName: "highcharts_pie",
                        subject: "Use highcharts to display pie.",
                        description: ""
                    },
                    {
                        name: "Water HightChart",
                        name_en: "Water HightChart",
                        thumbnail: "highcharts_lineWater.png",
                        fileName: "highcharts_lineWater",
                        subject: "Detailed display of SCADA measuring point chart data.",
                        description: ""
                    }
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
                        fileName: "data_rain",
                        subject: "Display flood warning data, rainfall information in Central - Vietnam.",
                        description: ""
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
                        fileName: "threejsLayer_buildings",
                        subject: "Use mapboxgl.ekmap.ThreeLayer.",
                        description: ""
                    },
                    {
                        name: "airplane(gltf)",
                        name_en: "airplane(gltf)",
                        version: "",
                        thumbnail: "threejsLayer_airplane.gif",
                        fileName: "threejsLayer_airplane",
                        subject: "Use mapboxgl.ekmap.ThreeLayer.",
                        description: ""
                    }
                ]
            },
            LayerChart: {
                name: "Layer Chart",
                name_en: "Layer Chart",
                content: [
                    {
                        name: "Statistical Chart",
                        name_en: "Statistical Chart",
                        thumbnail: "layerChart.png",
                        fileName: "layerChart",
                        subject: "Use mapboxgl.ekmap.DomOverlay.",
                        description: ""
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
                        fileName: "data_3D",
                        subject: "3D data display shows the altitude of some Hanoi planning areas.",
                        description: ""
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
                        fileName: "realtime_water",
                        subject: "Display pressure zone data according to realtime data.",
                        description: ""
                    },
                    {
                        name: "Realtime Satellite Image",
                        name_en: "Realtime Satellite Image",
                        thumbnail: "realtime_satelliteImage.gif",
                        fileName: "realtime_satelliteImage",
                        subject: "Displays a list of satellite imagery over time.",
                        description: ""
                    },
                    {
                        name: "Realtime Car",
                        name_en: "Realtime Car",
                        thumbnail: "realtime_car.gif",
                        fileName: "realtime_car",
                        subject: "Tracking a moving position, information of the rest stops when the car goes there.",
                        description: ""
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
                        fileName: "video_storm",
                        subject: "Tracking a moving position, information of the rest stops when the car goes there.",
                        description: ""
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
                        fileName: "storyMap_vinhomes",
                        subject: "Display map of real estate project list Vinhomes.",
                        description: ""
                    },
                    {
                        name: "Tour Hue - Hoi An - Da Nang",
                        name_en: "Tour Hue - Hoi An - Da Nang",
                        thumbnail: "mapTour.png",
                        fileName: "mapTour",
                        subject: "Tracking a moving position, information of the rest stops when the car goes there.",
                        description: ""
                    },
                    {
                        name: "Timeline Coronavirus (Heatmap)",
                        name_en: "Timeline Coronavirus (Heatmap)",
                        thumbnail: "timeline_heatMapCov.gif",
                        fileName: "timeline_heatMapCov",
                        subject: "Tracking a moving position, information of the rest stops when the car goes there.",
                        description: ""
                    },
                    {
                        name: "Timeline Coronavirus (Area)",
                        name_en: "Timeline Coronavirus (Area)",
                        thumbnail: "timeline_fillCov.gif",
                        fileName: "timeline_fillCov",
                        subject: "Tracking a moving position, information of the rest stops when the car goes there.",
                        description: ""
                    },
                    // {
                    //     name: "Timeline Coronavirus (Buffer)",
                    //     name_en: "Timeline Coronavirus (Buffer)",
                    //     thumbnail: "timeline_bufferCov.gif",
                    //     fileName: "timeline_bufferCov"
                    // },
                    {
                        name: "Spiritual Tourism",
                        name_en: "Spiritual Tourism",
                        thumbnail: "storyMap_spiritualTourism.png",
                        fileName: "storyMap_spiritualTourism",
                        subject: "Tracking a moving position, information of the rest stops when the car goes there.",
                        description: ""
                    },

                ]
            }
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
                        fileName: "turfjs_Hexagon",
                        subject: "Tracking a moving position, information of the rest stops when the car goes there.",
                        description: ""
                    },
                    {
                        name: "Voronoi",
                        name_en: "Voronoi",
                        thumbnail: "turfjs_Voronoi.gif",
                        fileName: "turfjs_Voronoi",
                        subject: "Tracking a moving position, information of the rest stops when the car goes there.",
                        description: ""
                    },
                    {
                        name: "Buffer",
                        name_en: "Buffer",
                        thumbnail: "turfjs_Buffer.png",
                        fileName: "turfjs_Buffer",
                        subject: "Tracking a moving position, information of the rest stops when the car goes there.",
                        description: ""
                    },
                    {
                        name: "Data Storm",
                        name_en: "Data Storm",
                        thumbnail: "data_storm.png",
                        fileName: "data_storm",
                        subject: "Tracking a moving position, information of the rest stops when the car goes there.",
                        description: ""
                    }
                ]
            }
        }
    },
    OGC: {
        name: "OGC",
        name_en: "OGC",
        content: {
            OGC: {
                name: "OGC",
                name_en: "OGC",
                content: [
                    {
                        name: "Web Map Service",
                        name_en: "Web Map Service",
                        thumbnail: "ogc_wms.png",
                        fileName: "ogc_wms",
                        subject: "Tracking a moving position, information of the rest stops when the car goes there.",
                        description: ""
                    },
                    {
                        name: "Web Feature Service",
                        name_en: "Web Feature Service",
                        thumbnail: "ogc_wfs.png",
                        fileName: "ogc_wfs",
                        subject: "Tracking a moving position, information of the rest stops when the car goes there.",
                        description: ""
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
                        fileName: "control_navigationControl",
                        subject: "Tracking a moving position, information of the rest stops when the car goes there.",
                        description: ""
                    },
                    {
                        name: "Scale Control",
                        name_en: "Scale Control",
                        thumbnail: "control_scaleControl.png",
                        fileName: "control_scaleControl",
                        subject: "Tracking a moving position, information of the rest stops when the car goes there.",
                        description: ""
                    },
                    {
                        name: "Fullscreen Control",
                        name_en: "Fullscreen Control",
                        thumbnail: "control_fullscreenControl.png",
                        fileName: "control_fullscreenControl",
                        subject: "Tracking a moving position, information of the rest stops when the car goes there.",
                        description: ""
                    },
                    {
                        name: "Geolocate Control",
                        name_en: "Geolocate Control",
                        thumbnail: "control_geolocateControl.png",
                        fileName: "control_geolocateControl",
                        subject: "Tracking a moving position, information of the rest stops when the car goes there.",
                        description: ""
                    },
                    {
                        name: "Attribution Control",
                        name_en: "Attribution Control",
                        thumbnail: "control_attributionControl.png",
                        fileName: "control_attributionControl",
                        subject: "Tracking a moving position, information of the rest stops when the car goes there.",
                        description: ""
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
                        fileName: "control_drawControl",
                        subject: "Tracking a moving position, information of the rest stops when the car goes there.",
                        description: ""
                    },
                    {
                        name: "Swipe between maps",
                        name_en: "Swipe between maps",
                        thumbnail: "control_swipeBetweenMap.png",
                        fileName: "control_swipeBetweenMap",
                        subject: "Tracking a moving position, information of the rest stops when the car goes there.",
                        description: ""
                    },
                    {
                        name: "Side By Side",
                        name_en: "Side By Side",
                        thumbnail: "control_sideBySide.png",
                        fileName: "control_sideBySide",
                        subject: "Tracking a moving position, information of the rest stops when the car goes there.",
                        description: ""
                    },
                    {
                        name: "Snapshot maps",
                        name_en: "Snapshot maps",
                        thumbnail: "control_snapShotControl.png",
                        fileName: "control_snapShotControl",
                        subject: "Tracking a moving position, information of the rest stops when the car goes there.",
                        description: ""
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
