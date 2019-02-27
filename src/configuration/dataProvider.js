import queryString from 'query-string';
import {fetchUtils, GET_LIST, GET_ONE, GET_MANY,GET_MANY_REFERENCE, DELETE_MANY, UPDATE_MANY, UPDATE, CREATE, DELETE } from 'react-admin'
import {data} from './authProvider';
import {API_URL} from '../configuration/constants';


/**
 * Maps react-admin queries to a simple REST API
 *
 * The REST dialect is similar to the one of FakeRest
 * @see https://github.com/marmelab/FakeRest
 * @example
 * GET_LIST     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts?filter={ids:[123,456,789]}
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts
 * DELETE       => DELETE http://my.api.url/posts/123
 */

const dataProvider = (apiUrl, httpClient) => {
  if (httpClient === void 0) {
    httpClient = fetchUtils.fetchJson;
  }
  /**
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The data request params, depending on the type
   * @returns {Object} { url, options } The HTTP request parameters
   */
  var convertDataRequestToHTTP = function(type, resource, params = {}) {
    console.log('data from auth', data)
    var filter = data.loja ? {
      where: {
        lojaId: data.loja.id//authProvider.loja.id
      }
    } : {}

    console.log('filter', filter, type)

    if (params.filter) {
      for (var key in params.filter) {
        const value = params.filter[key];
        if (typeof value === "string") {
          filter.where[key] = { like: `%${value}%` };
        } else {
          filter.where[key] = value;
        }
      }
    }

    console.log(filter);

    var _a;
    var url = "";
    var options = {};
    switch (type) {
      case GET_LIST: {
        filter.skip = (params.pagination.page - 1) * params.pagination.perPage;
        filter.limit = params.pagination.perPage;
        filter.order = `${params.sort.field} ${params.sort.order}`;

        var query = { filter: JSON.stringify(filter) };

        url = apiUrl + "/" + resource + "?" + queryString.stringify(query);
        break;
      }
      case GET_ONE: {
        filter.where.id = params.id;
        var query = { filter: JSON.stringify(filter) };

        url =
          apiUrl +
          "/" +
          resource +
          "/findOne?" +
          queryString.stringify(query);
        break;
      }
      case GET_MANY: {
        filter.where.id = params.ids;
        var query = { filter: JSON.stringify(filter) };

        url = apiUrl + "/" + resource + "?" + queryString.stringify(query);
        break;
      }
      case GET_MANY_REFERENCE: {
        var _d = params.pagination,
          page = _d.page,
          perPage = _d.perPage;
        var _e = params.sort,
          field = _e.field,
          order = _e.order;
        var query = {
          sort: JSON.stringify([field, order]),
          range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
          filter: JSON.stringify(Object.assign({},
              params.filter,
              ((_a = {}), (_a[params.target] = params.id), _a)
            )
          )
        };
        url = apiUrl + "/" + resource + "?" + queryString.stringify(query);

        throw new Error("dataProvider:GET_MANY_REFERENCE não adaptado para o loopback");
      }

      case UPDATE:
        params.data.atualizado = Date.now();

        url = apiUrl + "/" + resource + "/" + params.id;
        options.method = "PUT";
        options.body = JSON.stringify(params.data);
        break;
      case CREATE:
        params.data.criado = params.data.atualizado = Date.now();
        params.data.lojaId = data.loja.id;

        url = apiUrl + "/" + resource;
        options.method = "POST";
        options.body = JSON.stringify(params.data);
        break;
      case DELETE:
        url = apiUrl + "/" + resource + "/" + params.id;
        options.method = "DELETE";
        break;
      default:
        throw new Error("Unsupported fetch action type " + type);
    }

    console.log(filter);

    return { url: url, options: options };
  };
  /**
   * @param {Object} response HTTP response from fetch()
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The data request params, depending on the type
   * @returns {Object} Data response
   */
  var convertHTTPResponse = function(response, type, resource, params) {
    var headers = response.headers,
      json = response.json;
    switch (type) {
      case GET_LIST:
      case GET_MANY_REFERENCE:
        if (!headers.has("content-range")) {
          throw new Error(
            "The Content-Range header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?"
          );
        }
        console.log('json', json)
        return {
          data: json,
          total: parseInt(
            headers
              .get("content-range")
              .split("/")
              .pop(),
            10
          )
        };
      case CREATE:
        return { data: {...params.data, id: json.id }};
      default:
        return { data: json };
    }
  };
  /**
   * @param {string} type Request type, e.g GET_LIST
   * @param {string} resource Resource name, e.g. "posts"
   * @param {Object} payload Request parameters. Depends on the request type
   * @returns {Promise} the Promise for a data response
   */
  return function(type, resource, params) {
    // simple-rest doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
    if (type === UPDATE_MANY) {
      return Promise.all(
        params.ids.map(function(id) {
          return httpClient(apiUrl + "/" + resource + "/" + id, {
            method: "PUT",
            body: JSON.stringify(params.data)
          });
        })
      ).then(function(responses) {
        return {
          data: responses.map(function(response) {
            return response.json;
          })
        };
      });
    }

    // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
    if (type === DELETE_MANY) {
      return Promise.all(
        params.ids.map(function(id) {
          return httpClient(apiUrl + "/" + resource + "/" + id, {
            method: "DELETE"
          });
        })
      ).then(function(responses) {
        return {
          data: responses.map(function(response) {
            return response.json;
          })
        };
      });
    }

    var _a = convertDataRequestToHTTP(type, resource, params),
      url = _a.url,
      options = _a.options;
    return httpClient(url, options).then(function(response) {
      return convertHTTPResponse(response, type, resource, params);
    });
  };
};

export default dataProvider(API_URL)