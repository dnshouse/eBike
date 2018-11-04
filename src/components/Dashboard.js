import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import LeftSidebar from './Dashboard/LeftSidebar';
import SpeedGauge from './Dashboard/SpeedGauge';
import RightSidebar from './Dashboard/RightSidebar';
import KeepAwake from 'react-native-keep-awake';

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            maxSpeed: 30
        };

        KeepAwake.activate();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.sideBar}>
                    <LeftSidebar
                        tripDistance={this.props.tripDistance}
                        odoMiles={this.props.odoMiles}
                        avgSpeed={this.props.avgSpeed}
                    />
                </View>
                <View style={styles.main}>
                    <SpeedGauge maxMph={this.state.maxSpeed} mph={this.props.currentSpeed}/>
                </View>
                <View style={styles.sideBar}>
                    <RightSidebar batteryLevel={this.props.batteryLevel}/>
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

const mapStateToProps = state => {
    const {isBluetoothConnected} = state.bluetooth;
    const {avgSpeed, batteryLevel, currentSpeed, odoMiles, tripDistance} = state.status;

    return {
        isBluetoothConnected,
        avgSpeed, batteryLevel, currentSpeed, odoMiles, tripDistance
    }
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);