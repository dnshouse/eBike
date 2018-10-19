import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import Svg, {Circle, Path, Text, TextPath} from 'react-native-svg';

class LoadGauge extends Component {

    getWhiteLine(center) {
        const load = 25;
        const strokeWidth = 35;
        const radius = center - (strokeWidth / 2);

        const circumference = (2 * Math.PI * radius);
        const dashOffset = circumference * (1 - (load / 100));

        return (
            <Circle fill="none"
                    stroke="white"
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
            />
        );
    }

    getRedValueLine(center, percentLoad) {
        const load = 25 / 100 * percentLoad;
        const strokeWidth = 35;
        const radius = center - (strokeWidth / 2);

        const circumference = (2 * Math.PI * radius);
        const dashOffset = circumference * (1 - (load / 100));

        return (
            <Circle fill="none"
                    stroke="red"
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
            />
        );
    }

    getTextPath(center) {
        const radius = center - 21;
        const transform = "translate(" + center + "," + center + ")";
        const path = "M " + radius + ",0 A " + radius + "," + radius + " 0 0 1 -" + radius + ",0 A " + radius + "," + radius + " 0 0 1 " + radius + ",0";
        return (
            <Path id="myTextPath" d={path} transform={transform} fill="none"/>
        );
    }

    getText(center) {
        const transform = "translate(" + center + "," + center + ")";

        let i;
        let text = "   ";
        for (i = 1; i <= 16; i++) {
            text += "   |   ";
        }

        return (
            <Text strokeWidth="0" transform={transform}>
                <TextPath stroke="grey" href="#myTextPath">{text}</TextPath>
            </Text>
        );
    }

    render() {
        const {load} = this.props;

        const size = 450;
        const center = size / 2;
        const viewBox = "0 0 " + size + " " + size;

        return (
            <Svg width={size} height={size} viewBox={viewBox} style={styles.loadGauge}>
                {this.getWhiteLine(center)}
                {this.getRedValueLine(center, load)}
                {this.getTextPath(center)}
                {this.getText(center)}
            </Svg>
        );
    }
}

const styles = StyleSheet.create({
    loadGauge: {
        position: 'absolute',
        transform: [
            {rotate: '135deg'}
        ]
    }
});

export default LoadGauge;