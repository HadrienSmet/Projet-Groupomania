import { Button } from "@mui/material";
import { useSelector } from "react-redux";

const ProfileHandlerButton = ({
    handleClickOpen,
    isComplete,
    wasAlreadyFill,
    profileFileUrl,
    pseudo,
}) => {
    const profileData = useSelector((state) => state.profileStore.profile);

    return (
        <Button
            variant="outlined"
            onClick={handleClickOpen}
            className="modal__button"
        >
            {isComplete ? (
                <div className="modal__profile-button">
                    <div className="modal__profile-button__img-container">
                        {wasAlreadyFill === true ? (
                            <img src={profileData.profilePicture} alt="img" />
                        ) : (
                            <img src={profileFileUrl} alt="img" />
                        )}
                    </div>
                    <div className="modal__profile-button__pseudo-container">
                        {wasAlreadyFill === true ? (
                            <p>{profileData.pseudo}</p>
                        ) : (
                            <p>{pseudo}</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>Editer profil</p>
            )}
        </Button>
    );
};

export default ProfileHandlerButton;
