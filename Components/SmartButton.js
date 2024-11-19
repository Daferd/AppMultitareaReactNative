import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Animated } from "react-native";
import { NavigationContext } from "@react-navigation/native";
import NavigationMenu from "./NavigationMenu";
import { Feather } from "@expo/vector-icons";
var mqtt = require("@taoqf/react-native-mqtt");
var options = {
  protocol: "mqtts",
  cliendID: "frontend_1",
  username: "eiaiotdario",
  password: "SKWpvAWoAsagTuzp",
}

export default function SmartButton({title, topic, setvalue, value}) {

    const navigation = useContext(NavigationContext);
    const [animation_R, setanimation] = useState(new Animated.Value(0));
    const [press, setpress] = useState(false);
    const handlePress = () => {
        setpress(!press);
        startAnimation(press ? 1 : 0);
        var client = mqtt.connect("mqtt://eiaiotdario.cloud.shiftr.io", options);
        client.on("connect", function () {
            client.publish("Esp1/led", press ? "on" : "off");
            client.end();
        });
    };
    
    const startAnimation = (value) => {
        Animated.timing(animation_R, {
          toValue: value === 1 ? 75 : 0,
          duration: 10,
          useNativeDriver: true,
        }).start();
    };

    const animatedStyle = {
        right: {
          transform: [{ translateX: animation_R }],
        },
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text_title}>{title}off</Text>
            <View style={styles.conteiner_button}>
            <Pressable style={styles.button_press} onPress={() => handlePress()}>
                <Animated.View
                    style={[styles.button, animatedStyle.right]}>
                </Animated.View>
                <Feather name="moon" size={40} color="black"/>
                <Feather name="sun" size={40} color="black"/>
            </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 400,
        height: 150,
        borderWidth: 2,
        backgroundColor: "white",
        borderColor: "black",
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      },
      text_title: {
        fontSize: 70,
        color: "black",
        width: "40%",
        textAlign: "center",
      },
      container_button: {
        width: "60%",
        height: "100%",
        borderLeftWidth: 4,
        borderColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      button_press: {
        height: 60,
        width: 150,
        borderRadius: 30,
        backgroundColor: "rgba(0, 0, 0,0.2)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      },
      button: {
        height: 60,
        width: 75,
        borderRadius: 30,
        backgroundColor: "black",
        position: "absolute",
        left: 0,
      },
});