import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import moment from 'moment';

export default class Position extends Component {
    render() {
        let PositionData = this.props.PositionData.coords
        let PositionTimestamp = this.props.PositionData.timestamp
        let allData = Object.keys(PositionData).map((value, key) => {
            return (
                <TouchableHighlight key={key} style={styles.rowContainer}>
                    <Text style={styles.buttonText}>{value}: {PositionData[value]}</Text>
                </TouchableHighlight>
            )
        });

        return (
            <View>
                <Text style={styles.title}>{this.props.name} position:</Text>
                {allData}
                <Text style={styles.title}>Timestamp: {moment(PositionTimestamp).format("MM-DD-YYYY h:mm:ss")}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        marginTop:30,
        margin: 3,
        fontWeight: '700',
        color: '#BFADA3'
    },
    rowContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        margin: 3
    },
    buttonText: {
        fontSize: 15,
        color: '#BFADA3'
    }
});