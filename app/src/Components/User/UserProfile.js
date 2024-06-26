import { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
import "./User.css";
import photo from "../../Images/picture.png";
import CreateModal from "../CreatePhoto/CreateModal.js";

// function UserProfile({ first_name, last_name, bio }) {
function UserProfile({ userData }) {
  const onClickHandler = () => {}
  // const navigate = useNavigate();

  const [modal, setModal] = useState(false);

  const { email, firstName, lastName, bio, pfp } = userData
  const fullname = firstName + " " + lastName;
  
  const toggleModal = () => {
    const user = (JSON.parse(sessionStorage.getItem('user')));
    if (!user || !user.token) {
      window.alert("Log in to upload photo.")
      return;
    }

    if (user.email !== email) {
      window.alert("Access Denied");
      return;
    }

    setModal(!modal);
    
  };

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden';
    
    } else {
      document.body.style.overflow = 'scroll';
    }

  }, [modal]);

  return (
      <div className="profile">
        <div className="image-container">
          <img src={pfp ?? photo} alt="" onClick={onClickHandler} />
        </div>

        <strong> {fullname} </strong>
        <p>
          {bio}
        </p>

        <div className="btn-container">
          <button className="user-button" onClick={toggleModal}>
            Add Photo
          </button>
          {/* <button className="user-button" onClick={() => navigate(`/${email}/edit`)}>
            Edit Profile
          </button> */}
        </div>

        {modal && (
        <CreateModal
          onClick={toggleModal} data={userData}
        />
      )}
    </div>
  );
}

export default UserProfile;
