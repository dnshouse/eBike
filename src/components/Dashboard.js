import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, ToastAndroid, View} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

import LeftSidebar from './Dashboard/LeftSidebar';
import SpeedGauge from './Dashboard/SpeedGauge';
import RightSidebar from './Dashboard/RightSidebar';
import BluetoothSerial from "react-native-bluetooth-serial";

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isBluetoothEnabled: false,
            isBluetoothConnected: false,
            devices: [],
            batteryLevel: 0,
            speed: 0,
            maxSpeed: 30,
            avgSpeed: 0,
            tripDistance: 0,
            odoMiles: 0
        };

        BackgroundTimer.setInterval(() => {
            this.getData();
        }, 500);
    }

    componentWillMount() {
        Promise.all([
            BluetoothSerial.isEnabled(),
            BluetoothSerial.list()
        ]).then((values) => {
            const [isBluetoothEnabled, devices] = values;
            this.setState({isBluetoothEnabled, devices});
            this.connect();
        });

        BluetoothSerial.on('bluetoothEnabled', () => {
            Promise.all([
                BluetoothSerial.isEnabled(),
                BluetoothSerial.list()
            ]).then((values) => {
                const [isBluetoothEnabled, devices] = values;
                this.setState({isBluetoothEnabled, devices});
                this.connect();
            });

            BluetoothSerial.on('bluetoothDisabled', () => {
                this.setState({isBluetoothEnabled: false, devices: []});
            });

            BluetoothSerial.on('error', (err) => console.log(`Error: ${err.message}`))
        });
    }

    connect() {
        AsyncStorage.getItem('connectedDeviceId', (error, result) => {
            if (error) {
                console.log(error);
            }

            if (result) {
                BluetoothSerial.connect(result)
                    .then((res) => {
                        this.setState({isBluetoothConnected: true});
                        ToastAndroid.show(`Connected to device ${result}`, ToastAndroid.SHORT);
                    })
                    .catch((err) => console.log((err.message)));
            } else {
                console.log('result is empty');
            }
        });
    }

    getData() {
        BluetoothSerial.write("status")
            .then((res) => {
                BluetoothSerial.readFromDevice().then((data) => {
                    data = JSON.parse(data);
                    if(data.status === "OK"){
                        this.setState({
                            batteryLevel: data.batteryLevel,
                            speed: data.speed,
                            avgSpeed: data.avgSpeed,
                            tripDistance: data.tripDistance,
                            odoMiles: data.odoMiles,
                        });
                        console.log(this.state);
                    }
                }).catch((err) => console.log(err.message));
            })
            .catch((err) => console.log(err.message));
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.sideBar}>
                    <LeftSidebar
                        avgSpeed={this.state.avgSpeed}
                        tripDistance={this.state.tripDistance}
                        odoMiles={this.state.odoMiles}
                    />
                </View>
                <View style={styles.main}>
                    <SpeedGauge mph={this.state.speed} maxMph={this.state.maxSpeed}/>
                </View>
                <View style={styles.sideBar}>
                    <RightSidebar batteryLevel={this.state.batteryLevel}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    main: {
        width: '60%'
    },
    sideBar: {
        width: '20%'
    }
});

export default Dashboard;