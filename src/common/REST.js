import {
    Ekmap
} from './Ekmap';

/**
 * @enum DataFormat
 * @memberOf Ekmap
 * @type {string}
 */
var DataFormat = Ekmap.DataFormat = {
    /** GEOJSON */
    GEOJSON: "GEOJSON",
    /** EKSERVER */
    EKSERVER: "EKSERVER"
};
export {
    DataFormat
};

/**
 * @enum ServerType
 * @memberOf Ekmap
 * @description erver type
 * @type {string}
 */
var ServerType = Ekmap.ServerType = {
    /** EKSERVER */
    EKSERVER: "EKSERVER",
    /** ONLINE */
    ONLINE: "ONLINE"
};
export {
    ServerType
};

/**
 * @enum GeometryType
 * @memberOf Ekmap
 * @description The geometric object enumeration defines a series of geometric object types.
 * @type {string}
 */
var GeometryType = Ekmap.GeometryType = {
    /** LINE */
    LINE: "LINE",
    /** LINEM */
    LINEM: "LINEM",
    /** POINT */
    POINT: "POINT",
    /** REGION */
    REGION: "REGION",
    /** POINTEPS */
    POINTEPS: "POINTEPS",
    /** LINEEPS */
    LINEEPS: "LINEEPS",
    /** REGIONEPS */
    REGIONEPS: "REGIONEPS",
    /** ELLIPSE */
    ELLIPSE: "ELLIPSE",
    /** CIRCLE */
    CIRCLE: "CIRCLE",
    /** TEXT */
    TEXT: "TEXT",
    /** RECTANGLE */
    RECTANGLE: "RECTANGLE",
    /** UNKNOWN */
    UNKNOWN: "UNKNOWN"
};
export {
    GeometryType
};

/**
 * @enum QueryOption
 * @memberOf Ekmap
 * @description The query result type enumeration describes the return type of the query result, including returning only attributes, returning only geometric entities, and returning attributes and geometric entities.
 * @type {string}
 */
var QueryOption = Ekmap.QueryOption = {
    ATTRIBUTE: "ATTRIBUTE",
    ATTRIBUTEANDGEOMETRY: "ATTRIBUTEANDGEOMETRY",
    GEOMETRY: "GEOMETRY"
};
export {
    QueryOption
}

/**
 * @enum JoinType
 * @memberOf Ekmap
 * @description The constant of the association type in the association query.
 * This class defines the constants of the connection type between the two tables, and determines the records obtained in the query result when the connection query between the two tables is performed.
 * @type {string}
 */
var JoinType = Ekmap.JoinType = {
    /** INNERJOIN */
    INNERJOIN: "INNERJOIN",
    /** LEFTJOIN */
    LEFTJOIN: "LEFTJOIN"
};
export {
    JoinType
}


/**
 * @enum SpatialQueryMode
 * @memberOf Ekmap
 * @description Enumeration of spatial query modes. This class defines constants for spatial query operation mode.
 * @type {string}
 */
var SpatialQueryMode = Ekmap.SpatialQueryMode = {
    CONTAIN: "CONTAIN",
    CROSS: "CROSS",
    DISJOINT: "DISJOINT",
    IDENTITY: "IDENTITY",
    INTERSECT: "INTERSECT",
    NONE: "NONE",
    OVERLAP: "OVERLAP",
    TOUCH: "TOUCH",
    WITHIN: "WITHIN"
};
export {
    SpatialQueryMode
}
/**
 * @enum SpatialRelationType
 * @memberOf Ekmap
 * @description  Enumeration of spatial relationships among data set objects.
 * This class defines the type constants of the spatial relationship between the data set objects.
 * @type {string}
 */
var SpatialRelationType = Ekmap.SpatialRelationType = {
    CONTAIN: "CONTAIN",
    INTERSECT: "INTERSECT",
    WITHIN: "WITHIN"
};
export {
    SpatialRelationType
}

/**
 * @enum MeasureMode
 * @memberOf Ekmap
 * @type {string}
 * @description Enumeration of measurement modes.
 * This class defines two measurement modes: distance measurement and area measurement.
 */
