import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getJwtToken } from "../utils/functions/tools";
import axios from 'axios';
import { setProfileData } from '../features/profile.slice';
import { useDispatch, useSelector } from "react-redux";
import { toggleCompletion } from '../features/isComplete.slice';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [pseudo, setPseudo] = React.useState("");
  const [profileFile, setProfileFile] = React.useState("");
  const [profileFileUrl, setProfileFileUrl] = React.useState("");
  const [wasAlreadyFill, setWasAlreadyFill] = React.useState(true);
  
  const dispatch = useDispatch();
  
  const isComplete = useSelector((state) => state.profileCompletion.isComplete);
  const profileData = useSelector((state) => state.profileStore.profile);
  
  //Handles the opening of the modal
  const handleClickOpen = () => {
    setOpen(true);
    console.log(profileData);
  };

  //Handles the closing of the modal
  //If the fields are filled 
  //-->Posts the data to the database to complete the user profile
  const handleClose = () => {
    setOpen(false);
    if (pseudo !== "" && profileFile !== "") {
      let { userId, token } = getJwtToken();
      let date = new Date();
      date = Date.now();

      const user = new FormData();       
        user.append("_id", userId);
        user.append("pseudo", pseudo);
        user.append("date", date);
        user.append("file", profileFile);
        user.append("isProfileComplete", true);

      axios({
        url: `http://localhost:3000/api/auth/profile/${userId}`,
        method: "patch",
        data: user,
        headers: {
          "Content-Type": "application/json",
          "authorization": `bearer ${token}`
      }
      })
        .then(res => {
          dispatch(setProfileData(JSON.stringify(res.data.updateData)));
          dispatch(toggleCompletion(true));
          setWasAlreadyFill(false);
        })
    }
  };

  //Sets the value provided by the user in the localState
  //@Params {type: Object} --> The params of the onChange event
  const handlePseudo = (e) => {
    setPseudo(e.target.value);
  };

  //Sets the value provided by the user in the localState
  //@Params {type: Object} --> The params of the onChange event
  const handleProfileFile = (e) => {
    console.log(e);
    setProfileFileUrl(URL.createObjectURL(e.target.files[0]));
    setProfileFile(e.target.files[0]);
  };

  return (
    <div className='modal'>
      <Button variant="outlined" onClick={handleClickOpen} className="modal__button">
        { isComplete 
        ?
          <div className="modal__profile-button">
            <div className="modal__profile-button__img-container">
              {wasAlreadyFill === true 
                ? 
                  <img src={profileData.profilePicture} alt="img"/>
                :
                  <img src={profileFileUrl} alt='img'/> 
              }
            </div>  
            <div className="modal__profile-button__pseudo-container">
              {wasAlreadyFill === true
                ?
                  <p>{profileData.pseudo}</p>
                :
                  <p>{pseudo}</p>
              }
            </div>
          </div> 
        :  
          <p>Editer profil</p> }
          
        
      </Button>
      <Dialog open={open} onClose={handleClose}>
      { isComplete
      ? 
        <div className="modal__profile-container">
          <h3>{profileData.pseudo}</h3>
          <p>{profileData.email}</p>
          <img src={profileData.profilePicture} alt="img" />
        </div>
      : 
        <div className="modal__dialog-container">
          <DialogTitle>Compléter mon profil</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Choisissez votre pseudo
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="pseudo"
              label="pseudo"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => handlePseudo(e)}
            />
          </DialogContent>
          <DialogContent>
            <DialogContentText>
              Définir une photo de profil
            </DialogContentText>
            <div className="label-animation-container">

              { profileFileUrl === "" 
                ? 
                  <label 
                    htmlFor="userFile" 
                    id="label-file" 
                  >Ajouter une image</label> 
                : 
                null }

                <input 
                  type="file" 
                  name="file" 
                  id="userFile" 
                  accept="image/*"
                  onChange={(e) => handleProfileFile(e)}
                />
              </div>
              { profileFileUrl !== ""
              ?
                <img src={profileFileUrl} alt="img" />
              :
                null }
            </DialogContent>
            <DialogActions>
              <Button id='profile-completion-btn' onClick={handleClose}>Confirmer</Button>
            </DialogActions>
          </div>
        }
      </Dialog>    
    </div>
  );
}
