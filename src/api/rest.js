// construct an axios instance to be used globally in any api request

import axios from "axios";
// import cookie from "js-cookie";
import { api_url } from "./URLs";

// api endpoints that does not fire a loading spinner upon request
const url_loader_exceptions = ["this_url_won't trigger the loading spinner"];

export let instance;
export let form_data_instance;

export function constructAxios(token) {
  console.log(api_url);
  // create axios instance content-type json using an auth token and the api entry point
  instance = axios.create({
    baseURL: api_url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // fire a loading spinner by intercepting the api call request
  instance.interceptors.request.use((request) => {
    if (!url_loader_exceptions.some((url) => request.url.includes(url)))
      document.body.classList.add("loading-spinner");
    return request;
  });

  // remove the fired loading spinner by intercepting the api call response
  instance.interceptors.response.use(
    (response) => {
      document.body.classList.remove("loading-spinner");
      return response;
    },
    (error) => {
      document.body.classList.remove("loading-spinner");
      return Promise.reject(error);
    }
  );

  // repeat the previous steps exactly but for another instance of axios with content-type multipart/form-data
  form_data_instance = axios.create({
    baseURL: api_url,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  form_data_instance.interceptors.request.use((request) => {
    if (!url_loader_exceptions.some((url) => request.url.includes(url)))
      document.body.classList.add("loading-spinner");
    return request;
  });

  form_data_instance.interceptors.response.use(
    (response) => {
      document.body.classList.remove("loading-spinner");
      return response;
    },
    (error) => {
      document.body.classList.remove("loading-spinner");
      return Promise.reject(error);
    }
  );
}

// call axios instance construction function on app mount, retrieving token from cookies
// constructAxios(cookie.get("token"));
constructAxios();
