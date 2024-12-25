import "./style.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

const buildWebsite = () => {
  Header();
  Main();
  Footer();
  getPhotos("candy", 10, "relevant", "magenta", "landscape");
};

const getPhotos = async (keyword, photoNum, order, color, orientation) => { 
  const container = document.querySelector("#gallery");
  const message = document.querySelector("#message");
  message.textContent = "Searching for photos...";
  container.innerHTML = "";
  try {
    const data = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${keyword}&per_page=${photoNum}&order_by=${order}&color=${color}&orientation=${orientation}&client_id=${CLIENT_ID}`
    );
    const dataJSON = await data.json();
    const photos = dataJSON.results;
    printPhotos(photos);
  } catch (error) {
    message.textContent = "Something went wrong. Please try again!";
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="/error.png" alt="Error" id="errorImg" />
    `;
    container.appendChild(li);
    const errorImg = document.getElementById("errorImg");
    errorImg.style.boxShadow = "none";
    console.error(error);
  }
};

const printPhotos = (photos) => {
  const main = document.querySelector("main");
  const container = document.querySelector("#gallery");
  const message = document.querySelector("#message");
  if (photos.length === 0) {
    container.innerHTML = "";
    message.textContent =
      "No results yet, but inspiration is right around the corner!";
    const li = document.createElement("li");
    li.innerHTML = `
        <img src="/character.png" alt="Flower retro character" id="characterImg" />
      `;
    container.appendChild(li);
    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    const characterImg = document.getElementById("characterImg");
    characterImg.style.boxShadow = "none";
    characterImg.style.width = "300px";
    characterImg.style.height = "300px";
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

buildWebsite();

document.querySelector("#searchBtn").addEventListener("click", () => {
  const keywordValue = document.querySelector("#searchInput").value.trim();
  const photoNumValue = document.querySelector("#countInput").value;
  const orderValue = document.querySelector("#orderInput").value;
  const colorValue = document.querySelector("#colorInput").value || "";;
  const orientationValue = document.querySelector("#orientationInput").value;

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
