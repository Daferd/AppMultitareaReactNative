import React, {useContext, useEffect, useState} from "react"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressabl, Dimensions, Image, Switch, TouchableOpacity } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import NavigationMenu from "../Components/NavigationMenu";
import CustomSwitch from "../Components/CustomSwitch";

import { Ionicons } from '@expo/vector-icons';

import Card from "../Components/Card";

var mqtt = require("@taoqf/react-native-mqtt");

// var options = {
//     protocol: "mqtt",
//     clientID: "Telefono",
//     username: "TelefonoPrueba",
//     password: "12345678",
// };



// var options = {
//   protocol: "mqtts",
//   cliendID: "frontend_1",
//   username: "mycelium-1",
//   password: "pkaYpnJZZz92twZb",
// }

var options = {
  protocol: "mqtts",
  cliendID: "frontend_1",
  username: "eiaiotdario",
  password: "SKWpvAWoAsagTuzp",
}

/*var options = {
  protocol: "mqtt",
  cliendID: "Telefono",
  username: "alice",
  password: "secret",
}*/

const topicSensores = "userID/getway/sensores";
const topicLora = "userID/getway/lora/cuenta";
const topici2c = "userID/getway/i2c/lux";

    


export default function Home() {

    const navigation = useContext(NavigationContext);
    const [temp, settemp] = useState(0);
    const [hum, setHum] = useState(0);
    const [pre, setpre] = useState(0);
    const [lux, setlux] = useState(0);

    const [isSwitch1On, setSwitch1On] = useState(false);
    const [isSwitch2On, setSwitch2On] = useState(false);
    const [isSwitch3On, setSwitch3On] = useState(false);
    const [isSwitch4On, setSwitch4On] = useState(false);

    const toggleSwitch = (index) => {
      // Funciones para cambiar el estado de los Switches
      if (index === 0) {
        setSwitch1On((prevState) => !prevState);
      } else if (index === 1) {
        setSwitch2On((prevState) => !prevState);
      } else if (index === 2) {
        setSwitch3On((prevState) => !prevState);
      } else if (index === 3) {
        setSwitch4On((prevState) => !prevState);
      }
    };

    useEffect(() => {
        var dot;
        //var client = mqtt.connect("mqtt://mycelium-1.cloud.shiftr.io", options);
        var client = mqtt.connect("mqtt://eiaiotdario.cloud.shiftr.io", options);
        //var client = mqtt.connect("mqtt://node02.myqtthub.com", options);
        //var client = mqtt.connect("mqtt://192.168.4.1", options);
        client.subscribe(topicSensores);
        client.subscribe(topicLora);
        client.subscribe(topici2c);

        client.on("message", function (topic, message) {

          if(topic == topicSensores){

            const sensorData = JSON.parse(message.toString()); // Deserializar el mensaje JSON

            setpre(parseFloat(sensorData["sensors"][0]));
            setHum(parseFloat(sensorData["sensors"][3]));

          }

          if(topic == topicLora){

            //console.log()

            const sensorData = JSON.parse(message.toString()); // Deserializar el mensaje JSON

            settemp(parseFloat(sensorData["temp"]));
            setHum (parseFloat(sensorData["hum"]));

          }

          if(topic == topici2c){

            setlux(parseFloat(message.toString()));

          }


          
          //temp = sensorData["sensors"][1];
            
            /*dot = {
                id: cont,
                value: parseFloat(message.toString()),
            };*/
            //settemp(parseFloat(message.toString()));
            //cont = cont + 1;
            
            //setx_axis(x_axis => [...x_axis,cont]);
            //sety_axis(y_axis => [...y_axis,parseFloat(message.toString())]);
            
        });
    }, []);

    return (
        <View style={styles.container}>
            <NavigationMenu></NavigationMenu>
            
            {/* Contenedor de los CardViews */}
            <View style={styles.cardContainer}>
              <Card name={"Temperatura"} value={temp} sim={"°C"} color={"#f54242"} icon={"temperature-half"}/>
              <Card name={"Humedad"} value={hum} sim={"%"} color={"#52f242"} icon={"water"} />
              <Card name={"Suelo"} value={pre} sim={"%"} color={"#4287f5"} icon={"tachometer-alt"}/>
              <Card name={"Luz"} value={lux} sim={"Lm"} color={"#f5e742"} icon={"sun"} />
            </View>

            {/* Contenedor de los Switches */}
            <View style={styles.switchContainer}>

              <CustomSwitch 
                indice={0}
                name={"Channel 1"} 
                info={"Mi info adicional ch1"}
                isOn={isSwitch1On}
                toggleSwitch={() => toggleSwitch(0)} // función para cambiar estado de Switch1
                switchStates={[isSwitch1On, isSwitch2On, isSwitch3On, isSwitch4On]}
              />

              <CustomSwitch 
                indice={1}
                name={"Channel 2"} 
                info={"Mi info adicional ch2"}
                isOn={isSwitch2On}
                toggleSwitch={() => toggleSwitch(1)} // función para cambiar estado de Switch2
                switchStates={[isSwitch1On, isSwitch2On, isSwitch3On, isSwitch4On]}
              />
              <CustomSwitch 
                indice={2}
                name={"Channel 3"} 
                info={"Mi info adicional ch3"}
                isOn={isSwitch3On}
                toggleSwitch={() => toggleSwitch(2)} // función para cambiar estado de Switch3
                switchStates={[isSwitch1On, isSwitch2On, isSwitch3On, isSwitch4On]}
              />
              <CustomSwitch 
                indice={3}
                name={"Channel 4"} 
                info={"Mi info adicional ch4"}
                isOn={isSwitch4On}
                toggleSwitch={() => toggleSwitch(3)} // función para cambiar estado de Switch4
                switchStates={[isSwitch1On, isSwitch2On, isSwitch3On, isSwitch4On]}
              />

            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aaa3",
  },

  cardContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
  },

  switchContainer: {
    flex: 1, // Dale más espacio a los switches
    paddingHorizontal: 10,
    justifyContent: 'flex-around', // Alinear los switches hacia la parte superior del contenedor
    paddingVertical: 20, // Añadir padding superior e inferior
    marginBottom: 100, // Reducir el marginBottom para más espacio arriba
  },

});