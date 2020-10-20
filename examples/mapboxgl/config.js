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
                        thumbnail: "vectorTile_Map_select.png",
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
                        thumbnail: "animation_flashing_point.png",
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
                    // {
                    //     name: "ECharts",
                    //     name_en: "ECharts",
                    //     thumbnail: "echarts_effectScatter.png",
                    //     fileName: "echarts_effectScatter"
                    // },
                    // {
                    //     name: "Mock migration",
                    //     name_en: "Mock migration",
                    //     thumbnail: "echarts_geoline.gif",
                    //     fileName: "echarts_geoline"
                    // },
                    // {
                    //     name: "heat map",
                    //     name_en: "heat map",
                    //     thumbnail: "echarts_heatmap.png",
                    //     fileName: "echarts_heatmap"
                    // },
                    // {
                    //     name: "line",
                    //     name_en: "line",
                    //     thumbnail: "echarts_linesBus.png",
                    //     fileName: "echarts_linesBus"
                    // },
                    // {
                    //     name: "Changchun public transport network",
                    //     name_en: "Changchun public transport network",
                    //     thumbnail: "echarts_ChangchunPublicTransportNetwork.gif",
                    //     fileName: "echarts_ChangchunPublicTransportNetwork"
                    // },
                    {
                        name: "line chart",
                        name_en: "line chart",
                        thumbnail: "echart_lineMarker.png",
                        fileName: "echarts_lineMarker"
                    },
                    {
                        name: "bar chart",
                        name_en: "bar chart",
                        thumbnail: "echarts_bar.png",
                        fileName: "echarts_bar"
                    },
                    {
                        name: "scatter chart",
                        name_en: "scatter chart",
                        thumbnail: "echarts_scatter.png",
                        fileName: "echarts_scatter"
                    },
                    {
                        name: "pie chart",
                        name_en: "pie chart",
                        thumbnail: "echarts_pie.png",
                        fileName: "echarts_pie"
                    },
                    {
                        name: "bar highcharts",
                        name_en: "bar highcharts",
                        thumbnail: "highcharts_bar.png",
                        fileName: "highcharts_bar"
                    },
                    {
                        name: "line highcharts",
                        name_en: "line highcharts",
                        thumbnail: "highcharts_line.png",
                        fileName: "highcharts_line"
                    },
                    {
                        name: "pie highcharts",
                        name_en: "pie highcharts",
                        thumbnail: "highcharts_pie.png",
                        fileName: "highcharts_pie"
                    },
                    // {
                    //     name: "Airplane route map",
                    //     name_en: "Airplane route map",
                    //     thumbnail: "echarts_linesAirline.png",
                    //     fileName: "echarts_linesAirline"
                    // },
                    // {
                    //     name: "scatter of Weibo user",
                    //     name_en: "scatter of Weibo user",
                    //     thumbnail: "echarts_scatterWeibo.png",
                    //     fileName: "echarts_scatterWeibo"
                    // },

                    // {
                    //     name: "cell map",
                    //     name_en: "cell map",
                    //     thumbnail: "echarts_cellMap.png",
                    //     fileName: "echarts_cellMap"
                    // },
                    // {
                    //     name: "Use lines to draw 1.3 millions Beijing streets",
                    //     name_en: "Use lines to draw 1.3 millions Beijing streets",
                    //     localIgnore: true,
                    //     version: "",
                    //     thumbnail: "mb_echartsLinesMillionsBeijingRoads.png",
                    //     fileName: "echarts_linesDrawMillionsBeijingRoadsNetwork"
                    // },
                    // {
                    //     name: "Use scatter to draw 1.4 millions New York Taxi Points",
                    //     name_en: "Use scatter to draw 1.4 millions New York Taxi Points",
                    //     localIgnore: true,
                    //     version: "",
                    //     thumbnail: "mb_echartScatterMillionsNewYorkTaxi.png",
                    //     fileName: "echarts_scatterDrawMillionsNewYorkTaxiPoints"
                    // },
                    // {
                    //     name: "Use lines to draw 4 millions Chinese railways",
                    //     name_en: "Use lines to draw 4 millions Chinese railways",
                    //     localIgnore: true,
                    //     version: "",
                    //     thumbnail: "mb_echartsLinesMillionsRailway.png",
                    //     fileName: "echarts_linesDrawMillionsRailwaysNetwork"
                    // },
                    // {
                    //     name: "Use lines to draw 14 millions Chinese water system",
                    //     name_en: "Use lines to draw 14 millions Chinese water system",
                    //     localIgnore: true,
                    //     version: "",
                    //     thumbnail: "mb_echartsLinesMillionsWaterSystem.png",
                    //     fileName: "echarts_linesDrawMillionsWaterSystem"
                    // },
                    // {
                    //     name: "Use lines to draw 25 millions Chinese roads",
                    //     name_en: "Use lines to draw 25 millions Chinese roads",
                    //     localIgnore: true,
                    //     version: "",
                    //     thumbnail: "mb_echartsLinesMillionsRoads.png",
                    //     fileName: "echarts_linesDrawMillionsRoadsNetwork_50WFeatures"
                    // },
                    // {
                    //     name: "Car Animation",
                    //     name_en: "Car Animation",
                    //     version: "",
                    //     thumbnail: "mb_echartsAnimatorCar.png",
                    //     fileName: "echartsAnimatorCar"
                    // }
                ]
            },
            // EChartsGL: {
            //     name: "EChartsGL",
            //     name_en: "EChartsGL",
            //     content: [
            //         {
            //             name: "Shanghai building price",
            //             name_en: "Shanghai building price",
            //             thumbnail: "echartsGL_ShanghaiBuildingPrice.png",
            //             fileName: "echartsGL_ShanghaiBuildingPrice"
            //         },
            //         {
            //             name: "flight path",
            //             name_en: "flight path",
            //             thumbnail: "echartsGL_flightPath.gif",
            //             fileName: "echartsGL_flightPath"
            //         },
            //         {
            //             name: "taxi Routes Of CapeTown",
            //             name_en: "taxi Routes Of CapeTown",
            //             thumbnail: "echartsGL_taxiRoutesOfCapeTown.gif",
            //             fileName: "echartsGL_taxiRoutesOfCapeTown"
            //         },
            //         {
            //             name: "colorful buildings",
            //             name_en: "colorful buildings",
            //             thumbnail: "echartsGL_colorfulCity.png",
            //             fileName: "echartsGL_colorfulCity"
            //         },
            //         {
            //             name: "taxi trajectory map Of ChengDu",
            //             name_en: "taxi trajectory map Of ChengDu",
            //             thumbnail: "echartsGL_taxiTrajectoryMap.gif",
            //             fileName: "echartsGL_taxiTrajectoryMap"
            //         },
            //         {
            //             name: "Global wind visualization",
            //             name_en: "Global wind visualization",
            //             thumbnail: "echartsGL_GlobalWind.gif",
            //             fileName: "echartsGL_GlobalWind"
            //         }
            //     ]
            // },
            // DeckGL: {
            //     name: "DeckGL",
            //     name_en: "DeckGL",
            //     content: [
            //         {
            //             name: "path",
            //             name_en: "path",
            //             version: "",
            //             thumbnail: "mb_deckglLayer_pathLayer.png",
            //             fileName: "deckglLayer_pathLayer"
            //         },
            //         {
            //             name: "arcLine",
            //             name_en: "arcLine",
            //             version: "",
            //             thumbnail: "mb_deckglLayer_arcLayer.png",
            //             fileName: "deckglLayer_arcLayer"
            //         },
            //         {
            //             name: "polygon",
            //             name_en: "polygon",
            //             version: "",
            //             thumbnail: "mb_deckglLayer_polygonLayer.png",
            //             fileName: "deckglLayer_polygonLayer"
            //         },
            //         {
            //             name: "honeycomb",
            //             name_en: "honeycomb",
            //             version: "",
            //             thumbnail: "mb_deckglLayer_hexagonLayer.png",
            //             fileName: "deckglLayer_hexagonLayer"
            //         },
            //         {
            //             name: "New York Construction",
            //             name_en: "New York Construction",
            //             localIgnore: true,
            //             version: "",
            //             thumbnail: "mb_deckgl_nyBuilding.png",
            //             fileName: "deckglLayer_nyBuilding"
            //         },
            //         {
            //             name: "California Earthquakes",
            //             name_en: "California Earthquakes",
            //             version: "",
            //             thumbnail: "mb_deckglLayer_scatterPlot.png",
            //             fileName: "deckglLayer_scatterPlot"
            //         },
            //         {
            //             name: "New york city population",
            //             name_en: "New york city population",
            //             version: "",
            //             thumbnail: "mb_deckglLayer_nyc_census.png",
            //             fileName: "deckglLayer_nyc_census"
            //         },
            //         {
            //             name: "San Francisco Elevation Contour",
            //             name_en: "San Francisco Elevation Contour",
            //             localIgnore: true,
            //             version: "",
            //             thumbnail: "mb_deckglLayer_sfcontour.png",
            //             fileName: "deckglLayer_sfcontour"
            //         },
            //         {
            //             name: "San Francisco Street Tree Map",
            //             name_en: "San Francisco Street Tree Map",
            //             version: "",
            //             thumbnail: "mb_deckglLayer_sftrees.png",
            //             fileName: "deckglLayer_sftrees"
            //         },
            //         {
            //             name: "Commute Patterns in the UK",
            //             name_en: "Commute Patterns in the UK",
            //             version: "",
            //             localIgnore: true,
            //             thumbnail: "mb_deckglLayer_ukcommute.png",
            //             fileName: "deckglLayer_ukcommute"
            //         }
            //     ]
            // },
            // MapV: {
            //     name: "MapV",
            //     name_en: "MapV",
            //     content: [
            //         {
            //             name: "honeycomb",
            //             name_en: "honeycomb",
            //             version: "",
            //             thumbnail: "mb_mapVLayer_honeycomb.png",
            //             fileName: "mapvLayerHoneycomb"
            //         },
            //         {
            //             name: "NY taxi car point",
            //             name_en: "NY taxi car point",
            //             version: "",
            //             thumbnail: "mb_mapVLayer_point.png",
            //             fileName: "mapvNyTaxi"
            //         },
            //         {
            //             name: "OD",
            //             name_en: "OD",
            //             thumbnail: "mapvCsvcar.png",
            //             fileName: "mapvCsvcar"
            //         },
            //         {
            //             name: "force edge bundling",
            //             name_en: "force edge bundling",
            //             thumbnail: "mapvForceEdgeBuilding.gif",
            //             fileName: "mapvForceEdgeBuilding"
            //         },
            //         {
            //             name: "line density",
            //             name_en: "line density",
            //             thumbnail: "mapvPolylineIntensity.png",
            //             fileName: "mapvPolylineIntensity"
            //         },
            //         {
            //             name: "simple line",
            //             name_en: "simple line",
            //             thumbnail: "mapvPolylineSimple.png",
            //             fileName: "mapvPolylineSimple"
            //         },
            //         {
            //             name: "dynamic trajectory",
            //             name_en: "dynamic trajectory",
            //             thumbnail: "mapvPolylineTime.gif",
            //             fileName: "mapvPolylineTime"
            //         },
            //         {
            //             name: "Migration timing",
            //             name_en: "Migration timing",
            //             thumbnail: "mapvQianxiTime.gif",
            //             fileName: "mapvQianxiTime"
            //         },
            //         {
            //             name: "migration",
            //             name_en: "migration",
            //             thumbnail: "mapvQianxi.gif",
            //             fileName: "mapvQianxi"
            //         },
            //         {
            //             name: "simple polygon",
            //             name_en: "simple polygon",
            //             thumbnail: "mb_mapvLayer_polygon.png",
            //             fileName: "mapvLayerPolyon"
            //         },
            //         {
            //             name: "village of beijing",
            //             name_en: "village of beijing",
            //             thumbnail: "mapvBeijingVillage.png",
            //             fileName: "mapvBeijingVillage"
            //         },
            //         {
            //             name: "Beijing house prices(2018.2)",
            //             name_en: "Beijing house prices(2018.2)",
            //             localIgnore: true,
            //             version: "",
            //             thumbnail: "mb_mapvLianjia.png",
            //             fileName: "mapvLinanJiaData"
            //         }
            //     ]
            // },
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
                        thumbnail: "threejsLayer_airplane.png",
                        fileName: "threejsLayer_airplane"
                    }
                ]
            }
            //         {
            //             name: "airplane(gltf)",
            //             name_en: "airplane(gltf)",
            //             version: "",
            //             thumbnail: "mb_threejs_airplane.png",
            //             fileName: "threejsLayer_airplane"
            //         },
            //         {
            //             name: "bird",
            //             name_en: "bird",
            //             version: "",
            //             thumbnail: "mb_threejs_bird.png",
            //             fileName: "threejsLayer_bird"
            //         }
            //     ]
            // },
            // D3: {
            //     name: "D3",
            //     name_en: "D3",
            //     content: [{
            //         name: "unique thematic layer",
            //         name_en: "unique thematic layer",
            //         thumbnail: "l_d3UniqueThemeLayer.png",
            //         fileName: "d3UniqueThemeLayer"
            //     }, {
            //         name: "range thematic layer",
            //         name_en: "range thematic layer",
            //         thumbnail: "l_d3RangeThemeLayer.png",
            //         fileName: "d3RangeThemeLayer"
            //     }, {
            //             name: "honeycomb layer",
            //         name_en: "honeycomb layer",
            //         thumbnail: "l_d3HexbinLayer.png",
            //         fileName: "d3HexbinLayer"
            //     }]
            // }
            ,
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
                        name: "Realtime Water",
                        name_en: "Realtime Water",
                        thumbnail: "realtime_water.png",
                        fileName: "realtime_water"
                    },
                    {
                        name: "Realtime Satellite Image",
                        name_en: "Realtime Satellite Image",
                        thumbnail: "realtime_satelliteImage.gif",
                        fileName: "realtime_satelliteImage"
                    },
                    {
                        name: "Water HightChart",
                        name_en: "Water HightChart",
                        thumbnail: "highcharts_lineWater.png",
                        fileName: "highcharts_lineWater"
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