var MeasureMode = Ekmap.MeasureMode = {
    DISTANCE: "DISTANCE",
    AREA: "AREA"
};
export {
    MeasureMode
}

/**
 * @enum Unit
 * @memberOf Ekmap
 * @description Enumeration of distance units.
 * This class defines a series of distance unit types.
 * @type {string}
 */
var Unit = Ekmap.Unit = {
    METER: "METER",
    KILOMETER: "KILOMETER",
    MILE: "MILE",
    YARD: "YARD",
    DEGREE: "DEGREE",
    MILLIMETER: "MILLIMETER",
    CENTIMETER: "CENTIMETER",
    INCH: "INCH",
    DECIMETER: "DECIMETER",
    FOOT: "FOOT",
    SECOND: "SECOND",
    MINUTE: "MINUTE",
    RADIAN: "RADIAN"
};
export {
    Unit
}

/**
 * @enum BufferRadiusUnit
 * @memberOf Ekmap
 * @description Enumeration of buffer distance units.
 * This class defines a series of buffer distance unit types.
 * @type {string}
 */
var BufferRadiusUnit = Ekmap.BufferRadiusUnit = {
    CENTIMETER: "CENTIMETER",
    DECIMETER: "DECIMETER",
    FOOT: "FOOT",
    INCH: "INCH",
    KILOMETER: "KILOMETER",
    METER: "METER",
    MILE: "MILE",
    MILLIMETER: "MILLIMETER",
    YARD: "YARD"
}
export {
    BufferRadiusUnit
}

/**
 * @enum EngineType
 * @memberOf Ekmap
 * @description Data source engine type enumeration.
 * @type {string}
 */
var EngineType = Ekmap.EngineType = {
    IMAGEPLUGINS: "IMAGEPLUGINS",
    OGC: "OGC",
    ORACLEPLUS: "ORACLEPLUS",
    SDBPLUS: "SDBPLUS",
    SQLPLUS: "SQLPLUS",
    UDB: "UDB"
};
export {
    EngineType
}

/**
 * @enum ThemeGraphTextFormat
 * @memberOf Ekmap
 * @description The enumeration of the text display format of the statistics map.
 * @type {string}
 */
var ThemeGraphTextFormat = Ekmap.ThemeGraphTextFormat = {
    CAPTION: "CAPTION",
    CAPTION_PERCENT: "CAPTION_PERCENT",
    CAPTION_VALUE: "CAPTION_VALUE",
    PERCENT: "PERCENT",
    VALUE: "VALUE"

};
export {
    ThemeGraphTextFormat
}

/**
 * @enum ThemeGraphType
 * @memberOf Ekmap
 * @description The enumeration of statistical map types.
 * @type {string}
 */
var ThemeGraphType = Ekmap.ThemeGraphType = {
    AREA: "AREA",
    BAR: "BAR",
    BAR3D: "BAR3D",
    LINE: "LINE",
    PIE: "PIE",
    PIE3D: "PIE3D",
    POINT: "POINT",
    RING: "RING",
    ROSE: "ROSE",
    ROSE3D: "ROSE3D",
    STACK_BAR: "STACK_BAR",
    STACK_BAR3D: "STACK_BAR3D",
    STEP: "STEP"
};
export {
    ThemeGraphType
}

/**
 * @enum GraphAxesTextDisplayMode
 * @memberOf Ekmap
 * @description The text display mode of the axis of the statistics map.
 * @type {string}
 */
var GraphAxesTextDisplayMode = Ekmap.GraphAxesTextDisplayMode = {
    ALL: "ALL",
    NONE: "NONE",
    YAXES: "YAXES"
};
export {
    GraphAxesTextDisplayMode
}

/**
 * @enum GraduatedMode
 * @memberOf Ekmap
 * @description Enumeration of thematic map classification modes.
 *
 * @type {string}
 */
var GraduatedMode = Ekmap.GraduatedMode = {
    CONSTANT: "CONSTANT",
    LOGARITHM: "LOGARITHM",
    SQUAREROOT: "SQUAREROOT"
};
export {
    GraduatedMode
}

/**
 * @enum RangeMode
 * @memberOf Ekmap
 * @description Enumerate the range mode of the range range thematic map.
 * @type {string}
 */
