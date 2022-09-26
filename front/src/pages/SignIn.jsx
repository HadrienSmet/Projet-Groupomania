import { useLogin } from '../utils/context/LoginProvider';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';

const SignIn = () => {
    let navigate = useNavigate();
    const { setIsLoggedIn } = useLogin()
    
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
                setIsLoggedIn(true);
                navigate("/home");
            }
        })
        .catch(error => span.textContent = error.message + "Paire d'email et de mot de passe incorrect")
    }

    return (
        <div className="signin-component start-form">
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
                <button>Se connecter</button>
                <span className="alert-msg"></span>
            </form>
        </div>
    )
};

export default SignIn;