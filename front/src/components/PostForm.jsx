import { FaPenNib } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { postFormClickAnimation } from "../utils/functions/animations";
import { getJwtToken } from "../utils/functions/tools";
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../features/posts.slice";




const PostForm = () => {
    const span = document.querySelector(".pseudo-label");
    const icon = document.querySelector("#pen-icon");
    const input = document.querySelector("#userPost");

    const [inputValue, setInputValue] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    const [file, setFile] = useState("");
    const dispatch = useDispatch();
    const profileData = useSelector((state) => state.profileStore.profile);

    //Set the value of the input into the state
    //@Params { Type: Object } --> data from onChange event
    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    //Handles the textarea's size
    //@Params { Type: Object } --> data from onChange event
    //If the textarea has a value --> height is getting bigger and the span behaving like a placeholder get animated
    //Whenever the textarea has no value --> height is getting back to normal and the same for the span
    const handleInputSize = (e) => {
        if (inputValue !== "") {
            input.style.height = "200px";
            span.style.transform = "scale(0.7) translate(12px, -143px)";
        } 
        if (e.target.value === "") {
            input.style.height = "45px";
            span.style.transform = "scale(0.7) translate(0px, -33px)";
        }
    }

    //Handles the behavior of the textarea when it lose the focus
    //@Params { Type: Object } --> data from onBlur event
    //It changes the color
    //If the textarea has no value span go back to normal
    const handleBlur = (e) => {
        icon.style.color = "$clr-1";
        if (e.target.value === "") {
            span.style.transform = "scale(1) translate(0px, 0px)";
        };
    }

    //Set the file url into the component's state whenever the input file is getting change
    //@Params { Type: Object } --> The data from the onChange event
    const handleFile = (e) => {
        console.log(e);
        setFileUrl(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

    //Handles the post to the API
    //@Params { Type: Object } --> the data from the submit event, only here to prevent the behavior by default
    //It get all the data it needs  before putting it into a new FormData constructor
    //The request is a post method and the authorization is allowed by the token provided by the localStorage
    const handlePost = async (e) => {
        e.preventDefault();
        let { userId, token } = getJwtToken();
        let date = new Date();
        date = Date.now();

        const post = new FormData();       
        post.append("userId", userId);
        post.append("date", date);
        post.append("pseudo", profileData.pseudo);
        post.append("profilePicture", profileData.profilePicture);
        post.append("text", inputValue);
        file !== "" && post.append("file", file);

        axios({
            url: "http://localhost:3000/api/posts",
            method: "post",
            data: post,
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${token}`
            }
        })
        .then(res => {
            input.style.height = "45px";
            span.style.transform = "scale(0.7) translate(0px, -33px)";
            setFile("");
            setFileUrl("");
            setInputValue("");
            console.log(res);
            axios({
                url: "http://localhost:3000/api/posts",
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `bearer ${token}`
                }
            })
                .then(res => {
                    dispatch(getPosts(res.data))
                })
                .catch(err => console.log(err));
        })
    }

    return (
        <form action="" 
            className="post-form"
            encType="multipart/form-data" 
            onSubmit={ (e) => handlePost(e) }
        >
            <div className="text-container">
                <label htmlFor="userPost">
                    <FaPenNib id="pen-icon" />
                </label>
                <textarea 
                    name="post" 
                    id="userPost" 
                    rows={10} 
                    cols={50} 
                    wrap="hard" 
                    value={ inputValue } 
                    onChange={(e) => {
                        handleChange(e);
                        handleInputSize(e);
                    }} 
                    onBlur={(e) => handleBlur(e)}
                ></textarea>
                <span className="pseudo-label">Exprimez-vous</span>
            </div>
            <div className="last-row">
                <div className="label-animation-container">

                    { fileUrl === "" 
                    ? 
                        <label 
                            htmlFor="userFile" 
                            id="label-file" 
                            onClick={(e) => postFormClickAnimation(e, "#label-file")}
                        >Ajouter une image</label> 
                    : 
                        null}

                    <input 
                        type="file" 
                        name="file" 
                        id="userFile" 
                        accept="image/*"
                        onChange={(e) => handleFile(e)}
                    />
                </div>

                { fileUrl !== "" 
                ? 
                    <img src={ fileUrl } alt="img"  id="front-picture"/> 
                : 
                    null}

                <Button variant="outlined" type="submit" className="post-form__submit-btn">Poster</Button>
            </div>
        </form>
    );
};

export default PostForm;