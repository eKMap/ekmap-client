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
                        thumbnail: "find.png",
                        fileName: "mapService_find",
                        subject: "Use the find API included in Map Services. It provides a chainable API for building request parameters and executing find tasks.",
                        description: "Enter the name of habitat/species management area, province name, nature reserve, protected landscape area, special forest, ramsar site, national park of VietNam to see a list of information by search name.",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.TiledMapLayer.html#find",
                        nameApi:"mapboxgl.ekmap.TiledMapLayer"
                    },
                    {
                        name: "Bounds query",
                        name_en: "Bounds query",
                        thumbnail: "mapService_queryByBound.png",
                        fileName: "mapService_queryByBound",
                        subject: "Use queryByBound of mapboxgl.ekmap.FeatureLayer to query points in any bound.",
                        description: "Create bound, displaying data on the bound area.",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.MapService.html#queryByBound",
                        nameApi:"mapboxgl.ekmap.MapService"
                    },
                    {
                        name: "Geometry query",
                        name_en: "Geometry query",
                        thumbnail: "mapService_queryByGeometry.png",
                        fileName: "mapService_queryByGeometry",
                        subject: "Use queryByGeometry of mapboxgl.ekmap.FeatureLayer to query points in any geometry.",
                        description: "Create polygon, display data on polygon",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.MapService.html#queryByGeometry",
                        nameApi:"mapboxgl.ekmap.MapService"
                    },
                    {
                        name: "Identify",
                        name_en: "Identify",
                        thumbnail: "mapService_identify.png",
                        fileName: "mapService_identify",
                        subject: "Use identify of mapboxgle.ekmap.TiledMapLayer resource to discover features at a geographic location",
                        description: "Click on points on the map to display detailed information of Vietnam's national protected areas",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.TiledMapLayer.html#identity",
                        nameApi:"mapboxgl.ekmap.TiledMapLayer"
                    },
                    {
                        name: "Image Tile ZYX",
                        name_en: "Image Tile ZYX",
                        thumbnail: "mapService_ImageTileZYX.png",
                        fileName: "mapService_ImageTileZYX",
                        subject: "Use mapboxgl.ekmap.TiledMapLayer to add image tile ZYX to your map.",
                        description: "Upload data as images (Administrative map of Vietnam)",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.TiledMapLayer.html",
                        nameApi:"mapboxgl.ekmap.TiledMapLayer"
                    },
                    {
                        name: "Image Tile Pattern",
                        name_en: "Image Tile Pattern",
                        thumbnail: "mapService_ImageTilePattern.png",
                        fileName: "mapService_ImageTilePattern",
                        subject: "Image Tile Pattern",
                        description: "Image Tile Pattern",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.TiledMapLayer.html",
                        nameApi:"mapboxgl.ekmap.TiledMapLayer"
                    }
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
                        description: "Create bound, displaying data on the bound area.",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.FeatureService.html#queryByBound",
                        nameApi:"mapboxgl.ekmap.FeatureService"
                    },
                    {
                        name: "Geometry query",
                        name_en: "Geometry query",
                        thumbnail: "featureService_queryByGeometry.png",
                        fileName: "featureService_getFeaturesByGeometry",
                        subject: "Use getFeaturesByGeometry of mapboxgl.ekmap.FeatureLayer to query points in any geometry.",
                        description: "Create polygon, display data on polygon",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.FeatureService.html#queryByGeometry",
                        nameApi:"mapboxgl.ekmap.FeatureService"
                    },
                    {
                        name: "Apply Edits",
                        name_en: "Apply Edits",
                        thumbnail: "featureService_applyEditsFeatures.png",
                        fileName: "featureService_applyEditsFeatures",
                        subject: "Use applyEditsFeatures of mapboxgl.ekmap.FeatureLayer to add, edit, or delete operations.",
                        description: "Select a color, then click on the map to add points. Without selecting a color, click on the point -> point information (edit, delete).",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.FeatureLayer.html#applyEdits",
                        nameApi:"mapboxgl.ekmap.FeatureLayer"
                    },
                    {
                        name: "Add Features",
                        name_en: "Add Features",
                        thumbnail: "featureService_addFeatures.png",
                        fileName: "featureService_addFeatures",
                        subject: "Use addFeatures of mapboxgl.ekmap.FeatureLayer to add points to the map.",
                        description: "Click on the map to add points (marker color selectable).",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.FeatureLayer.html#addFeature",
                        nameApi:"mapboxgl.ekmap.FeatureLayer"
                    },
                    {
                        name: "Update Features",
                        name_en: "Update Features",
                        thumbnail: "featureService_updateFeatures.png",
                        fileName: "featureService_updateFeatures",
                        subject: "Use updateFeatures of mapboxgl.ekmap.FeatureLayer to update location points on the map.",
                        description: "Update location. Select the feature to change, then choose the desired position.",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.FeatureLayer.html#updateFeature",
                        nameApi:"mapboxgl.ekmap.FeatureLayer"
                    },
                    {
                        name: "Delete Features",
                        name_en: "Delete Features",
                        thumbnail: "featureService_deleteFeatures.png",
                        fileName: "featureService_deleteFeatures",
                        subject: "Use deleteFeatures of mapboxgl.ekmap.FeatureLayer to delete points on the map.",
                        description: "Select feature to delete on the map to delete",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.FeatureLayer.html#deleteFeature",
                        nameApi:"mapboxgl.ekmap.FeatureLayer"
                    },
                    {
                        name: "Attributes Query",
                        name_en: "Attributes Query",
                        thumbnail: "vectorTile_Map_attributesQuery.png",
                        fileName: "vectorTile_Map_attributesQuery",
                        subject: "Attributes Query.",
                        description: "Attributes Query.",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.FeatureService.html#query",
                        nameApi:"mapboxgl.ekmap.FeatureService"
                    },
                    {
                        name: "Update Feature Attributes",
                        name_en: "Update Feature Attributes",
                        thumbnail: "vectorTile_Map_updateFeatureAttributes.png",
                        fileName: "vectorTile_Map_updateFeatureAttributes",
                        subject: "Update Feature Attributes.",
                        description: "Use control Select to get point information and use service to change that point information",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.FeatureService.html#updateFeature",
                        nameApi:"mapboxgl.ekmap.FeatureService"
                    }
                ]
            },
            vectortile: {
                name: "Vector Tile Services",
                name_en: "Vector Tile Services",
                content: [{
                        name: "Mapbox Vector Tile",
                        name_en: "Mapbox Vector Tile",
                        thumbnail: "vectorTile_Map.png",
                        fileName: "vectorTile_Map",
                        subject: "Add vector tile.",
                        description: "Administrative map of Vietnam",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.VectorTiledMapLayer.html",
                        nameApi:"mapboxgl.ekmap.VectorTiledMapLayer"
                    },
                    {
                        name: "Mapbox Vector Tile Pattern",
                        name_en: "Mapbox  Vector Tile Pattern",
                        thumbnail: "vectorTile_Map_Pattern.png",
                        fileName: "vectorTile_Map_Pattern",
                        subject: " Vector Tile Pattern",
                        description: " Vector Tile Pattern",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.VectorTiledMapLayer.html",
                        nameApi:"mapboxgl.ekmap.VectorTiledMapLayer"
                    },
                    {
                        name: "Mapbox Vector Tile Overlay",
                        name_en: "Mapbox Vector Tile Overlay",
                        thumbnail: "vectorTile_Map_overlay.png",
                        fileName: "vectorTile_Map_overlay",
                        subject: "Add vector tile overlay to the map.",
                        description: "Tam Duong - Vinh Phuc (VietNam) camera map",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.VectorTiledMapLayer.html",
                        nameApi:"mapboxgl.ekmap.VectorTiledMapLayer"
                    },
                    {
                        name: "Mapbox Vector Tile Hover",
                        name_en: "Mapbox Vector Tile Hover",
                        thumbnail: "vectorTile_Map_hover.gif",
                        fileName: "vectorTile_Map_hover",
                        subject: "Using events and feature states to create a per feature hover effect.",
                        description: "Using events and feature states to create a per feature hover effect.",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.VectorTiledMapLayer.html",
                        nameApi:"mapboxgl.ekmap.VectorTiledMapLayer"
                    },
                    {
                        name: "Mapbox Vector Tile Select",
                        name_en: "Mapbox Vector Tile Select",
                        thumbnail: "vectorTile_Map_select.gif",
                        fileName: "vectorTile_Map_select",
                        subject: "Vector tile select on the map.",
                        description: "Click on the map to query features using queryRenderedFeatures.",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.control.Select.html",
                        nameApi:"mapboxgl.ekmap.control.Select"
                    },
                    {
                        name: "Pattern",
                        name_en: "Pattern",
                        thumbnail: "pattern.gif",
                        fileName: "pattern",
                        subject: "Vector Tile Pattern và Image Tile Pattern",
                        description: "Vector Tile Pattern và Image Tile Pattern"
                    },
                    {
                        name: "Geometry Query",
                        name_en: "Geometry Query",
                        thumbnail: "vectorTile_Map_geometryQuery.png",
                        fileName: "vectorTile_Map_geometryQuery",
                        subject: "Geometry Query.",
                        description: "Create polygon or line buffer to display data on polygon",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.FeatureService.html#queryByGeometry",
                        nameApi:"mapboxgl.ekmap.FeatureService"
                    },
                    {
                        name: "Filter Province",
                        name_en: "Filter Province",
                        thumbnail: "filterProvince.gif",
                        fileName: "filterProvince",
                        subject: "Filter Province.",
                        description: "Create polygon or line buffer to display data on polygon",
                    }
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
                        description: "Click on the button below control: navigationControl to display Legend",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.control.Legend.html",
                        nameApi:"mapboxgl.ekmap.control.Legend"
                    },
                    {
                        name: "Feature Infomation Control",
                        name_en: "Feature Infomation ",
                        thumbnail: "control_featureInfomationControl.png",
                        fileName: "control_featureInfomationControl",
                        subject: "Use control featureInfomation to retrieve the selected object.",
                        description: "Click on the map to retrieve the selected object.",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.control.FeatureInfomation.html",
                        nameApi:"mapboxgl.ekmap.control.FeatureInfomation"
                    }, 
                    {
                        name: "Tree Layer",
                        name_en: "Tree Layer",
                        thumbnail: "control_treeLayerControl.png",
                        fileName: "control_treeLayerControl",
                        subject: "Tree Layer.",
                        description: "Use mapboxgl.ekmap.control.TreeLayer to display, turn on / off map layers",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.control.TreeLayer.html",
                        nameApi:"mapboxgl.ekmap.control.TreeLayer"
                    },
                    // {
                    //     name: "Tree Layer",
                    //     name_en: "Tree Layer",
                    //     thumbnail: "control_treeLayerControl.png",
                    //     fileName: "control_treeLayerPreviewControl",
                    //     subject: "Tree Layer.",
                    //     description: "Use mapboxgl.ekmap.control.TreeLayer to display, turn on / off map layers",
                    //     urlApi: "/docs/mapboxgl/mapboxgl.ekmap.control.TreeLayer.html",
                    //     nameApi:"mapboxgl.ekmap.control.TreeLayer"
                    // },
                    {
                        name: "Tree Layer (VectorTile)",
                        name_en: "Tree Layer (VectorTile)",
                        thumbnail: "control_treeLayer_vectorTiledControl.png",
                        fileName: "control_treeLayer_vectorTiledControl",
                        subject: "Tree Layer (VectorTile).",
                        description: "Use mapboxgl.ekmap.control.TreeLayer to display, turn on / off map layers",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.control.TreeLayer.html",
                        nameApi:"mapboxgl.ekmap.control.TreeLayer"
                    },
                    {
                        name: "Base Layer",
                        name_en: "Base Layer",
                        thumbnail: "control_baseLayerControl.png",
                        fileName: "control_baseLayerControl",
                        subject: "Base Layer Control.",
                        description: "Use mapboxgl.ekmap.control.BaseLayer to display, turn on / off map layers under the map",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.control.BaseLayer.html",
                        nameApi:"mapboxgl.ekmap.control.BaseLayer"
                    },
                    {
                        name: "Tree Layer Group",
                        name_en: "Tree Layer Group",
                        thumbnail: "control_treeLayerGroupControl.png",
                        fileName: "control_treeLayerGroupControl",
                        subject: "Tree Layer Group.",
                        description: "Use mapboxgl.ekmap.control.TreeLayerGroup to display, turn on / off map layers",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.control.TreeLayerGroup.html",
                        nameApi:"mapboxgl.ekmap.control.TreeLayerGroup"
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
                        name: "VietNam Map",
                        name_en: "VietNam Map",
                        thumbnail: "tiledMap_vnMap.png",
                        fileName: "tiledMap_vnMap",
                        subject: "VietNam Map ",
                        description: "Use mapboxgl.ekmap.TiledVietNamMapLayer to display VietNam map layer on the map",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.TiledVietNamMapLayer.html",
                        nameApi:"mapboxgl.ekmap.TiledVietNamMapLayer"
                    },
                    {
                        name: "OSM Standard",
                        name_en: "OSM Standard",
                        thumbnail: "tiledMap_osmMap.png",
                        fileName: "tiledMap_osmMap",
                        subject: "OSM Standard",
                        description: "Use mapboxgl.ekmap.TiledOSMapLayer to display OSM Standard layer on the map",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.TiledOSMapLayer.html",
                        nameApi:"mapboxgl.ekmap.TiledOSMapLayer"
                    },
                    {
                        name: "Add Tile Layer",
                        name_en: "Add Tile Layer",
                        thumbnail: "tiledMap_adminmap.png",
                        fileName: "tiledMap_add",
                        subject: "Add Tile Map",
                        description: "Use mapboxgl.ekmap.TileMap to display map layer on the map",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.TileLayer.html",
                        nameApi:"mapboxgl.ekmap.TileLayer"
                    },
                    {
                        name: "Showing an ArcGIS basemap",
                        name_en: "Showing an ArcGIS basemap",
                        thumbnail: "basemapLayer.png",
                        fileName: "basemapLayer",
                        subject: "Display an ArcGIS Online basemap.",
                        description: "Display an ArcGIS Online basemap.",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.BasemapArcgisLayer.html",
                        nameApi:"mapboxgl.ekmap.BasemapArcgisLayer"
                    },
                    {
                        name: "Basemap with labels",
                        name_en: "Basemap with labels",
                        thumbnail: "basemapLayer_labels.png",
                        fileName: "basemapLayer_labels",
                        subject: "Showing an ArcGIS Online basemap with a separate label layer",
                        description: "Showing an ArcGIS Online basemap with a separate label layer.",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.BasemapArcgisLayer.html",
                        nameApi:"mapboxgl.ekmap.BasemapArcgisLayer"
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
                        description: "Use mapboxgl.ekmap.HeatMapLayer to add layer heatmap to the map",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.HeatMapLayer.html",
                        nameApi:"mapboxgl.ekmap.HeatMapLayer"
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
                    thumbnail: "cluster.png",
                    fileName: "cluster",
                    subject: "DESTINATION INFORMATION OF POSITIVE CASES FOR SARS-CoV-2 June 14, 2021 : 16:17",
                    description: "DESTINATION INFORMATION OF POSITIVE CASES FOR SARS-CoV-2 June 14, 2021 : 16:17. Source: https://ncov.moh.gov.vn/ban-do-vn"
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
                    {
                        name: "Point",
                        name_en: "Point",
                        thumbnail: "animation_point.gif",
                        fileName: "animation_point",
                        subject: "Animate the position of a point by updating a GeoJSON source on each frame.",
                        description: "Animate the position of a point by updating a GeoJSON source on each frame."
                    }
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
                    thumbnail: "data_rain.png",
                    fileName: "data_rain",
                    subject: "Use chart online to display flood warning data, rainfall information in Central - Vietnam.",
                    description: "Click point on the map to show flood warning data, rainfall information in Central - Vietnam by chart online."
                }]
            },
            threejs: {
                name: "threejs",
                name_en: "threejs",
                content: [{
                        name: "Buildings",
                        name_en: "Buildings",
                        version: "",
                        thumbnail: "threejsLayer_buildings.png",
                        fileName: "threejsLayer_buildings",
                        subject: "Use ThreeLayer to display buildings.",
                        description: "Use mapboxgl.ekmap.ThreeLayer to display buildings.",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.ThreeLayer.html",
                        nameApi:"mapboxgl.ekmap.ThreeLayer"
                    },
                    {
                        name: "Airplane(gltf)",
                        name_en: "Airplane(gltf)",
                        version: "",
                        thumbnail: "threejsLayer_airplane.gif",
                        fileName: "threejsLayer_airplane",
                        subject: "Use ThreeLayer to display airplane.",
                        description: "Use mapboxgl.ekmap.ThreeLayer to display airplane.",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.ThreeLayer.html",
                        nameApi:"mapboxgl.ekmap.ThreeLayer"
                    }
                ]
            },
            Thematic: {
                name: "2D thematic layer",
                name_en: "2D thematic layer",
                content: [{
                        name: "Rank symbol",
                        name_en: "Rank symbol",
                        version: "",
                        thumbnail: "2DLayer_RankSymbol.png",
                        fileName: "2DLayer_RankSymbol",
                        subject: "Use RankSymbolThemeLayer to display data.",
                        description: "Use mapboxgl.ekmap.RankSymbolThemeLayer to display data.",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.RankSymbolThemeLayer.html",
                        nameApi:"mapboxgl.ekmap.RankSymbolThemeLayer"
                    },
                    {
                        name: "Label",
                        name_en: "Label",
                        version: "",
                        thumbnail: "2DLayer_Label.png",
                        fileName: "2DLayer_Label",
                        subject: "Use LabelThemeLayer to display AQI",
                        description: "AQI - Air Safety Level Indicators - Hoan Kiem District Air Safety Level Indicators (29/05/2021 09:00). Source: https://moitruongthudo.vn/.",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.LabelThemeLayer.html",
                        nameApi:"mapboxgl.ekmap.LabelThemeLayer"
                    },
                    {
                        name: "Theme layer online",
                        name_en: "Theme layer online",
                        version: "",
                        thumbnail: "2DLayer_Theme.png",
                        fileName: "2DLayer_Theme",
                        subject: "Use ThemeMapLayer to display Temperature and Precipitation",
                        description: "Climate characteristics of provinces and cities in Vietnam. Source: http://vnmha.gov.vn/",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.ThemeMapLayer.html",
                        nameApi:"mapboxgl.ekmap.ThemeMapLayer"
                    }
                ]
            },
            LayerChart: {
                name: "Layer Chart",
                name_en: "Layer Chart",
                content: [{
                    name: "Statistical Chart",
                    name_en: "Statistical Chart",
                    thumbnail: "layerChart.png",
                    fileName: "layerChart",
                    subject: "Use DomOverlay to simulate measurement point position data with parameters (P, Q +, Q-, Pin).",
                    description: "Three points position data with parameters (P, Q +, Q-, Pin) displayed by chart and color respectively.",
                    urlApi: "/docs/mapboxgl/mapboxgl.ekmap.GraphThemeLayer.html",
                    nameApi:"mapboxgl.ekmap.GraphThemeLayer"
                }]
            },
            '3DLayer': {
                name: "3D Layer",
                name_en: "3D Layer",
                content: [{
                    name: "3D buildings",
                    name_en: "3D buildings",
                    version: "",
                    thumbnail: "data_3D.gif",
                    fileName: "data_3D",
                    subject: "3D data display shows the altitude of some Hanoi planning areas.",
                    description: "3D data display shows the altitude of some Hanoi planning areas."
                }]
            },
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
            Video: {
                name: "Video",
                name_en: "Video",
                content: [{
                    name: "Video Storm",
                    name_en: "Video Storm",
                    thumbnail: "video_storm.gif",
                    fileName: "video_storm",
                    subject: "Description of storm path in the form of video on the map.",
                    description: "Video path of Typhoon Saudel entering the South China Sea, forecast jerks to level 14."
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
                    name: "Web Map Service",
                    name_en: "Web Map Service",
                    thumbnail: "ogc_wms.png",
                    fileName: "ogc_wms",
                    subject: "Use the Web Map Services service to display US states data.",
                    description: "Click on the map to get info.",
                    urlApi: "/docs/mapboxgl/mapboxgl.ekmap.WMS.html",
                    nameApi:"mapboxgl.ekmap.WMS"
                }]
            },
            WFS: {
                name: "WFS",
                name_en: "WFS",
                content: [{
                    name: "Web Feature Service",
                    name_en: "Web Feature Service",
                    thumbnail: "ogc_wfs.png",
                    fileName: "ogc_wfs",
                    subject: "Use the Web Feature Services service to get geojson data and display it on a map (US states data).",
                    description: "Use the Web Feature Services service to get geojson data and display it on a map (US states data).",
                    urlApi: "/docs/mapboxgl/mapboxgl.ekmap.WFS.html",
                    nameApi:"mapboxgl.ekmap.WFS"
                }]
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
                content: [{
                        name: "Navigation Control",
                        name_en: "Navigation Control",
                        thumbnail: "control_navigationControl.png",
                        fileName: "control_navigationControl",
                        subject: "Navigation Control",
                        description: "A NavigationControl control contains zoom buttons and a compass."
                    },
                    {
                        name: "Scale Control",
                        name_en: "Scale Control",
                        thumbnail: "control_scaleControl.png",
                        fileName: "control_scaleControl",
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
                    },
                    {
                        name: "Geolocate Control",
                        name_en: "Geolocate Control",
                        thumbnail: "control_geolocateControl.png",
                        fileName: "control_geolocateControl",
                        subject: "Geolocate Control",
                        description: "A GeolocateControl control provides a button that uses the browser's geolocation API to locate the user on the map."
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
                        name: "Button Control",
                        name_en: "Button Control",
                        thumbnail: "control_buttonControl.png",
                        fileName: "control_buttonControl",
                        subject: "Button Control",
                        description: "Fire event when click button.",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.control.Button.html",
                        nameApi:"mapboxgl.ekmap.control.Button"
                    }
                ]
            },
            AdvancedControl: {
                name: "Control",
                name_en: "Advanced Control",
                content: [{
                        name: "Draw Control",
                        name_en: "Draw Control",
                        thumbnail: "control_drawControl.png",
                        fileName: "control_drawControl",
                        subject: "Use plugin mapbox-gl-draw. It adds support for drawing and editing features on maps. ",
                        description: "A DrawControl control contains some buttons for drawing and editing features on map.",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.control.Draw.html",
                        nameApi:"mapboxgl.ekmap.control.Draw"
                    },
                    {
                        name: "Swipe between maps",
                        name_en: "Swipe between maps",
                        thumbnail: "control_swipeBetweenMap.png",
                        fileName: "control_swipeBetweenMap",
                        subject: "Swipe Control.",
                        description: "Is a control that adds split screen to compare two map layers. Layers can be added to the left or right of the map."
                    },
                    {
                        name: "Side By Side",
                        name_en: "Side By Side",
                        thumbnail: "control_sideBySide.png",
                        fileName: "control_sideBySide",
                        subject: "Side By Side.",
                        description: "Side By Side"
                    },
                    {
                        name: "Snapshot maps",
                        name_en: "Snapshot maps",
                        thumbnail: "control_snapShotControl.png",
                        fileName: "control_snapShotControl",
                        subject: "Snapshot Control",
                        description: "A SnapshotControl control contains a button for screenshot.",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.control.SnapShot.html",
                        nameApi:"mapboxgl.ekmap.control.SnapShot"
                    },
                    {
                        name: "Reverse Geocoder",
                        name_en: "Reverse Geocoder",
                        thumbnail: "vectorTile_Map_reverseGeocoder.gif",
                        fileName: "vectorTile_Map_reverseGeocoder",
                        subject: "Reverse Geocoder.",
                        description: "Click button action draw and the area",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.control.Reverse.html",
                        nameApi:"mapboxgl.ekmap.control.Reverse"
                    },
                    {
                        name: "Geocoder",
                        name_en: "Geocoder",
                        thumbnail: "vectorTile_Map_geocoder.gif",
                        fileName: "vectorTile_Map_geocoder",
                        subject: "Use the geocoder control to search for places using the Mapbox Geocoding API.",
                        description: "Use the geocoder control to search for places using the Mapbox Geocoding API.",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.control.Geocoder.html",
                        nameApi:"mapboxgl.ekmap.control.Geocoder"
                    },
                    {
                        name: "Draw Circle",
                        name_en: "Draw Circle",
                        thumbnail: "control_drawCircleControl.gif",
                        fileName: "control_drawCircleControl",
                        subject: "Draw Circle.",
                        description: "Use control DrawCircle to draw circle",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.control.DrawCircle.html",
                        nameApi:"mapboxgl.ekmap.control.DrawCircle"
                    },
                    {
                        name: "Draw Line Buffer",
                        name_en: "Draw Line Buffer",
                        thumbnail: "control_drawLineBufferControl.gif",
                        fileName: "control_drawLineBufferControl",
                        subject: "Draw Line Buffer.",
                        description: "Use control Draw and control DrawLine to draw line buffer",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.control.DrawLine.html",
                        nameApi:"mapboxgl.ekmap.control.DrawLine"
                    },
                    {
                        name: "Show Drawn Polygon Area",
                        name_en: "Show Drawn Polygon Area",
                        thumbnail: "vectorTile_Map_drawS.png",
                        fileName: "vectorTile_Map_drawS",
                        subject: "Use control Draw to draw a rectangle and Turf.js to calculate its area in square kilometers.",
                        description: "Use control Draw to draw a rectangle and Turf.js to calculate its area in square kilometers.",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.control.Draw.html",
                        nameApi:"mapboxgl.ekmap.control.Draw"
                    },
                    {
                        name: "Rule",
                        name_en: "Rule",
                        thumbnail: "control_ruleControl.png",
                        fileName: "control_ruleControl",
                        subject: "Use control Draw to draw a rectangle and Turf.js to calculate its area in square kilometers.",
                        description: "Use control Draw to draw a rectangle and Turf.js to calculate its area in square kilometers.",
                        urlApi: "/docs/mapboxgl/mapboxgl.ekmap.control.Rule.html",
                        nameApi:"mapboxgl.ekmap.control.Rule"
                    }
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