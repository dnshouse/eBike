import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Circle, Path, Text, TextPath} from 'react-native-svg';

import SpeedGauge from './Dashboard/SpeedGauge';
import BatteryGauge from './Dashboard/BatteryGauge';

class Dashboard extends Component {

    getGraySpacer() {
        const size = 430;
        const strokeWidth = 4;
        const center = size / 2;
        const radius = center - (strokeWidth / 2);

        const viewBox = "0 0 " + size + " " + size;

        const circumference = (2 * Math.PI * radius);
        const dashOffset = circumference * (1 - (15 / 100));

        return (
            <Svg width={size} height={size} viewBox={viewBox}>
                <Circle fill="none"
                        stroke="#777777"
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                />
            </Svg>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.speedGauge}>
                    <View style={styles.leftSpacer}>{this.getGraySpacer()}</View>
                    <View style={styles.rightSpacer}>{this.getGraySpacer()}</View>
                    <SpeedGauge mph={18} maxMph={30} style={{position: 'absolute'}}/>
                </View>
                <BatteryGauge level={72} style={styles.battery}/>
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
    leftSpacer: {
        position: 'absolute',
        transform: [
            {rotate: '155deg'}
        ]
    },
    speedGauge: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightSpacer: {
        position: 'absolute',
        transform: [
            {rotate: '330deg'}
        ]
    },
    battery: {
        alignSelf: 'flex-end'
    }
});

export default Dashboard;