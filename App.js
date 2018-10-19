import React, {Component} from 'react';
import {View} from 'react-native';

import Dashboard from './src/components/Dashboard';

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#000000'}}>
                <Dashboard/>
            </View>
        );
    }
}
