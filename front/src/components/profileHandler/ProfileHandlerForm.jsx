import {
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";

const ProfileHandlerForm = ({
    setPseudo,
    profileFileUrl,
    handleProfileFile,
    handleClose,
}) => {
    return (
        <div className="modal__dialog-container">
            <DialogTitle>Compléter mon profil</DialogTitle>
            <DialogContent>
                <DialogContentText>Choisissez votre pseudo</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="pseudo"
                    label="pseudo"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setPseudo(e.target.value)}
                />
            </DialogContent>
            <DialogContent>
                <DialogContentText>
                    Définir une photo de profil
                </DialogContentText>
                <div className="label-animation-container">
                    {profileFileUrl === "" ? (
                        <label htmlFor="userFile" id="label-file">
                            Ajouter une image
                        </label>
                    ) : null}

                    <input
                        type="file"
                        name="file"
                        id="userFile"
                        accept="image/*"
                        onChange={(e) => handleProfileFile(e)}
                    />
                </div>
                {profileFileUrl !== "" ? (
                    <img src={profileFileUrl} alt="img" />
                ) : null}
            </DialogContent>
            <DialogActions>
                <Button id="profile-completion-btn" onClick={handleClose}>
                    Confirmer
                </Button>
            </DialogActions>
        </div>
    );
};

export default ProfileHandlerForm;
