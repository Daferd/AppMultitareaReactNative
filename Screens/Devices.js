import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavigationMenu from "../Components/NavigationMenu";
import SmartButton from '../Components/SmartButton';

export default function Devices() {
  return (
    <View style={styles.container}>
        <NavigationMenu></NavigationMenu>
        <SmartButton></SmartButton>
        <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  },
});