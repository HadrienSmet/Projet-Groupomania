import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import PostForm from "../components/PostForm";
import Post from "../components/Post";
import { setUserLogged } from "../features/login.slice";
import { getPosts } from "../features/posts.slice";
import { getJwtToken } from "../utils/functions/tools";
import FormDialog from "../components/ProfileHandler";

const Home = () => {
    const dispatch = useDispatch();
    const postsData = useSelector((state) => state.postsWarehouse.posts);
    const isComplete = useSelector((state) => state.profileCompletion.isComplete);
    const profileData = useSelector((state) => state.profileStore.profile)
    let { token } = getJwtToken();
    let rightOrderData;
    postsData ? rightOrderData = [...postsData] : rightOrderData = null;


    //This useEffect calls all the posts from the dataBase and tells to the app that the user is connected
    useEffect(() => {
        dispatch(setUserLogged(true))
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
                console.log(isComplete);
                console.log(postsData);
                console.log(profileData);
            })
            .catch(err => console.log(err));
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
  

    return (
        <main>
            <div className="home-page__component">
                <h1 id='main-title'>Suivez les dernières activités de vos collègues</h1>
                { isComplete ? <div className="fake-margin"></div> : null}
                <FormDialog profileComplete={ isComplete } />
                { isComplete 
                ? 
                    <PostForm /> 
                : 
                    <div className="uncomplete-division">
                        <h2>Veuillez finaliser votre profile avant de partager avec vos collegues.</h2>
                        <div className="fake-padding"></div>
                    </div> 
                }
                <div className="home-page__post-container">
                    <ul>
                        {postsData && rightOrderData
                            .sort((a, b) => b.date - a.date)
                            .map((post) => (
                                <li key={ post._id }><Post  data={ post } /></li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </main>
    )
};

export default Home;