import { Link } from 'react-router-dom';
// import { useLogin } from '../utils/context/LoginProvider';
import { handlerRodAnimation, removeRod, showMeRod, handlerUpBgAnimation, handlerDownBgAnimation } from '../utils/functions/animations';

const UserNavigation = () => {
    // const { setIsLoggedIn } = useLogin()


    return (
        <nav>
            <ul 
                onMouseMove={(e) => handlerRodAnimation(e)} 
                onMouseEnter={(e) => showMeRod(e)} 
                onMouseLeave={(e) => removeRod(e)}
            >
                <li 
                    className='firstChild welcome-btn' 
                    onMouseEnter={(e) => handlerUpBgAnimation(e)} 
                    onMouseLeave={(e) => handlerDownBgAnimation(e)}
                >
                    <span className="animated-bg" id='firstChild'></span>
                    <Link to="/" 
                        className='firstChild' 
                        onMouseEnter={(e) => handlerUpBgAnimation(e)} 
                        onMouseLeave={(e) => handlerDownBgAnimation(e)} 
                        // onClick={imLeaving()}
                    >Déconnexion</Link>
                </li>
                <li 
                    className='lastChild home-btn' 
                    onMouseEnter={(e) => handlerUpBgAnimation(e)} 
                    onMouseLeave={(e) => handlerDownBgAnimation(e)}
                >
                    <span className="animated-bg" id='lastChild' ></span>
                    <Link to="/home" 
                        className='lastChild' 
                        onMouseEnter={(e) => handlerUpBgAnimation(e)} 
                        onMouseLeave={(e) => handlerDownBgAnimation(e)}
                    >Accueil</Link>
                </li>
                <div className="animation start-home"></div>
            </ul>
        </nav>
    );
};

export default UserNavigation;