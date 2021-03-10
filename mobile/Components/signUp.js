import React, { useState } from "react";
import {
  Picker,
  Text,
  View,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  Alert,
} from "react-native";
import firebase from "firebase";
import axios from "axios";
import styles from "../styles";

export function signUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [weight, setWeight] = useState(0);
  const [heightFeet, setHeightFeet] = useState(0);
  const [heightInches, setHeightInches] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);
  const [year, setYear] = useState(0);
  var { width, height } = Dimensions.get("window");
  height = height - 55;
  const register = () => {
    if (password == passwordCheck) {
      if (
        month > 0 &&
        month << 12 &&
        day > 0 &&
        day < 32 &&
        year > 1920 &&
        year < 2021
      ) {
        if (heightFeet > 3 && heightFeet < 9 && heightInches < 12) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              firebase
                .auth()
                .currentUser.getIdToken(true)
                .then((res) => {
                  var tokenId = res;
                  var birthdate = new Date(year, month, day);

                  axios
                    .post("http://10.0.0.9:5000/register/subscriber", {
                      tokenId,
                      firstName,
                      lastName,
                      birthdate,
                      weight,
                      heightFeet,
                      heightInches,
                      email,
                    })
                    .then((res) => {})
                    .catch((err) => {});
                });
            });
        } else {
          Alert.alert("Invalid Height", " Please Check Height", [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        }
      } else {
        Alert.alert("Invalid Date", " Please Check BirthDate", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    } else {
      Alert.alert(
        "Passwords Don't Match",
        "Please Check Passwords or not at Least 6 Characters Long",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
    }
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View>
          <Text>{"\n"}</Text>
          <Text>{"\n"}</Text>
        </View>

        <View style={{ ...styles.singupCard }}>
          <Text style={{ ...styles.signupTitle, marginRight: "80%" }}>
            Name
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="First Name"
            onChangeText={(value) => setFirstName(value)}
            name="firstName"
            type="text"
            placeholderTextColor="#999"
            keyboardType="text"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Last Name"
            onChangeText={(value) => setLastName(value)}
            name="lastName"
            placeholderTextColor="#999"
            keyboardType="text"
            type="text"
          />
        </View>
        <Text>{"\n"}</Text>
        <View style={{ ...styles.singupCard }}>
          <Text style={{ ...styles.signupTitle, marginRight: "70%" }}>
            Birthday
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 15,
            }}
          >
            <TextInput
              style={styles.numberInput}
              placeholder="Month "
              onChangeText={(value) => setMonth(value - 1)}
              name="month"
              maxLength={2}
              placeholderTextColor="#999"
              type="number"
              keyboardType="number-pad"
            />
            <TextInput
              style={styles.numberInput}
              placeholder="Day "
              onChangeText={(value) => setDay(value)}
              maxLength={2}
              placeholderTextColor="#999"
              name="day"
              type="number"
              keyboardType="number-pad"
            />

            <TextInput
              style={styles.numberInput}
              placeholder="Year"
              placeholderTextColor="#999"
              onChangeText={(value) => setYear(value)}
              maxLength={4}
              name="year"
              type="number"
              keyboardType="number-pad"
            />
          </View>
        </View>
        <Text>{"\n"}</Text>
        <View style={{ ...styles.singupCard }}>
          <Text style={{ ...styles.signupTitle, marginRight: "45%" }}>
            Height and Weight
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 15,
            }}
          >
            <TextInput
              style={styles.numberInput}
              placeholder="Feet"
              type="number"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              onChangeText={(value) => setHeightFeet(value)}
              name="heightFeet"
              maxLength={1}
            />
            <TextInput
              style={styles.numberInput}
              placeholder="Inches"
              type="number"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              onChangeText={(value) => setHeightInches(value)}
              name="heightInches"
              maxLength={2}
            />
            <TextInput
              style={{ ...styles.numberInput, marginLeft: 30 }}
              placeholder="Weight"
              placeholderTextColor="#999"
              onChangeText={(value) => setWeight(value)}
              name="weight"
              maxLength={3}
              type="number"
              keyboardType="number-pad"
            />
          </View>
        </View>
        <Text>{"\n"}</Text>
        <View style={{ ...styles.singupCard }}>
          <Text style={{ ...styles.signupTitle, marginRight: "70%" }}>
            Login Info
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="text"
            onChangeText={(value) => setEmail(value)}
            name="email"
            type="text"
          />

          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
            name="password"
            keyboardType="text"
            type="text"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password Again"
            placeholderTextColor="#999"
            secureTextEntry={true}
            onChangeText={(value) => setPasswordCheck(value)}
            name="passwordCheck"
            keyboardType="text"
            type="text"
          />
          <Text>{"\n"}</Text>
          <TouchableHighlight
            style={styles.loginButton}
            onPress={() => register()}
            activeOpacity={0.2}
            underlayColor="#0F7E78"
          >
            <Text style={{ fontSize: 25, color: "#fdfdfd" }}>Sign Up</Text>
          </TouchableHighlight>
        </View>
        <Text>{"\n"}</Text>
        <Text>{"\n"}</Text>
        <Text>{"\n"}</Text>
        <Text>{"\n"}</Text>
        <Text>{"\n"}</Text>
        <Text>{"\n"}</Text>
        <Text>{"\n"}</Text>
        <Text>{"\n"}</Text>
        <Text>{"\n"}</Text>
      </View>
    </ScrollView>
  );
}

export default signUp;
