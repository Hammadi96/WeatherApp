import { StatusBar } from "expo-status-bar";
import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, ImageBackground, PermissionsAndroid } from "react-native";

import DateTime from "./components/DateTime";
import WeatherScroll from "./components/WeatherScroll";
import * as Location from 'expo-location'


const API_KEY = 'a9532f8629a81849864561fdc43e6ee6'

const img = require("./assets/weather-unsplash.jpg");
export default function App() {

  const [data, setData] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(()=>{

    (async () => {
      let { status } = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: "Access Coarse Location Permission",
          message:
            "COMP3074 Weather App Project needs access to your location " +
            "so you have precise weather report.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (status !== 'granted') {
        fetchDataFromApi("43.6532","-79.3832")
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchDataFromApi(location.coords.latitude, location.coords.longitude)
    })();
  }, [])



  const fetchDataFromApi = (latitude, longitude) => {
    if(latitude && longitude){
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        setData(data)
    })
    }
    
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.image}>
        <DateTime current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon}/>
        <WeatherScroll weatherData={data.daily}/>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
