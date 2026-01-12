const API_URL = "https://ecommerce-nzs0.onrender.com";

const CATEGORIES_URL = `${API_URL}/cats`;
const PUBLISH_PRODUCT_URL = `${API_URL}/sell`;
const PRODUCTS_URL = `${API_URL}/cats_products`;
const PRODUCT_INFO_URL = `${API_URL}/products`;
const PRODUCT_INFO_COMMENTS_URL = `${API_URL}/products_comments`;
const CART_INFO_URL = `${API_URL}/user_cart`;
const CART_BUY_URL = `${API_URL}/cart`;
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function (url) {
  let result = {};
  showSpinner();

  const token = localStorage.getItem("token");

  let opciones = {};

  if (token) {
    opciones.headers = {
      "Authorization": "Bearer " + token
    };
  }

  return fetch(url, opciones)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};

document.addEventListener("DOMContentLoaded", () => {
  const loginItem = document.getElementById("login-item");
  const loginLink = document.getElementById("loginLink");
  const userProfileItem = document.getElementById("user-profile-item");
  const usernameText = document.getElementById("username-text");
  const navProfileImg = document.getElementById("nav-profile-img");
  const profileLink = document.getElementById("user-profile-link");

  const usuarioLogeado = localStorage.getItem("usuarioLogeado");
  const profileImages = JSON.parse(localStorage.getItem("profileImages")) || {};
  
  if (usuarioLogeado && loginLink) {
    loginLink.textContent = usuarioLogeado;
  }

  if (!loginItem || !userProfileItem) {
    return;
  }
  
  if (usuarioLogeado) {
    loginItem.style.display = "none";
    userProfileItem.style.display = "flex";

    usernameText.textContent = usuarioLogeado;
    navProfileImg.src = profileImages[usuarioLogeado] ? profileImages[usuarioLogeado] : "img/default-profile.png";
    profileLink.href = "my-profile.html";
  } else {
    loginItem.style.display = "block";
    userProfileItem.style.display = "none";
    loginLink.href = "login.html";
  }
});




