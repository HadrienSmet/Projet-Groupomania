import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserLogged } from "../features/login.slice";
import { getPosts } from "../features/posts.slice";
import { getJwtToken } from "../utils/functions/tools";
import { axiosGetPosts } from "../utils/functions/posts/axiosGetPosts";

import FormDialog from "../components/profileHandler/ProfileHandler";
import PostForm from "../components/postForm/PostForm";
import Post from "../components/Post";

const useHome = () => {
    const dispatch = useDispatch();
    let { token } = getJwtToken();
    const postsData = useSelector((state) => state.postsWarehouse.posts);
    let rightOrderData;
    postsData ? (rightOrderData = [...postsData]) : (rightOrderData = null);

    //This useEffect calls all the posts from the dataBase and tells to the app that the user is connected
    useEffect(() => {
        let fetchable = true;
        dispatch(setUserLogged(true));
        axiosGetPosts(token)
            .then((res) => {
                if (fetchable) dispatch(getPosts(res.data));
            })
            .catch((err) => console.log(err));

        return () => {
            fetchable = false;
        };
    }, [dispatch, token]);

    return {
        postsData,
        rightOrderData,
    };
};

const Home = () => {
    const { postsData, rightOrderData } = useHome();
    const isComplete = useSelector(
        (state) => state.profileCompletion.isComplete
    );

    return (
        <main>
            <div className="home-page__component">
                <h1 id="main-title">
                    Suivez les dernières activités de vos collègues
                </h1>
                {isComplete ? <div className="fake-margin"></div> : null}
                <FormDialog profileComplete={isComplete} />
                {isComplete ? (
                    <PostForm />
                ) : (
                    <div className="uncomplete-division">
                        <h2>
                            Veuillez finaliser votre profile avant de partager
                            avec vos collegues.
                        </h2>
                        <div className="fake-padding"></div>
                    </div>
                )}
                <div className="home-page__post-container">
                    <ul>
                        {postsData &&
                            rightOrderData
                                .sort((a, b) => b.date - a.date)
                                .map((post) => (
                                    <li key={post._id}>
                                        <Post data={post} />
                                    </li>
                                ))}
                    </ul>
                </div>
            </div>
        </main>
    );
};

export default Home;
