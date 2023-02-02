import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setUserLogged } from "../features/login.slice";

import { signUpClickAnimation } from "../utils/functions/animations/onClick/signupClickAnimation";
import { setJwtToken } from "../utils/functions/tools";
import { axiosSignup } from "../utils/functions/user/axiosSignup";

import illuSignUp from "../assets/images/sign-up-illu.png";

const useSignup = () => {
    const spanRef = useRef(null);
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Handles the form's behavior on submit.
    //@Params {type: Object} --> The data provided by the user
    //Posts the data from the user to the API
    //If success: change the contexte of isLoggedIn and then redirects the user to the homepage
    //If not: displays the error message
    const onSubmit = (data) => {
        axiosSignup(data)
            .then((res) => {
                if (res.status !== 400) {
                    dispatch(setUserLogged(true));
                    setJwtToken(res.data);
                    navigate("/home");
                }
            })
            .catch((error) => {
                spanRef.current.textContent = error.message;
            });
    };

    return {
        spanRef,
        containerRef,
        onSubmit,
    };
};

const SignUp = () => {
    const { spanRef, containerRef, onSubmit } = useSignup();
    const { register, handleSubmit } = useForm();

    return (
        <section className="signup-section">
            <div className="signup-component start-form">
                <h2>Inscription</h2>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-container">
                        <input
                            type="email"
                            id="email"
                            required="required"
                            {...register("email", {
                                required: "Veuillez insérer une adresse mail",
                            })}
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-container">
                        <input
                            type="password"
                            id="password"
                            required="required"
                            {...register("password", {
                                required: "Veuillez définir votre mot de passe",
                            })}
                        />
                        <label htmlFor="password">Mot de passe</label>
                    </div>
                    <div ref={containerRef} className="click-anim-container">
                        <button
                            onClick={(e) =>
                                signUpClickAnimation(e, containerRef)
                            }
                        >
                            S'inscrire
                        </button>
                    </div>
                    <span ref={spanRef} className="alert-msg"></span>
                </form>
            </div>
            <img src={illuSignUp} alt="Illustration d'inscription en ligne" />
        </section>
    );
};

export default SignUp;
