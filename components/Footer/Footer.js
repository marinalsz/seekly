import "./Footer.css";

const template = () => `
<ul class="info-links">
  <li><a href="#null" target="_self">Terms</a></li>
  <li><a href="#null" target="_self">Privacy</a></li>
  <li><a href="#null" target="_self">Contact</a></li>
  <li><a href="#null" target="_self">Help & FAQs</a></li>
</ul>
<ul class="media-links">
  <li>
    <a href="#null" target="_self"
      ><img
        src="https://res.cloudinary.com/darvwfw0u/image/upload/v1721390404/78d44f99-fca3-4148-813c-18d946aef472.png"
        alt="Instagram icon"
    /></a>
  </li>
  <li>
    <a href="#null" target="_self"
      ><img
        src="https://res.cloudinary.com/darvwfw0u/image/upload/v1721390502/acfac453-055b-475b-8efa-5363fd6ec140.png"
        alt="Facebook icon"
    /></a>
  </li>
</ul>
<p>
  &copy; 2024, Seekly. Powered by
  <a href="https://github.com/marinalsz" rel="noopener" target="_blank">Marina López</a>
</p>
`;

const Footer = () => {
  document.querySelector("footer").innerHTML = template();
};

export default Footer;