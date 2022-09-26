// import Navigation from "../Navigation";
import logo from "../assets/images/icon-left-font-removebg.png";
// import { useContext } from "react";
import { useLogin } from "../utils/context/LoginProvider";
import GuestNavigation from "./GuestNavigation";
import UserNavigation from "./UserNavigation";

const Header = () => {
    const { isLoggedIn } = useLogin();

    return (
        <header>
            <img src={ logo } alt="Logo Groupomania" />
            { isLoggedIn ? 
                 <UserNavigation />
            :
                <GuestNavigation />}
            {/* <Navigation /> */}
        </header>
    )
}

export default Header;
// front\src\index.jsx
// front\assets\images\icon-left-font.svg
// front\src\components\Header\index.jsx