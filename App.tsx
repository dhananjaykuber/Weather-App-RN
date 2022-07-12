import React, {useState, useEffect} from 'react';
import {Text, View, TextInput, Image, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import WeatherDetails from './components/WeatherDetails';
import axios from 'axios';
import {Weather} from './utils/model';
import env from './config/env';

const App: React.FC = () => {
  const date: Date = new Date();
  const days: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const [city, setCity] = useState<string>('Aurangabad');

  // Weather Information
  const [weatherCity, setWeatherCity] = useState<string>('');
  const [temperature, setTemperature] = useState<number>(0);
  const [weatherImage, setWeatherImage] = useState<string>(
    ' http://openweathermap.org/img/wn/10d@2x.png',
  );
  const [weather, setWeather] = useState<string>('');

  const [weatherDetails, setWeatherDetails] = useState<Weather[]>([]);

  useEffect(() => {
    hanldeRequest();
  }, []);

  const hanldeRequest = async () => {
    if (city) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${env}`;

      try {
        const data = await axios.post(url);
        setWeatherCity(data?.data?.name);
        setTemperature(data?.data?.main?.temp - 273.15);
        setWeatherImage(
          `http://openweathermap.org/img/wn/${data?.data?.weather[0]?.icon}@2x.png`,
        );
        setWeather(data?.data?.weather[0]?.main);
        setWeatherDetails([
          {
            weatherParameter: 'Wind',
            parameterValue: data?.data?.wind?.speed,
            parameterUnit: 'km/h',
          },
          {
            weatherParameter: 'Clouds',
            parameterValue: data?.data?.clouds?.all,
            parameterUnit: '%',
          },
          {
            weatherParameter: 'Humidity',
            parameterValue: data?.data?.main?.humidity,
            parameterUnit: '%',
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    }

    setCity('');
  };

  const renderSearchField = () => {
    return (
      <View
        style={{
          backgroundColor: '#5f5f5f6c',
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 8,
          paddingHorizontal: 10,
          borderColor: '#3131316c',
          borderWidth: 0.5,
        }}>
        <Image
          source={require('./assets/icons/search.png')}
          style={{height: 22, width: 22, tintColor: '#d4d4d4'}}
        />
        <TextInput
          value={city}
          onChangeText={city => setCity(city)}
          placeholder="Type city name..."
          placeholderTextColor="#d4d4d4"
          style={{
            flex: 1,
            marginLeft: 5,
            fontFamily: 'Lato-Regular',
            fontSize: 15,
            padding: 7,
            color: '#d4d4d4',
          }}
          onSubmitEditing={hanldeRequest}
        />
      </View>
    );
  };

  const renderLocation = () => {
    return (
      <View style={{marginTop: 25}}>
        <Text style={{fontFamily: 'Lato-Bold', color: '#ffffff', fontSize: 30}}>
          {weatherCity.length > 0 ? weatherCity : 'Aurangabad'}
        </Text>
        <Text
          style={{
            fontFamily: 'Lato-Regular',
            color: '#f5f5f5',
            fontSize: 14,
            marginTop: 4,
          }}>
          {`${
            date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
          }:${date.getMinutes()} ${date.getHours() >= 12 ? 'PM' : 'AM'} - ${
            days[date.getDay()]
          }, ${date.getDate()} ${
            months[date.getMonth()]
          } ${date.getFullYear()}`}
        </Text>
      </View>
    );
  };

  const renderTemperature = () => {
    return (
      <View style={{position: 'absolute', bottom: 24, left: 24, right: 24}}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 45,
              color: '#ffffff',
            }}>
            {temperature.toString().slice(0, 2)}
          </Text>
          <Text
            style={{
              justifyContent: 'flex-start',
              fontFamily: 'Lato-Bold',
              fontSize: 15,
              marginHorizontal: 3,
              color: '#ffffff',
            }}>
            o
          </Text>
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 45,
              color: '#ffffff',
            }}>
            C
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 8,
          }}>
          <Image
            // source={{uri: 'http://openweathermap.org/img/wn/10d@2x.png'}}
            source={{uri: weatherImage}}
            style={{
              tintColor: '#ffffff',
              height: 30,
              width: 30,
              marginRight: 5,
            }}
          />
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 15,
              color: '#ffffff',
            }}>
            {weather}
          </Text>
        </View>

        {/* Temprature Details */}
        <View
          style={{
            borderTopColor: '#8b8b8b',
            borderTopWidth: 1,
            marginTop: 10,
            paddingVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {weatherDetails.map(weatherDetail => (
            <WeatherDetails
              key={weatherDetail.parameterValue}
              weatherDetails={weatherDetail}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      colors={['#272727', '#3e3e3e']}
      style={{flex: 1, padding: 24}}>
      {renderSearchField()}

      {/* Location */}
      {renderLocation()}

      {/* Temprature */}
      {renderTemperature()}
    </LinearGradient>
  );
};

export default App;
