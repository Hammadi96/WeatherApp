import React from 'react'
import {View, ScrollView, Image, Text, StyleSheet} from 'react-native'
import moment from 'moment-timezone'
import FutureForecast from './FutureForecast'

const WeatherScroll = ({weatherData}) => {
    return (
        <ScrollView horizontal={true} style={styles.ScrollView}>
            <CurrentTempEl data={weatherData && weatherData.length > 0 ? weatherData[0] : {}}/>
            <FutureForecast data={weatherData}/>
        </ScrollView>
    )
}

const CurrentTempEl = ({data}) => {
    if(data && data.weather) {
        const img = {uri: 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png'}
    return(
        <View style={styles.currentTempContainer}>
            <Image source={img} style={styles.image} />
            <View style={styles.otherContainer}>
                <Text style={styles.day}>{moment(data.dt * 1000).format('dddd')}</Text>
                <Text style={styles.temp}>Day  {Math.round(data.temp.day)}&#176;</Text>                
                <Text style={styles.temp}>Feels  {Math.round(data.feels_like.day)}&#176;</Text>
                <Text style={styles.temp}>Night {Math.round(data.temp.night)}&#176;</Text>
                <Text style={styles.temp}>Feels {Math.round(data.feels_like.night)}&#176;</Text>
                
            </View>
        </View>
    )
    }else{
        return (
            <View>

            </View>
        )
        
    }
    
}

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150
    },
    ScrollView: {
        flex: 0.4,
        backgroundColor: '#4D375D',
        padding: 30,
        opacity: 0.8
    },
    currentTempContainer: {
        flexDirection: 'row',
        backgroundColor: '#87AAAA',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#B91646',
        borderWidth: 1,
        opacity: 0.5
    },
    day: {
        fontSize: 20,
        color:"#FF00E4",
        backgroundColor: "#D0CAB2",
        padding: 10,
        textAlign:"center",
        borderRadius: 50,
        fontWeight: "500",
        marginBottom: 15,
        opacity: 0.3
    },
    temp: {
        fontSize: 10,
        color:"#49FF00",
        fontWeight:"100",
        textAlign:"center"
    },
    otherContainer: {
        paddingRight: 40
    } 
})

export default WeatherScroll
