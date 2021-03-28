import React, { useState, useEffect } from 'react'; 
import firebase from 'firebase'; 
import DefaultPicture from '../../images/default-profile-picture.png'
const ProfileInfo = (props) => {
    const [img, setImg] = useState("");
    useEffect(() => {
        console.log("hello hello")
        if (props.profilePath !== "") {
            console.log(props.profilePath)
            firebase.storage().ref(props.profilePath).getDownloadURL().then((url) => {
                setImg(url);
            })
        }
    }, [props.profilePath]);
    if (!img) {setImg(DefaultPicture)}
         
    
return (
    <div>
        <img src={img} alt= "Your profile" className="profilePic" />
    </div>
);
 
}

export default ProfileInfo;