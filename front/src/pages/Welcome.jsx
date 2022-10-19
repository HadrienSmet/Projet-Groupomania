import illu from "../assets/images/img-socialnetwork-welcom-removebg-preview.png";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserLogged } from "../features/login.slice";
const Welcome = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setUserLogged(false));
        localStorage.clear();
    }, [dispatch]);

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