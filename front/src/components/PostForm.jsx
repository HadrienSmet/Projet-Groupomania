// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FaPenNib } from "react-icons/fa";


const PostForm = () => {
    return (
        <form action="" className="post-form">
            <div className="text-container">
                <label htmlFor="userPost"><FaPenNib className="pen-icon" /></label>
                <input type="text" id="userPost" />
                <span className="pseudo-label">Exprimez-vous</span>
            </div>
            <input type="file" id="userFile" accept="image/*" onChange={(e) => console.log(e)} />
        </form>
    );
};

export default PostForm;