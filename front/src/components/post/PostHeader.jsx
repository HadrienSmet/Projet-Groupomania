import { dateParser, mobileDateParser } from "../../utils/functions/tools";

const PostHeader = ({ data }) => {
    return (
        <div className="post__info-container">
            <div className="post__info-container__img-container">
                <img src={data.profilePicture} alt="img" />
            </div>
            <h3>{data.pseudo}</h3>
            <p id="date-for-big-screen">{dateParser(data.date)}</p>
            <p id="date-for-small-screen">{mobileDateParser(data.date)}</p>
        </div>
    );
};

export default PostHeader;
