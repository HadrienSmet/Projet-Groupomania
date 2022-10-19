import { Link } from "react-router-dom";


const MobileUserNavigation = () => {
    const handleToggle = () => {
        const sideBar = document.querySelector('.side-bar');
        sideBar.classList.toggle('active')
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