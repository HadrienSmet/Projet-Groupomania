import { Link } from 'react-router-dom';

const MobileGuestNavigation = () => {
    const handleToggle = () => {
        const sideBar = document.querySelector('.side-bar');
        const section = document.querySelector('section');
        const logo = document.querySelector("#header-logo");
        const footer = document.querySelector("footer");
        sideBar.classList.toggle('active')
        section.classList.toggle('active');
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
                    <Link to="/signup" 
                        className='firstChild'
                        onClick={() => handleToggle()}  
                    >Inscription</Link>
                </li>
                <li>
                    <Link to="/signin" 
                        className='lastChild'
                        onClick={() => handleToggle()}  
                    >Connexion</Link> 
                </li>
            </ul>
        </div>
    );
};

export default MobileGuestNavigation;