var RangeMode = Ekmap.RangeMode = {
    CUSTOMINTERVAL: "CUSTOMINTERVAL",
    EQUALINTERVAL: "EQUALINTERVAL",
    LOGARITHM: "LOGARITHM",
    QUANTILE: "QUANTILE",
    SQUAREROOT: "SQUAREROOT",
    STDDEVIATION: "STDDEVIATION"
};
export {
    RangeMode
}

/**
 * @enum ThemeType
 * @memberOf Ekmap
 * @description Enumeration of thematic map types.
 * @type {string}
 */
var ThemeType = Ekmap.ThemeType = {
    DOTDENSITY: "DOTDENSITY",
    GRADUATEDSYMBOL: "GRADUATEDSYMBOL",
    GRAPH: "GRAPH",
    LABEL: "LABEL",
    RANGE: "RANGE",
    UNIQUE: "UNIQUE"
};
export {
    ThemeType
}

/**
 * @enum ColorGradientType
 * @memberOf Ekmap
 * @description Gradient color enumeration.
 * @type {string}
 */
var ColorGradientType = Ekmap.ColorGradientType = {
    BLACK_WHITE: "BLACKWHITE",
    BLUE_BLACK: "BLUEBLACK",
    BLUE_RED: "BLUERED",
    BLUE_WHITE: "BLUEWHITE",
    CYAN_BLACK: "CYANBLACK",
    CYAN_BLUE: "CYANBLUE",
    CYAN_GREEN: "CYANGREEN",
    CYAN_WHITE: "CYANWHITE",
    GREEN_BLACK: "GREENBLACK",
    GREEN_BLUE: "GREENBLUE",
    GREEN_ORANGE_VIOLET: "GREENORANGEVIOLET",
    GREEN_RED: "GREENRED",
    GREEN_WHITE: "GREENWHITE",
    PINK_BLACK: "PINKBLACK",
    PINK_BLUE: "PINKBLUE",
    PINK_RED: "PINKRED",
    PINK_WHITE: "PINKWHITE",
    RAIN_BOW: "RAINBOW",
    RED_BLACK: "REDBLACK",
    RED_WHITE: "REDWHITE",
    SPECTRUM: "SPECTRUM",
    TERRAIN: "TERRAIN",
    YELLOW_BLACK: "YELLOWBLACK",
    YELLOW_BLUE: "YELLOWBLUE",
    YELLOW_GREEN: "YELLOWGREEN",
    YELLOW_RED: "YELLOWRED",
    YELLOW_WHITE: "YELLOWWHITE"
};
export {
    ColorGradientType
}

var TextAlignment = Ekmap.TextAlignment = {
    TOPLEFT: "TOPLEFT",
    TOPCENTER: "TOPCENTER",
    TOPRIGHT: "TOPRIGHT",
    BASELINELEFT: "BASELINELEFT",
    BASELINECENTER: "BASELINECENTER",
    BASELINERIGHT: "BASELINERIGHT",
    BOTTOMLEFT: "BOTTOMLEFT",
    BOTTOMCENTER: "BOTTOMCENTER",
    BOTTOMRIGHT: "BOTTOMRIGHT",
    MIDDLELEFT: "MIDDLELEFT",
    MIDDLECENTER: "MIDDLECENTER",
    MIDDLERIGHT: "MIDDLERIGHT"
};
export {
    TextAlignment
}
var FillGradientMode = Ekmap.FillGradientMode = {
    NONE: "NONE",
    LINEAR: "LINEAR",
    RADIAL: "RADIAL",
    CONICAL: "CONICAL",
    SQUARE: "SQUARE"
};
export {
    FillGradientMode
}
var AlongLineDirection = Ekmap.AlongLineDirection = {
    NORMAL: "ALONG_LINE_NORMAL",
    LB_TO_RT: "LEFT_BOTTOM_TO_RIGHT_TOP",
    LT_TO_RB: "LEFT_TOP_TO_RIGHT_BOTTOM",
    RB_TO_LT: "RIGHT_BOTTOM_TO_LEFT_TOP",
    RT_TO_LB: "RIGHT_TOP_TO_LEFT_BOTTOM"
};
export {
    AlongLineDirection
}

