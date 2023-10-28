'use strict';

const url =
  'https://us-street.api.smarty.com/street-address?street=22%20Degroat%20Rd&city=Sandyston&state=NJ&candidates=10&auth-id=181760799530467739';

const updateUISuccess = function (data) {
  console.log(data);
};

const updateUIError = function (error) {
  console.log(error);
};

const responseMethod = function (httpRequest) {
  if (httpRequest.readyState === 4) {
    if (httpRequest.status === 200) {
      updateUISuccess(httpRequest.responseText);
    } else {
      updateUIError(httpRequest.status + ': ' + httpRequest.responseText);
    }
  }
};

const createRequest = function (url) {
  const httpRequest = new XMLHttpRequest(url);
  httpRequest.addEventListener('readystatechange', (url) =>
    responseMethod(httpRequest)
  );
  httpRequest.open('GET', url);
  httpRequest.send();
};
createRequest(url);
