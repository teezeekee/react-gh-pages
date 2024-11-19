import React from 'react'
import axios from 'axios'
import { getJwt } from "@/apex";

export function apexAxiosCall(url, params, method = "POST") {
  return getJwt(params, method).then(async (resp) => {
    if (method == "POST") {
      // NYP
      return await axios
        .post(url, params, {
          headers: {
            "x-apex-jwt": resp,
          },
        }
        )
        .then((responseAPI) => {
          return responseAPI
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return await axios({
        headers: {
          "x-apex-jwt": resp,
        },
        url: url,
        method: method,
        data: params,
      })
    }

  });

  return ;
}

export function apiCall(url, params, method = "POST") {
  if (process.env.REACT_APP_ENV_API == "APEX") {
    return apexAxiosCall(url, params, method)
  } else {
    return axios({
      url: url,
      method: method,
      data: params,
      /*headers: {
        Authorization: `Bearer ${process.env.REACT_APP_FAAS_AUTH_API_KEY}`
      },*/
      maxRedirects: 0,
    })
  }
}
