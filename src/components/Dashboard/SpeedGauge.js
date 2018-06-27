import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import Svg, {Circle, Path, Text, TextPath} from 'react-native-svg';

class SpeedGauge extends Component {

    getWhiteLine(size) {
        const strokeWidth = 8;
        const center = size / 2;
        const radius = center - (strokeWidth / 2);

        return (
            <Circle fill="none"
                    stroke="#ffffff"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={((2 * Math.PI * (radius)) / 4 * 3)}
            />
        );
    }

    getGrayLine(size) {
        const strokeWidth = 4;
        const center = size / 2;
        const radius = center - (strokeWidth / 2) - 35;

        return (
            <Circle fill="none"
                    stroke="#777777"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={((2 * Math.PI * (radius)) / 4 * 3)}
            />
        );
    }

    getGrayInnerLine(size) {
        const strokeWidth = 15;
        const center = size / 2;
        const radius = center - (strokeWidth / 2) - 39;

        return (
            <Circle fill="none"
                    stroke="#000000"
                    opacity="0.7"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={((2 * Math.PI * (radius)) / 4 * 3)}
            />
        );
    }

    getRedValueLine(size, percentLoad) {
        const load = 75 / 100 * percentLoad;

        const strokeWidth = 54;
        const center = size / 2;
        const radius = center - (strokeWidth / 2);

        const circumference = (2 * Math.PI * radius);
        const dashOffset = circumference * (1 - (load / 100));

        return (
            <Circle fill="none"
                    stroke="red"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
            />
        );
    }

    getWhiteLineTextPath(size) {
        const center = (size / 2);
        const transform = "translate(" + center + "," + center + ")";

        const radius = (size / 2) - 14.7;
        const path = "M " + radius + ",0 A " + radius + "," + radius + " 0 0 1 -" + radius + ",0 A " + radius + "," + radius + " 0 0 1 " + radius + ",0";
        return (
            <Path id="myTextPath" d={path} transform={transform} fill="none"/>
        );
    }

    getWhiteLineText(size) {
        const center = (size / 2);
        const transform = "translate(" + center + "," + center + ")";

        let i;
        let text = "";
        for (i = 1; i <= 20; i++) {
            text += "|            ";
        }

        return (
            <Text strokeWidth="0" transform={transform}>
                <TextPath stroke="white" href="#myTextPath">{text}</TextPath>
            </Text>
        );
    }

    getMphValue(size, mph) {
        const center = (size / 2);
        const transform = "rotate(-135 " + center + " " + center + ") translate(" + center + "," + (center - 20) + ")";

        return (
            <Text fontSize="70" fill="red" fontWeight="bold" transform={transform}
                  textAnchor="middle">{mph.toFixed(1)}</Text>
        );
    }

    getMphLabel(size) {
        const center = (size / 2);
        const transform = "rotate(-135 " + center + " " + center + ") translate(" + center + "," + (center + 10) + ")";

        return (
            <Text fontSize="20" fill="white" transform={transform} textAnchor="middle">MPH</Text>
        );
    }

    getKmhValue(size, mph) {
        const center = (size / 2);
        const transform = "rotate(-135 " + center + " " + center + ") translate(" + center + "," + (center + 70) + ")";
        const kmh = mph * 1.609344;

        return (
            <Text fontSize="45" fill="red" transform={transform} textAnchor="middle">{kmh.toFixed(1)}</Text>
        );
    }

    getKmhLabel(size) {
        const center = (size / 2);
        const transform = "rotate(-135 " + center + " " + center + ") translate(" + center + "," + (center + 90) + ")";

        return (
            <Text fontSize="15" fill="white" transform={transform} textAnchor="middle">km/h</Text>
        );
    }

    render() {
        const {mph, maxMph} = this.props;
        const percentLoad = mph / maxMph * 100;

        const size = 350;
        const viewBox = "0 0 " + size + " " + size;

        return (
            <Svg width={size} height={size} viewBox={viewBox} style={styles.speedGauge}>
                {this.getRedValueLine(size, percentLoad)}

                {this.getWhiteLine(size)}
                {this.getWhiteLineTextPath(size)}
                {this.getWhiteLineText(size)}

                {this.getGrayLine(size)}
                {this.getGrayInnerLine(size)}

                {this.getMphValue(size, mph)}
                {this.getMphLabel(size)}

                {this.getKmhValue(size, mph)}
                {this.getKmhLabel(size)}
            </Svg>
        );
    }
}

const styles = StyleSheet.create({
    speedGauge: {
        transform: [
            {rotate: '135deg'}
        ]
    }
});

export default SpeedGauge;