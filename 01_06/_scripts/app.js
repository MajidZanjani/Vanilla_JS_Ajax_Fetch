'use strict';

const url =
  'https://us-street.api.smarty.com/street-address?street=22%20Degroat%20Rd&city=Sandyston&state=NJ&candidates=10&auth-id=181760799530467739';

const createRequest = function (url) {
  const httpRequest = new XMLHttpRequest(url);
  httpRequest.addEventListener('readystatechange', (url) => {
    if (httpRequest.readyState === 4) {
      console.log(httpRequest.responseText);
    }
  });
  httpRequest.open('GET', url);
  httpRequest.send();
};
createRequest(url);
