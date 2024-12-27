import "./Header.css";

const template = () => `
<nav>
  <div class="logo">
    <a href="#null" target="_self"
      ><img src="/icon.png" alt="Seekly icon"
    /></a>
    <h1>Seekly</h1>
  </div>
  <div class="menu">
    <button id="joinBtn">Join</button>
    <label for="camera">📸</label>
    <input id="camera" type="checkbox" />
    <ul>
      <li>
        <a href="#null" target="_self">Home</a>
      </li>
      <li>
        <a href="#null" target="_self">Discover photos</a>
      </li>
      <li>
        <a href="#null" target="_self">Trending</a>
      </li>
      <li>
        <a href="#null" target="_self">Challenges</a>
      </li>
    </ul>
  </div>
</nav>
<div class="hero">
  <h2>The best free stock photos, royalty-free images and videos shared by creators.</h2>
  <div class="inputs">
    <select id="countInput">
      <option value="">Select number</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="20">20</option>
      <option value="25">25</option>
      <option value="30">30</option>
    </select>
    <select id="orderInput">
      <option value="">Select order</option>
      <option value="relevant">Relevant</option>
      <option value="latest">Latest</option>
    </select>
    <select id="colorInput">
      <option value="">Select color</option>
      <option value="teal">Teal</option>
      <option value="magenta">Magenta</option>
      <option value="black_and_white">Black and white</option>
      <option value="black">Black</option>
      <option value="white">White</option>
      <option value="yellow">Yellow</option>
      <option value="orange">Orange</option>
      <option value="red">Red</option>
      <option value="purple">Purple</option>
      <option value="green">Green</option>
      <option value="blue">Blue</option>
    </select>
    <select id="orientationInput">
      <option value="">Select orientation</option>
      <option value="landscape">Landscape</option>
      <option value="portrait">Portrait</option>
      <option value="squarish">Squarish</option>
    </select>
  </div>
  <button id="resetFiltersBtn">Reset Filters</button>
  <div class="searcher">
    <input type="text" id="searchInput" placeholder="Ex: Car" required/>
    <button id="searchBtn">Search</button>
  </div>
</div>
`;

const Header = () => {
  document.querySelector("header").innerHTML = template();
};

export default Header;
