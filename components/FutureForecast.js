import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import moment from 'moment-timezone'

const FutureForecast = ({data}) => {
    return (
        <View style={{flexDirection: 'row'}}>
           
           {
                data && data.length > 0 ? 
                data.map((data, idx) => (
                    idx !== 0 &&  <FutureForecastItem key={idx} forecastItem={data}/>
                ))
                :
                <View/>
            }
        </View>
    )
}

const FutureForecastItem = ({forecastItem}) => {
    const img = {uri: 'http://openweathermap.org/img/wn/' + forecastItem.weather[0].icon + '@2x.png'}
    return (
        <View style={styles.futureForecastItemContainer}>
            <Text style={styles.day}>{moment(forecastItem.dt * 1000).format('ddd')}</Text>
            <Image source={img} style={styles.image}/>
            <Text style={styles.temp}>Day {Math.round(forecastItem.temp.day)}&#176;</Text>
            <Text style={styles.temp}>Feels {Math.round(forecastItem.feels_like.day)}&#176;</Text>
            <Text style={styles.temp}>Night {Math.round(forecastItem.temp.night)}&#176;</Text>
            <Text style={styles.temp}>Feels {Math.round(forecastItem.feels_like.night)}&#176;</Text>            
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height:100
    }, 
    futureForecastItemContainer: {
        flex:1,
        justifyContent: 'center',
        backgroundColor: '#87AAAA',
        borderRadius:10,
        borderColor:"#B91646",
        borderWidth:1,
        padding: 20,
        marginLeft: 10,
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
})
export default FutureForecast
