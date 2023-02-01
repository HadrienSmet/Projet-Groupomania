import {
    FaRegThumbsUp,
    FaThumbsUp,
    FaRegThumbsDown,
    FaThumbsDown,
    FaEdit,
    FaTrash,
    FaPaperPlane,
    FaFileImage,
    FaTimes,
} from "react-icons/fa";
import Button from "@mui/material/Button";
import axios from "axios";
import {
    dateParser,
    getJwtToken,
    mobileDateParser,
} from "../utils/functions/tools";
import { useDispatch } from "react-redux";
import { deletePost, getPosts } from "../features/posts.slice";
import { useState, useEffect } from "react";
import { adminID } from "../utils/adminPassword";

const Post = (props) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState("");
    const [newFile, setNewFile] = useState(undefined);
    const [newFileUrl, setNewFileUrl] = useState(undefined);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likes, setLikes] = useState(props.data.likes);
    const [dislikes, setDislikes] = useState(props.data.dislikes);
    const [usersLiking, setUsersLiking] = useState(props.data.usersLiked);
    const [usersDisliking, setUsersDisliking] = useState(
        props.data.usersDisliked
    );
    const dispatch = useDispatch();
    let { token, userId } = getJwtToken();

    //This useEffect is here to define some states related by the relation between the user and the post
    useEffect(() => {
        // const adminID = '635bb5eeafe2c81e556d45dd';
        const checkAuthor = () => {
            if (userId === props.data.userId) {
                setIsAuthor(true);
            }
            if (props.data.usersLiked.includes(userId)) {
                setLiked(true);
            }
            if (props.data.usersDisliked.includes(userId)) {
                setDisliked(true);
            }
        };
        const checkAdmin = () => {
            if (userId === adminID) {
                setIsAuthor(true);
            }
        };
        checkAuthor();
        checkAdmin();
    }, [
        userId,
        props.data.userId,
        props.data.usersLiked,
        props.data.usersDisliked,
    ]);

    const handleNewFile = (e) => {
        const btn = document.querySelector("#edit-file_" + props.data._id);
        btn.style.color = "rgb(15, 217, 217)";
        setNewFile(e.target.files[0]);
        setNewFileUrl(URL.createObjectURL(e.target.files[0]));
    };

    const handleBtnBehavior = (e) => {
        const element = document.querySelector(
            ".post__content-container__remove-file-btn"
        );
        element.style.opacity = "0";
        element.style.zIndex = "-1";
    };

    //This function handles the modification of a post
    //@Params {type: Object} --> the params of the event: the value of the post (text, file)
    const editPost = (e) => {
        e.preventDefault();
        if (text || newFile !== undefined) {
            const post = new FormData();
            post.append("userId", props.data.userId);
            text
                ? post.append("text", text)
                : post.append("text", props.data.text);
            post.append("date", props.data.date);
            newFile !== undefined &&
                newFile !== "" &&
                post.append("file", newFile);
            newFile === undefined && post.append("file", props.data.imageUrl);
            newFile === "" && post.append("file", "");
            axios({
                url: `http://localhost:3000/api/posts/${props.data._id}`,
                method: "put",
                data: post,
                headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${token}`,
                },
            }).then((res) => {
                setEdit(false);
                axios({
                    url: "http://localhost:3000/api/posts",
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `bearer ${token}`,
                    },
                }).then((res) => {
                    dispatch(getPosts(res.data));
                });
            });
        }
    };
    //Handles the suppression of a post
    //@Params {type: Object} --> the params of the onClick event
    const removePost = (e) => {
        dispatch(deletePost(props.data._id));
        axios({
            url: `http://localhost:3000/api/posts/${props.data._id}`,
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${token}`,
            },
        });
    };

    //Handles the behavior of the app when a user clicks on the like button
    //If the user already liked the post:
    //-->The like is removed from the database and from the localState
    //Else:
    //-->The like is added to the database and to the LocalState
    const likesHandler = () => {
        if (usersLiking.includes(userId)) {
            axios({
                url: `http://localhost:3000/api/posts/${props.data._id}/like`,
                method: "post",
                data: {
                    like: 0,
                },
                headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${token}`,
                },
            }).then(() => {
                setLikes(likes - 1);
                setLiked(false);
                setUsersLiking(usersLiking.splice(userId, 1));
                setUsersLiking(usersLiking.filter((id) => id !== userId));
            });
        } else if (!usersDisliking.includes(userId)) {
            axios({
                url: `http://localhost:3000/api/posts/${props.data._id}/like`,
                method: "post",
                data: {
                    like: 1,
                },
                headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${token}`,
                },
            }).then(() => {
                setLikes(likes + 1);
                setLiked(true);
                setUsersLiking([...usersLiking, userId]);
            });
        }
    };

    //Handles the behavior of the app when a user clicks on the dislike button
    //If the user already disliked the post:
    //-->The dislike is removed from the database and from the localState
    //Else:
    //-->The dislike is added to the database and to the LocalState
    const dislikesHandler = () => {
        if (usersDisliking.includes(userId)) {
            axios({
                url: `http://localhost:3000/api/posts/${props.data._id}/like`,
                method: "post",
                data: {
                    like: 0,
                },
                headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${token}`,
                },
            }).then(() => {
                setDislikes(dislikes - 1);
                setDisliked(false);
                setUsersDisliking(usersDisliking.filter((id) => id !== userId));
            });
        } else if (!usersLiking.includes(userId)) {
            axios({
                url: `http://localhost:3000/api/posts/${props.data._id}/like`,
                method: "post",
                data: {
                    like: -1,
                },
                headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${token}`,
                },
            }).then(() => {
                setDislikes(dislikes + 1);
                setDisliked(true);
                setUsersDisliking([...usersDisliking, userId]);
            });
        }
    };

    return (
        <div className="post">
            <div className="post__info-container">
                <div className="post__info-container__img-container">
                    <img src={props.data.profilePicture} alt="img" />
                </div>
                <h3>{props.data.pseudo}</h3>
                <p id="date-for-big-screen">{dateParser(props.data.date)}</p>
                <p id="date-for-small-screen">
                    {mobileDateParser(props.data.date)}
                </p>
            </div>
            <div className="post__content-container">
                {newFile !== "" ? (
                    <div className="post__content-container__image-division">
                        {props.data.imageUrl !== "" &&
                            newFileUrl === undefined && (
                                <img
                                    src={
                                        "http://localhost:3000/images/" +
                                        props.data.imageUrl.split("images/")[1]
                                    }
                                    alt="img"
                                />
                            )}
                        {props.data.imageUrl !== "" &&
                            newFileUrl !== undefined && (
                                <img src={newFileUrl} alt="img" />
                            )}
                    </div>
                ) : null}
                <div className="post__content-container__text">
                    {isAuthor && edit ? (
                        <form
                            action=""
                            id="editation"
                            onSubmit={(e) => editPost(e)}
                        >
                            <textarea
                                type="text"
                                name="text"
                                className="post__content-container__edit-area"
                                defaultValue={props.data.text}
                                onChange={(e) => setText(e.target.value)}
                            ></textarea>
                            {props.data.imageUrl !== "" ? (
                                <Button
                                    variant="text"
                                    className="post__content-container__remove-file-btn"
                                    onClick={(e) => handleBtnBehavior(e)}
                                >
                                    <FaTimes
                                        id={"rmv-file_" + props.data._id}
                                        onClick={() => {
                                            setNewFile("");
                                            setNewFileUrl("");
                                        }}
                                    />
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
                                        id={"edit_" + props.data._id}
                                        onClick={(e) => editPost(e)}
                                    />
                                </Button>
                                <Button
                                    variant="text"
                                    className="post__content-container__edit-btn"
                                >
                                    <label htmlFor="input-new-file">
                                        <FaFileImage
                                            id={"edit-file_" + props.data._id}
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
                    ) : (
                        <p>{props.data.text}</p>
                    )}
                </div>
            </div>
            <div className="post__modification-container">
                <div className="post__likes-container">
                    <div className="post__likes-container__likes">
                        <p>{likes}</p>
                        {liked === true ? (
                            <FaThumbsUp onClick={() => likesHandler()} />
                        ) : (
                            <FaRegThumbsUp onClick={() => likesHandler()} />
                        )}
                    </div>
                    <div className="post__likes-container__dislikes">
                        <p>{dislikes}</p>
                        {disliked === true ? (
                            <FaThumbsDown onClick={() => dislikesHandler()} />
                        ) : (
                            <FaRegThumbsDown
                                onClick={() => dislikesHandler()}
                            />
                        )}
                    </div>
                </div>
                {isAuthor && (
                    <div className="post__btn-container">
                        <Button
                            className="post__btn-container__btn"
                            variant="text"
                            onClick={() => setEdit(!edit)}
                        >
                            <FaEdit />
                        </Button>
                        <Button
                            variant="text"
                            id={"delete_" + props.data._id}
                            className="post__btn-container__btn"
                            onClick={(e) => removePost(e)}
                        >
                            <FaTrash />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Post;
