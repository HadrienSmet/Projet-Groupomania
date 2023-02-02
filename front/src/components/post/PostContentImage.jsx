import React from "react";

const PostContentImage = ({ data, newFile, newFileUrl }) => {
    return (
        <>
            {newFile !== "" ? (
                <div className="post__content-container__image-division">
                    {data.imageUrl !== "" && newFileUrl === undefined && (
                        <img
                            src={
                                "http://localhost:3000/images/" +
                                data.imageUrl.split("images/")[1]
                            }
                            alt="img"
                        />
                    )}
                    {data.imageUrl !== "" && newFileUrl !== undefined && (
                        <img src={newFileUrl} alt="img" />
                    )}
                </div>
            ) : null}
        </>
    );
};

export default PostContentImage;
