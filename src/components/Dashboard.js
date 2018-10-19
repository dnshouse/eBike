import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import LeftSidebar from './Dashboard/LeftSidebar';
import SpeedGauge from './Dashboard/SpeedGauge';
import RightSidebar from './Dashboard/RightSidebar';

class Dashboard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.sideBar}>
                    <LeftSidebar />
                </View>
                <View style={styles.main}>
                    <SpeedGauge mph={12} maxMph={30}/>
                </View>
                <View style={styles.sideBar}>
                    <RightSidebar batteryLevel={89}/>
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