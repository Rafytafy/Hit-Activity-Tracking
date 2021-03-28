import React, { useState } from "react";
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Alert,
} from "react-native";
import firebase from "firebase";
import styles,{color2Dark} from "../styles";

export function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var { width, height } = Dimensions.get("window");
  height = height - 55;
  const authLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        Alert.alert("Error", `${error}`, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputCard}>
        <Text style={{ fontSize: 36, marginBottom: 70 }}>Welcome to Pulse</Text>
        <TextInput
          style={styles.loginInputBox}
          placeholder="E-mail"
          placeholderTextColor="#999"
          onChangeText={(value) => setEmail(value)}
          name="email"
          keyboardType="text"
          type="text"
        />
        <TextInput
          style={styles.loginInputBox}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
          name="password"
          keyboardType="text"
          type="text"
        />

        <TouchableHighlight
          style={styles.loginButton}
          onPress={() => authLogin()}
          activeOpacity={0.2}
          underlayColor={color2Dark}
        >
          <Text style={{ fontSize: 25, color: "#fdfdfd" }}>Login</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default login;
