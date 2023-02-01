import React from "react";
import { FaPenNib } from "react-icons/fa";

const PostFormTextContainer = ({
    spanRef,
    penRef,
    inputRef,
    inputValue,
    setInputValue,
    handleBlur,
    handleInputSize,
}) => {
    return (
        <div className="text-container">
            <label htmlFor="userPost" ref={penRef}>
                <FaPenNib id="pen-icon" />
            </label>
            <textarea
                ref={inputRef}
                name="post"
                id="userPost"
                rows={10}
                cols={50}
                wrap="hard"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    handleInputSize(e);
                }}
                onBlur={(e) => handleBlur(e)}
            ></textarea>
            <span ref={spanRef} className="pseudo-label" id="pseudo-span">
                Exprimez-vous
            </span>
        </div>
    );
};

export default PostFormTextContainer;
