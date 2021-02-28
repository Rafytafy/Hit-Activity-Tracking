import React, { useState, useEffect } from 'react'; 
import firebase from 'firebase'; 

const ProfilePic = (props) => {
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
        
    
return (
    <div>
        
        <img src={img} alt="text"/>
    </div>
);
 
}

export default ProfilePic;