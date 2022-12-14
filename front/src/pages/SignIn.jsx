import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import signInIllu from '../assets/images/sign-in-illu.png';
import { useDispatch } from 'react-redux';
import { setUserLogged } from '../features/login.slice';
import { toggleCompletion } from '../features/isComplete.slice';
import { setProfileData } from '../features/profile.slice';
import { signInClickAnimation } from '../utils/functions/animations';
import { setJwtToken } from '../utils/functions/tools';

const SignIn = () => {
    let navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();


    //Handles the form's behavior on submit.
    //@Params {type: Object} --> The data provided by the user
    //Posts the data from the user to the API
    //If success: change the contexte of isLoggedIn and then redirects the user to the homepage
    //If not: displays the error message 
    const onSubmit = (data) => {
        const span = document.querySelector('.alert-msg') 
        console.log(data)
        axios.post("http://localhost:3000/api/auth/login", data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if (res.status !== 401) {
                console.log(res);
                dispatch(setUserLogged(true));
                dispatch(toggleCompletion(JSON.stringify(res.data.isProfileComplete)));
                dispatch(setProfileData(res.data));
                setJwtToken(res.data);
                navigate("/home");
            }
        })
        .catch(error => span.textContent = error.message + "Paire d'email et de mot de passe incorrect")
    } 

    return (
        <section className="signin-section">
        <div className="signin-component start-form"  >
            <h2>Connectez-vous!</h2>
            <form action="" onSubmit={ handleSubmit(onSubmit) }>
                
                <div className="input-container">
                    <input type="email" id="mailUser" required="required" { ...register("email", { required:"Veuillez ins??rer une adresse mail" }) }/>
                    <label htmlFor="mailUser">Email</label>
                </div>
                <div className="input-container">
                    <input type="password" id="passwordUser" required="required" { ...register("password", { required: "Veuillez d??finir votre mot de passe" }) }/>
                    <label htmlFor="mailUser">Mot de passe</label>
                </div>
                <div className="click-anim-container">
                    <button 
                        onClick={(e) => signInClickAnimation(e, ".click-anim-container")}
                        onSubmit={ handleSubmit(onSubmit) }
                    >Se connecter</button>
                </div>
                <span className="alert-msg"></span>
            </form>
        </div>
        <img src={signInIllu} alt="Illustration d'une connexion en ligne" id='signin-img' />
        </section>
    )
};

export default SignIn;