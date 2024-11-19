import React, { useContext } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { NavigationContext } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";

export default function Card({ name,value,sim, color, icon}) {
  const navigation = useContext(NavigationContext);

  return (
    <Pressable
        style={({ pressed }) => [
            styles.card,
            { opacity: pressed ? 0.9 : 1 },
        ]}
        onPress={() => navigation.navigate('SensorDetail', { name, value,sim, color})}>

        <View style={[styles.iconContainer, { backgroundColor: `${color}33` }]}>
            <FontAwesome6 name={icon} size={35} color={color} />
        </View>
        <View style={styles.textContainer}>
            <Text style={[styles.label]}>{name}</Text>
            {/*<Text style={[styles.value, {color}]}>{value}</Text>*/}
            <Text style={[styles.value, {color}]}>{value+sim}</Text>
        </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 150,
    marginVertical: 10,
    borderRadius: 15,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // Para Android
  },
  iconContainer: {
    width: 55,
    height: 55,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  label: {
    color: "#333",
    fontSize: 18,
    marginBottom: 2,
  },
  value: {
    fontSize: 36,
    fontWeight: "bold",
  },
});
