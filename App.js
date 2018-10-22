import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';
import Orientation from 'react-native-orientation';

import Dashboard from './src/components/Dashboard';
import Settings from './src/components/Settings';
import Map from './src/components/Map';

type Props = {};
export default class App extends Component<Props> {

    componentDidMount() {
        Orientation.lockToLandscape();
    }

    render() {
        return (
            <Swiper style={styles.wrapper} loop={false} showsButtons={false} showsPagination={false}>
                <Map/>
                <Dashboard/>
                <Settings/>
            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#000000'
    }
});