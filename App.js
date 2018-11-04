import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, ToastAndroid} from 'react-native';
import Swiper from 'react-native-swiper';
import Orientation from 'react-native-orientation';
import {connect} from 'react-redux';
import Dashboard from './src/components/Dashboard';
import Settings from './src/components/Settings';
import BluetoothSerial from "react-native-bluetooth-serial";
import {bluetoothConnected, bluetoothDisabled, bluetoothEnabled} from './src/actions/bluetooth';
import {locationUpdated} from "./src/actions/location";
import {statusUpdated} from "./src/actions/status";

type Props = {};

class App extends Component<Props> {

    componentWillMount() {
        BluetoothSerial.withDelimiter('\r').then(() => {
            Promise.all([
                BluetoothSerial.isEnabled(),
                BluetoothSerial.list()
            ]).then((values) => {
                const [isBluetoothEnabled, devices] = values;

                if (isBluetoothEnabled === true) {
                    this.props.bluetoothEnabled(devices);
                    this.bluetoothConnect();
                }
            });

            BluetoothSerial.on('read', data => {
                data = JSON.parse(data.data);
                if (data.status === "OK") {
                    this.props.statusUpdated(data);
                }
            });
        });

        BluetoothSerial.on('bluetoothEnabled', () => {
            Promise.all([
                BluetoothSerial.isEnabled(),
                BluetoothSerial.list()
            ]).then((values) => {
                const [isBluetoothEnabled, devices] = values;

                if (isBluetoothEnabled === true) {
                    this.props.bluetoothEnabled(devices);
                    this.bluetoothConnect();
                }
            });

            BluetoothSerial.on('bluetoothDisabled', () => {
                this.props.bluetoothDisabled();
            });

            BluetoothSerial.on('error', (err) => console.log(`Error: ${err.message}`))
        });
    }

    componentDidMount() {
        Orientation.lockToLandscape();

        this.watchID = navigator.geolocation.watchPosition(
            position => this.props.locationUpdated(position),
            error => console.log(error),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    bluetoothConnect() {
        AsyncStorage.getItem('connectedDeviceId', (error, result) => {
            if (error) {
                console.log(error);
            }

            if (result) {
                BluetoothSerial.connect(result)
                    .then((res) => {
                        this.props.bluetoothConnected();
                        ToastAndroid.show(`Connected to the eBike`, ToastAndroid.SHORT);
                    })
                    .catch((err) => console.log((err.message)));
            }
        });
    }

    render() {
        return (
            <Swiper style={styles.wrapper} loop={false} showsButtons={false} showsPagination={false}>
                <Dashboard/>
                <Settings/>
                {/*<Map/>*/}
            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#000000'
    }
});

const mapStateToProps = state => {
    return {
        location: state.location.currentLocation,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        bluetoothEnabled: (devices) => {
            dispatch(bluetoothEnabled(devices))
        },
        bluetoothDisabled: () => {
            dispatch(bluetoothDisabled())
        },
        bluetoothConnected: () => {
            dispatch(bluetoothConnected())
        },
        locationUpdated: (locationData) => {
            dispatch(locationUpdated(locationData))
        },
        statusUpdated: (currentStatus) => {
            dispatch(statusUpdated(currentStatus))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);