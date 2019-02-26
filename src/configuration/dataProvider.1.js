var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, "__esModule", { value: true });
var query_string_1 = require("query-string");
var react_admin_1 = require("react-admin");
var authProvider = require("./authProvider").default;

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

exports.default = function(apiUrl, httpClient) {
  if (httpClient === void 0) {
    httpClient = react_admin_1.fetchUtils.fetchJson;
  }
  /**
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The data request params, depending on the type
   * @returns {Object} { url, options } The HTTP request parameters
   */
  var convertDataRequestToHTTP = function(type, resource, params) {
    var filter = {
      where: {
        lojaId: authProvider.data.loja.id
      }
    };

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
      case react_admin_1.GET_LIST: {
        filter.skip = (params.pagination.page - 1) * params.pagination.perPage;
        filter.limit = params.pagination.perPage;
        filter.order = `${params.sort.field} ${params.sort.order}`;

        var query = { filter: JSON.stringify(filter) };

        url = apiUrl + "/" + resource + "?" + query_string_1.stringify(query);
        break;
      }
      case react_admin_1.GET_ONE: {
        filter.where.id = params.id;
        var query = { filter: JSON.stringify(filter) };

        url =
          apiUrl +
          "/" +
          resource +
          "/findOne?" +
          query_string_1.stringify(query);
        break;
      }
      case react_admin_1.GET_MANY: {
        filter.where.id = params.ids;
        var query = { filter: JSON.stringify(filter) };

        url = apiUrl + "/" + resource + "?" + query_string_1.stringify(query);
        break;
      }
      case react_admin_1.GET_MANY_REFERENCE: {
        var _d = params.pagination,
          page = _d.page,
          perPage = _d.perPage;
        var _e = params.sort,
          field = _e.field,
          order = _e.order;
        var query = {
          sort: JSON.stringify([field, order]),
          range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
          filter: JSON.stringify(
            __assign(
              {},
              params.filter,
              ((_a = {}), (_a[params.target] = params.id), _a)
            )
          )
        };
        url = apiUrl + "/" + resource + "?" + query_string_1.stringify(query);

        throw "dataProvider:GET_MANY_REFERENCE não adaptado para o loopback";
        break;
      }

      case react_admin_1.UPDATE:
        params.data.atualizado = Date.now();

        url = apiUrl + "/" + resource + "/" + params.id;
        options.method = "PUT";
        options.body = JSON.stringify(params.data);
        break;
      case react_admin_1.CREATE:
        params.data.criado = params.data.atualizado = Date.now();
        params.data.lojaId = authProvider.data.loja.id;

        url = apiUrl + "/" + resource;
        options.method = "POST";
        options.body = JSON.stringify(params.data);
        break;
      case react_admin_1.DELETE:
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
      case react_admin_1.GET_LIST:
      case react_admin_1.GET_MANY_REFERENCE:
        if (!headers.has("content-range")) {
          throw new Error(
            "The Content-Range header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?"
          );
        }
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
      case react_admin_1.CREATE:
        return { data: __assign({}, params.data, { id: json.id }) };
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
    if (type === react_admin_1.UPDATE_MANY) {
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
    if (type === react_admin_1.DELETE_MANY) {
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
