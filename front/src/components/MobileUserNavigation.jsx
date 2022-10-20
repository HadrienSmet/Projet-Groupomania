import { Link } from "react-router-dom";


const MobileUserNavigation = () => {
    const handleToggle = () => {
        const sideBar = document.querySelector('.side-bar');
        const main = document.querySelector('main');
        const logo = document.querySelector("#header-logo");
        const footer = document.querySelector("footer");
        sideBar.classList.toggle('active')
        main.classList.toggle('active');
        logo.classList.toggle('active');
        footer.classList.toggle('active');
    }

    return (
        <div className="side-bar">
            <div className="toggle-btn"
                onClick={() => handleToggle()}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <ul>
                <li>
                    <Link to="/" 
                        className='firstChild'
                        onClick={() => handleToggle()} 
                    >Déconnexion</Link>
                </li>
                <li>
                    <a href="#main-title" 
                        className='lastChild'
                        onClick={() => handleToggle()} 
                    >Accueil</a> 
                </li>
            </ul>
        </div>
    );
};

export default MobileUserNavigation;