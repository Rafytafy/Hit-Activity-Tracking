import React, { useState, useEffect } from 'react'; 
import firebase from 'firebase'; 

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
        
    
return (
    <div>
        
        <img src={img} alt="text" style={{ width: '15em' }}/>
    </div>
);
 
}

export default ProfileInfo;