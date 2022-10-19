import { FaRegThumbsUp, FaThumbsUp, FaRegThumbsDown, FaThumbsDown, FaEdit, FaTrash, FaPaperPlane } from "react-icons/fa";
import Button from '@mui/material/Button';
import axios from "axios";
import { dateParser, getJwtToken } from "../utils/functions/tools";
import { useDispatch } from "react-redux";
import { changePost, deletePost } from "../features/posts.slice";
import { useState, useEffect } from "react";

const Post = (props) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState("");
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likes, setLikes] = useState(props.data.likes)
    const [dislikes, setDislikes] = useState(props.data.dislikes)
    const dispatch = useDispatch();
    let { token, userId } = getJwtToken();

    useEffect(() => {
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
        }
        checkAuthor()
    }, [userId, props.data.userId, props.data.usersLiked, props.data.usersDisliked])

    const editPost = (e) => {
        console.log(e);
        e.preventDefault();
        if (text) {
            const post = new FormData();       
            post.append("userId", props.data.userId);
            post.append("text", text);
            post.append("date", props.data.date);
            post.append("file", props.data.imageUrl);
            const data = {
                _id: props.data._id,
                userId: props.data.userId,
                text,
                imageUrl: props.data.imageUrl,
                date: props.data.date,
                likes: 0,
                dislikes: 0,
                usersLiked: [],
                usersDisliked: []
            }

            axios({
                url: `http://localhost:3000/api/posts/${props.data._id}`,
                method: "put",
                data: post,
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `bearer ${token}`                   
                }
            })
                .then(res => {
                    setEdit(false);
                    dispatch(changePost(data))
                })
        }
    }

    const removePost = (e) => {
        console.log(e);
        console.log(token);
        dispatch(deletePost(props.data._id))
        axios({
            url: `http://localhost:3000/api/posts/${props.data._id}`,
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${token}`
            }
        })
    }

    const likesHandler = () => {
        if (props.data.usersLiked.includes(userId)) {
            axios({
                url: `http://localhost:3000/api/posts/${props.data._id}/like`,
                method: 'post',
                data: {
                    like: 0
                },
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `bearer ${token}`
                }
            })
            .then(() => {
                setLikes(likes - 1);
                setLiked(false);
                console.log(likes);
            })
        } else if (!props.data.usersDisliked.includes(userId)) {
            axios({
                url: `http://localhost:3000/api/posts/${props.data._id}/like`,
                method: 'post',
                data: {
                    like: 1
                },
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `bearer ${token}`
                }
            })
            .then(() => {
                setLikes(likes + 1);
                setLiked(true);
                console.log(likes);
            })
        }
    }

    const dislikesHandler = () => {
        if (props.data.usersDisliked.includes(userId)) {
            axios({
                url: `http://localhost:3000/api/posts/${props.data._id}/like`,
                method: 'post',
                data: {
                    like: 0
                },
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `bearer ${token}`
                }
            })
            .then(() => {
                setDislikes(dislikes - 1);
                setDisliked(false);
                console.log(dislikes);
            })
        } else if (!props.data.usersLiked.includes(userId)) {
            axios({
                url: `http://localhost:3000/api/posts/${props.data._id}/like`,
                method: 'post',
                data: {
                    like: -1
                },
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `bearer ${token}`
                }
            })
            .then(() => {
                setDislikes(dislikes + 1);
                setDisliked(true);
                console.log(dislikes);
            })
        }
    }

    return (
        <div className="post" >
            <div className="post__info-container">
                <div className="post__info-container__img-container">
                    <img src={props.data.profilePicture} alt="img" />
                </div>
                <h3>{props.data.pseudo}</h3>
                <p>{dateParser(props.data.date)}</p>
            </div>
            <div className="post__content-container">
               {props.data.imageUrl !== "" && <img src={"http://localhost:3000/images/" + props.data.imageUrl.split("images/")[1] } alt="img" />}
                <div className="post__content-container__text">
                    { isAuthor && edit 
                    ? 
                        <form action="" onSubmit={(e) => editPost(e)}>
                            <textarea
                                type="text" 
                                name="text"
                                className="post__content-container__edit-area"
                                defaultValue={props.data.text}
                                onChange={(e) => setText(e.target.value)}></textarea>
                            <Button
                                variant="text"
                                className="post__content-container__edit-btn"
                            >
                                <FaPaperPlane 
                                    id={ "edit_" + props.data._id} 
                                    onClick={(e) => editPost(e)}/>
                            </Button>
                        </form>
                    : 
                        <p>{ props.data.text }</p>}
                </div>
            </div>
            <div className="post__modification-container">
                <div className="post__likes-container">
                    <div className="post__likes-container__likes">
                        <p>{ likes }</p>
                        { liked === true ? 
                            <FaThumbsUp onClick={() => likesHandler()} />
                        :
                            <FaRegThumbsUp onClick={() => likesHandler()} />}
                    </div>
                    <div className="post__likes-container__dislikes">
                        <p>{ dislikes }</p>
                        { disliked === true 
                        ? 
                            <FaThumbsDown onClick={() => dislikesHandler()} />
                        :
                            <FaRegThumbsDown onClick={() => dislikesHandler()} />}
                    </div>
                </div>
                { isAuthor && (
                    <div className="post__btn-container">
                        <Button 
                        className="post__btn-container__btn"
                            variant="text" 
                            onClick={() => setEdit(!edit)}
                        ><FaEdit /></Button>
                        <Button 
                            variant="text" 
                            id={ "delete_" + props.data._id}
                            className="post__btn-container__btn"
                            onClick={(e) => removePost(e)}
                        ><FaTrash /></Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Post;