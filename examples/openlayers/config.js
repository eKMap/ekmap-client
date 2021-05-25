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
                content: [{
                        name: "Map Find Service",
                        name_en: "Map Find Service",
                        thumbnail: "mapService_find .png",
                        fileName: "mapService_find",
                        subject: "Use the find API included in Map Services. It provides a chainable API for building request parameters and executing find tasks.",
                        description: "Enter the name of habitat/species management area, province name, nature reserve, protected landscape area, special forest, ramsar site, national park of VietNam to see a list of information by search name."
                    },
                    {
                        name: "Bounds query",
                        name_en: "Bounds query",
                        thumbnail: "featureService_queryByBound.png",
                        fileName: "mapService_queryByBound",
                        subject: "Use queryByBound of mapboxgl.ekmap.FeatureLayer to query points in any bound.",
                        description: "Create bound, displaying data on the bound area."
                    },
                    {
                        name: "Geometry query",
                        name_en: "Geometry query",
                        thumbnail: "featureService_queryByGeometry.png",
                        fileName: "mapService_queryByGeometry",
                        subject: "Use queryByGeometry of mapboxgl.ekmap.FeatureLayer to query points in any geometry.",
                        description: "Create polygon, display data on polygon"
                    },
                    {
                        name: "Identify",
                        name_en: "Identify",
                        thumbnail: "mapService_identify.png",
                        fileName: "mapService_identify",
                        subject: "Use identify of mapboxgle.ekmap.TiledMapLayer resource to discover features at a geographic location",
                        description: "Click on points on the map to display detailed information of Vietnam's national protected areas"

                    },
                    {
                        name: "Image Tile ZYX",
                        name_en: "Image Tile ZYX",
                        thumbnail: "ImageTileZYX.png",
                        fileName: "mapService_ImageTileZYX.png",
                        subject: "Use mapboxgl.ekmap.TiledMapLayer to add image tile ZYX to your map.",
                        description: "Upload data as images (Administrative map of Vietnam)"
                    },
                ]
            },
            data: {
                name: "Data service",
                name_en: "Data service",
                content: [{
                        name: "Bounds query",
                        name_en: "Bounds query",
                        thumbnail: "featureService_queryByBound.png",
                        fileName: "featureService_getFeaturesByBound",
                        subject: "Use getFeaturesByBound of mapboxgl.ekmap.FeatureLayer to query points in any bound.",
                        description: "Create bound, displaying data on the bound area."

                    },
                    {
                        name: "Geometry query",
                        name_en: "Geometry query",
                        thumbnail: "featureService_queryByGeometry.png",
                        fileName: "featureService_getFeaturesByGeometry",
                        subject: "Use getFeaturesByGeometry of mapboxgl.ekmap.FeatureLayer to query points in any geometry.",
                        description: "Create polygon, display data on polygon"
                    },
                    {
                        name: "Apply Edits",
                        name_en: "Apply Edits",
                        thumbnail: "featureService_applyEditsFeatures.png",
                        fileName: "featureService_applyEditsFeatures",
                        subject: "Use applyEditsFeatures of mapboxgl.ekmap.FeatureLayer to add, edit, or delete operations.",
                        description: "Select a color, then click on the map to add points. Without selecting a color, click on the point -> point information (edit, delete)."
                    },
                    {
                        name: "Add Features",
                        name_en: "Add Features",
                        thumbnail: "featureService_addFeatures.png",
                        fileName: "featureService_addFeatures",
                        subject: "Use addFeatures of mapboxgl.ekmap.FeatureLayer to add points to the map.",
                        description: "Click on the map to add points (marker color selectable)."
                    },
                    {
                        name: "Update Features",
                        name_en: "Update Features",
                        thumbnail: "featureService_updateFeatures.png",
                        fileName: "featureService_updateFeatures",
                        subject: "Use updateFeatures of mapboxgl.ekmap.FeatureLayer to update location points on the map.",
                        description: "Update location. Select the feature to change, then choose the desired position."
                    },
                    {
                        name: "Delete Features",
                        name_en: "Delete Features",
                        thumbnail: "featureService_deleteFeatures.png",
                        fileName: "featureService_deleteFeatures",
                        subject: "Use deleteFeatures of mapboxgl.ekmap.FeatureLayer to delete points on the map.",
                        description: "Select feature to delete on the map to delete"
                    },
                    {
                        name: "Attributes Query",
                        name_en: "Attributes Query",
                        thumbnail: "vectorTile_Map_attributesQuery.png",
                        fileName: "vectorTile_Map_attributesQuery",
                        subject: "Attributes Query.",
                        description: "Attributes Query."
                    },
                    {
                        name: "Update Feature Attributes",
                        name_en: "Update Feature Attributes",
                        thumbnail: "vectorTile_Map_updateFeatureAttributes.png",
                        fileName: "vectorTile_Map_updateFeatureAttributes",
                        subject: "Update Feature Attributes.",
                        description: "Use control Select to get point information and use service to change that point information"
                    }
                ]
            },
            vectortile: {
                name: "Vector Tile Services",
                name_en: "Vector Tile Services",
                content: [
                    // {
                    //     name: "Mapbox Vector Tile",
                    //     name_en: "Mapbox Vector Tile",
                    //     thumbnail: "vectorTile_Map.png",
                    //     fileName: "vectorTile_Map",
                    //     subject: "Add vector tile.",
                    //     description: "Administrative map of Vietnam"
                    // },
                    // {
                    //     name: "Mapbox Vector Tile Overlay",
                    //     name_en: "Mapbox Vector Tile Overlay",
                    //     thumbnail: "vectorTile_Map_full.png",
                    //     fileName: "vectorTile_Map_overlay",
                    //     subject: "Add vector tile overlay to the map.",
                    //     description: ""
                    // },
                    // {
                    //     name: "Mapbox Vector Tile Hover",
                    //     name_en: "Mapbox Vector Tile Hover",
                    //     thumbnail: "vectorTile_Map_hover.gif",
                    //     fileName: "vectorTile_Map_hover",
                    //     subject: "Using events and feature states to create a per feature hover effect.",
                    //     description: "Using events and feature states to create a per feature hover effect."
                    // },
                    // {
                    //     name: "Mapbox Vector Tile Select",
                    //     name_en: "Mapbox Vector Tile Select",
                    //     thumbnail: "vectorTile_Map_select.gif",
                    //     fileName: "vectorTile_Map_select",
                    //     subject: "Vector tile select on the map.",
                    //     description: "Click on the map to query features using queryRenderedFeatures."
                    // },
                    // {
                    //     name: "Resize Map",
                    //     name_en: "Resize Map",
                    //     thumbnail: "resizeMap.gif",
                    //     fileName: "resizeMap",
                    //     subject: "Resize Map.",
                    //     description: "Click button"
                    // },
                    // {
                    //     name: "Geometry Query",
                    //     name_en: "Geometry Query",
                    //     thumbnail: "vectorTile_Map_geometryQuery.png",
                    //     fileName: "vectorTile_Map_geometryQuery",
                    //     subject: "Geometry Query.",
                    //     description: "Create polygon or line buffer to display data on polygon"
                    // },
                    // {
                    //     name: "Filter Province",
                    //     name_en: "Filter Province",
                    //     thumbnail: "filterProvince.gif",
                    //     fileName: "filterProvince",
                    //     subject: "Filter Province.",
                    //     description: "Create polygon or line buffer to display data on polygon"
                    // }
                ]
            },
            control: {
                name: "Control",
                name_en: "Control",
                content: [{
                        name: "Legend Control",
                        name_en: "Legend Control",
                        thumbnail: "control_legendControl.png",
                        fileName: "control_legendControl",
                        subject: "Use control legend. It returns the legend information for all layers in the service. Each layer's legend information includes the symbol images and labels for each symbol.",
                        description: "Click on the button below control: navigationControl to display Legend"
                    },
                    {
                        name: "Feature Infomation Control",
                        name_en: "Feature Infomation ",
                        thumbnail: "control_featureInfomationControl.png",
                        fileName: "control_featureInfomationControl",
                        subject: "Use control featureInfomation to retrieve the selected object.",
                        description: "Click on the map to retrieve the selected object."
                    },
                    {
                        name: "Tree Layer",
                        name_en: "Tree Layer",
                        thumbnail: "control_treeLayerControl.png",
                        fileName: "control_treeLayerControl",
                        subject: "Tree Layer.",
                        description: "Use mapboxgl.ekmap.control.TreeLayer to display, turn on / off map layers"
                    },
                    {
                        name: "Tree Layer Group",
                        name_en: "Tree Layer Group",
                        thumbnail: "control_treeLayerGroupControl.png",
                        fileName: "control_treeLayerGroupControl",
                        subject: "Tree Layer Group.",
                        description: "Use mapboxgl.ekmap.control.TreeLayer to display, turn on / off map layers"
                    },
                    // {
                    //     name: "Tree Layer Service",
                    //     name_en: "Tree Layer Service",
                    //     thumbnail: "control_treeLayerServiceControl.png",
                    //     fileName: "control_treeLayerServiceControl",
                    //     subject: "Tree Layer Service.",
                    //     description: "Use mapboxgl.ekmap.control.TreeLayer to display, turn on / off map layers"
                    // },
                    // {
                    //     name: "Tree Layer (VectorTile)",
                    //     name_en: "Tree Layer (VectorTile)",
                    //     thumbnail: "control_treeLayer_vectorTiledControl.png",
                    //     fileName: "control_treeLayer_vectorTiledControl",
                    //     subject: "Tree Layer (VectorTile).",
                    //     description: "Use mapboxgl.ekmap.control.TreeLayer to display, turn on / off map layers"
                    // },
                    {
                        name: "Base Layer",
                        name_en: "Base Layer",
                        thumbnail: "control_baseLayerControl.png",
                        fileName: "control_baseLayerControl",
                        subject: "Base Layer Control.",
                        description: "Use mapboxgl.ekmap.control.BaseLayer to display, turn on / off map layers under the map"
                    },
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
                        name: "VietNam Map",
                        name_en: "VietNam Map",
                        thumbnail: "tiledMap_vnMap.png",
                        fileName: "tiledMap_vnMap",
                        subject: "VietNam Map ",
                        description: "Use mapboxgl.ekmap.TiledVietNamMapLayer to display VietNam map layer on the map"
                    },
                    {
                        name: "OSM Standard",
                        name_en: "OSM Standard",
                        thumbnail: "tiledMap_osmMap.png",
                        fileName: "tiledMap_osmMap",
                        subject: "OSM Standard",
                        description: "Use mapboxgl.ekmap.TiledOSMapLayer to display OSM Standard layer on the map"
                    },
                    {
                        name: "Showing an ArcGIS basemap",
                        name_en: "Showing an ArcGIS basemap",
                        thumbnail: "basemapLayer.png",
                        fileName: "basemapLayer",
                        subject: "Display an ArcGIS Online basemap.",
                        description: "Display an ArcGIS Online basemap."
                    },
                    {
                        name: "Basemap with labels",
                        name_en: "Basemap with labels",
                        thumbnail: "basemapLayer_labels.png",
                        fileName: "basemapLayer_labels",
                        subject: "Showing an ArcGIS Online basemap with a separate label layer",
                        description: "Showing an ArcGIS Online basemap with a separate label layer."
                    }
                ]
            },
            heat: {
                name: "Heat map",
                name_en: "Heat map",
                version: "",
                content: [{
                        name: "Random Points",
                        name_en: "Random Points",
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
                        subject: "Add layer heatmap to the map",
                        description: "Use mapboxgl.ekmap.HeatMapLayer to add layer heatmap to the map"
                    },
                ]
            },
            cluster: {
                name: "Cluster",
                name_en: "Cluster",
                version: "",
                content: [{
                    name: "Cluster",
                    name_en: "Marker cluster",
                    version: "",
                    thumbnail: "cluster.gif",
                    fileName: "cluster",
                    subject: "Use Mapbox GL JS' built-in functions to visualize points as clusters.",
                    description: "Use Mapbox GL JS' built-in functions to visualize points as clusters."
                }]
            },
            animation: {
                name: "Animation",
                name_en: "Animation",
                content: [{
                        name: "Flashing Points",
                        name_en: "Flashing Points",
                        thumbnail: "animation_flashing_point.gif",
                        fileName: "animation_flashing_point",
                        subject: "Add an animated icon to the map that was generated at runtime with a Canvas.",
                        description: "Add an animated icon to the map that was generated at runtime with a Canvas."
                    },
                    // {
                    //     name: "Point",
                    //     name_en: "Point",
                    //     thumbnail: "animation_point.gif",
                    //     fileName: "animation_point",
                    //     subject: "Animate the position of a point by updating a GeoJSON source on each frame.",
                    //     description: "Animate the position of a point by updating a GeoJSON source on each frame."
                    // }
                ]
            },
            ECharts: {
                name: "ECharts",
                name_en: "ECharts",
                content: [{
                        name: "Line Chart",
                        name_en: "Line Chart",
                        thumbnail: "echarts_lineMarker.gif",
                        fileName: "echarts_lineMarker",
                        subject: "Use echarts to display line chart.",
                        description: "Click point on map to display future temperature line chart (data random)."
                    },
                    {
                        name: "Bar Chart",
                        name_en: "Bar Chart",
                        thumbnail: "echarts_bar.gif",
                        fileName: "echarts_bar",
                        subject: "Use echarts to display bar chart.",
                        description: "Click point on map to display bar chart (data random)."
                    },
                    {
                        name: "Scatter Chart",
                        name_en: "Scatter Chart",
                        thumbnail: "echarts_scatter.gif",
                        fileName: "echarts_scatter",
                        subject: "Use echarts to display scatter chart.",
                        description: "Click point on map to display fine dust concentration PM2.5 on a day scatter chart (data source: https://moitruongthudo.vn/)."
                    },
                    {
                        name: "Pie Chart",
                        name_en: "Pie Chart",
                        thumbnail: "echarts_pie.gif",
                        fileName: "echarts_pie",
                        subject: "Use echarts to display pie chart.",
                        description: "Click point on map to display pie chart."
                    }
                ]
            },
            HightChart: {
                name: "Hight Chart",
                name_en: "Hight Chart",
                content: [{
                        name: "Bar Highcharts",
                        name_en: "Bar Highcharts",
                        thumbnail: "highcharts_bar.gif",
                        fileName: "highcharts_bar",
                        subject: "Use highcharts to display bar.",
                        description: "Click point on map to display Bar Highcharts (data random)."
                    },
                    {
                        name: "Line Highcharts",
                        name_en: "Line Highcharts",
                        thumbnail: "highcharts_line.gif",
                        fileName: "highcharts_line",
                        subject: "Use highcharts to display line.",
                        description: "Click point on map to display future temperature Line Highcharts (data random)."
                    },
                    {
                        name: "Pie Highcharts",
                        name_en: "Pie Highcharts",
                        thumbnail: "highcharts_pie.gif",
                        fileName: "highcharts_pie",
                        subject: "Use highcharts to display pie.",
                        description: "Click point on map to display commodity percent by Pie Highcharts (data random)."
                    },
                    {
                        name: "Water HightChart",
                        name_en: "Water HightChart",
                        thumbnail: "highcharts_lineWater.png",
                        fileName: "highcharts_lineWater",
                        subject: "Detailed display of SCADA measuring point chart data.",
                        description: "Detailed display of SCADA measuring point chart data. Click an area on the map to view data in that area."
                    }
                ]
            },
            ChartOnline: {
                name: "Chart Online",
                name_en: "Chart Online",
                content: [{
                    name: "Data rain",
                    name_en: "Data rain",
                    thumbnail: "data_rain.gif",
                    fileName: "data_rain",
                    subject: "Use chart online to display flood warning data, rainfall information in Central - Vietnam.",
                    description: "Click point on the map to show flood warning data, rainfall information in Central - Vietnam by chart online."
                }]
            },
            // threejs: {
            //     name: "threejs",
            //     name_en: "threejs",
            //     content: [{
            //             name: "Buildings",
            //             name_en: "Buildings",
            //             version: "",
            //             thumbnail: "threejsLayer_buildings.png",
            //             fileName: "threejsLayer_buildings",
            //             subject: "Use ThreeLayer to display buildings.",
            //             description: "Use mapboxgl.ekmap.ThreeLayer to display buildings."
            //         },
            //         {
            //             name: "Airplane(gltf)",
            //             name_en: "Airplane(gltf)",
            //             version: "",
            //             thumbnail: "threejsLayer_airplane.gif",
            //             fileName: "threejsLayer_airplane",
            //             subject: "Use ThreeLayer to display airplane.",
            //             description: "Use mapboxgl.ekmap.ThreeLayer to display airplane."
            //         }
            //     ]
            // },
            LayerChart: {
                name: "Layer Chart",
                name_en: "Layer Chart",
                content: [{
                    name: "Statistical Chart",
                    name_en: "Statistical Chart",
                    thumbnail: "layerChart.png",
                    fileName: "layerChart",
                    subject: "Use DomOverlay to simulate measurement point position data with parameters (P, Q +, Q-, Pin).",
                    description: "Three points position data with parameters (P, Q +, Q-, Pin) displayed by chart and color respectively."
                }]
            },
            OverLay: {
                name: "OverLay",
                name_en: "OverLay",
                content: [{
                    name: "Magnify Layer",
                    name_en: "Magnify Layer",
                    thumbnail: "control_magnifyControl.png",
                    fileName: "overlay_magnify",
                    subject: "Scale the map layer to scale with a circle on the map.",
                    description: "Scale the map layer to scale with a circle on the map"
                }]
            },
            Interactions: {
                name: "Interactions",
                name_en: "Interactions",
                content: [{
                    name: "Layer Spy",
                    name_en: "Layer Spy",
                    thumbnail: "control_clipControl.png",
                    fileName: "interation_clip",
                    subject: "Cut the layer with a circle on the map.",
                    description: "Cut the layer with a circle on the map."
                }, ]
            },
            // '3DLayer': {
            //     name: "3D Layer",
            //     name_en: "3D Layer",
            //     content: [{
            //         name: "3D buildings",
            //         name_en: "3D buildings",
            //         version: "",
            //         thumbnail: "data_3D.gif",
            //         fileName: "data_3D",
            //         subject: "3D data display shows the altitude of some Hanoi planning areas.",
            //         description: "3D data display shows the altitude of some Hanoi planning areas."
            //     }]
            // },
            Realtime: {
                name: "Realtime",
                name_en: "Realtime",
                content: [{
                        name: "Realtime Water",
                        name_en: "Realtime Water",
                        thumbnail: "realtime_water.gif",
                        fileName: "realtime_water",
                        subject: "Display pressure zone data according to real time data.",
                        description: "Display pressure zone data according to real time data."
                    },
                    {
                        name: "Realtime Satellite Image",
                        name_en: "Realtime Satellite Image",
                        thumbnail: "realtime_satelliteImage.gif",
                        fileName: "realtime_satelliteImage",
                        subject: "Displays a list of satellite imagery over time.",
                        description: "Displays a list of satellite imagery over time."
                    },
                    {
                        name: "Realtime Car",
                        name_en: "Realtime Car",
                        thumbnail: "realtime_car.gif",
                        fileName: "realtime_car",
                        subject: "Tracking a moving position, information of the rest stops when the car goes there.",
                        description: "Tracking a moving position, information of the rest stops when the car goes there."
                    }
                ]
            },
            PerspectiveMap: {
                name: "Perspective Map",
                name_en: "Perspective Map",
                content: [{
                    name: "Perspective Map",
                    name_en: "Perspective Map",
                    thumbnail: "map_perspective.png",
                    fileName: "map_perspective",
                    subject: "ol.ekmap.PerspectiveMap displays a map with a perspective effect by pitching the map.",
                    description: "ol.ekmap.PerspectiveMap displays a map with a perspective effect by pitching the map."
                }]
            },
            StoryMap: {
                name: "Story Map",
                name_en: "Story Map",
                content: [{
                        name: "Vinhomes real estate",
                        name_en: "Vinhomes real estate",
                        thumbnail: "storyMap_vinhomes.gif",
                        fileName: "storyMap_vinhomes",
                        subject: "Display map of real estate project list Vinhomes.",
                        description: "Display map of real estate project list Vinhomes."
                    },
                    {
                        name: "Tour Hue - Hoi An - Da Nang",
                        name_en: "Tour Hue - Hoi An - Da Nang",
                        thumbnail: "mapTour.png",
                        fileName: "mapTour",
                        subject: "Hue - Hoi An - Da Nang tours.",
                        description: "Display map of Hue - Hoi An - Da Nang tours."
                    },
                    {
                        name: "Timeline Coronavirus (Heatmap)",
                        name_en: "Timeline Coronavirus (Heatmap)",
                        thumbnail: "timeline_heatMapCov.gif",
                        fileName: "timeline_heatMapCov",
                        subject: "Displays the timeline map showing the increase in COVID19 cases around the world.",
                        description: "Displays the timeline map showing the increase in COVID19 cases around the world."
                    },
                    {
                        name: "COVID-19: Government Response Stringency",
                        name_en: "COVID-19: Government Response Stringency",
                        thumbnail: "timeline_fillCov.gif",
                        fileName: "timeline_fillCov",
                        subject: "Displays the timeline map showing a composite measure based on nine response indicators including school closures, workplace closures, and travel bans, rescaled to a value from 0 to 100 (100 = strictest)",
                        description: "This is a composite measure based on nine response indicators including school closures, workplace closures, and travel bans, rescaled to a value from 0 to 100 (100 = strictest). If policies vary at the subnational level, the index is shown as the response level of the strictest sub-region."
                    },
                    // {
                    //     name: "Timeline Coronavirus (Buffer)",
                    //     name_en: "Timeline Coronavirus (Buffer)",
                    //     thumbnail: "timeline_bufferCov.gif",
                    //     fileName: "timeline_bufferCov"
                    // },
                    {
                        name: "Spiritual Tourism Map Tour",
                        name_en: "Spiritual Tourism Map Tour",
                        thumbnail: "storyMap_spiritualTourism.png",
                        fileName: "storyMap_spiritualTourism",
                        subject: "10 attractive spiritual tourist attractions in Hanoi capital.",
                        description: "10 attractive spiritual tourist attractions in Hanoi capital."
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
                content: [{
                        name: "Hexagon",
                        name_en: "Hexagon",
                        thumbnail: "turfjs_Hexagon.png",
                        fileName: "turfjs_Hexagon",
                        subject: "Display density of points of sale in Hanoi.",
                        description: "Display density of point of sale in Hanoi. The higher the density, the red, the lower the density is yellow."
                    },
                    {
                        name: "Voronoi",
                        name_en: "Voronoi",
                        thumbnail: "turfjs_Voronoi.gif",
                        fileName: "turfjs_Voronoi",
                        subject: "Use the PM2.5 measuring points to calculate the Voronoi region.",
                        description: "Click in the area, it will highlight and display PM2.5 value information by station in that voronoi region"
                    },
                    {
                        name: "Buffer",
                        name_en: "Buffer",
                        thumbnail: "turfjs_Buffer.png",
                        fileName: "turfjs_Buffer",
                        subject: "Displays map showing COVID19 cases in VietNam",
                        description: "Displays map showing COVID19 cases in VietNam"
                    },
                    {
                        name: "Data Storm",
                        name_en: "Data Storm",
                        thumbnail: "data_storm.png",
                        fileName: "data_storm",
                        subject: "Displays the route of a storm information number 7 (2020) in Vietnam.",
                        description: "Displays the route of a storm information number 7 (2020) in Vietnam."
                    }
                ]
            }
        }
    },
    OGC: {
        name: "OGC",
        name_en: "OGC",
        content: {
            WMS: {
                name: "WMS",
                name_en: "WMS",
                content: [{
                        name: "WMS OGC Base",
                        name_en: "WMS OGC Base",
                        thumbnail: "wms_layer.png",
                        fileName: "ogc_wms_addMap",
                        subject: "WMS OGC add to map",
                        description: "WMS OGC add to map"
                    },
                    {
                        name: "WMS OGC Services",
                        name_en: "WMS OGC Services",
                        thumbnail: "wms_layer.png",
                        fileName: "ogc_wms_getFeatureInfor",
                        subject: "WMS OGC calls the service getFeatureInfoUrl click to polygon show the data",
                        description: "WMS OGC calls the service getFeatureInfoUrl click to polygon show the data"
                    }
                ]
            },

            // WMTS: {
            //     name: "WMTS OGC",
            //     name_en: "WMTS OGC",
            //     content: [{
            //         name: "WMTS OGC",
            //         name_en: "WMTS OGC",
            //         thumbnail: "wmts_layer.png",
            //         fileName: "ogc_wmts",
            //         subject: "ogc_wmts",
            //         description: "ogc_wmts"
            //     }]
            // },
            WFS: {
                name: "WFS OGC",
                name_en: "WFS OGC",
                content: [{
                    name: "WFS OGC",
                    name_en: "WFS OGC",
                    thumbnail: "wmts_layer.png",
                    fileName: "ogc_wfs",
                    subject: "WFS OGC calls the service getFeature click to point show the data",
                    description: "WFS OGC calls the service getFeature click to point show the data"
                }]
            }
        }
    },
    control: {
        name: "Control",
        name_en: "Control",
        content: {
            BasicControl: {
                name: "Basic Control",
                name_en: "Basic Control",
                content: [{
                        name: "Zoom Control",
                        name_en: "Zoom Control",
                        thumbnail: "control_zoomControl.png",
                        fileName: "control_zoomControl",
                        subject: "Use control legend. It returns the legend information for all layers in the service. Each layer's legend information includes the symbol images and labels for each symbol.",
                        description: "Click on the button below control: navigationControl to display Legend"
                    },
                    {
                        name: "Scaleline Control",
                        name_en: "Scaleline Control",
                        thumbnail: "control_scalelineControl.png",
                        fileName: "control_scalelineControl",
                        subject: "Use control featureInfomation to retrieve the selected object.",
                        description: "Click on the map to retrieve the selected object."
                    },
                    {
                        name: "Attribution Control",
                        name_en: "Attribution Control",
                        thumbnail: "control_attributionControl.png",
                        fileName: "control_attributionControl",
                        subject: "Attribution Control",
                        description: "An AttributionControl control presents the map's attribution information."
                    },
                    {
                        name: "Roller Blinds",
                        name_en: "Roller Blinds",
                        thumbnail: "control_layerSwitch.png",
                        fileName: "control_layerSwitch",
                        subject: "Navigation Control",
                        description: "A NavigationControl control contains zoom buttons and a compass."
                    },
                    {
                        name: "Overview Map Control",
                        name_en: "Overview Map Control",
                        thumbnail: "control_overviewMapControl.png",
                        fileName: "control_overviewMapControl",
                        subject: "Scale Control",
                        description: "A ScaleControl control displays the ratio of a distance on the map to the corresponding distance on the ground."
                    },
                    {
                        name: "Fullscreen Control",
                        name_en: "Fullscreen Control",
                        thumbnail: "control_fullscreenControl.png",
                        fileName: "control_fullscreenControl",
                        subject: "Fullscreen Control",
                        description: "A FullscreenControl control contains a button for toggling the map in and out of fullscreen mode."
                    }
                ]
            },
            AdvancedControl: {
                name: "Advanced Control",
                name_en: "Advanced Control",
                content: [{
                        name: "Draw Control",
                        name_en: "Draw Control",
                        thumbnail: "control_drawControl.gif",
                        fileName: "control_drawControl",
                        subject: "Geolocate Control",
                        description: "A GeolocateControl control provides a button that uses the browser's geolocation API to locate the user on the map."
                    },
                    {
                        name: "Snapshot maps",
                        name_en: "Snapshot maps",
                        thumbnail: "control_snapShotControl.png",
                        fileName: "control_snapShotControl",
                        subject: "Snapshot Control",
                        description: "A SnapshotControl control contains a button for screenshot."
                    },
                    {
                        name: "Reverse Geocoder",
                        name_en: "Reverse Geocoder",
                        thumbnail: "vectorTile_Map_reverseGeocoder.gif",
                        fileName: "vectorTile_Map_reverseGeocoder",
                        subject: "Reverse Geocoder.",
                        description: "Click button action draw and the area"
                    },
                    {
                        name: "Geocoder",
                        name_en: "Geocoder",
                        thumbnail: "vectorTile_Map_geocoder.gif",
                        fileName: "vectorTile_Map_geocoder",
                        subject: "Use the geocoder control to search for places using the Mapbox Geocoding API.",
                        description: "Use the geocoder control to search for places using the Mapbox Geocoding API."
                    },
                    {
                        name: "Map Animation To Location",
                        name_en: "Map Animation To Location",
                        thumbnail: "control_locationControl.png",
                        fileName: "control_locationControl",
                        subject: "Animation, FlyTo, MyLocation.",
                        description: "Animation, FlyTo, My Location"
                    },
                    // {
                    //     name: "Target Control",
                    //     name_en: "Target Control",
                    //     thumbnail: "control_targetControl.png",
                    //     fileName: "control_targetControl",
                    //     subject: "Target Control.",
                    //     description: "Target Control"
                    // },
                    {
                        name: "Show Drawn Polygon Area",
                        name_en: "Show Drawn Polygon Area",
                        thumbnail: "vectorTile_Map_drawS.png",
                        fileName: "vectorTile_Map_drawS",
                        subject: "Use control Draw to draw a rectangle and Turf.js to calculate its area in square kilometers.",
                        description: "Use control Draw to draw a rectangle and Turf.js to calculate its area in square kilometers."
                    },
                ]
            }
        }
    }
};

//icon css sideBar
var sideBarIconConfig = {
    ekmapServer: "fa-globe",
    viz: "fa-map",
    clientspatial: "fa-object-group",
    control: "fa-sliders",
    OGC: "fa-globe"
};


var exampleIconConfig = {
    ekmapServer: "fa-server",
    viz: "fa-map",
    control: "fa-sliders",
    OGC: "fa-globe"
};
window.mapboxglExampleConfig = exampleConfig;