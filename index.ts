
import { ExpressCurlRequest } from "./ExpresCurlRequest";

import { _writeCurl, _printCurl } from "./ExpressCurlFactory"



/* curl --location --request GET 'http://127.0.0.1:3000/v1/api/client/review/lawyer' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJyb2xlSWQiOjEsImZ1bGxOYW1lIjoiTGF3eWVyIDAwMCIsImVtYWlsIjoibGF3eWVyMDAwQGdtYWlsLmNvbSIsInBob25lTnVtYmVyIjoiKzkxNzUzOTkwMDAwMCJ9LCJpYXQiOjE2NTUwMjYxMjh9.X9nVdOAvDkC5hnIpIn-M_yODtoDHGsIN1SQqeFHEsSk'
 */

const headerExcluding=['content-length']

const _buildCurl = function (req: ExpressCurlRequest): string {
  const request = req.request
  const url = `${request.protocol}://${(request.headers.host || request.hostname)}${request.originalUrl}`
  const route = `--request ${request?.method.toUpperCase()} '${url}'`
  let header = ``;
  let body = ``;
  if (request.headers) {
    for (const key in request.headers) {
      if(!headerExcluding.includes(key))
        header += `-H '${key}: ${request.headers[key]}' `

    }
  }

  if (request.body) {
    if (request.headers && request.headers['content-type'] && request.headers['content-type'] === 'application/json') {
      body += `-d '${JSON.stringify(request.body)}' `;
    } else {
      for (let key in request.body) {
        body += `-d '${key}=${request.body[key]}' `;
      }
    }
  }


  return `curl --location ${route} ${header} ${body}`
}


export const reqtoCurl = function (req: ExpressCurlRequest): string | undefined {
  const curlFromRequest = _buildCurl(req)
  
  if (req.type == ExpressResponseType.WRITE) {
    _writeCurl(curlFromRequest)
  }
  else if (req.type == ExpressResponseType.LOG) {
    _printCurl(curlFromRequest)
  }
  else {
    return curlFromRequest
  }


};

 export const ExpressResponseType = {
    RETURN:'RETURN',
    LOG: 'LOG',
    WRITE: 'WRITE',
  };