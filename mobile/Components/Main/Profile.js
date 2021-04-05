import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import {
  VictoryChart,
  VictoryLabel,
  VictoryAxis,
  VictoryLine,
  VictoryScatter,
} from "victory-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import firebase from "firebase";

import React, { useState, useEffect } from "react";
import {
  addWeight,
  clearState,
  uploadPhoto,
  getWeights,
  getPhoto,
} from "../../Actions/SubscriberActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles, { color2,color3,color2Dark } from "../../styles";
import Fitbit from './Fitbit'
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
  const [modalVisible, setModalVisible] = useState(false);
 const [curWeight,setCurWeight] = useState('...');
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [newIMG, setImg] = useState(null);

  const [newIMGURI, setNewIMGURI] = useState(null);
  useEffect(() => {
    async () => {
      if (Platform.OS !== "web") {
        const {
          pickStatus,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (pickStatus !== "granted") {
          alert("Sorry, we need camera  permissions to make this work!");
        }
      }
    };
    const { currentUser, profileData, weights, profileImg } = props;
    
    if (typeof profileData._id !== "undefined") {
      setWeights(weights);
     
      var wl=weights.length
      if(wl!== 0){
      setCurWeight(weights[wl-1].y)
      }
     
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
    if (profileImg !== "") {
    
      firebase
        .storage()
        .ref('/workout_gifs/boxjump.gif')
        .getDownloadURL()
        .then((url) => {
          setSubIMG(url)
          console.log(url);
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

  const uploadImg = async (uri, path) => {
    console.log("start");

    const response = await fetch(uri);

    const blob = await response.blob();
    const task = firebase.storage().ref().child(path).put(blob);
    setNewIMGURI(path);
  };

  const takePhoto = async () => {
    const { camStatus } = await ImagePicker.requestCameraPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImg(result.uri);
      const path = `subscriber_photos/${user}/${Math.random(100)}`;
      uploadImg(result.uri, path);

      const picPair = {
        user: user,
        path: path,
      };
      props.uploadPhoto(picPair);
     
      setTimeout(() => {
        props.getPhoto(user);
      }, 3000);
    }
  };

  const choosephoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImg(result.uri);
      const path = `subscriber_photos/${user}/${Math.random(100)}`;
      uploadImg(result.uri, path);

      const picPair = {
        user: user,
        path: path,
      };

      props.uploadPhoto(picPair);
   
      setTimeout(() => {
        props.getPhoto(user);
      }, 3000);
    }
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
          <TouchableHighlight
            style={{
              height: 200,
              width: 200,
              borderRadius: 100,
              marginBottom: 30,
            }}
            activeOpacity={0.2}
            underlayColor={color2Dark}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Image
              source={{ uri: subIMG }}
              style={{
                height: 200,
                width: 200,
                borderRadius: 100,
                marginBottom: 30,
              }}
            />
          </TouchableHighlight>
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
            <Text style={styles.stats}>{curWeight} lbs.</Text>
            <Text style={styles.stats}>{age} Years</Text>
            <Text style={styles.stats}>
              {height.feet}'{height.inches}"
            </Text>
          </View>
        </View>
        <Text>{"\n"}</Text>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                margin: 20,
                backgroundColor: "white",
                borderRadius: 20,
                padding: 35,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.9,
                shadowRadius: 4,
                elevation: 5,
                height: "30%",
                width: "90%",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical:25
              }}
            >
   <TouchableHighlight
                style={{
                  ...styles.loginButton,
                  height: 40,
                  width: 220,
                  marginHorizontal: 10,
                }}
                activeOpacity={0.2}
                underlayColor={color2Dark}
                onPress={() => {
                  choosephoto();
                }}
              >
                <Text style={{ fontSize: 20, color: color3 }}>
                  Choose photo
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  ...styles.loginButton,
                  height: 40,
                  width: 220,
                  marginHorizontal: 10,
                  marginVertical: 10,
                }}
                activeOpacity={0.2}
                underlayColor={color2Dark}
                onPress={() => {
                  takePhoto();
                }}
              >
                <Text style={{ fontSize: 20, color:color3 }}>
                  Take a Photo
                </Text>
              </TouchableHighlight>

            

              <TouchableHighlight
                style={{
                  ...styles.loginButton,
                  height: 40,
                  width: 220,
                  marginHorizontal: 10,
                }}
                activeOpacity={0.2}
                underlayColor={color2Dark}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={{ fontSize: 20, color:color3 }}>Exit </Text>
              </TouchableHighlight>
            
           
            </View>
          </View>
        </Modal>

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
              underlayColor={color2Dark}
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
              color={color3}
            >
              <Text style={{ fontSize: 20, color: color3}}>Add Weight</Text>
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
             
              // tickFormat={(x) => new Date(x).getMonth() }
              data={weightss}
              
            
            />
          <VictoryScatter
          data={weightss}
          size={5
          }
          style={{
            data:{
              fill:color2
            }
          }}
          />
          </VictoryChart>

      
        </View>
        <Text>{"\n"}</Text>
        <Fitbit />
        <Text>{"\n"}</Text>
        <TouchableHighlight
          style={styles.loginButton}
          activeOpacity={0.2}
          underlayColor={color2Dark}
          onPress={() => logOut()}
        >
          <Text style={{ fontSize: 20, color: color3 }}>Log Out</Text>
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
  profileImg: store.subscriber.profileImg,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    { addWeight, clearState, getWeights, uploadPhoto, getPhoto },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(Profile);
