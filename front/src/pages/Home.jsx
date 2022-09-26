import PostForm from "../components/PostForm";
import PostsContainer from "../components/PostsContainer";

const Home = () => {
    return (
        <main>
            <div className="home-page__component">
                <h1>Bienvenue sur le lieu commun du réseau social de Groupomania</h1>
                <p>Ce lieu reste bien sûr un cadre professionnel mais est mis à votre disposition pour améliorer la vie au sein de notre entreprise!<br />
                Exprimez-vous, joignez-y des photos ou des images!</p>
                <PostForm />
                <PostsContainer />
            </div>
        </main>
    )
};

export default Home;