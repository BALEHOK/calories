export default class Ajax {
  static config = {
    apiUrl: '',
    get accessToken() {
      return localStorage['api_accessToken'];
    },
    set accessToken(token) {
      localStorage['api_accessToken'] = token || '';
    }
  };

  request(method, url, data, extraHeaders) {
    url = (Ajax.config.apiUrl || '') + url;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    if (extraHeaders) {
      Object.keys(extraHeaders)
        .forEach(k => headers.append(k, extraHeaders[k]));
    }

    if (Ajax.config.accessToken){
      headers.append('Authorization', `Bearer ${Ajax.config.accessToken}`);
    }

    const options = {
      method: method,
      headers: headers,
    };

    if (data && method !== 'GET') {
      options.body = JSON.stringify(data)
    }

    return fetch(url, options);
  }

  get(url, data, headers = null){
    var typeOfData = typeof data;
    if (data !== null && typeOfData !== 'undefined'){
      var args =
        typeOfData === 'string'
          ? data
          : Object.keys(data)
            .map(function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) })
            .join('&');

      url +='?' + args;
    }

    return this.request('GET', url, null, headers);
  }

  post(url, data, headers = null){
    return this.request('POST', url, data, headers);
  }

  put(url,data, headers = null){
    return this.request('PUT', url, data, headers);
  }

  delete(url,data, headers = null){
    return this.request('DELETE', url, data, headers);
  }
}

export const ajax = new Ajax();

export function ajaxConfig(config) {
  Object.assign(Ajax.config, config);
}
