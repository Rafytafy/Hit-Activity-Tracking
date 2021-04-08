import React, { useState } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";

import styles, {
  color2Dark,
  color3,
  color2,
  color1Dark,
  color1,
} from "../../styles";
const width = Dimensions.get("screen").width;

function SessionView(props) {
    const [sessions, setSessions] = useState([]);
    const [maxHR, setMaxHR] = useState(220);
    
    useEffect(() => {
    //   const { currentUser, profileData, sessions } = props;
    //   setSessions(sessions);
    //   var today = new Date();
    //   var cDay = today.getDate();
    //   var cMonth = today.getMonth();
    //   var cYear = today.getFullYear();
    //   var todayDate = new Date(cYear, cMonth, cDay);
    
    //   var birth = new Date(profileData.birthdate);
    //   var diff = Math.abs(todayDate - birth);
    //   const age = Math.floor(diff / 31536000000);
    //   setMaxHR(220 - age);
    });
    
    const calculateSuccess =( (sesh) => {
      var tarHR = Math.round(maxHR * (sesh.routine.targetHeartrate * 0.01));
      var secTot = 0;
      var secAbove = 0;
    
      const overUnder = ((tuple) => {
        if (tuple.value < tarHR) {
          secTot += 5;
        } else {
          secTot += 5;
          secAbove += 5;
        }
      });
      sesh.heartrate.forEach(element => {
        overUnder(element)
    });
    return [secAbove,secTot]
    });
    return(

        <View>
            {/* {sessions.forEach(sesh => {calculateSuccess(sesh)})} */}
        </View>
    )

}
const mapStateToProps = (store) => ({
  currentUser: store.subscriber.currentUser,
  profileData: store.subscriber.profileData,
//   sessions: store.subscriber.sessions,
});

export default connect(mapStateToProps, null)(SessionView);
