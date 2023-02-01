import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getJwtToken } from "../../utils/functions/tools";
import { setProfileData } from "../../features/profile.slice";
import { useDispatch, useSelector } from "react-redux";
import { toggleCompletion } from "../../features/isComplete.slice";
import { axiosGetPosts } from "../../utils/functions/posts/axiosGetPosts";
import ProfileHandlerButton from "./ProfileHandlerButton";
import { useState } from "react";
import ProfileHandlerCompleted from "./ProfileHandlerCompleted";
import ProfileHandlerForm from "./ProfileHandlerForm";

const useFormDialog = ({ pseudo, profileFile, setOpen, setWasAlreadyFill }) => {
    let { userId, token } = getJwtToken();
    const dispatch = useDispatch();

    const handleProfileData = () => {
        let date = new Date();
        date = Date.now();
        const user = new FormData();
        user.append("_id", userId);
        user.append("pseudo", pseudo);
        user.append("date", date);
        user.append("file", profileFile);
        user.append("isProfileComplete", true);
    };

    //Handles the closing of the modal
    //If the fields are filled
    //-->Posts the data to the database to complete the user profile
    const handleClose = () => {
        setOpen(false);
        if (pseudo !== "" && profileFile !== "") {
            const user = handleProfileData();
            axiosGetPosts(userId, user, token).then((res) => {
                dispatch(setProfileData(JSON.stringify(res.data.updateData)));
                dispatch(toggleCompletion(true));
                setWasAlreadyFill(false);
            });
        }
    };

    return {
        handleClose,
    };
};

const FormDialog = () => {
    const [open, setOpen] = useState(false);
    const [pseudo, setPseudo] = useState("");
    const [profileFile, setProfileFile] = useState("");
    const [profileFileUrl, setProfileFileUrl] = useState("");
    const [wasAlreadyFill, setWasAlreadyFill] = useState(true);
    const { handleClose } = useFormDialog({
        pseudo,
        profileFile,
        setOpen,
        setWasAlreadyFill,
    });
    const isComplete = useSelector(
        (state) => state.profileCompletion.isComplete
    );

    //Handles the opening of the modal
    const handleClickOpen = () => {
        setOpen(true);
    };

    //Sets the value provided by the user in the localState
    //@Params {type: Object} --> The params of the onChange event
    const handleProfileFile = (e) => {
        setProfileFileUrl(URL.createObjectURL(e.target.files[0]));
        setProfileFile(e.target.files[0]);
    };

    return (
        <div className="modal">
            <ProfileHandlerButton
                handleClickOpen={handleClickOpen}
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
