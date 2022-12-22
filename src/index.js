import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import {
  renderCountriesList,
  renderCards,
  cleanContainer,
} from './renderMarkup';
import { refs } from './refs';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

refs.countryList.style.paddingLeft = '0';

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  const inputValue = evt.target.value.toLowerCase().trim();
  if (inputValue === '') {
    return;
  }
  cleanContainer();
  Notiflix.Loading.dots('Loading...');

  fetchCountries(inputValue)
    .then(data => {
      const countriesData = data;
      if (countriesData === undefined) {
        return;
      }

      if (countriesData.length > 10) {
        Notiflix.Loading.remove();
        return Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (countriesData.length === 1) {
        renderCards(countriesData);

        Notiflix.Loading.remove();
        return;
      }
      if (countriesData.length >= 2 && countriesData.length <= 10) {
        renderCountriesList(countriesData);
        Notiflix.Loading.remove();
        return;
      }

      Notiflix.Loading.remove();
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      Notiflix.Loading.remove();
    });
}
