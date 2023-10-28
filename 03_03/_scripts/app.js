'use strict';

// const smartyUrl =
//   'https://us-street.api.smarty.com/street-address?street=22%20Degroat%20Rd&city=Sandyston&state=NJ&candidates=10&auth-id=181760799530467739';

const smartyUrl =
  'https://us-street.api.smartystreets.com/street-address?auth-id=181760799530467739';

const parksUrl =
  'https://developer.nps.gov/api/v1/parks?stateCode=CA&api_key=6zXLmAOoOxpPMav0KjJnonN1q7uIA2k6ze2lHTvW';

const addressField = document.querySelector('#address');
const cityField = document.querySelector('#city');
const stateField = document.querySelector('#state');
//const $zipField = $('#zip');
const zipField = document.querySelector('#zip');
const parkThumb = document.querySelector('#specials h2 img');
const parkSection = document.querySelector('#specials');
const parkName = document.querySelector('#specials > h2 > a');
const parkDescription = document.querySelector('#specials > p');

const smartyupdateUISuccess = function (data) {
  const parsedData = JSON.parse(data);
  // console.log(parsedData);
  const zip = parsedData[0].components.zipcode;
  const plus4 = parsedData[0].components.plus4_code;
  // console.log(zip + '-' + plus4);
  zipField.value = zip + '-' + plus4;
};

const parkUpdateUISuccess = function (parkParsedData) {
  //const parkParsedData = JSON.parse(data);
  console.log(parkParsedData);
  const parkId = Math.floor(Math.random() * parkParsedData.data.length);
  parkName.textContent = parkParsedData.data[parkId].fullName;
  parkName.href = parkParsedData.data[parkId].url;
  parkDescription.textContent = parkParsedData.data[parkId].description;
  parkThumb.src =
    'https://www.nps.gov/theme/assets/dist/images/branding/logo.png';
  parkSection.classList.remove('hidden');
};

const smartyUpdateUIError = function (error) {
  console.log(error);
};

const parkUpdateUIError = function (error) {
  console.log(error);
};

// const responseMethod = function (httpRequest, succeed, fail) {
//   if (httpRequest.readyState === 4) {
//     if (httpRequest.status === 200) {
//       succeed(httpRequest.responseText);
//     } else {
//       fail(httpRequest.status + ': ' + httpRequest.responseText);
//     }
//   }
// };

// const createRequest = function (url, succeed, fail) {
//   const httpRequest = new XMLHttpRequest(url);
//   httpRequest.addEventListener('readystatechange', (url) =>
//     responseMethod(httpRequest, succeed, fail)
//   );
//   httpRequest.open('GET', url);
//   httpRequest.send();
// };

const handleErrors = function (response) {
  if (!response.ok) {
    throw `${response.status}: ${response.statusText}`;
  }
  return response.json();
};

const createRequest = function (url, succeed, fail) {
  fetch(url)
    .then((response) => handleErrors(response))
    .then((data) => succeed(data))
    .catch((error) => fail(error));
};

const checkCompletion = function () {
  if (
    addressField.value !== '' &&
    cityField.value !== '' &&
    stateField.value !== ''
  ) {
    const requestUrl = `${smartyUrl}&street=${addressField.value}&city=${cityField.value}&state=${stateField.value}`;
    createRequest(requestUrl, smartyupdateUISuccess, smartyUpdateUIError);
  }
};

// createRequest(smartyUrl);
// createRequest(parksUrl, parkUpdateUISuccess, parkUpdateUIError);

addressField.addEventListener('blur', checkCompletion);
cityField.addEventListener('blur', checkCompletion);
stateField.addEventListener('blur', checkCompletion);
window.addEventListener('DOMContentLoaded', () => {
  createRequest(parksUrl, parkUpdateUISuccess, parkUpdateUIError);
});
