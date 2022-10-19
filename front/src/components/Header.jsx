import { useSelector } from "react-redux";
import logo from "../assets/images/icon-left-font-removebg.png";
import GuestNavigation from "./GuestNavigation";
import UserNavigation from "./UserNavigation";

const Header = () => {
    const loggedData = useSelector((state) => state.loggedIn.login)

    return (
        <header>
            <img src={ logo } alt="Logo Groupomania" />
            { loggedData ? 
                 <UserNavigation />
            :
                <GuestNavigation />}
        </header>
    )
}

export default Header;