import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Circle, Path, Text, TextPath} from 'react-native-svg';

class SpeedGauge extends Component {

    getGraySpacer() {
        const size = 365;
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

    getWhiteLine(center) {
        const strokeWidth = 8;
        const radius = center - (strokeWidth / 2);

        return (
            <Circle fill="none"
                    stroke="#ffffff"
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={((2 * Math.PI * (radius)) / 4 * 3)}
            />
        );
    }

    getGrayLine(center) {
        const strokeWidth = 4;
        const radius = center - (strokeWidth / 2) - 35;

        return (
            <Circle fill="none"
                    stroke="#777777"
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={((2 * Math.PI * (radius)) / 4 * 3)}
            />
        );
    }

    getGrayInnerLine(center) {
        const strokeWidth = 15;
        const radius = center - (strokeWidth / 2) - 39;

        return (
            <Circle fill="none"
                    stroke="#000000"
                    opacity="0.7"
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={((2 * Math.PI * (radius)) / 4 * 3)}
            />
        );
    }

    getRedValueLine(center, percentLoad) {
        const load = 75 / 100 * percentLoad;

        const strokeWidth = 54;
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

    getWhiteLineTextPath(center) {
        const transform = "translate(" + center + "," + center + ")";
        const radius = center - 13.6;
        const path = "M " + radius + ",0 A " + radius + "," + radius + " 0 0 1 -" + radius + ",0 A " + radius + "," + radius + " 0 0 1 " + radius + ",0";
        return (
            <Path id="myTextPath" d={path} transform={transform} fill="none"/>
        );
    }

    getWhiteLineText(center) {
        const transform = "translate(" + center + "," + center + ")";

        let i;
        let text = "";
        for (i = 1; i <= 22; i++) {
            text += "|         ";
        }

        return (
            <Text strokeWidth="0" transform={transform}>
                <TextPath stroke="white" href="#myTextPath">{text}</TextPath>
            </Text>
        );
    }

    getMphValue(center, mph) {
        const transform = "rotate(-135 " + center + " " + center + ") translate(" + center + "," + (center - 15) + ")";
        return (
            <Text fontSize="60" fill="red" fontWeight="bold" transform={transform} textAnchor="middle">{mph.toFixed(1)}</Text>
        );
    }

    getMphLabel(center) {
        const transform = "rotate(-135 " + center + " " + center + ") translate(" + center + "," + (center + 10) + ")";
        return (
            <Text fontSize="18" fill="white" transform={transform} textAnchor="middle">MPH</Text>
        );
    }

    getKmhValue(center, mph) {
        const transform = "rotate(-135 " + center + " " + center + ") translate(" + center + "," + (center + 55) + ")";
        const kmh = mph * 1.609344;
        return (
            <Text fontSize="30" fill="red" transform={transform} textAnchor="middle">{kmh.toFixed(1)}</Text>
        );
    }

    getKmhLabel(center) {
        const transform = "rotate(-135 " + center + " " + center + ") translate(" + center + "," + (center + 70) + ")";
        return (
            <Text fontSize="13" fill="white" transform={transform} textAnchor="middle">km/h</Text>
        );
    }

    render() {
        const {mph, maxMph} = this.props;
        const percentLoad = mph / maxMph * 100;

        const size = 300;
        const center = (size / 2);
        const viewBox = "0 0 " + size + " " + size;

        return (
            <View style={{position: 'absolute'}}>
                <View style={styles.speedGauge}>
                    <View style={styles.leftSpacer}>{this.getGraySpacer()}</View>
                    <View style={styles.rightSpacer}>{this.getGraySpacer()}</View>

                    <Svg width={size} height={size} viewBox={viewBox} style={styles.speedGaugeSvg}>
                        {this.getRedValueLine(center, percentLoad)}

                        {this.getWhiteLine(center)}
                        {this.getWhiteLineTextPath(center)}
                        {this.getWhiteLineText(center)}

                        {this.getGrayLine(center)}
                        {this.getGrayInnerLine(center)}

                        {this.getMphValue(center, mph)}
                        {this.getMphLabel(center)}

                        {this.getKmhValue(center, mph)}
                        {this.getKmhLabel(center)}
                    </Svg>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    speedGauge: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    speedGaugeSvg: {
        transform: [
            {rotate: '135deg'}
        ]
    },
    leftSpacer: {
        position: 'absolute',
        transform: [
            {rotate: '155deg'}
        ]
    },
    rightSpacer: {
        position: 'absolute',
        transform: [
            {rotate: '330deg'}
        ]
    }
});

export default SpeedGauge;