var LabelBackShape = Ekmap.LabelBackShape = {
    DIAMOND: "DIAMOND",
    ELLIPSE: "ELLIPSE",
    MARKER: "MARKER",
    NONE: "NONE",
    RECT: "RECT",
    ROUNDRECT: "ROUNDRECT",
    TRIANGLE: "TRIANGLE"
};
export {
    LabelBackShape
}

var LabelOverLengthMode = Ekmap.LabelOverLengthMode = {
    NEWLINE: "NEWLINE",
    NONE: "NONE",
    OMIT: "OMIT"
};
export {
    LabelOverLengthMode
}

var DirectionType = Ekmap.DirectionType = {
    EAST: "EAST",
    NONE: "NONE",
    NORTH: "NORTH",
    SOURTH: "SOURTH",
    WEST: "WEST"
};
export {
    DirectionType
}

var SideType = Ekmap.SideType = {
    LEFT: "LEFT",
    MIDDLE: "MIDDLE",
    NONE: "NONE",
    RIGHT: "RIGHT"
};
export {
    SideType
}

var SupplyCenterType = Ekmap.SupplyCenterType = {
    FIXEDCENTER: "FIXEDCENTER",
    NULL: "NULL",
    OPTIONALCENTER: "OPTIONALCENTER"
};
export {
    SupplyCenterType
}

var TurnType = Ekmap.TurnType = {
    AHEAD: "AHEAD",
    BACK: "BACK",
    END: "END",
    LEFT: "LEFT",
    NONE: "NONE",
    RIGHT: "RIGHT"
};
export {
    TurnType
}

var BufferEndType = Ekmap.BufferEndType = {
    FLAT: "FLAT",
    ROUND: "ROUND"
};
export {
    BufferEndType
}
var OverlayOperationType = Ekmap.OverlayOperationType = {
    CLIP: "CLIP",
    ERASE: "ERASE",
    IDENTITY: "IDENTITY",
    INTERSECT: "INTERSECT",
    UNION: "UNION",
    UPDATE: "UPDATE",
    XOR: "XOR"
};
export {
    OverlayOperationType
}
var OutputType = Ekmap.OutputType = {
    INDEXEDHDFS: "INDEXEDHDFS",
    UDB: "UDB",
    MONGODB: "MONGODB",
    PG: "PG"
};
export {
    OutputType
}

var SmoothMethod = Ekmap.SmoothMethod = {
    BSPLINE: "BSPLINE",
    POLISH: "POLISH"
};
export {
    SmoothMethod
}
var SurfaceAnalystMethod = Ekmap.SurfaceAnalystMethod = {
    ISOLINE: "ISOLINE",
    ISOREGION: "ISOREGION"
};
export {
    SurfaceAnalystMethod
}
var DataReturnMode = Ekmap.DataReturnMode = {
    DATASET_AND_RECORDSET: "DATASET_AND_RECORDSET",
    DATASET_ONLY: "DATASET_ONLY",
    RECORDSET_ONLY: "RECORDSET_ONLY"
};
export {
    DataReturnMode
}
var EditType = Ekmap.EditType = {
    ADD: "add",
    UPDATE: "update",
    DELETE: "delete"
};
export {
    EditType
}
var TransferTactic = Ekmap.TransferTactic = {
    LESS_TIME: "LESS_TIME",
    LESS_TRANSFER: "LESS_TRANSFER",
    LESS_WALK: "LESS_WALK",
    MIN_DISTANCE: "MIN_DISTANCE"
};
export {
    TransferTactic
}
var TransferPreference = Ekmap.TransferPreference = {
    BUS: "BUS",
    SUBWAY: "SUBWAY",
    NO_SUBWAY: "NO_SUBWAY",
    NONE: "NONE"
};
export {
    TransferPreference
}
var GridType = Ekmap.GridType = {
    CROSS: "CROSS",
    GRID: "GRID",
    POINT: "POINT"
};
export {
    GridType
}
var ColorSpaceType = Ekmap.ColorSpaceType = {
    CMYK: "CMYK",
    RGB: "RGB"
};
export {
    ColorSpaceType
}
var LayerType = Ekmap.LayerType = {
    UGC: "UGC",
    WMS: "WMS",
    WFS: "WFS",
    CUSTOM: "CUSTOM"
};
export {
    LayerType
}
var UGCLayerType = Ekmap.UGCLayerType = {
    THEME: "THEME",
    VECTOR: "VECTOR",
    GRID: "GRID",
    IMAGE: "IMAGE"
};
export {
    UGCLayerType
}
var StatisticMode = Ekmap.StatisticMode = {
    AVERAGE: "AVERAGE",
    MAX: "MAX",
    MIN: "MIN",
    STDDEVIATION: "STDDEVIATION",
    SUM: "SUM",
    VARIANCE: "VARIANCE"
};
export {
    StatisticMode
}
var PixelFormat = Ekmap.PixelFormat = {
    BIT16: "BIT16",
    BIT32: "BIT32",
    BIT64: "BIT64",
    SINGLE: "SINGLE",
    DOUBLE: "DOUBLE",
    UBIT1: "UBIT1",
    UBIT4: "UBIT4",
    UBIT8: "UBIT8",
    UBIT24: "UBIT24",
    UBIT32: "UBIT32"
};
export {
    PixelFormat
}

