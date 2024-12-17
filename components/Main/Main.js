import "./Main.css";

const template = () => `
<p id="message"></p>
<ul id="gallery"></ul>
<div id="suggestions">
</div>

`;

const Main = () => {
  document.querySelector("main").innerHTML = template();
};

export default Main;
