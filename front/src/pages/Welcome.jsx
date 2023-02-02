import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { setUserLogged } from "../features/login.slice";
import { getPosts } from "../features/posts.slice";
import { setProfileData } from "../features/profile.slice";

import illu from "../assets/images/img-socialnetwork-welcom-removebg-preview.png";

const useWelcome = () => {
    const dispatch = useDispatch();

    //This useEffect clears the redux store and the localStorage
    useEffect(() => {
        dispatch(setUserLogged(false));
        dispatch(getPosts(null));
        dispatch(setProfileData(null));
        localStorage.clear();
    }, [dispatch]);
};

const Welcome = () => {
    useWelcome();

    return (
        <section className="welcome">
            <div className="welcome__aside-intro">
                <div className="welcome__aside-intro__polygon-container">
                    <div className="welcome__aside-intro__polygon"></div>
                </div>
                <div className="welcome__aside-intro__brief-intro">
                    <h1>Bienvenue sur le réseau social de Groupomania.</h1>
                    <p>Conçu spécialement pour ses chers collaborateurs.</p>
                </div>
            </div>
            <img src={illu} alt="Illustration réseaux sociaux" />
        </section>
    );
};

export default Welcome;
