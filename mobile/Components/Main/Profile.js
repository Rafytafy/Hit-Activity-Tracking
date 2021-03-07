import {
  View,
  Text,
  FlatList,
  TouchableHighlight,
  Button,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import firebase from "firebase";
import React, { useState, useEffect } from "react";
import {
  addWeight,
  clearSearch,
  getWeights,
} from "../../Actions/SubscriberActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from '../../styles'
function Profile(props) {
  const [profData, setProfData] = useState([]);
  const [name, setName] = useState([]);
  const [user, setUser] = useState(null);
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState([]);
  const [weightss, setWeights] = useState([]);
  const [weightToAdd, setWeightToAdd] = useState();

  useEffect(() => {
    const { currentUser, profileData, weights } = props;

    setProfData(profileData);
    setUser(profileData._id);
    setWeights(weights);
    setName(profileData.name);
    setHeight(profileData.height);
    var today = new Date();
    var cDay = today.getDate();
    var cMonth = today.getMonth();
    var cYear = today.getFullYear();
    var todayDate = new Date(cYear, cMonth, cDay);

    var birth = new Date(profileData.birthdate);
    var diff = Math.abs(todayDate - birth);
    const age = Math.floor(diff / 31536000000);
    setAge(age);
  });

  const logOut = () => {
    firebase.auth().signOut();
    props.clearSearch();
  };

  const formatDate = (date) => {
    var date = new Date(date);
    var day = date.getDate();
    var mon = date.getMonth() + 1;
    var year = date.getFullYear();
    return `${mon}/${day}/${year}`;
  };

 
  return (
    <ScrollView style={styles.scrollContainer}>
      
      <View style={{marginTop:300, alignItems: "center", justifyContent: "center" }}>
  

        <View style={styles.profileCard}>
          <View>
            
          
          <Text style={{ fontSize:32, color:"#333"}}>
            {name.firstName} {name.lastName}
          </Text>
        </View>

        <Text>{"\n"}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 15,
          }}
        >
          <Text style={styles.stats}>{profData.initWeight} lbs.</Text>
          <Text style={styles.stats}>{age} Years</Text>
          <Text style={styles.stats}>
            {height.feet}'{height.inches}"
          </Text>
        </View>
        </View>
        <Text >{'\n'}</Text>
        <View style={styles.profileCard}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            margin: 40,
            justifyContent: "center",
          }}
        >
          <TextInput
            style={{...styles.numberInput,fontSize:25}}
            placeholder="175"
            onChangeText={(value) => setWeightToAdd(value)}
            name="weightInput"
            maxLength={3}
            keyboardType="numeric"
          />
   
            <TouchableHighlight
              style={{...styles.loginButton,width:150,marginLeft:20,marginVertical:8}}
              activeOpacity={0.2}
              underlayColor="#0F7E78"
              onPress={() => {
                var today = new Date();
                var cDay = today.getDate();
                var cMonth = today.getMonth();
                var cYear = today.getFullYear();
                var todayDate = new Date(cYear, cMonth, cDay);
                const newWeight = {
                  id: user,
                  weight: weightToAdd,
                  date: todayDate,
                };

                props.addWeight(newWeight);
                Alert.alert("Added Weight", " success", [
                  { text: "OK", onPress: () => console.log("OK Pressed") },
                ]);
                setTimeout(() => {
                  props.getWeights(profData._id);
                }, 2000);
              }}
              title="Add Weight"
              color="#fdfdfd"
            >
              <Text style={{ fontSize: 20, color: "#fdfdfd" }}>Add Weight</Text>
              </TouchableHighlight>
         
        </View>
        </View>
        <Text>{"\n"}</Text>

        <TouchableHighlight
          style={styles.loginButton}
          activeOpacity={0.2}
          underlayColor="#0F7E78"
           onPress={() => logOut()}
          >
  <Text style={{ fontSize: 20, color: "#fdfdfd" }}>Log Out</Text>
          </TouchableHighlight>
          <Text>{"\n"}</Text>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <FlatList
            data={weightss}
            renderItem={({ item }) => (
              <View
                style={styles.weightCard}
              >
                <Text style={{ fontSize: 22, color: "#333" }}>
                  {item.weight} lbs. on {formatDate(item.date)}
                </Text>
              </View>
            )}
          />
        </View>
  
         
    
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (store) => ({
  currentUser: store.subscriber.currentUser,
  profileData: store.subscriber.profileData,
  weights: store.subscriber.weights,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ addWeight, clearSearch, getWeights }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Profile);
