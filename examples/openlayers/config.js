/* 
 * MapboxGL
 */
var identification = {
    name: "OpenLayers"
};

var exampleConfig = {
    control: {
        name: "Control",
        name_en: "Control",
        content: {
            BasicControl: {
                name: "Control",
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
                    },
                    {
                        name: "Draw Control",
                        name_en: "Draw Control",
                        thumbnail: "control_drawControl.png",
                        fileName: "control_drawControl",
                        subject: "Geolocate Control",
                        description: "A GeolocateControl control provides a button that uses the browser's geolocation API to locate the user on the map."
                    },
                    {
                        name: "BaseLayer Control",
                        name_en: "BaseLayer Control",
                        thumbnail: "control_baseLayerControl.png",
                        fileName: "control_baseLayerControl",
                        subject: "Geolocate Control",
                        description: "A GeolocateControl control provides a button that uses the browser's geolocation API to locate the user on the map."
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