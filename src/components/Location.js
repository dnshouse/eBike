import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Position from './Position';

export default class Location extends Component {
    constructor() {
        super();
        this.watchID = null;
        this.state = {
            initialPosition: {
                coords:{ accuracy: 0,altitude: 0, altitudeAccuracy: 0, heading: 0, latitude: 0, longitude: 0, speed: 0 },
                timestamp: 0
            },
            lastPosition: {
                coords:{ accuracy: 0, altitude: 0, altitudeAccuracy: 0, heading: 0, latitude: 0, longitude: 0, speed: 0 },
                timestamp: 0
            },
            error: ''
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (initialPosition) => {
                this.setState({initialPosition})
            },
            (error) => {
                this.setState({error: error.message})
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );

        this.watchID = navigator.geolocation.watchPosition(
            (lastPosition) => {
                this.setState({lastPosition})
            },
            (error) => {
                this.setState({error: error.message})
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 0}
        );
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID)
    }

    render() {
        let showErr = (
            this.state.error ? <Text>{this.state.error}</Text> : <View></View>
        );
        return (
            <View style={styles.container}>
                <Position PositionData={this.state.initialPosition} name='Initial'/>
                <Position PositionData={this.state.lastPosition} name='Last'/>
                {showErr}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#504746',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});