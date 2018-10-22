import React, {Component} from 'react';
import {StyleSheet, View, Text, Switch, FlatList, TouchableOpacity, ToastAndroid, AsyncStorage} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isBluetoothEnabled: false,
            isBluetoothConnected: false,
            devices: []
        }
    }

    componentWillMount() {

        Promise.all([
            BluetoothSerial.isEnabled(),
            BluetoothSerial.list()
        ]).then((values) => {
            const [isBluetoothEnabled, devices] = values;
            this.setState({isBluetoothEnabled, devices});
        });

        BluetoothSerial.on('bluetoothEnabled', () => {

            Promise.all([
                BluetoothSerial.isEnabled(),
                BluetoothSerial.list()
            ]).then((values) => {
                const [isBluetoothEnabled, devices] = values;
                this.setState({isBluetoothEnabled, devices});
            });

            BluetoothSerial.on('bluetoothDisabled', () => {
                this.setState({isBluetoothEnabled: false, devices: []});
            });

            BluetoothSerial.on('error', (err) => console.log(`Error: ${err.message}`))

        });

    }

    toggleBluetooth(value) {
        if (value === true) {
            BluetoothSerial.enable()
                .then((res) => this.setState({isBluetoothEnabled: true}))
                .catch((err) => ToastAndroid.show(err.message, ToastAndroid.SHORT));
        } else {
            BluetoothSerial.disable()
                .then((res) => this.setState({isBluetoothEnabled: false}))
                .catch((err) => ToastAndroid.show(err.message, ToastAndroid.SHORT));
        }
    }

    connect(device) {
        BluetoothSerial.connect(device.id)
            .then((res) => {
                AsyncStorage.setItem('connectedDeviceId', device.id, () => {
                    this.setState({isBluetoothConnected: true});
                    ToastAndroid.show(`Connected to device ${device.name} / ${device.id}`, ToastAndroid.SHORT);
                });
            })
            .catch((err) => console.log((err.message)))
    }

    renderItem(item) {
        return (
            <TouchableOpacity onPress={() => this.connect(item.item)}>
                <View style={styles.deviceNameWrap}>
                    <Text
                        style={styles.deviceName}>{item.item.name ? item.item.name : item.item.id} / {item.item.id}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.toolbar}>
                    <Text style={styles.toolbarTitle}>Bluetooth Device List</Text>

                    <View style={styles.toolbarButton}>
                        <Switch
                            value={this.state.isBluetoothEnabled}
                            onValueChange={(val) => this.toggleBluetooth(val)}
                        />
                    </View>

                </View>

                <FlatList
                    style={{flex: 1}}
                    data={this.state.devices}
                    keyExtractor={item => item.id}
                    renderItem={(item) => this.renderItem(item)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    toolbar: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        backgroundColor: '#bbbbbb'
    },
    toolbarTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        color: 'black'
    },
    toolbarButton: {
        width: 100,
        position: 'absolute',
        top: 10,
        right: 5
    },
    deviceNameWrap: {
        margin: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        flexDirection: 'row'
    },
    deviceName: {
        fontSize: 17,
        color: "white"
    }
});

export default Settings;