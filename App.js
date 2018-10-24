import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, ToastAndroid} from 'react-native';
import Swiper from 'react-native-swiper';
import Orientation from 'react-native-orientation';
import {connect} from 'react-redux';
import Dashboard from './src/components/Dashboard';
import Map from './src/components/Map';
import Settings from './src/components/Settings';
import BluetoothSerial from "react-native-bluetooth-serial";
import {bluetoothConnected, bluetoothDisabled, bluetoothEnabled} from './src/actions/bluetooth';

type Props = {};

class App extends Component<Props> {

    componentWillMount() {
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

    componentDidMount() {
        Orientation.lockToLandscape();
    }

    render() {
        return (
            <Swiper style={styles.wrapper} loop={false} showsButtons={false} showsPagination={false}>
                <Dashboard/>
                <Map/>
                <Settings/>
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
    return {}
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
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);