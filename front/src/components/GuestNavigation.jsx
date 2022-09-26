import { Link } from 'react-router-dom';
// import { useLogin } from '../../utils/context/LoginProvider';

const GuestNavigation = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/signup" className='firstChild'>Inscription</Link>
                </li>
                <li className='after-bearer'>
                    <Link to="/signin" className='lastChild'>Connexion</Link> 
                </li>
            </ul>
        </nav>
    );
};

export default GuestNavigation;