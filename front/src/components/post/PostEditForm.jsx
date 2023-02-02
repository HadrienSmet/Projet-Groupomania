import { Button } from "@mui/material";
import React, { useRef, useState } from "react";
import { FaFileImage, FaPaperPlane, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { getPosts } from "../../features/posts.slice";
import { axiosGetPosts } from "../../utils/functions/posts/axiosGetPosts";
import { axiosPutPost } from "../../utils/functions/posts/AxiosPutPost";
import { getJwtToken } from "../../utils/functions/tools";

const usePostEditForm = ({
    data,
    newFile,
    setEdit,
    setNewFile,
    setNewFileUrl,
}) => {
    const [text, setText] = useState("");
    const editFileRef = useRef(null);
    const removeFileRef = useRef(null);
    const dispatch = useDispatch();
    let { token } = getJwtToken();

    const handleBtnBehavior = (e) => {
        removeFileRef.current.style.opacity = "0";
        removeFileRef.current.style.zIndex = "-1";
    };

    const handleNewFile = (e) => {
        editFileRef.current.firstChild.style.color = "rgb(15, 217, 217)";
        setNewFile(e.target.files[0]);
        setNewFileUrl(URL.createObjectURL(e.target.files[0]));
    };

    const resetFile = () => {
        setNewFile("");
        setNewFileUrl("");
    };

    const handleEditPostData = () => {
        const post = new FormData();
        post.append("userId", data.userId);
        text ? post.append("text", text) : post.append("text", data.text);
        post.append("date", data.date);
        newFile !== undefined && newFile !== "" && post.append("file", newFile);
        newFile === undefined && post.append("file", data.imageUrl);
        newFile === "" && post.append("file", "");

        return post;
    };

    //This function handles the modification of a post
    //@Params {type: Object} --> the params of the event: the value of the post (text, file)
    const editPost = (e) => {
        e.preventDefault();
        if (text || newFile !== undefined) {
            const post = handleEditPostData();
            axiosPutPost(data._id, post, token).then((res) => {
                setEdit(false);
                axiosGetPosts(token).then((res) => {
                    dispatch(getPosts(res.data));
                });
            });
        }
    };

    return {
        editFileRef,
        removeFileRef,
        setText,
        handleBtnBehavior,
        resetFile,
        handleNewFile,
        editPost,
    };
};

const PostEditForm = ({
    data,
    newFile,
    setEdit,
    setNewFile,
    setNewFileUrl,
}) => {
    const {
        editFileRef,
        removeFileRef,
        setText,
        handleBtnBehavior,
        resetFile,
        handleNewFile,
        editPost,
    } = usePostEditForm({ data, newFile, setEdit, setNewFile, setNewFileUrl });

    return (
        <form action="" id="editation" onSubmit={(e) => editPost(e)}>
            <textarea
                type="text"
                name="text"
                className="post__content-container__edit-area"
                defaultValue={data.text}
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            {data.imageUrl !== "" ? (
                <Button
                    ref={removeFileRef}
                    variant="text"
                    className="post__content-container__remove-file-btn"
                    onClick={(e) => handleBtnBehavior(e)}
                >
                    <FaTimes id={"rmv-file_" + data._id} onClick={resetFile} />
                </Button>
            ) : (
                <div className="fake-gap"></div>
            )}
            <div className="post__content-container__edit-btn-container">
                <Button
                    variant="text"
                    className="post__content-container__edit-btn"
                >
                    <FaPaperPlane
                        id={"edit_" + data._id}
                        onClick={(e) => editPost(e)}
                    />
                </Button>
                <Button
                    variant="text"
                    className="post__content-container__edit-btn"
                >
                    <label htmlFor="input-new-file" ref={editFileRef}>
                        <FaFileImage
                            id={"edit-file_" + data._id}
                            className="file-icon"
                        />
                    </label>
                </Button>
                <input
                    type="file"
                    name="file"
                    id="input-new-file"
                    accept="image/*"
                    onChange={(e) => handleNewFile(e)}
                />
            </div>
        </form>
    );
};

export default PostEditForm;
