import React, {useState, useEffect,useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
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

export default function ChannelDetail({ route }) {

  const { indice,name, isOn, switchStates } = route.params; // Recibir los parámetros

  console.log(`Channel: ${indice}`);

  const navigation = useContext(NavigationContext);
  const [isSwitch, setSwitch] = useState(isOn);
  
  const toggleCurrentSwitch = () => {
      const newState = !isSwitch;

      const jsonData = {
          channels: [...switchStates],  // Copiamos el estado actual de todos los switches
      };
      jsonData.channels[indice] = newState; // Cambiar el estado actual del switch
      const jsonString = JSON.stringify(jsonData, null, 1);

      var client = mqtt.connect("mqtt://eiaiotdario.cloud.shiftr.io", options);
      //var client = mqtt.connect("mqtt://mycelium-1.cloud.shiftr.io", options);
      //var client = mqtt.connect("mqtt://node02.myqtthub.com:1883/", options);

      client.on("connect", function () {
          client.publish("userID/getway/channels", `${jsonString}`);
          client.end();
      });
      
      setSwitch(newState);
      //toggleSwitch(); // Llamar la función para actualizar el estado en Home
  };

  // Función para manejar la presión del nombre y la información
  const onTimersPress = () => {
      const indiceChannel = indice
      navigation.navigate('SchedulesChannel',{ indiceChannel: indice });
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Detalles del Canal</Text>
        <Text style={styles.channelName}>Canal: {name}</Text>

        <TouchableOpacity style={styles.iconContainer} onPress={toggleCurrentSwitch}>
            <Ionicons name={isSwitch ? 'power' : 'power-outline'} size={120} color={isSwitch ? '#52f242' : 'gray'} />
        </TouchableOpacity>
        
        <Text style={styles.channelState}>Estado: {isOn ? 'Encendido' : 'Apagado'}</Text>

        <TouchableOpacity onPress={onTimersPress} style={styles.channelName}>
            <MaterialIcons name="more-time" size={48} color="black" />
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  channelName: {
    fontSize: 20,
  },
  channelState: {
    fontSize: 20,
  },
});
