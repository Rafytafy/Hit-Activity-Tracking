
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Button,
  Modal,
  TouchableHighlight,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchTrainers,
  fetchTrainer,
  subscribe,
} from "../../Actions/SubscriberActions";
import styles from '../../styles'
const filler = {
  firstName: "who",
  lastName: "cares",
};
function Search(props) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResult] = useState([]);
  const [user, setUser] = useState(null);
  const [trainer, setTrainer] = useState([]);
  const [trainerid, settrainerid] = useState("who knows");
  const [modalVisible, setModalVisible] = useState(false);
  const [trainerName, setTrainerName] = useState(filler);
  const [trainerEmail, setTrainerEmail] = useState("filler");

  useEffect(() => {
    const { currentUser, searchResult, profileData, trainer } = props;
    setUser(profileData.uid);
    setSearchResult(searchResult);
    setTrainer(trainer);
    if (typeof trainer.name !== "undefined") {
      settrainerid(trainer._id);
      setTrainerName(trainer.name);
      setTrainerEmail(trainer.email);
    }
  });

  return (
    <View
      style={styles.container}
    >
      <View style={{...styles.singupCard,marginTop:200,height:80,justifyContent:'center',paddingBottom:20}}>
       
      <TextInput
        style={styles.textInput}
        placeholder="Search For Trainer"
        onChangeText={(search) => {
          if(search){props.fetchTrainers(search)};
        }}
      />
      </View>
<View>
      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <View
            style={styles.weightCard}
          >
             <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              
            }}
          >
            <Text style={{ fontSize: 20, color: "#333" }}>
              {item.name.firstName} {item.name.lastName}
            </Text>
            <TouchableHighlight
              style={{...styles.loginButton,height:30,width:100,marginHorizontal:10}}
              activeOpacity={0.2}
              underlayColor="#0F7E78"
              
              onPress={() => {
                const name = {
                  first: item.name.firstName,
                  last: item.name.lastName,
                };
                props.fetchTrainer(name);

                setModalVisible(!modalVisible);
              }}
            >
            <Text style={{ fontSize: 12, color: "#fdfdfd" }}>
              More Info
            </Text>
            </TouchableHighlight>
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
            <View style={{    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5}}>
              <Text>
                {trainerName.firstName} {trainerName.lastName}
                {"\n"}
                {trainerEmail}
                {"\n"}
                {"\n"}
              </Text>
              
              <TouchableHighlight
                style={{...styles.loginButton,height:40,width:130,marginHorizontal:10}}
                activeOpacity={0.2}
              underlayColor="#0F7E78"
                onPress={() => {
                  const subPair = {
                    user: user,
                    trainer: trainerid,
                  };
                  props.subscribe(subPair);
                }}
              >
                <Text style={{fontSize:20,color:'#fdfdfd'}}>Subscribe</Text>
              </TouchableHighlight>
             
              <Text>{"\n\n\n\n"}</Text>
              
              <TouchableHighlight
               style={{...styles.loginButton,height:40,width:130,marginHorizontal:10}}
               activeOpacity={0.2}
             underlayColor="#0F7E78"
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={{fontSize:20,color:'#fdfdfd'}}>Exit </Text>
              </TouchableHighlight>
       
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
  bindActionCreators({ fetchTrainers, fetchTrainer, subscribe }, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(Search);