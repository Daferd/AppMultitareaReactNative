import React, { useState, useContext } from 'react';
import { View, ScrollView, StyleSheet,TouchableOpacity } from 'react-native';
import CustomSwitchAux from "../Components/CustomSwitchAux";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { NavigationContext } from "@react-navigation/native";

export default function SchedulesChannel({ route }) {

  const { indiceChannel } = route.params; // Recibir el parámetro correctamente

  console.log(`ChannelSchedules: ${indiceChannel}`);

  // Datos de los switches
  const switchData = [
    { id: 0, name: 'Switch 1', info: 'Información del Switch 1', isOn: false, show:true  },
    { id: 1, name: 'Switch 2', info: 'Información del Switch 2', isOn: false, show:true },
    { id: 2, name: 'Switch 3', info: 'Información del Switch 3', isOn: false, show:true  },
    // Agrega más elementos según sea necesario
  ];

  const navigation = useContext(NavigationContext);

  // Estado de los switches
  const [switchStates, setSwitchStates] = useState(
    switchData.map((item) => item.isOn)
  );

  // Función para actualizar el estado de un switch específico
  const toggleSwitch = (index) => {
    setSwitchStates((prevStates) => 
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  // Función para manejar la presión del nombre y la información
  const onInfoPress = () => {
    //Alert.alert('Información', 'Se presionó el nombre o la info');
    console.log(`data: ${switchData[0].name}`);
    //const indiceChannel = indice;
    //const indiceEvent = switchData.length;
    navigation.navigate('DatetimePickerScreen', {indiceChannel:indiceChannel,indiceEvent:switchData.length});
    
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {switchData.map((item, index) => (
        item.show && ( // Solo renderiza si `show` es `true`
          <CustomSwitchAux
            key={item.id}
            indiceChannel={indiceChannel}
            indiceEvent={index}
            name={item.name}
            info={item.info}
            isOn={switchStates[index]}
            toggleSwitch={() => toggleSwitch(index)}
            switchStates={switchStates}
          />
        )
      ))}

      <TouchableOpacity onPress={onInfoPress}>
          <MaterialIcons name="more-time" size={48} color="black" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
