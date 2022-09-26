import { Link } from 'react-router-dom';
import { useLogin } from '../utils/context/LoginProvider';

const UserNavigation = () => {
    const { setIsLoggedIn } = useLogin()
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/" className='firstChild' onClick={(e) => setIsLoggedIn(false)}>Déconnexion</Link>
                </li>
                <li className='after-bearer'>
                    <Link to="/home" className='lastChild'>Accueil</Link>
                </li>
            </ul>
        </nav>
    );
};

export default UserNavigation;