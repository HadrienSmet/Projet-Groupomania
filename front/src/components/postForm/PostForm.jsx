import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../features/posts.slice";
import { getJwtToken } from "../../utils/functions/tools";
import { axiosCreatePost } from "../../utils/functions/posts/axiosCreatePost";
import { axiosGetPosts } from "../../utils/functions/posts/axiosGetPosts";

import PostFormTextContainer from "./PostFormTextContainer";
import PostFormButtonsRow from "./PostFormButtonsRow";

const usePostFormRefs = () => {
    const spanRef = useRef(null);
    const penRef = useRef(null);
    const inputRef = useRef(null);

    return {
        spanRef,
        penRef,
        inputRef,
    };
};

const usePostFormStyle = ({ inputRef, spanRef, penRef, inputValue }) => {
    const handleInputSizeContentFull = () => {
        inputRef.current.style.height = "200px";
        spanRef.current.style.transform = "scale(0.7) translate(12px, -143px)";
    };

    const handleInputSizeContentLess = () => {
        inputRef.current.style.height = "45px";
        spanRef.current.style.transform = "scale(0.7) translate(0px, -33px)";
    };

    //Handles the textarea's size
    //@Params { Type: Object } --> data from onChange event
    //If the textarea has a value --> height is getting bigger and the span behaving like a placeholder get animated
    //Whenever the textarea has no value --> height is getting back to normal and the same for the span
    const handleInputSize = (e) => {
        if (inputValue !== "") handleInputSizeContentFull();
        if (e.target.value === "") handleInputSizeContentLess();
    };

    //Handles the behavior of the textarea when it lose the focus
    //@Params { Type: Object } --> data from onBlur event
    //It changes the color
    //If the textarea has no value span go back to normal
    const handleBlur = (e) => {
        penRef.current.style.color = "$clr-1";
        if (e.target.value === "") {
            spanRef.current.style.transform = "scale(1) translate(0px, 0px)";
        }
    };

    return {
        handleInputSizeContentLess,
        handleInputSize,
        handleBlur,
    };
};

const usePostFormData = ({
    handleInputSizeContentLess,
    inputValue,
    setInputValue,
}) => {
    const [fileUrl, setFileUrl] = useState("");
    const [file, setFile] = useState("");
    const dispatch = useDispatch();
    const profileData = useSelector((state) => state.profileStore.profile);
    let { userId, token } = getJwtToken();

    //Set the file url into the component's state whenever the input file is getting change
    //@Params { Type: Object } --> The data from the onChange event
    const handleFile = (e) => {
        setFileUrl(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    };

    const handlePostData = () => {
        const post = new FormData();
        let date = new Date();
        date = Date.now();
        post.append("userId", userId);
        post.append("date", date);
        post.append("pseudo", profileData.pseudo);
        post.append("profilePicture", profileData.profilePicture);
        post.append("text", inputValue);
        file !== "" && post.append("file", file);

        return post;
    };

    //Handles the post to the API
    //@Params { Type: Object } --> the data from the submit event, only here to prevent the behavior by default
    //It gets all the data it needs  before putting it into a new FormData constructor
    //The request is a post method and the authorization is allowed by the token provided by the localStorage
    const handlePost = async (e) => {
        e.preventDefault();
        const post = handlePostData();
        axiosCreatePost(post, token).then((res) => {
            handleInputSizeContentLess();
            setFile("");
            setFileUrl("");
            setInputValue("");
            axiosGetPosts(token).then((res) => {
                dispatch(getPosts(res.data));
            });
        });
    };

    return {
        fileUrl,
        handleFile,
        handlePost,
    };
};

const PostForm = () => {
    const [inputValue, setInputValue] = useState("");
    const { spanRef, penRef, inputRef } = usePostFormRefs();
    const { handleInputSizeContentLess, handleInputSize, handleBlur } =
        usePostFormStyle({ inputRef, spanRef, penRef, inputValue });
    const { fileUrl, handleFile, handlePost } = usePostFormData({
        inputValue,
        setInputValue,
        handleInputSizeContentLess,
    });

    return (
        <form
            action=""
            className="post-form"
            encType="multipart/form-data"
            onSubmit={(e) => handlePost(e)}
        >
            <PostFormTextContainer
                inputValue={inputValue}
                setInputValue={(value) => setInputValue(value)}
                spanRef={spanRef}
                penRef={penRef}
                inputRef={inputRef}
                handleBlur={handleBlur}
                handleInputSize={handleInputSize}
            />
            <PostFormButtonsRow
                fileUrl={fileUrl}
                handleFile={(e) => handleFile(e)}
            />
        </form>
    );
};

export default PostForm;
