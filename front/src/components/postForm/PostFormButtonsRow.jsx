import React from "react";
import { FaFileImage } from "react-icons/fa";
import Button from "@mui/material/Button";
import { postFormClickAnimation } from "../../utils/functions/animations";

const PostFormButtonsRow = ({ fileUrl, handleFile }) => {
    return (
        <div className="last-row">
            <div className="label-animation-container">
                {fileUrl === "" ? (
                    <div className="file-container">
                        <label
                            htmlFor="userFile"
                            id="label-file"
                            onClick={(e) =>
                                postFormClickAnimation(e, "#label-file")
                            }
                        >
                            Ajouter une image
                        </label>
                        <label htmlFor="userFile" id="label-file-btn">
                            <FaFileImage />
                        </label>
                    </div>
                ) : null}
                <input
                    type="file"
                    name="file"
                    id="userFile"
                    accept="image/*"
                    onChange={(e) => handleFile(e)}
                />
            </div>
            {fileUrl !== "" ? (
                <img src={fileUrl} alt="img" id="front-picture" />
            ) : null}
            <Button
                variant="outlined"
                type="submit"
                className="post-form__submit-btn"
            >
                Poster
            </Button>
        </div>
    );
};

export default PostFormButtonsRow;
