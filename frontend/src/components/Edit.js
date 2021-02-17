import React, { useState } from 'react'; 
import { useHistory } from 'react-router-dom';
import firebase from 'firebase'
import { Progress, Input } from 'reactstrap';
let uploader = document.getElementById('uploader');
let fileButton = document.getElementById('fileButton'); 

const Edit = (props) => { 
    const onChange = () => { 
         if (fileButton)
    {
        fileButton.addEventListener('change', function(e) {
        let file = e.target.files[0]; 
        let storageRef = firebase.storage().ref('trainer_photos' + file.name);
        let task = storageRef.put(file);
        task.on('state_changed',
        
            function progress(snapshot) {
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                uploader.value = percentage;
            },
            function error(err) {
            
            },
            
            function complete() {

            }
        );
    });
    }
    
}
     return ( 

        <div className = "progressBar"> 
            <Input type = "file" onChange = {onChange} />
        </div>
    );
}

export default Edit;

