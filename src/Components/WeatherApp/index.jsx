import React, {Fragment} from 'react';
import './index.css';

import City from '../City';
import Climate from '../Climate';
import Form from '../Form';

class WeatherApp extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            city: '',
            cityValue: '',
            country: '',
            climate: '',
            icon: '',
            temp: '',
            date: '',
        }
    }

    handleChange = (event) => {
        this.setState({cityValue: event.target.value});
    }

    handleSubmit = (event) => {
        const {cityValue} = this.state;
        this._getCity(cityValue);
        event.preventDefault();
    }

    componentWillMount() {
        fetch('https://ipinfo.io/json')
            .then( response => response.json())
            .then (
                location => {
                    //console.log(location);
                    this.setState({
                        city: location.city,
                        country: location.country,
                    });

                    this._getCity(location.city);
                }
            )
    }

    _getCity = (city) => {
        const ciudad = city;
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=2ffaf2fb93ce17472addc8c984696536&units=metric`
        //console.log(url);
        fetch(url)
            .then( weather => weather.json())
            .then( response => {
                const data = response.list[0];
                //console.log(response);
                this.setState({
                    climate: data.weather[0].main,
                    icon: data.weather[0].icon,
                    temp: data.main.temp,
                    city: city,
                })
            })
            .catch( error => alert(`Verifique que el nombre de la ciudad ${this.state.cityValue} sea correcto.`));
    }

    render (){
        const {city, climate, icon, cityValue, temp} = this.state
        //console.log(this.state  )
        return (
            <Fragment>
                <h1 className="title">Weather App</h1>
                <City city={city}/>
                <Climate climate={climate} icon={icon} temp={temp} />
                <Form city={cityValue} submit={this.handleSubmit} change={this.handleChange}/>
            </Fragment>
        );
    }
}

export default WeatherApp;