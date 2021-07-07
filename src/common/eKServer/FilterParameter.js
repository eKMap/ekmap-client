import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';

/**
  * @class Ekmap.FilterParameter
  * @category eKServer
  * @classdesc Query the parameter class of the filter condition. This class is used to set the query filter parameters of the query data set.
  * @param {Object} options-parameters.
  * @param {string} options.attributeFilter-attribute filter criteria.
  * @param {string} options.name-query data set name or layer name.
  * @param {Array.<string>} [options.ids] Query the id array, that is, the SmID value in the attribute table.
  * @param {string} [options.orderBy] Query the sorting field, the orderBy field must be numeric.
  * @param {string} [options.groupBy] Query the field of grouping conditions.
  * @param {Array.<string>} [options.fields] Query field array.
  */
export class FilterParameter {
    constructor(options) {
        /**
         * @member {string} Ekmap.FilterParameter.prototype.attributeFilter
         * @description attribute filter condition.
         * Equivalent to the WHERE clause in the SQL statement, its format is: WHERE <conditional expression>,
         * attributeFilter is one of the "conditional expressions".
         * The usage of this field is attributeFilter = "filter condition".
         * For example, to query records with fieldValue less than 100, set attributeFilter = "fieldValue <100";
         * To query the records where the value of the field name is "hotel", set attributeFilter = "name like'%hotel%'", and so on.
         */
        this.attributeFilter = null;

        /**
         * @member {string} Ekmap.FilterParameter.prototype.name
         * @description Query data set name or layer name, depending on the actual query object.
         * Under normal circumstances, this field is the name of the dataset, but when performing operations related to the map,
         * Need to be set to the layer name (layer name format: dataset name@data source alias).
         * Because the layers of a map may be datasets from different data sources,
         * There may be data sets with the same name in different data sources,
         * The name of the data set cannot be used to uniquely determine the data set.
         * So when performing map-related functions, this value needs to be set as the layer name.
         */
        this.name = null;
       
        /**
         * @member {Array.<string>} [Ekmap.FilterParameter.prototype.ids]
         * @description Query the id array, that is, the SmID value in the attribute table.
         */
        this.ids = null;

        /**
         * @member {string} [Ekmap.FilterParameter.prototype.orderBy]
         * @description Query the sorted field, the orderBy field must be numeric.
         * Equivalent to the ORDER BY clause in the SQL statement, its format is: ORDER BY <column name>,
         * The column name is the name of each column in the attribute table. The column can also be called an attribute, which is also called a field in Ekmap.
         * When sorting a single field, the usage of the field is orderBy = "field name";
         * When sorting multiple fields, separate the fields with English commas. The usage is orderBy = "field name 1, field name 2".
         * For example, there is a national data set, it has two fields "SmArea" and "pop_1994",
         * Indicates the area of ​​the country and the population of each country in 1994.
         * If you want to sort the records according to the population of each country, orderBy = "pop_1994";
         * If you want to sort by area and population, orderBy = "SmArea, pop_1994".
         */
        this.orderBy = null;


        /**
         * @member {string} [Ekmap.FilterParameter.prototype.groupBy]
         * @description Query the field of the grouping condition.
         * Equivalent to the GROUP BY clause in the SQL statement, its format is: GROUP BY <column name>,
         * The column name is the name of each column in the attribute table. The column can also be called an attribute, which is also called a field in Ekmap.
         * When grouping a single field, the usage of the field is groupBy = "field name";
         * When grouping multiple fields, separate the fields with English commas. The usage is groupBy = "field name 1, field name 2".
         * For example, there is an existing global city data set, the data set has two fields "Continent" and "Country",
         * Indicates the continent and country to which a city belongs.
         * If you want to group cities around the world by country, you can set groupBy = "Country";
         * To group cities by continent and country, set groupBy = "Continent, Country".
         */
        this.groupBy = null;

        /**
         * @member {Array.<string>} [Ekmap.FilterParameter.prototype.fields]
         * @description query field array, if not set, all fields returned by the system will be used.
         */
        this.fields = null;
        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "Ekmap.FilterParameter";
    }
}

Ekmap.FilterParameter = FilterParameter;