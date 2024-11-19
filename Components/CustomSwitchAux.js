import React, { useState,useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContext } from "@react-navigation/native";

var mqtt = require("@taoqf/react-native-mqtt");

// var options = {
//   protocol: "mqtts",
//   cliendID: "frontend_1",
//   username: "mycelium-1",
//   password: "pkaYpnJZZz92twZb",
// }

// var options = {
//     protocol: "mqtt",
//     clientID: "cell1",
//     username: "pcc",
//     password: "123456",
// };

var options = {
    protocol: "mqtts",
    cliendID: "frontend_1",
    username: "eiaiotdario",
    password: "SKWpvAWoAsagTuzp",
  }

// var client  = mqtt.connect('ws://test.mosquitto.org:8080/')

// client.on('connect', function () {
//   client.subscribe('darios', function (err) {
//     if (!err) {
//       client.publish('darios', 'Hello mqtt')
//     }
//   })
// })

// client.on('message', function (topic, message) {
//   // message is Buffer
//   console.log(message.toString())
//   client.end()
// })


/*var client = mqtt.connect("mqtt://node02.myqtthub.com:8080/", options);

client.on('connect', function () {
  client.subscribe('darios', function (err) {
    if (!err) {
      client.publish('darios', 'Hello mqtt')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})*/

  export default function CustomSwitchAux ({indiceChannel,indiceEvent,name, info, isOn, toggleSwitch, switchStates }) {

    const navigation = useContext(NavigationContext);

    const toggleCurrentSwitch = () => {
        const newState = !isOn;
        const jsonData = {
          eventsCh: [...switchStates],  // Copiamos el estado actual de todos los switches
        };
        jsonData.eventsCh[indiceEvent] = newState; // Cambiar el estado actual del switch
        
        const jsonString = JSON.stringify(jsonData, null, 1);
        
        var client = mqtt.connect("mqtt://eiaiotdario.cloud.shiftr.io", options);
        //var client = mqtt.connect("mqtt://mycelium-1.cloud.shiftr.io", options);
        //var client = mqtt.connect("mqtt://node02.myqtthub.com:1883/", options);
        
        client.on("connect", function () {
            client.publish("userID/getway/events/ch", `${jsonString}`);
            // client.end();
        });
        
        toggleSwitch(); // Llamar la función para actualizar el estado en Home
    };

    // Función para manejar la presión del nombre y la información
    const onInfoPress = () => {
      console.log(`ChannelAux: ${indiceChannel}`);
      //Alert.alert('Información', 'Se presionó el nombre o la info');
      navigation.navigate('DatetimePickerScreen', {indiceChannel:indiceChannel,indiceEvent:indiceEvent});
      
    };
  
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.textContainer} onPress={onInfoPress}>
          <Text style={styles.switchName}>{name}</Text>
          <Text style={styles.switchInfo}>{info}</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.iconContainer} onPress={toggleCurrentSwitch}>
          <Ionicons 
            name={isOn ? 'power' : 'power-outline'} 
            size={40} 
            color={isOn ? '#52f242' : 'gray'} 
          />
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 10,
      elevation: 3, // sombra en Android
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2, // sombra en iOS
      marginBottom: 10,
    },
    textContainer: {
      flex: 1,
    },
    switchName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    switchInfo: {
      fontSize: 14,
      color: 'gray',
    },
    iconContainer: {
      padding: 10,
    },
  });
  
