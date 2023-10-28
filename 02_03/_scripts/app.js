'use strict';

// const smartyUrl =
//   'https://us-street.api.smarty.com/street-address?street=22%20Degroat%20Rd&city=Sandyston&state=NJ&candidates=10&auth-id=181760799530467739';
const smartyUrl =
  'https://us-street.api.smarty.com/street-address?auth-id=181760799530467739';
const parksUrl =
  'https://developer.nps.gov/api/v1/parks?stateCode=CA&api_key=6zXLmAOoOxpPMav0KjJnonN1q7uIA2k6ze2lHTvW';

const addressField = document.querySelector('#address');
const cityField = document.querySelector('#city');
const stateField = document.querySelector('#state');
//const $zipField = $('#zip');
const zipField = document.querySelector('#zip');

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

const checkCompletion = function () {
  if (
    addressField.value !== '' &&
    cityField.value !== '' &&
    stateField.value !== ''
  ) {
    const requestUrl = `${smartyUrl}
      &street=${addressField.value}
      &city=${cityField.value}
      &state=${stateField.value}`;
    createRequest(requestUrl);
  }
};

//createRequest(smartyUrl);
createRequest(parksUrl);
