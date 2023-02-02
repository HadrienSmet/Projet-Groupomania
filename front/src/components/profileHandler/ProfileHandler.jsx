import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setProfileData } from "../../features/profile.slice";
import { toggleCompletion } from "../../features/isComplete.slice";

// import { axiosGetPosts } from "../../utils/functions/posts/axiosGetPosts";
import { getJwtToken } from "../../utils/functions/tools";

import Dialog from "@mui/material/Dialog";
import ProfileHandlerButton from "./ProfileHandlerButton";
import ProfileHandlerCompleted from "./ProfileHandlerCompleted";
import ProfileHandlerForm from "./ProfileHandlerForm";
import { axiosPatchProfile } from "../../utils/functions/user/axiosPatchProfile";

const useFormDialog = () => {
    const [open, setOpen] = useState(false);
    const [wasAlreadyFill, setWasAlreadyFill] = useState(true);

    return {
        open,
        setOpen,
        wasAlreadyFill,
        setWasAlreadyFill,
    };
};

const useFormDialogData = ({ setOpen, setWasAlreadyFill }) => {
    const [pseudo, setPseudo] = useState("");
    const [profileFile, setProfileFile] = useState("");
    const [profileFileUrl, setProfileFileUrl] = useState("");
    let { userId, token } = getJwtToken();
    const dispatch = useDispatch();

    //Sets the value provided by the user in the localState
    //@Params {type: Object} --> The params of the onChange event
    const handleProfileFile = (e) => {
        setProfileFileUrl(URL.createObjectURL(e.target.files[0]));
        setProfileFile(e.target.files[0]);
    };
    const handleProfileData = () => {
        let date = new Date();
        date = Date.now();
        const user = new FormData();
        user.append("_id", userId);
        user.append("pseudo", pseudo);
        user.append("date", date);
        user.append("file", profileFile);
        user.append("isProfileComplete", true);

        return user;
    };

    //Handles the closing of the modal
    //If the fields are filled
    //-->Posts the data to the database to complete the user profile
    const handleClose = () => {
        setOpen(false);
        if (pseudo !== "" && profileFile !== "") {
            const user = handleProfileData();
            axiosPatchProfile(userId, user, token).then((res) => {
                dispatch(setProfileData(JSON.stringify(res.data.updateData)));
                dispatch(toggleCompletion(true));
                setWasAlreadyFill(false);
            });
        }
    };

    return {
        pseudo,
        profileFileUrl,
        setPseudo,
        handleProfileFile,
        handleClose,
    };
};

const FormDialog = () => {
    const { open, wasAlreadyFill, setOpen, setWasAlreadyFill } =
        useFormDialog();
    const {
        pseudo,
        profileFileUrl,
        setPseudo,
        handleProfileFile,
        handleClose,
    } = useFormDialogData({ setOpen, setWasAlreadyFill });
    const isComplete = useSelector(
        (state) => state.profileCompletion.isComplete
    );

    return (
        <div className="modal">
            <ProfileHandlerButton
                handleClickOpen={() => setOpen(true)}
                isComplete={isComplete}
                wasAlreadyFill={wasAlreadyFill}
                profileFileUrl={profileFileUrl}
                pseudo={pseudo}
            />
            <Dialog open={open} onClose={handleClose}>
                {isComplete ? (
                    <ProfileHandlerCompleted />
                ) : (
                    <ProfileHandlerForm
                        setPseudo={setPseudo}
                        profileFileUrl={profileFileUrl}
                        handleProfileFile={handleProfileFile}
                        handleClose={handleClose}
                    />
                )}
            </Dialog>
        </div>
    );
};

export default FormDialog;
