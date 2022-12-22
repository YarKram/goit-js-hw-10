// import { fetchCountries } from './fetchCountries';
import { refs } from './refs';

function renderCountriesList(countriesData) {
  const countriesList = countriesData
    .map(countryItem => {
      const {
        name: { official },
        flags: { svg },
      } = countryItem;
      return `<li style="display: flex; align-items: center">
    <img
      src="${svg}"
      alt="country-flag"
      style="height: 20px; width: auto; margin-right: 5px"
    />
    <h2 style="font-weight: bold">${official}}</h2>
  </li>`;
    })
    .join('');

  refs.countryList.innerHTML = countriesList;
}

function renderCards(countriesData) {
  const country = countriesData
    .map(countryItem => {
      const {
        name: { official },
        flags: { svg },
        capital,
        population,
        languages,
      } = countryItem;
      return `<li style="display: flex; align-items: center">
      <img
          src="${svg}"
          alt="${official}-flag"
          style="height: 20px; width: auto; margin-right: 5px"
        />
        <h2 style="font-weight: bold">${official}</h2>
        </li>
        <ul style="list-style: none; padding-left: 0">
          <li><span style="font-weight: bold">Capital: </span>${capital}</li>
          <li><span style="font-weight: bold">Population: </span> ${population}</li>
          <li><span style="font-weight: bold">Languages: </span> ${Object.values(
            languages
          ).join(', ')}</li>
        </ul>`;
    })
    .join('');
  refs.countryInfo.innerHTML = country;
}

function cleanContainer() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}

export { renderCountriesList, renderCards, cleanContainer };
