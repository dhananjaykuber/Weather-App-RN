import {View, Text} from 'react-native';
import React from 'react';
import {Weather} from '../utils/model';

interface Props {
  weatherDetails: Weather;
}

const WeatherDetails: React.FC<Props> = ({weatherDetails}) => {
  return (
    <View>
      <Text
        style={{
          fontFamily: 'Lato-Bold',
          color: '#ffffff',
          textAlign: 'center',
        }}>
        {weatherDetails.weatherParameter}
      </Text>
      <Text
        style={{
          fontFamily: 'Lato-Bold',
          color: '#ffffff',
          fontSize: 20,
          marginVertical: 5,
          textAlign: 'center',
        }}>
        {weatherDetails.parameterValue}
      </Text>
      <Text
        style={{
          fontFamily: 'Lato-Bold',
          color: '#ffffff',
          fontSize: 10,
          textAlign: 'center',
        }}>
        {weatherDetails.parameterUnit}
      </Text>
      <View
        style={{
          width: 30,
          height: 2,
          backgroundColor: '#b1b1b1',
          alignSelf: 'center',
          marginTop: 5,
          borderRadius: 20,
          position: 'relative',
        }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            width: `${weatherDetails.parameterValue}%`,
            backgroundColor: '#f61313',
            alignSelf: 'center',
            borderRadius: 20,
          }}></View>
      </View>
    </View>
  );
};

export default WeatherDetails;
