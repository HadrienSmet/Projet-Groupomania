import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import illuSignUp from '../assets/images/sign-up-illu.png';
import { useDispatch } from 'react-redux';
import { setUserLogged } from '../features/login.slice';
import { signUpClickAnimation } from '../utils/functions/animations';
import { setJwtToken } from '../utils/functions/tools';
// import { toggleCompletion } from '../features/isComplete.slice';

const SignUp = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    //Handles the form's behavior on submit.
    //@Params {type: Object} --> The data provided by the user
    //Posts the data from the user to the API
    //If success: change the contexte of isLoggedIn and then redirects the user to the homepage
    //If not: displays the error message 
    const onSubmit = (data) => { 
        const span = document.querySelector('.alert-msg');
        console.log(data)
        axios.post("http://localhost:3000/api/auth/signup", data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if (res.status !== 400) {
                dispatch(setUserLogged(true));
                // dispatch(toggleCompletion(false));
                setJwtToken(res.data);
                navigate("/home");
            }
        })
        .catch(error => {
            console.log(error);
            span.textContent =  error.message;
        })         
    }

    return (
        <section className='signup-section'>
            <div className="signup-component start-form">
                <h2>Inscription</h2>
                <form action="" onSubmit={ handleSubmit(onSubmit) }>
                    <div className="input-container">
                        <input type="email" id="email" required="required" { ...register("email", { required:"Veuillez insérer une adresse mail" })  } />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-container">
                        <input type="password" id="password" required="required" { ...register("password", { required: "Veuillez définir votre mot de passe" }) } />
                        <label htmlFor="password">Mot de passe</label>
                    </div>
                    <div className="click-anim-container">
                        <button 
                        onClick={(e) => signUpClickAnimation(e, ".click-anim-container")}
                        // onClick={(e) => signUpClickAnimation(e, ".click-anim-container", 204, 280)}
                        >S'inscrire</button>
                    </div>
                    <span className="alert-msg"></span>
                </form>
            </div>
            <img src={illuSignUp} alt="Illustration d'inscription en ligne" />
        </section>
    )
};

export default SignUp;