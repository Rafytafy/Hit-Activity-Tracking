import React, { Component } from "react";
import { Button, Text, View, Image, TouchableHighlight } from "react-native";
import styles,{color2Dark} from "../styles";
export default function Landing({ navigation }) {
  return (
    <View style={styles.landContainer}>
        
      <View style={{ flex: 1 }}></View>
      <View style={{ flex: 4, justifyContent: "center", alignItems: "center" }}>
        <Image
          style={{
            height: 200,
            width: 200,
          }}
          source={require("../assets/logoRT.png")}
        />
      </View>
      <View style={{ flex: 2 }}></View>

      <TouchableHighlight
        style={styles.largeButton}
        onPress={() => navigation.navigate("Login")}
        activeOpacity={0.2}
        underlayColor= {color2Dark}
      >
        <Text style={{ fontSize: 25, color: "#fdfdfd" }}>Login</Text>
      </TouchableHighlight>

      <View style={{ flex: 1 }}></View>

      <TouchableHighlight
        style={styles.largeButton}
        onPress={() => navigation.navigate("SignUp")}
        activeOpacity={0.2}
        underlayColor= {color2Dark}
      >
        <Text style={{ fontSize: 25, color: "#fdfdfd" }}>Sign Up</Text>
      </TouchableHighlight>

      <View style={{ flex: 3 }}></View>
    </View>
  );
}
