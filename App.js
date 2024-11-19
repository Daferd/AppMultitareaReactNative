import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from "./Screens/Home";
import Locations from "./Screens/Locations";
import Devices from "./Screens/Devices";
import Music from "./Screens/Music";
import SensorDetail from './Screens/SensorDetail';
import ChannelDetail from './Screens/ChannelDetail';
import ColorPickerScreen from './Screens/ColorPickerScreen';
import SchedulesChannel from './Screens/SchedulesChannel';
import DatetimePickerScreen from './Screens/DatetimePickerScreen';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home}/>
            {/*<Stack.Screen name="Locations" component={Locations}/>*/}
            {/*<Stack.Screen name="Devices" component={Devices}/>*/}
            <Stack.Screen name="Music" component={Music}/>
            <Stack.Screen name="SensorDetail" component={SensorDetail} />
            <Stack.Screen name="ChannelDetail" component={ChannelDetail} />
            <Stack.Screen name="ColorPickerScreen" component={ColorPickerScreen} />
            <Stack.Screen name="SchedulesChannel" component={SchedulesChannel} />
            <Stack.Screen name="DatetimePickerScreen" component={DatetimePickerScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
