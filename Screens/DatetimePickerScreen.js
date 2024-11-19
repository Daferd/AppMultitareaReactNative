import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

var mqtt = require("@taoqf/react-native-mqtt");

var options = {
  protocol: "mqtts",
  cliendID: "frontend_1",
  username: "eiaiotdario",
  password: "SKWpvAWoAsagTuzp",
}

// var options = {
//     protocol: "mqtt",
//     clientID: "Telefono",
//     username: "TelefonoPrueba",
//     password: "12345678",
// };

export default function DatetimePickerScreen({ route }) {

  const [date, setDate] = useState(new Date());

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [isCheckedL, setCheckedL] = useState(false);
  const [isCheckedM, setCheckedM] = useState(false);
  const [isCheckedW, setCheckedW] = useState(false);
  const [isCheckedJ, setCheckedJ] = useState(false);
  const [isCheckedV, setCheckedV] = useState(false);
  const [isCheckedS, setCheckedS] = useState(false);
  const [isCheckedD, setCheckedD] = useState(false);

  const { indiceChannel, indiceEvent } = route.params; // Recibir los parámetros
  
  console.log(`Channel: ${indiceChannel}`)
  console.log(`Event:   ${indiceEvent}`)

  const [showPicker, setShowPicker] = useState(false); 

  const handleDateChange = (event, selectedDate) => {
      if (event.type === 'set') {
          // Ajustar la fecha sin la compensación de zona horaria
          const adjustedDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
          setDate(adjustedDate);
          
          // Extrae la hora y el minuto correctamente en formato 24 horas
          const hours = adjustedDate.getUTCHours();
          const minutes = adjustedDate.getUTCMinutes();

          console.log(`ChannelPres: ${indiceChannel}`)
          console.log(`EventPres:   ${indiceEvent}`)

          const jsonData = {
            channel:indiceChannel,
            event:indiceEvent,
            state:true,
            action:isEnabled,
            hour:hours,
            min:minutes,
            days:[isCheckedL,isCheckedM,isCheckedW,isCheckedJ,isCheckedV,isCheckedS,isCheckedD]
          };
          
          const jsonString = JSON.stringify(jsonData, null, 1);

          var client = mqtt.connect("mqtt://eiaiotdario.cloud.shiftr.io", options);
          //client.subscribe("userID/gab/events");

          client.on("connect", function () {
              client.publish("userID/getway/events", `${jsonString}`);
          });
          console.log(`paq: ${jsonString}`);
          // console.log(`Hora (24h): ${hours}, Minuto: ${minutes}`);
          // console.log(`Box: ${[isCheckedL,isCheckedM,isCheckedW,isCheckedJ,isCheckedV,isCheckedS,isCheckedD]}`);
          setShowPicker(false);
      }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>DATEPICKER</Text>
        <View style={styles.switchContainer}>
            <Text>Actión</Text>
            <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
              />
        </View>
          

        {/* Picker de Fecha/Hora siempre visible */}
        <View style={styles.datePickerContainer}>
            <TouchableOpacity onPress={() => setShowPicker(true)}>
                <MaterialIcons name="more-time" size={48} color="black" />
            </TouchableOpacity>
            {showPicker && (
                <DateTimePicker 
                    mode="time"
                    display="spinner"
                    value={date}
                    onChange={handleDateChange}
                    is24Hour={true}
                />
            )}
        </View>

        {/* Espacio en blanco en la mitad inferior */}
        <View style={styles.lowerHalf}>
            
            <View style={styles.section}>
                <Checkbox
                  style={styles.checkbox}
                  value={isCheckedL}
                  onValueChange={setCheckedL}
                  color={isCheckedL ? '#4630EB' : undefined}
                />
                <Text style={styles.paragraph}>Lunes</Text>
            </View>

            <View style={styles.section}>
                <Checkbox
                  style={styles.checkbox}
                  value={isCheckedM}
                  onValueChange={setCheckedM}
                  color={isCheckedM ? '#4630EB' : undefined}
                />
                <Text style={styles.paragraph}>Martes</Text>
            </View>

            <View style={styles.section}>
                <Checkbox
                  style={styles.checkbox}
                  value={isCheckedW}
                  onValueChange={setCheckedW}
                  color={isCheckedW ? '#4630EB' : undefined}
                />
                <Text style={styles.paragraph}>Miércoles</Text>
            </View>

            <View style={styles.section}>
                <Checkbox
                  style={styles.checkbox}
                  value={isCheckedJ}
                  onValueChange={setCheckedJ}
                  color={isCheckedJ ? '#4630EB' : undefined}
                />
                <Text style={styles.paragraph}>Jueves</Text>
            </View>

            <View style={styles.section}>
                <Checkbox
                  style={styles.checkbox}
                  value={isCheckedV}
                  onValueChange={setCheckedV}
                  color={isCheckedV ? '#4630EB' : undefined}
                />
                <Text style={styles.paragraph}>Viernes</Text>
            </View>

            <View style={styles.section}>
                <Checkbox
                  style={styles.checkbox}
                  value={isCheckedS}
                  onValueChange={setCheckedS}
                  color={isCheckedS ? '#4630EB' : undefined}
                />
                <Text style={styles.paragraph}>Sábado</Text>
            </View>

            <View style={styles.section}>
                <Checkbox
                  style={styles.checkbox}
                  value={isCheckedD}
                  onValueChange={setCheckedD}
                  color={isCheckedD ? '#4630EB' : undefined}
                />
                <Text style={styles.paragraph}>Domingo</Text>
            </View>
            
        </View>

        <Button title="Press me">

        </Button> 

        <Button title="Press me 2">

        </Button> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  datePickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerHalf: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
  switchContainer:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});
