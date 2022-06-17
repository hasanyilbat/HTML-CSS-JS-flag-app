const fetchCountry = async (name) => {
  const url = `https://restcountries.com/v3.1/name/${name}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      renderError(`Something went wrong ${res.status}`);
      throw new Error();
    }
    const data = await res.json();
    renderCountry(data[0]);
    allCountryNames(data[0]);
    console.log(typeof data);
  } catch (error) {
    // console.log(error);
  }
};

const renderError = (err) => {
  const countriesDiv = document.querySelector(".countries");
  countriesDiv.innerHTML = `
     <h1 class="text-danger">${err}</h1>
     <img src="./img/404.png" alt="" />
    `;
};

const renderCountry = (country) => {
  const countriesDiv = document.querySelector(".countries");

  const {
    name: { common },
    region,
    capital,
    languages,
    flags: { svg },
    currencies,
  } = country;

  countriesDiv.innerHTML += `<div class="card" style="width: 18rem;">
  <img class="card-img-top" src="${svg}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${common}</h5>
    <p class="card-text">${region}</div>
  <ul class="list-group list-group-flush">
      <li class="list-group-item"> <i class="fas fa-lg fa-landmark"></i> ${capital}</li>
     <li class="list-group-item"> <i class="fas fa-lg fa-comments"></i> ${Object.values(
       languages
     )}</li>
       <li class="list-group-item"> <i class="fas fa-lg fa-money-bill-wave"></i> ${
         Object.values(currencies)[0].name
       }, ${Object.values(currencies)[0].symbol} </li>
  </ul>
</div>`;
};
let name;
let stringNames;
const countriesDiv = document.querySelector(".countries");
const input = document.querySelector(".input");
const countryArray = [];
const getCountryName = async () => {
  const res = await fetch(`https://restcountries.com/v3.1/all
`);
  const dataForInput = await res.json();
  dataForInput.forEach((obj) => {
    countryArray.push(
      `<option value="${obj.name.common}">${obj.name.common}</option>`
    );
    // name = dataForInput[0].name.common;
    stringNames = countryArray.join("");
  });
  let countryName;

  countriesDiv.innerHTML = `<select class="form-select" aria-label="Default select example">
 ${stringNames}
</select>`;
  const select = document.querySelector("select");
  select.addEventListener("change", async () => {
    countryName = select.value;
    const url2 = `https://restcountries.com/v3.1/name/${countryName}`;
    const res2 = await fetch(url2);
    const data = await res2.json();
    const {
      name: { common },
      region,
      capital,
      languages,
      flags: { svg },
      currencies,
    } = data[0];
    console.log(name);
    console.log(region);
    console.log(svg);
    countriesDiv.innerHTML = `<div class="card" style="width: 18rem;">
    <img class="card-img-top" src="${svg}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${common}</h5>
      <p class="card-text">${region}</div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item"> <i class="fas fa-lg fa-landmark"></i> ${capital}</li>
       <li class="list-group-item"> <i class="fas fa-lg fa-comments"></i> ${Object.values(
         languages
       )}</li>
         <li class="list-group-item"> <i class="fas fa-lg fa-money-bill-wave"></i> ${
           Object.values(currencies)[0].name
         }, ${Object.values(currencies)[0].symbol} </li>
    </ul>
  </div>`;
  });
};

getCountryName();
