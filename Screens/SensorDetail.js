import React, {useState, useEffect} from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from "react-native-chart-kit";
var mqtt = require("@taoqf/react-native-mqtt");

var options = {
  protocol: "mqtts",
  cliendID: "frontend_1",
  username: "eiaiotdario",
  password: "SKWpvAWoAsagTuzp",
}

var client = mqtt.connect("mqtt://eiaiotdario.cloud.shiftr.io", options);
var cont = 0;



export default function SensorDetail({ route }) {
  // Acceder a los parámetros pasados desde el card
  const { name, value, sim, color } = route.params;
  
  const [val, setVal] = useState(value);

  const [temp, settemp] = useState(0);
    const [hum, setHum] = useState(0);
    const [pre, setpre] = useState(0);
    const [lux, setlux] = useState(0);

  //Eje X, eje Y de la grafica
  const[y_axis,sety_axis] = useState([0]); 
  const[x_axis,setx_axis] = useState([0]); 

  useEffect(() => {
    //client.subscribe("userID/getway/sensores");
    
      console.log(name);

      if(name == "Temperatura"){
          client.subscribe("userID/getway/lora/cuenta");
          
          client.on("message", function (topic, message) {

              const sensorData = JSON.parse(message.toString()); // Deserializar el mensaje JSON
          
              settemp(parseFloat(sensorData["temp"]));

              cont = cont+1;
              setx_axis(x_axis=>[...x_axis,cont]);
              sety_axis(y_axis=>[...y_axis,parseFloat(sensorData["temp"].toString())]);
              //value = lux;
            //}
          
            //settemp(parseFloat(message.toString()));
            //arrays grafica
        });
      }else if(name == "Humedad"){
          client.subscribe("userID/getway/lora/cuenta");
          //const sensorData = JSON.parse(message.toString()); // Deserializar el mensaje JSON
          setHum(parseFloat(sensorData["hum"]));
      }else if(name == "Suelo"){
          client.subscribe("userID/getway/i2c/Hum");
      }else if(name == "Luz"){
        client.subscribe("userID/getway/i2c/lux");
        client.on("message", function (topic, message) {


              setlux(parseFloat(message.toString()));

              cont = cont+1;
              setx_axis(x_axis=>[...x_axis,cont]);
              sety_axis(y_axis=>[...y_axis,parseFloat(message.toString())]);

              setVal(parseFloat(message.toString()));
        });
      }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[styles.sensorName, { color }]}>{name}</Text>
      <Text style={styles.sensorValue}>{val + sim}</Text>
  
      <LineChart
        data={{
          labels: x_axis.slice(-10),
          datasets: [{ data: y_axis.slice(-10) }],
        }}
        width={Dimensions.get('window').width}
        height={260}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#f2f2f2",
          backgroundGradientTo: "#e6e6e6",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(34, 94, 168, ${opacity})`, // Azul oscuro
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: { borderRadius: 16 },
          propsForDots: { r: "5", strokeWidth: "2", stroke: "#2260a8" },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
  },
  sensorName: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 8,
  },
  sensorValue: {
    fontSize: 48,
    fontWeight: '700',
    color: '#333',
  },
  chart: {
    marginVertical: 16,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
});