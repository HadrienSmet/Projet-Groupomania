import { Link } from 'react-router-dom';
import { handlerRodAnimation, removeRod, showMeRod, handlerUpBgAnimation, handlerDownBgAnimation } from '../utils/functions/animations';

const GuestNavigation = () => {

    return (
        <nav>
            <ul 
                onMouseMove={(e) => handlerRodAnimation(e)} 
                onMouseEnter={(e) => showMeRod(e)} 
                onMouseLeave={(e) => removeRod(e)}
            >
                <li 
                    className='firstChild' 
                    onMouseEnter={(e) => handlerUpBgAnimation(e)} 
                    onMouseLeave={(e) => handlerDownBgAnimation(e)}>
                    <span className="animated-bg" id='firstChild'></span>
                    <Link to="/signup" 
                        className='firstChild' 
                        onMouseEnter={(e) => handlerUpBgAnimation(e)} 
                        onMouseLeave={(e) => handlerDownBgAnimation(e)} 
                    >Inscription</Link>
                </li>
                <li 
                    className='lastChild' 
                    onMouseEnter={(e) => handlerUpBgAnimation(e)} 
                    onMouseLeave={(e) => handlerDownBgAnimation(e)}
                >
                    <span className="animated-bg" id='lastChild' ></span>
                    <Link to="/signin" 
                        className='lastChild' 
                        onMouseEnter={(e) => handlerUpBgAnimation(e)} 
                        onMouseLeave={(e) => handlerDownBgAnimation(e)} 
                    >Connexion</Link> 
                </li>
                <div className="animation start-home"></div>
            </ul>
        </nav>
    );
};

export default GuestNavigation;