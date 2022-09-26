import footerLogo from "../assets/images/icon-left-font-monochrome-white-newrszd.png";
// front\src\assets\images\icon-left-font-monochrome-white.png
const Footer = () => {
    return (
        <footer>
            <div className="footer-contact">
                <h3>Support</h3>
                <p>Nous contacter</p>
                <p>Signaler un bug</p>
            </div>
            <img src={ footerLogo } alt="Logo de Groupomania" />
        </footer>
    );
};

export default Footer;