// import { useLogin } from '../utils/context/LoginProvider';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import signInIllu from '../assets/images/sign-in-illu.png';

const SignIn = () => {
    let navigate = useNavigate();
    // const { setIsLoggedIn } = useLogin()
    
    const { register, handleSubmit } = useForm();

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
                // setIsLoggedIn(() => true);
                navigate("/home");
            }
        })
        .catch(error => span.textContent = error.message + "Paire d'email et de mot de passe incorrect")
    }
    
    // const giveMeYourPos = () => {
    //     const windowsX = window.innerWidth;
    //     const windowsY = window.innerHeight;
    //     rightPosX = e.target.offsetLeft + e.target.parentElement.offsetLeft + e.target.parentElement.parentElement.offsetLeft + e.target.parentElement.parentElement.parentElement.offsetLeft
    // }

    //Creates an animation when the user clicks on the button
    //@Params { Type: Object, Type: String, Type: Number, Type: Number }
    //The first param is the data provided by the event
    //The second params defines wich container is going to be the father for the animation
    //The two last params are teching us the position of the father in the DOM
    const clickAnimation = (e, tag) => {
        console.log(e);
        let container = document.querySelector(tag)
        let x = e.clientX;
        let y = e.clientY;
        let rightPosX = e.target.offsetLeft + e.target.parentElement.offsetLeft 
        + e.target.parentElement.parentElement.offsetLeft 
        + e.target.parentElement.parentElement.parentElement.offsetLeft
        let rightPosY = e.target.offsetHeight + e.target.parentElement.offsetHeight + e.target.parentElement.parentElement.offsetHeight 
        // + e.target.parentElement.parentElement.parentElement.offsetHeight
    
        let ripples = document.createElement('span');
        ripples.classList.add('ripples');
        ripples.style.left = x - rightPosX + 10  + "px";
        ripples.style.top = y - rightPosY - 10  + "px";
        container.appendChild(ripples);
    
        setTimeout(() => {
            ripples.remove();
        }, 1000);
    };

    

    return (
        <section className="signin-section">
        <div className="signin-component start-form"  >
            <h2>Connectez-vous!</h2>
            <form action="" onSubmit={ handleSubmit(onSubmit) }>
                
                <div className="input-container">
                    <input type="email" id="mailUser" required="required" { ...register("email", { required:"Veuillez insérer une adresse mail" }) }/>
                    <label htmlFor="mailUser">Email</label>
                </div>
                <div className="input-container">
                    <input type="password" id="passwordUser" required="required" { ...register("password", { required: "Veuillez définir votre mot de passe" }) }/>
                    <label htmlFor="mailUser">Mot de passe</label>
                </div>
                <div className="click-anim-container">
                    <button 
                        onClick={(e) => clickAnimation(e, ".click-anim-container")}
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