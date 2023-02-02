import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../features/posts.slice";

import { axiosDeletePost } from "../../utils/functions/posts/axiosDeletePost";
import { axiosHandleDislike } from "../../utils/functions/posts/axiosHandleDislike";
import { axiosHandleLike } from "../../utils/functions/posts/axiosHandleLike";
import { getJwtToken } from "../../utils/functions/tools";
import { adminID } from "../../utils/adminPassword";
import {
    FaEdit,
    FaRegThumbsDown,
    FaRegThumbsUp,
    FaThumbsDown,
    FaThumbsUp,
    FaTrash,
} from "react-icons/fa";
import { Button } from "@mui/material";

const usePostButtonsRow = ({ data, setIsAuthor }) => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likes, setLikes] = useState(data.likes);
    const [dislikes, setDislikes] = useState(data.dislikes);
    const [usersLiking, setUsersLiking] = useState(data.usersLiked);
    const [usersDisliking, setUsersDisliking] = useState(data.usersDisliked);
    const dispatch = useDispatch();
    let { token, userId } = getJwtToken();
    //Handles the suppression of a post
    //@Params {type: Object} --> the params of the onClick event
    const removePost = (e) => {
        dispatch(deletePost(data._id));
        axiosDeletePost(data._id, token);
    };

    //Handles the behavior of the app when a user clicks on the like button
    //If the user already liked the post:
    //-->The like is removed from the database and from the localState
    //Else:
    //-->The like is added to the database and to the LocalState
    const likesHandler = () => {
        if (usersLiking.includes(userId)) {
            axiosHandleLike(data._id, 0, token).then(() => {
                setLikes(likes - 1);
                setLiked(false);
                setUsersLiking(usersLiking.splice(userId, 1));
                setUsersLiking(usersLiking.filter((id) => id !== userId));
            });
        } else if (!usersDisliking.includes(userId)) {
            axiosHandleLike(data._id, 1, token).then(() => {
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
            axiosHandleDislike(data._id, 0, token).then(() => {
                setDislikes(dislikes - 1);
                setDisliked(false);
                setUsersDisliking(usersDisliking.filter((id) => id !== userId));
            });
        } else if (!usersLiking.includes(userId)) {
            axiosHandleDislike(data._id, -1, token).then(() => {
                setDislikes(dislikes + 1);
                setDisliked(true);
                setUsersDisliking([...usersDisliking, userId]);
            });
        }
    };

    //This useEffect is here to define some states related by the relation between the user and the post
    useEffect(() => {
        const checkAuthor = () => {
            if (userId === data.userId) {
                setIsAuthor(true);
            }
            if (data.usersLiked.includes(userId)) {
                setLiked(true);
            }
            if (data.usersDisliked.includes(userId)) {
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
    }, [userId, data.userId, data.usersLiked, data.usersDisliked, setIsAuthor]);

    return {
        likes,
        liked,
        dislikes,
        disliked,
        likesHandler,
        dislikesHandler,
        removePost,
    };
};

const PostButtonsRow = ({ data, edit, setEdit, isAuthor, setIsAuthor }) => {
    const {
        likes,
        liked,
        dislikes,
        disliked,
        likesHandler,
        dislikesHandler,
        removePost,
    } = usePostButtonsRow({ data, setIsAuthor });
    return (
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
                        <FaRegThumbsDown onClick={() => dislikesHandler()} />
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
                        id={"delete_" + data._id}
                        className="post__btn-container__btn"
                        onClick={(e) => removePost(e)}
                    >
                        <FaTrash />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default PostButtonsRow;
