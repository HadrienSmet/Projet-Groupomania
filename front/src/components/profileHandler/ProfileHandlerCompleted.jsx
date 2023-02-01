import { useSelector } from "react-redux";

const ProfileHandlerCompleted = () => {
    const profileData = useSelector((state) => state.profileStore.profile);
    return (
        <div className="modal__profile-container">
            <h3>{profileData.pseudo}</h3>
            <p>{profileData.email}</p>
            <img src={profileData.profilePicture} alt="img" />
        </div>
    );
};

export default ProfileHandlerCompleted;
