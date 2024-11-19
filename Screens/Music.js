import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Switch, Button, Alert} from 'react-native';
import Slider from '@react-native-community/slider'; // Importa el componente de slider

import NavigationMenu from "../Components/NavigationMenu";
var mqtt = require("@taoqf/react-native-mqtt");
var options = {
  protocol: "mqtts",
  cliendID: "React_tel",
  username: "eiaiotdario",
  password: "SKWpvAWoAsagTuzp",
}

// var options = {
//   protocol: "mqtts",
//   cliendID: "React_tel",
// }

export default function Music() {

  const [isEnabled, setIsEnabled] = useState(false);

  const [r, setRed] = useState(""); // Estado para guardar el nombre
  const [g, setGreen] = useState(""); // Estado para guardar el nombre
  const [b, setBlue] = useState(""); // Estado para guardar el nombre
  const [greeting, setGreeting] = useState(""); // Estado para el saludo

  const [sliderRedValue, setSliderRedValue] = useState(10);  // Estado para el valor del slider
  const [sliderGreenValue, setSliderGreenValue] = useState(10);  // Estado para el valor del slider
  const [sliderBlueValue, setSliderBlueValue] = useState(10);  // Estado para el valor del slider

    // Función que se ejecuta al presionar el botón
    const handleGreet = () => {
    // Crear un objeto JSON con los tres números
    const jsonData = {
      red: r,
      green: sliderValue,
      blue: b,
    };

    // Convertir el objeto JSON a string para mostrarlo
    const jsonString = JSON.stringify(jsonData, null, 2);
    var client = mqtt.connect("mqtt://eiaiotdario.cloud.shiftr.io", options);
    //var client = mqtt.connect("mqtt://192.168.1.28");
          client.on("connect", function () {
              client.publish("Esp1/led", `${jsonString}`);
              client.end();
          });
      setGreeting(`${jsonString}`); // Actualiza el saludo con el nombre ingresado
    };

    const valueSliderRed = (value) => {
      setSliderRedValue(value);  // Actualiza el estado con el valor del slider
      // Generar el JSON y actualizar el saludo
      const jsonData = {
        stateView:1,stateShow:2,allLights:true,r:sliderRedValue,g:sliderGreenValue,b:sliderBlueValue,speed:50,zone:[1,5]
      };

      const jsonString = JSON.stringify(jsonData, null, 2);
      setGreeting(`Datos recolectados:\n${jsonString}`);

      var client = mqtt.connect("mqtt://eiaiotdario.cloud.shiftr.io", options);
      //var client = mqtt.connect("mqtt://192.168.1.28",options);
      client.on("connect", function () {
          client.publish("userID/gab/dmx", `${jsonString}`);
          client.end();
      });
    };

    const valueSliderGreen = (value) => {
      setSliderGreenValue(value);  // Actualiza el estado con el valor del slider
      // Generar el JSON y actualizar el saludo
      const jsonData = {
        stateView:1,stateShow:2,allLights:true,r:sliderRedValue,g:sliderGreenValue,b:sliderBlueValue,speed:50,zone:[1,5]
      };

      const jsonString = JSON.stringify(jsonData, null, 2);
      setGreeting(`Datos recolectados:\n${jsonString}`);

      var client = mqtt.connect("mqtt://eiaiotdario.cloud.shiftr.io", options);
      client.on("connect", function () {
          client.publish("userID/gab/dmx", `${jsonString}`);
          client.end();
      });
    };

    const valueSliderBlue = (value) => {
      setSliderBlueValue(value);  // Actualiza el estado con el valor del slider
      // Generar el JSON y actualizar el saludo
      const jsonData = {
        stateView:1,stateShow:2,allLights:true,r:sliderRedValue,g:sliderGreenValue,b:sliderBlueValue,speed:50,zone:[1,5]
      };

      const jsonString = JSON.stringify(jsonData, null, 2);
      setGreeting(`Datos recolectados:\n${jsonString}`);

      var client = mqtt.connect("mqtt://eiaiotdario.cloud.shiftr.io", options);
      client.on("connect", function () {
          client.publish("userID/gab/dmx", `${jsonString}`);
          client.end();
      });
    };


    return (
        <View style={styles.container}>
            <NavigationMenu></NavigationMenu>
            <Text>MUSIC</Text>

            {/* Entrada de texto */}
            <TextInput
              style={styles.input}
              placeholder="red"
              value={r} // Valor del estado name
              onChangeText={setRed} // Actualiza el estado name con cada cambio
            />

            <TextInput
              style={styles.input}
              placeholder="green"
              value={g} // Valor del estado name
              onChangeText={setGreen} // Actualiza el estado name con cada cambio
            />

            <TextInput
              style={styles.input}
              placeholder="blue"
              value={b} // Valor del estado name
              onChangeText={setBlue} // Actualiza el estado name con cada cambio
            />

            {/* Botón que ejecuta handleGreet */}
            <Button title="Enviar" onPress={handleGreet} />

            <View style={styles.switchContainer}>
                <Slider
                  style={{ width: 300, height: 40 }}
                  minimumValue={0}
                  maximumValue={255}
                  step={1}  // Ajusta el incremento
                  value={sliderRedValue}  // Valor inicial del slider
                  onValueChange={valueSliderRed}  // Captura el valor al cambiar
                  minimumTrackTintColor="#1E90FF"
                  maximumTrackTintColor="#d3d3d3"
                  thumbTintColor="#1E90FF"
                />

                <Slider
                  style={{ width: 300, height: 40 }}
                  minimumValue={0}
                  maximumValue={255}
                  step={1}  // Ajusta el incremento
                  value={sliderGreenValue}  // Valor inicial del slider
                  onValueChange={valueSliderGreen}  // Captura el valor al cambiar
                  minimumTrackTintColor="#1E90FF"
                  maximumTrackTintColor="#d3d3d3"
                  thumbTintColor="#1E90FF"
                />

                <Slider
                  style={{ width: 300, height: 40 }}
                  minimumValue={0}
                  maximumValue={255}
                  step={1}  // Ajusta el incremento
                  value={sliderBlueValue}  // Valor inicial del slider
                  onValueChange={valueSliderBlue}  // Captura el valor al cambiar
                  minimumTrackTintColor="#1E90FF"
                  maximumTrackTintColor="#d3d3d3"
                  thumbTintColor="#1E90FF"
                />
            </View>
            
            {/* Texto que muestra el saludo */}
            <Text style={styles.greeting}>{greeting}</Text>
            
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    width: "50%",
    marginBottom: 10,
    paddingHorizontal: 10,
  },

  greeting: {
    fontSize: 24,
    marginTop: 20,
    color: "#333",
  },

});