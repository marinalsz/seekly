import "./style.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

const buildWebsite = () => {
  Header();
  Main();
  Footer();
  getPhotos("candy", 10, "relevant", "teal", "landscape");
};

const getPhotos = async (keyword, photoNum, order, color, orientation) => {
  const data = await fetch(
    `https://api.unsplash.com/search/photos?page=1&query=${keyword}&per_page=${photoNum}&order_by=${order}&color=${color}&orientation=${orientation}&client_id=${CLIENT_ID}`
  );
  const dataJSON = await data.json();
  const photos = dataJSON.results;
  printPhotos(photos);
};

const printPhotos = (photos) => {
  const container = document.querySelector("#gallery");
  const message = document.querySelector("#message");

  if (photos.length === 0) {
    container.innerHTML = "";
    message.textContent = "Search another thing...";
  } else {
    container.innerHTML = "";
    message.textContent = "I've found " + photos.length + " photos:";
    for (const photo of photos) {
      const li = document.createElement("li");
      li.innerHTML = `
      <a href="${photo.links.download}" target="_blank" title="Click to download">
      <img src="${photo.urls.regular}" alt="${photo.alt_description}" style="border: 8px dashed ${photo.color};"/>
      </a>
      `;
      container.appendChild(li);
    }
  }
};

buildWebsite();

document.querySelector("#searchBtn").addEventListener("click", () => {
  const keywordValue = document.querySelector("#searchInput").value;
  const photoNumValue = document.querySelector("#countInput").value;
  const orderValue = document.querySelector("#orderInput").value;
  const colorValue = document.querySelector("#colorInput").value;
  const orientationValue = document.querySelector("#orientationInput").value;
  getPhotos(
    keywordValue,
    photoNumValue,
    orderValue,
    colorValue,
    orientationValue
  );
  document.querySelector("#searchInput").value = "";
});
