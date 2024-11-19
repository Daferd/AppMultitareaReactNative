import React, {useState} from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import Slider from '@react-native-community/slider'; // Importa el componente de slider
import { Button } from 'react-native-web';

export default function ColorPickerScreen() {
  const [sliderRedValue, setSliderRedValue] = useState(10);  // Estado para el valor del slider
  const [sliderGreenValue, setSliderGreenValue] = useState(10);  // Estado para el valor del slider
  const [sliderBlueValue, setSliderBlueValue] = useState(10);  // Estado para el valor del slider

  const valueSliderRed = (value) => {

  };

  const valueSliderGreen = (value) => {

  };

  const valueSliderBlue = (value) => {

  };


  return (
    <View style={styles.container}>
      {/* Contenedor del ColorPicker que ocupa la mitad superior */}
      <View style={styles.colorPickerContainer}>
        <ColorPicker
          ref={r => { this.picker = r }}
          color={'#1633e6'}
          thumbSize={40}
          sliderSize={40}
          noSnap={true}
          row={false}
          wheelLodingIndicator={<ActivityIndicator size={40} />}
          sliderLodingIndicator={<ActivityIndicator size={20} />}
          useNativeDriver={false}
          useNativeLayout={false}
          style={styles.colorPicker}
        />
      </View>

      {/* Contenedor inferior (vacío o para contenido adicional) */}
      <View style={styles.emptyContainer}>
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

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  // El contenedor ocupa toda la pantalla
  },
  colorPickerContainer: {
    flex: 1,  // Ocupa la mitad superior
    justifyContent: 'center',  // Centra el ColorPicker verticalmente
    alignItems: 'center',      // Centra el ColorPicker horizontalmente
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',  // Puedes cambiar el color o añadir contenido aquí
  },
  colorPicker: {
    width: 300,   // Ajusta el tamaño del ColorPicker
    height: 300,  // Puedes ajustar el tamaño que prefieras
  },
});
