import { useState } from "react";
import PostContentImage from "./PostContentImage";
import PostEditForm from "./PostEditForm";

const usePostContent = () => {
    const [newFile, setNewFile] = useState(undefined);
    const [newFileUrl, setNewFileUrl] = useState(undefined);

    return {
        newFile,
        newFileUrl,
        setNewFile,
        setNewFileUrl,
    };
};

const PostContent = ({ data, isAuthor, edit, setEdit }) => {
    const { newFile, newFileUrl, setNewFile, setNewFileUrl } = usePostContent();

    return (
        <div className="post__content-container">
            <PostContentImage
                data={data}
                newFile={newFile}
                newFileUrl={newFileUrl}
            />
            <div className="post__content-container__text">
                {isAuthor && edit ? (
                    <PostEditForm
                        data={data}
                        newFile={newFile}
                        setEdit={(boolean) => setEdit(boolean)}
                        setNewFile={(file) => setNewFile(file)}
                        setNewFileUrl={(url) => setNewFileUrl(url)}
                    />
                ) : (
                    <p>{data.text}</p>
                )}
            </div>
        </div>
    );
};

export default PostContent;
