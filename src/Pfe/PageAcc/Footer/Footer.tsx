import "./FooterStyle.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
        <div>
          <h1>FoodieFinder</h1>
        </div>
        <div>
          <a href="https://facebook.com/votrepagfacebook">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://twitter.com/votrecomptetwitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com/votrecompteinstagram">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      <div className="bottom">
        <div>
          <h3>Moyens de Contact</h3>
          <p>Email: contact@foodiefinder.com</p>
          <p>Téléphone: +216 55222999</p>
          <p>Adresse: Avenue Habib Bourguiba, Mahdia, Tunisie</p>
          <p>Service Client: Du lundi au vendredi, de 9h à 17h</p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
