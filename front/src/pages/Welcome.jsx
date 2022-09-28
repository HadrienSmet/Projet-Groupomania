import illu from "../assets/images/img-socialnetwork-welcom-removebg-preview.png";
import { useLogin } from "../utils/context/LoginProvider";
import { useEffect } from "react";

const Welcome = () => {
    const { setIsLoggedIn } = useLogin();

    useEffect(() => {
        setIsLoggedIn(false)
    });

    return (
        <div className="welcome-component">
            <div className="polygon-container">
                <div className="polygon"></div>
            </div> 
            <div className="brief-intro">   
                <h1>Bienvenue sur le réseau social de Groupomania.</h1>
                <p>Conçu spécialement pour ses chers collaborateurs.</p>
            </div>
            <img src={ illu } alt="Illustration réseaux sociaux" />
        </div>
    )
}

export default Welcome;