import React, {Component} from 'react';
import {AsyncStorage, FlatList, StyleSheet, Switch, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';
import {connect} from 'react-redux';
import {bluetoothConnected, bluetoothDisabled, bluetoothEnabled} from '../actions/bluetooth';

class Settings extends Component {

    toggleBluetooth(value) {
        if (value === true) {
            BluetoothSerial.enable().then((res) => {
                this.props.bluetoothEnabled([]);
            }).catch((err) => ToastAndroid.show(err.message, ToastAndroid.SHORT));
        } else {
            BluetoothSerial.disable().then((res) => {
                this.props.bluetoothDisabled();
            }).catch((err) => ToastAndroid.show(err.message, ToastAndroid.SHORT));
        }
    }

    connectBluetooth(device) {
        BluetoothSerial.connect(device.id)
            .then((res) => {
                AsyncStorage.setItem('connectedDeviceId', device.id, () => {
                    this.props.bluetoothConnected();
                    ToastAndroid.show(`Connected to device ${device.name ? device.name : device.id}`, ToastAndroid.SHORT);
                });
            })
            .catch((err) => console.log((err.message)))
    }

    renderBluetoothItem(item) {
        return (
            <TouchableOpacity onPress={() => this.connectBluetooth(item.item)}>
                <View style={styles.deviceNameWrap}>
                    <Text style={styles.deviceName}>{item.item.name ? item.item.name : item.item.id}</Text>
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
                        <Switch value={this.props.isBluetoothEnabled}
                                onValueChange={(val) => this.toggleBluetooth(val)}
                        />
                    </View>
                </View>
                <FlatList
                    style={{flex: 1}}
                    data={this.props.bluetoothDevices}
                    keyExtractor={item => item.id}
                    renderItem={(item) => this.renderBluetoothItem(item)}
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

const mapStateToProps = state => {
    return {
        bluetoothDevices: state.bluetooth.bluetoothDevices,
        isBluetoothEnabled: state.bluetooth.isBluetoothEnabled,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        bluetoothEnabled: () => {
            dispatch(bluetoothEnabled())
        },
        bluetoothDisabled: () => {
            dispatch(bluetoothDisabled())
        },
        bluetoothConnected: () => {
            dispatch(bluetoothConnected())
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);