import { useRef } from "react";
import { Link } from "react-router-dom";

const MobileUserNavigation = () => {
    const sideBarRef = useRef(null);
    //Handles the sidebar's behavior when the user clicks on the toggle button
    //The sidebar is either shown or hidden
    //When it is shown the entiere app gets covered by a filter
    const handleToggle = () => {
        const main = document.querySelector("main");
        const logo = document.querySelector("#header-logo");
        const footer = document.querySelector("footer");
        sideBarRef.current.classList.toggle("active");
        main.classList.toggle("active");
        logo.classList.toggle("active");
        footer.classList.toggle("active");
    };

    return (
        <div ref={sideBarRef} className="side-bar">
            <div className="toggle-btn" onClick={() => handleToggle()}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <ul>
                <li>
                    <Link
                        to="/"
                        className="firstChild"
                        onClick={() => handleToggle()}
                    >
                        Déconnexion
                    </Link>
                </li>
                <li>
                    <a
                        href="#main-title"
                        className="lastChild"
                        onClick={() => handleToggle()}
                    >
                        Accueil
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default MobileUserNavigation;
