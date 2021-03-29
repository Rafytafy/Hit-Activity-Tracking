import React, { useState, useEffect } from "react";
import firebase from "firebase";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Modal,
  TouchableHighlight,
  Alert,
  SafeAreaView,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchTrainers,
  fetchTrainer,
  subscribe,
  fetchAllTrainers,
} from "../../Actions/SubscriberActions";

import styles, { color2Dark } from "../../styles";
const filler = {
  firstName: "who",
  lastName: "cares",
};

function Search(props) {
  const [query, setQuery] = useState("");

  const [searchResults, setSearchResult] = useState([]);
  const [user, setUser] = useState(null);
  const [trainer, setTrainer] = useState([]);
  const [trainerid, settrainerid] = useState("who knows");
  const [modalVisible, setModalVisible] = useState(false);
  const [trainerName, setTrainerName] = useState(filler);
  const [trainerEmail, setTrainerEmail] = useState("filler");
  const [trainerBio, setTrainerBio] = useState("");
  const [trainerLoc, setTrainerLoc] = useState("");
  const [trainerSoc, setTrainerSoc] = useState("");
  const [trainerIMG, setTrainerIMG] = useState("filler");

  useEffect(() => {
    const { currentUser, searchResult, profileData, trainer } = props;
    setUser(profileData.uid);
    setSearchResult(searchResult);
    setTrainer(trainer);

    if (query == "" && searchResult.length == 0) {
      console.log("empty");
      props.fetchAllTrainers();
    }
    if (typeof trainer.name !== "undefined") {
      settrainerid(trainer._id);
      setTrainerName(trainer.name);
      setTrainerEmail(trainer.email);
      trainer.bio !== ""
        ? trainer.bio.length > 90
          ? setTrainerBio(trainer.bio.substring(0, 90) + "...")
          : setTrainerBio(trainer.bio)
        : setTrainerBio("");

      trainer.location !== ""
        ? setTrainerLoc(trainer.location)
        : setTrainerLoc("");

      trainer.socials !== ""
        ? setTrainerSoc(trainer.socials)
        : setTrainerSoc("");
      if (trainer.profilePicURL !== "") {
        firebase
          .storage()
          .ref(trainer.profilePicURL)
          .getDownloadURL()
          .then((url) => {
            setTrainerIMG(url);
          });
      } else {
        firebase
          .storage()
          .ref("empty.png")
          .getDownloadURL()
          .then((url) => {
            setTrainerIMG(url);
          });
      }
    }
  });

  return (
 
    <View style={styles.container}>
      <View
        style={{
          ...styles.singupCard,
          marginTop: 200,
          height: 80,
          justifyContent: "center",
          paddingBottom: 20,
        }}
      >
        <TextInput
          style={styles.textInput}
          placeholder="Search For Trainer"
          onChangeText={(search) => {
            setQuery(search);
            if (search) {
              console.log("if");
              props.fetchTrainers(search);
            }
          }}
        />
      </View>
      <View>
      
        <FlatList
          data={searchResults}
          scrollEnabled={true}
          renderItem={({ item }) => (
            <View style={styles.weightCard}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View style={{ flex: 1, marginLeft: 15 }}>
                  <Text style={{ fontSize: 20, color: "#333" }}>
                    {item.name.firstName} {item.name.lastName}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <TouchableHighlight
                    style={{
                      ...styles.moreInfoButton,
                    }}
                    activeOpacity={0.2}
                    underlayColor={color2Dark}
                    onPress={() => {
                      const name = {
                        first: item.name.firstName,
                        last: item.name.lastName,
                      };
                      props.fetchTrainer(name);

                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={{ fontSize: 16, color: "#fdfdfd" }}>
                      More Info
                    </Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          )}
        />
      </View>
      <View>
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
                shadowOpacity: 0.6,
                shadowRadius: 4,
                elevation: 5,
                height: "70%",
                width: "85%",
                alignItems: "center",
              }}
            >
            
                <View
                  style={{
                    flex:1,
               
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={{ textAlign: "center", fontSize: 24 }}>
                      {trainerName.firstName} {trainerName.lastName}
                    </Text>
                  </View>

                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={{ fontSize: 24 }}>{trainerLoc}</Text>
                  </View>
                </View>
         
              <View stlye={{flex:2}}>
                <Image
                  source={{ uri: trainerIMG }}
                  style={{
                    height: 150,
                    width: 150,
                    borderRadius: 100,
                    marginBottom: 10,
                  }}
                />
              </View>
              <View style = {{flex:3}}>

              
              <Text
                style={{ textAlign: "center", fontSize: 20, marginTop: 10 }}
              >
                {trainerBio}
              </Text>
              <View style={{ alignItems: "center", marginTop: 10 }}>
                <Text style={{ textAlign: "center", fontSize: 20 }}>
                  Find me at
                </Text>
                <Text style={{ textAlign: "center", fontSize: 20 }}>
                  {trainerEmail}
                </Text>
                <Text style={{ textAlign: "center", fontSize: 20 }}>
                  {trainerSoc}
                </Text>
              </View>
              </View>
              <View style={{ felx: 2 }}>
                <TouchableHighlight
                  style={{
                    ...styles.loginButton,
                    height: 40,
                    width: 200,
                    marginHorizontal: 10,
                  }}
                  activeOpacity={0.2}
                  underlayColor={color2Dark}
                  onPress={() => {
                    const subPair = {
                      user: user,
                      trainer: trainerid,
                    };
                    props.subscribe(subPair);
                    Alert.alert(
                      "Subscribed To ",
                      `${trainerName.firstName} ${trainerName.lastName}`,
                      [{ text: "OK", onPress: () => console.log("OK Pressed") }]
                    );
                  }}
                >
                  <Text style={{ fontSize: 20, color: "#fdfdfd" }}>
                    Subscribe
                  </Text>
                </TouchableHighlight>

                <Text>{""}</Text>

                <TouchableHighlight
                  style={{
                    ...styles.loginButton,
                    height: 40,
                    width: 200,
                    marginHorizontal: 10,
                  }}
                  activeOpacity={0.2}
                  underlayColor={color2Dark}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={{ fontSize: 20, color: "#fdfdfd" }}>Exit </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>

  );
}
const mapStateToProps = (store) => ({
  currentUser: store.subscriber.currentUser,
  searchResult: store.subscriber.searchResult,
  profileData: store.subscriber.profileData,
  trainer: store.subscriber.trainer,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    { fetchTrainers, fetchTrainer, subscribe, fetchAllTrainers },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchProps)(Search);
