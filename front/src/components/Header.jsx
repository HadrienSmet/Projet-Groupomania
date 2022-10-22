import { useState } from "react";
import { useSelector } from "react-redux";
import logo from "../assets/images/icon-left-font-removebg.png";
import GuestNavigation from "./GuestNavigation";
import MobileGuestNavigation from "./MobileGuestNavigation";
import MobileUserNavigation from "./MobileUserNavigation";
import UserNavigation from "./UserNavigation";

const Header = () => {
    const [scrollY, setScrollY] = useState(0);
    const loggedData = useSelector((state) => state.loggedIn.login);

    //Handles the header's behavior when the user is scrolling
    const handleScroll = () => {
        const header = document.querySelector("header");
        if (window.scrollY < scrollY) {
            header.style.top = 0;
        } else {
            header.style.top = "-104px";
        }
        setScrollY(window.scrollY);  
    }
    window.addEventListener('scroll', (e) => handleScroll())

    return (
        <header>
            <img src={ logo } alt="Logo Groupomania" id="header-logo" />
            { loggedData ?
                <MobileUserNavigation />
            :
                <MobileGuestNavigation />
             }
            
            { loggedData ? 
                <UserNavigation />
            :
                <GuestNavigation />}
        </header>
    )
}

export default Header;