var SearchMode = Ekmap.SearchMode = {
    KDTREE_FIXED_COUNT: "KDTREE_FIXED_COUNT",
    KDTREE_FIXED_RADIUS: "KDTREE_FIXED_RADIUS",
    NONE: "NONE",
    QUADTREE: "QUADTREE"
};
export {
    SearchMode
}
var InterpolationAlgorithmType = Ekmap.InterpolationAlgorithmType = {
    KRIGING: "KRIGING",
    SimpleKriging: "SimpleKriging",
    UniversalKriging: "UniversalKriging"
};
export {
    InterpolationAlgorithmType
}
var VariogramMode = Ekmap.VariogramMode = {
    EXPONENTIAL: "EXPONENTIAL",
    GAUSSIAN: "GAUSSIAN",
    SPHERICAL: "SPHERICAL"
};
export {
    VariogramMode
}
var Exponent = Ekmap.Exponent = {
    EXP1: "EXP1",
    EXP2: "EXP2"
};
export {
    Exponent
}

var ClientType = Ekmap.ClientType = {
    IP: "IP",
    REFERER: "Referer",
    REQUESTIP: "RequestIP",
    NONE: "NONE",
    SERVER: "SERVER",
    WEB: "WEB"
};
export {
    ClientType
}
var ChartType = Ekmap.ChartType = {
    BAR: "Bar",
    BAR3D: "Bar3D",
    CIRCLE: "Circle",
    PIE: "Pie",
    POINT: "Point",
    LINE: "Line",
    RING: "Ring"
};
export {
    ChartType
}
var ClipAnalystMode = Ekmap.ClipAnalystMode = {
    CLIP: "clip",
    INTERSECT: "intersect"
};
export {
    ClipAnalystMode
}

var AnalystAreaUnit = Ekmap.AnalystAreaUnit = {
    "SQUAREMETER": "SquareMeter",
    "SQUAREKILOMETER": "SquareKiloMeter",
    "HECTARE": "Hectare",
    "ARE": "Are",
    "ACRE": "Acre",
    "SQUAREFOOT": "SquareFoot",
    "SQUAREYARD": "SquareYard",
    "SQUAREMILE": "SquareMile"
};
export {
    AnalystAreaUnit
}

var AnalystSizeUnit = Ekmap.AnalystSizeUnit = {
    "METER": "Meter",
    "KILOMETER": "Kilometer",
    "YARD": "Yard",
    "FOOT": "Foot",
    "MILE": "Mile"
};
export {
    AnalystSizeUnit
}

var StatisticAnalystMode = Ekmap.StatisticAnalystMode = {
    "MAX": "max",
    "MIN": "min",
    "AVERAGE": "average",
    "SUM": "sum",
    "VARIANCE": "variance",
    "STDDEVIATION": "stdDeviation"
};
export {
    StatisticAnalystMode
}
/**
 * @enum SummaryType
 * @memberOf Ekmap
 * @type {string}
 */
