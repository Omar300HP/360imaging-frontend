// useCollection custom hook used to make an api request list all docs in a collection
// it also checks if the current route should re render based on should collection update
// supports primereact datatable pagination, sorting and filtering

// we have 4 states and 1 prop that handle the filtering: filtersParams, sortParams, defaultQueryParams, queryParams
// sortParams(state):
// filtersParams(state):
// defaultQueryParams(prop):
// queryParams takes: defaultQueryParams, filtersParams, sortParams to call the request
// any change in queryParams fire the useEffect and make the API call

import { useReducer, useEffect } from "react";

// import { instance } from "../api/rest";
import { apiCall } from "../api/mockServer/server";

export default function useCollection({
  path,
  allowPagination = false,
  paginationLimit = null,
  defaultQueryParams = {},
}) {
  // const { addToasts } = useToastContext();

  const initialState = {
    docs: [],
    paginationLimit: paginationLimit,
    totalRecords: 0,
    first: 0,
    last: paginationLimit,
    page: 1,
    error: {},
    sortState: {},
    sortParams: {},
    filtersState: {},
    customFiltersParams: {},
    filtersParams: {},
    queryParams: { ...defaultQueryParams },
    allowPagination: allowPagination,
    refreshVar: 0,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "HANDLE_REFRESH":
        return {
          ...state,
          sortState: {},
          sortParams: {},
          filtersState: {},
          customFiltersParams: {},
          filtersParams: {},
          queryParams: { ...defaultQueryParams },
          page: 1,
          first: 0,
          last: paginationLimit,
          refreshVar: state.refreshVar + 1,
        };
      case "HANDLE_ON_FILTER_TABLE_COLUMN":
        let filterParams = {};
        const filters = action.filters;
        Object.keys(filters).forEach(
          (key) => (filterParams[key] = filters[key].value)
        );
        return {
          ...state,
          filtersState: filters,
          customFiltersParams: filterParams,
          filtersParams: filterParams,
        };
      case "HANDLE_ON_FILTER_CUSTOM":
        return {
          ...state,
          filtersState: {
            ...state.filtersState,
            [action.paramName]: {
              matchMode: "startsWith",
              value: action.paramValue,
            },
          },
          customFiltersParams: {
            ...state.customFiltersParams,
            [action.paramName]: action.paramValue,
          },
          filtersParams: {
            ...state.filtersParams,
            [action.paramName]: action.paramValue,
          },
        };
      case "HANDLE_SUBMIT_FILTER":
        let _queryParams = {
          ...defaultQueryParams,
          ...state.filtersParams,
          ...state.sortParams,
        };
        Object.keys(_queryParams).forEach((key) => {
          if (_queryParams[key] === "") delete _queryParams[key];
        });
        return {
          ...state,
          queryParams: _queryParams,
          page: 1,
          first: 0,
        };
      case "HANDLE_ON_SELECT_PARAMS":
        return {
          ...state,
          queryParams: action.filteringParams,
          refreshVar: state.refreshVar + 1,
        };
      case "HANDLE_ON_SORT":
        let _sortField = action.event.sortField;
        // handle case of foreign fields
        if (_sortField && _sortField.includes("."))
          _sortField = _sortField.split(".")[0] + "Id";

        let _queryParams_ = { ...state.queryParams };
        if (action.event.sortField === null) {
          delete _queryParams_.sortField;
          delete _queryParams_.sortOrder;
        }
        return {
          ...state,
          sortState: action.event,
          sortParams:
            action.event.sortField !== null
              ? {
                  sortField: _sortField,
                  sortOrder:
                    action.event.sortOrder === 1
                      ? "ASC"
                      : action.event.sortOrder === -1
                      ? "DESC"
                      : null,
                }
              : {},
          queryParams:
            action.event.sortField !== null
              ? {
                  ..._queryParams_,
                  sortField: _sortField,
                  sortOrder:
                    action.event.sortOrder === 1
                      ? "ASC"
                      : action.event.sortOrder === -1
                      ? "DESC"
                      : null,
                }
              : { ..._queryParams_ },
          page: 1,
          first: 0,
        };
      case "HANDLE_ON_PAGE_CHANGE":
        return {
          ...state,
          first: action.first,
          page: action.page + 1,
        };
      case "GET_TABLE_DATA_SUCCESS":
        return {
          ...state,
          totalRecords: action.response.total,
          docs: action.response.data,
          first: action.response.data
            ? action.response.data.length === 0
              ? -1
              : state.first > 0
              ? state.first
              : 0
            : 0,
          last: action.response.data
            ? action.response.data.length === 0
              ? -1
              : Math.min(
                  state.first + paginationLimit,
                  state.first + action.response.data.length
                )
            : 0,
        };
      case "GET_TABLE_DATA_FAIL":
        // addToasts([
        //   {
        //     severity: "error",
        //     detail: action.error,
        //   },
        // ]);
        return {
          ...state,
          error: action.error,
        };
      case "ENABLE_PAGINATION":
        return {
          ...state,
          allowPagination: true,
          paginationLimit: paginationLimit,
        };
      case "DISABLE_PAGINATION":
        return {
          ...state,
          allowPagination: false,
          paginationLimit: null,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (path) {
      // instance
      apiCall(
        // `${path}${
        //   state.allowPagination
        //     ? paginationLimit
        //       ? "/?page=" + state.page + "&limit=" + paginationLimit
        //       : ""
        //     : "/?no_page=true"
        // }`
        `${path}`,
        { params: state.queryParams }
      )
        .then((res) => {
          dispatch({
            type: "GET_TABLE_DATA_SUCCESS",
            response: res.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: "GET_TABLE_DATA_FAIL",
            error: "error",
            // error.response && typeof error.response !== "undefined"
            //   ? error.response.data && error.response.data.message
            //     ? error.response.data.message
            //     : renderLabel("connection_error")
            //   : renderLabel("connection_error"),
          });
        });
    }
    // eslint-disable-next-line
  }, [
    path,
    state.page,
    state.queryParams,
    state.refreshVar,
    state.allowPagination,
  ]);

  const collection = {
    state,
    dispatch,
  };

  return collection;
}
