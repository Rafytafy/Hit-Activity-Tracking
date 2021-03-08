import {
  View,
  Text,
  TouchableHighlight,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import {
  VictoryChart,
  VictoryLabel,
  VictoryAxis,
  VictoryLine,
  VictoryScatter
} from "victory-native";
import firebase from "firebase";
import React, { useState, useEffect } from "react";
import {
  addWeight,
  clearState,
  getWeights,
} from "../../Actions/SubscriberActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles, { color2 } from "../../styles";
const filler = {
  firstName: "who",
  lastName: "cares",
};
const filler2 = {
  feet: 1,
  inches: 1,
};
function Profile(props) {
  const [profData, setProfData] = useState([]);
  const [name, setName] = useState(filler);
  const [user, setUser] = useState(null);
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState(filler2);
  const [weightss, setWeights] = useState([]);
  const [weightToAdd, setWeightToAdd] = useState();
  const [subIMG, setSubIMG] = useState();
  const [xticks, setXticks] = useState([]);

  useEffect(() => {
    const { currentUser, profileData, weights } = props;
    if (typeof profileData._id !== "undefined") {
      setWeights(weights);
      // var last=new Date([weights.length-1].x).getTime()
      // var first = new Date(weights[0].x).getTime()
      // var diff= last-first
      // var wl=weights.length
      
      // console.log(diff)
      setProfData(profileData);
      setUser(profileData._id);

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
    }
    if (profileData.profilePicURL !== "") {
      firebase
        .storage()
        .ref(profileData.profilePicURL)
        .getDownloadURL()
        .then((url) => {
          setSubIMG(url);
        });
    } else {
      firebase
        .storage()
        .ref("empty.png")
        .getDownloadURL()
        .then((url) => {
          setSubIMG(url);
        });
    }
  });

  const logOut = () => {
    firebase.auth().signOut();
    setTimeout(() => {
      props.clearState();
    }, 500);
    
  };

 



  return (
    <ScrollView style={styles.scrollContainer}>
      <View
        style={{
          marginTop: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.profileCard}>
          <Image
            source={{ uri: subIMG }}
            style={{
              height: 200,
              width: 200,
              borderRadius: 100,
              marginBottom: 30,
            }}
          />
          <View>
            <Text style={{ fontSize: 32, color: "#333" }}>
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
        <Text>{"\n"}</Text>
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
              style={{ ...styles.numberInput, fontSize: 25 }}
              placeholder="175"
              onChangeText={(value) => setWeightToAdd(value)}
              name="weightInput"
              maxLength={3}
              keyboardType="numeric"
            />

            <TouchableHighlight
              style={{
                ...styles.loginButton,
                width: 150,
                marginLeft: 20,
                marginVertical: 8,
              }}
              activeOpacity={0.2}
              underlayColor="#0F7E78"
              onPress={() => {
                var now = new Date().getTime();
                const newWeight = {
                  id: user,
                  weight: weightToAdd,
                  date: now,
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

       
        <View style={{ ...styles.weightCard, height: 250, width: 380 }}>
          <VictoryChart height={220} width={350}>
            <VictoryLine
              style={{
                data: {
                  stroke: color2,
                },
                parent: {
                  border: "1px solid #ccc",
                },
              }}
              data={weightss}
              
            
            />
          <VictoryScatter
          data={weightss}
          size={7}
          style={{
            data:{
              fill:color2
            }
          }}
          />
          </VictoryChart>

      
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
  bindActionCreators({ addWeight, clearState, getWeights }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Profile);