var SummaryType = Ekmap.SummaryType = {
    "SUMMARYMESH": "SUMMARYMESH",
    "SUMMARYREGION": "SUMMARYREGION"
};
export {
    SummaryType
}

var TopologyValidatorRule = Ekmap.TopologyValidatorRule = {
    REGIONNOOVERLAP: "REGIONNOOVERLAP",
    REGIONNOOVERLAPWITH: "REGIONNOOVERLAPWITH",
    REGIONCONTAINEDBYREGION: "REGIONCONTAINEDBYREGION",
    REGIONCOVEREDBYREGION: "REGIONCOVEREDBYREGION",
    LINENOOVERLAP: "LINENOOVERLAP",
    LINENOOVERLAPWITH: "LINENOOVERLAPWITH",
    POINTNOIDENTICAL: "POINTNOIDENTICAL"
};
export {
    TopologyValidatorRule
}

var AggregationType = Ekmap.AggregationType = {
    GEOHASH_GRID: "geohash_grid",
    FILTER: "filter"
};
export {
    AggregationType
}

var AggregationQueryBuilderType = Ekmap.AggregationQueryBuilderType = {
    GEO_BOUNDING_BOX: "geo_bounding_box"
}
export {
    AggregationQueryBuilderType
}

var GetFeatureMode = Ekmap.GetFeatureMode = {
    BOUNDS: "BOUNDS",
    BUFFER: "BUFFER",
    ID: "ID",
    SPATIAL: "SPATIAL",
    SQL: 'SQL'
}
export {
    GetFeatureMode
}

var RasterFunctionType = Ekmap.RasterFunctionType = {
    NDVI: "NDVI",
    HILLSHADE: "HILLSHADE"
}
export {
    RasterFunctionType
}

var ResourceType = Ekmap.ResourceType = {
    MAP: "MAP",
    SERVICE: "SERVICE",
    SCENE: "SCENE",
    DATA: "DATA",
    INSIGHTS_WORKSPACE: "INSIGHTS_WORKSPACE",
    MAP_DASHBOARD: "MAP_DASHBOARD"
}
export {
    ResourceType
}

var OrderBy = Ekmap.OrderBy = {
    UPDATETIME: "UPDATETIME",
    HEATLEVEL: "HEATLEVEL",
    RELEVANCE: "RELEVANCE"
}
export {
    OrderBy
}

var OrderType = Ekmap.OrderType = {
    ASC: "ASC",
    DESC: "DESC"
}
export {
    OrderType
}

var SearchType = Ekmap.SearchType = {
    PUBLIC: "PUBLIC",
    MY_RES: "MY_RES",
    MYGROUP_RES: "MYGROUP_RES",
    MYDEPARTMENT_RES: "MYDEPARTMENT_RES",
    SHARETOME_RES: "SHARETOME_RES"
}
export {
    SearchType
}

var AggregationTypes = Ekmap.AggregationTypes = {
    TAG: "TAG",
    TYPE: "TYPE"
}
export {
    AggregationTypes
}

var PermissionType = Ekmap.PermissionType = {
    SEARCH: "SEARCH",
    READ: "READ",
    READWRITE: "READWRITE",
    DELETE: "DELETE",
    DOWNLOAD: "DOWNLOAD"
}
export {
    PermissionType
}

var EntityType = Ekmap.EntityType = {
    DEPARTMENT: "DEPARTMENT",
    GROUP: "GROUP",
    IPORTALGROUP: "IPORTALGROUP",
    ROLE: "ROLE",
    USER: "USER"
}
export {
    EntityType
}

var DataItemType = Ekmap.DataItemType = {
    WORKSPACE: "WORKSPACE",
    UDB: "UDB",
    SHP: "SHP",
    EXCEL: "EXCEL",
    CSV: "CSV",
    GEOJSON: "GEOJSON",
    SMTILES: "SMTILES",
    SVTILES: "SVTILES",
    MBTILES: "MBTILES",
    TPK: "TPK",
    UGCV5: "UGCV5",
    UGCV5_MVT: "UGCV5_MVT",
    JSON: "JSON"
}
export {
    DataItemType
}