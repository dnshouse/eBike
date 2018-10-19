import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Svg, {Path, G} from 'react-native-svg';
import BatteryGauge from './BatteryGauge';

class RightSidebar extends Component {
    render() {
        const {batteryLevel} = this.props;

        return (
            <View style={styles.container}>
                <View style={[styles.box, styles.batteryBox]}>
                    <BatteryGauge style={styles.battery} level={batteryLevel}/>
                    <Text style={styles.label}>Battery Charge</Text>
                </View>
                <TouchableOpacity style={[styles.box, styles.otherBox]}>
                    <View>
                        <Svg style={styles.icon} width={icon.width} height={icon.height} viewBox={icon.viewBox}>
                            <G>
                                <G>
                                    <Path
                                        d="m7.019,18.39c0.208,4.236 3.752,7.61 8.108,7.61 3.859,0 7.084-2.651 7.913-6.203-7.517,1.214-9.003-3.242-16.021-1.407z"
                                        fill="#FFFFFF"/>
                                </G>
                            </G>
                            <G>
                                <G>
                                    <Path fill-rule="evenodd"
                                          d="m9,15c-0.553,0-1,0.447-1,1 0,0.553 0.447,1 1,1 0.553,0 1-0.447 1-1 0-0.553-0.447-1-1-1zm2.446-4.656c-0.477-0.276-1.09-0.112-1.366,0.366l-1,1.731c-0.275,0.479-0.111,1.09 0.366,1.366 0.479,0.276 1.09,0.112 1.366-0.366l1-1.731c0.277-0.479 0.113-1.09-0.366-1.366z"
                                          fill="#FFFFFF"/>
                                </G>
                            </G>
                            <G>
                                <G>
                                    <Path
                                        d="m20,7.102v-3.102c0-0.553-0.447-1-1-1h-1v-2c0-0.553-0.447-1-1-1h-4c-0.553,0-1,0.447-1,1v2h-1c-0.553,0-1,0.447-1,1v3.102c-4.128,1.897-7,6.057-7,10.898 0,6.627 5.373,12 12,12s12-5.373 12-12c0-4.841-2.872-9.001-7-10.898zm-6-5.102h2v1h-2v-1zm-2,3h6v2h-6v-2zm3,23c-5.523,0-10-4.477-10-10 0-3.967 2.315-7.384 5.663-9h8.674c3.348,1.616 5.663,5.033 5.663,9 0,5.523-4.477,10-10,10z"
                                        fill="#FFFFFF"/>
                                </G>
                            </G>
                        </Svg>
                        <Text style={styles.label}>Magic Button</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const icon = {
    width: 100,
    height: 50,
    viewBox: "0 0 30 30"
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        height: '100%'
    },
    box: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    batteryBox: {
        height: '60%',
        borderBottomWidth: 1,
        borderBottomColor: '#777777',
        paddingTop: 25
    },
    otherBox: {
        height: '40%'
    },
    label: {
        fontSize: 12,
        color: 'white',
        textAlign: 'center',
        marginTop: 12,
        marginBottom: 12
    }
});

export default RightSidebar;