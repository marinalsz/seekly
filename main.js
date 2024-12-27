//Impportaciones
import "./style.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

//Clave para utilizar la API de Unsplash
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

//Renderizar la página web
const buildWebsite = () => {
  Header();
  Main();
  Footer();
  getPhotos("candy", 10, "relevant", "magenta", "landscape");
};

//Función para obtener las fotos
const getPhotos = async (keyword, photoNum, order, color, orientation) => {
  const container = document.querySelector("#gallery");
  const message = document.querySelector("#message");

  //Mensaje que se muestra mientras se cargan las fotos
  message.textContent = "Searching for photos...";
  container.innerHTML = "";

  //Construcción de la URL de la API de Unsplash de manera dinámica con los parámetros de búsqueda
  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.append("page", 1);
  if (keyword) url.searchParams.append("query", keyword);
  if (photoNum) url.searchParams.append("per_page", photoNum);
  if (order) url.searchParams.append("order_by", order);
  if (color) url.searchParams.append("color", color);
  if (orientation) url.searchParams.append("orientation", orientation);
  url.searchParams.append("client_id", CLIENT_ID);

  //Petición a la API de Unsplash
  try {
    const data = await fetch(url.toString());
    const dataJSON = await data.json();
    const photos = dataJSON.results;
    printPhotos(photos);
  } catch (error) {
    //Mensaje que se muestra si hay un error al cargar las fotos
    message.textContent = "Something went wrong. Please try again!";
    const li = document.createElement("li");
    li.className = "centered-content";
    li.innerHTML = `
      <img src="/error.png" alt="Heart retro character" id="errorImg" />
    `;
    container.appendChild(li);
    const errorImg = document.getElementById("errorImg");
    errorImg.style.boxShadow = "none";
    errorImg.style.width = "300px";
    errorImg.style.height = "300px";
    console.error(error);
  }
};

//Función para immprimir las fotos en la página
const printPhotos = (photos) => {
  const main = document.querySelector("main");
  const container = document.querySelector("#gallery");
  const message = document.querySelector("#message");

  //Si no se encuentran fotos, se muestra lo siguiente
  if (photos.length === 0) {
    container.innerHTML = "";
    message.textContent =
      "No results yet, but inspiration is right around the corner!";
    const li = document.createElement("li");
    li.className = "centered-content";
    li.innerHTML = `
        <img src="/character.png" alt="Flower retro character" id="characterImg" />
      `;
    container.appendChild(li);
    const characterImg = document.getElementById("characterImg");
    characterImg.style.boxShadow = "none";
    characterImg.style.width = "300px";
    characterImg.style.height = "300px";

    //Sugerencias de búsqueda
    const suggestions = ["sun", "moon", "sea"];
    const suggestionsContainer = document.createElement("div");
    suggestionsContainer.id = "suggestions";
    suggestionsContainer.innerHTML = `
      <p>Try one of these suggestions:</p>
      <div>
      ${suggestions
        .map(
          (suggestion) =>
            `<button class="suggestion-btn" data-keyword="${suggestion}">${suggestion}</button>`
        )
        .join("")}
      </div>
    `;
    main.appendChild(suggestionsContainer);

    //Evento para buscar por sugerencia
    document.querySelectorAll(".suggestion-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const keyword = event.target.getAttribute("data-keyword");
        document.querySelector("#searchInput").value = keyword;
        const suggestionsContainer = document.querySelector("#suggestions");
        if (suggestionsContainer) {
          suggestionsContainer.remove();
        }
        document.querySelector("#searchBtn").click();
      });
    });
  } else {
    //Si se encuentran fotos, se muestran en la página
    container.innerHTML = "";
    message.textContent = `I've found ${photos.length} photos:`;
    for (const photo of photos) {
      const li = document.createElement("li");
      li.innerHTML = `
      <a href="${
        photo.links.download
      }" target="_blank" title="Click to download">
        <img src="${photo.urls.regular}" alt="${
        photo.alt_description || "Photo"
      }" style="border: 8px dashed ${photo.color};"/>
      </a>
      `;
      container.appendChild(li);
    }
  }
};

//Ejecutar la función para renderizar la página web
buildWebsite();

//Evento para resetear los filtros de búsqueda
document.querySelector("#resetFiltersBtn").addEventListener("click", () => {
  document.querySelector("#countInput").value = "";
  document.querySelector("#orderInput").value = "";
  document.querySelector("#colorInput").value = "";
  document.querySelector("#orientationInput").value = "";
});

//Evento para buscar fotos
document.querySelector("#searchBtn").addEventListener("click", () => {
  const keywordValue =
    document.querySelector("#searchInput").value.trim() || "";
  const photoNumValue = document.querySelector("#countInput").value || "";
  const orderValue = document.querySelector("#orderInput").value || "";
  const colorValue = document.querySelector("#colorInput").value || "";
  const orientationValue =
    document.querySelector("#orientationInput").value || "";

  //Si se ingresa una palabra clave, se ejecuta la función para obtener las fotos
  if (keywordValue) {
    getPhotos(
      keywordValue,
      photoNumValue,
      orderValue,
      colorValue,
      orientationValue
    );
    document.querySelector("#searchInput").value = "";
  } else {
    //Mensaje que se muestra si no se ingresa una palabra clave
    toastr.options = {
      closeButton: true,
      debug: false,
      newestOnTop: true,
      progressBar: true,
      positionClass: "toast-bottom-full-width",
      preventDuplicates: false,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
    toastr["warning"]("Please enter a keyword to search!", "Oopss...");
  }
});
