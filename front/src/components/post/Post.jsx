import { useState } from "react";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostButtonsRow from "./PostButtonsRow";

const Post = ({ data }) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);

    return (
        <div className="post">
            <PostHeader data={data} />
            <PostContent
                data={data}
                isAuthor={isAuthor}
                edit={edit}
                setEdit={(boolean) => setEdit(boolean)}
            />
            <PostButtonsRow
                data={data}
                edit={edit}
                isAuthor={isAuthor}
                setEdit={(boolean) => setEdit(boolean)}
                setIsAuthor={(boolean) => setIsAuthor(boolean)}
            />
        </div>
    );
};

export default Post;
