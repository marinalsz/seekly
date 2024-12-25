import "./Footer.css";

const template = () => `
<ul class="info-links">
  <li><a href="#null" target="_self">Terms</a></li>
  <li><a href="#null" target="_self">Privacy</a></li>
  <li><a href="#null" target="_self">Contact</a></li>
  <li><a href="#null" target="_self">Help & FAQs</a></li>
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