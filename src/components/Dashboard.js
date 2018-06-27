import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import SpeedGauge from './Dashboard/SpeedGauge';
import BatteryGauge from './Dashboard/BatteryGauge';

class Dashboard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>

                </View>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                    <SpeedGauge mph={18} maxMph={30}/>
                </View>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                    <BatteryGauge level={90}/>
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
});

export default Dashboard;