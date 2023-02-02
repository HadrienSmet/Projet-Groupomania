import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

import logo from "../assets/images/icon-left-font-removebg.png";
import GuestNavigation from "./navigation/GuestNavigation";
import MobileGuestNavigation from "./navigation/MobileGuestNavigation";
import MobileUserNavigation from "./navigation/MobileUserNavigation";
import UserNavigation from "./navigation/UserNavigation";

const useHeader = () => {
    const [scrollY, setScrollY] = useState(0);
    const headerRef = useRef(null);
    const animatedBarRef = useRef(null);
    const firstBgRef = useRef(null);
    const scdBgRef = useRef(null);
    useEffect(() => {
        //Handles the header's behavior when the user is scrolling
        const handleScroll = () => {
            if (window.scrollY < scrollY) {
                headerRef.current.style.top = 0;
            } else {
                headerRef.current.style.top = "-104px";
            }
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", (e) => handleScroll());
        return () => {
            window.removeEventListener("scroll", (e) => handleScroll());
        };
    }, [scrollY]);

    return {
        headerRef,
        animatedBarRef,
        firstBgRef,
        scdBgRef,
    };
};

const Header = () => {
    const { headerRef, animatedBarRef, firstBgRef, scdBgRef } = useHeader();
    const loggedData = useSelector((state) => state.loggedIn.login);

    return (
        <header ref={headerRef}>
            <img src={logo} alt="Logo Groupomania" id="header-logo" />
            {loggedData ? <MobileUserNavigation /> : <MobileGuestNavigation />}

            {loggedData ? (
                <UserNavigation
                    animatedBarRef={animatedBarRef}
                    firstBgRef={firstBgRef}
                    scdBgRef={scdBgRef}
                />
            ) : (
                <GuestNavigation
                    animatedBarRef={animatedBarRef}
                    firstBgRef={firstBgRef}
                    scdBgRef={scdBgRef}
                />
            )}
        </header>
    );
};

export default Header;
