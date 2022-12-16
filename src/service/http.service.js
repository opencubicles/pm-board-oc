import Axios from "axios";
// import { router } from '@/router';

const BASE_URL = "http://localhost:3030/api/";

var axios = Axios.create({
  withCredentials: true,
});

export const httpService = {
  get(endpoint, data) {
    return ajax(endpoint, "GET", data);
  },
  post(endpoint, data) {
    return ajax(endpoint, "POST", data);
  },
  put(endpoint, data) {
    return ajax(endpoint, "PUT", data);
  },
  delete(endpoint, data) {
    return ajax(endpoint, "DELETE", data);
  },
};

async function ajax(endpoint, method = "GET", data = null) {
  let url = `${BASE_URL}${endpoint}`;
  if (endpoint.includes("board")) {
    url = `https://dev.halsell.com/api/modules/${endpoint}`;
  } else if (endpoint.includes("board/")) {
    url = `https://dev.halsell.com/api/modules/${endpoint}`;
  }
  try {
    const res = await axios({
      url: url,
      method,
      data,
      params: method === "GET" ? data : null,
    });
    return res.data;
  } catch (err) {
    console.dir(err);
  }
}
