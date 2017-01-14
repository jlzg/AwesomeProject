/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    ListView,
    Linking,
    TextInput,
    image,
    Button,
    ActivityIndicator,
    MapView,
    Picker,
    WebView,
    StatusBar,
    TouchableOpacity,
    Navigator,
    TouchableHighlight,
    ToolbarAndroid
} from 'react-native';

import TapScene from './TapScene';
import SettingsScene from './Settings';



class Room extends Component{

    navigatorRenderScene(route, navigator) {
        //_navigator = navigator;
        switch (route.id) {
            case 'default':
                return (<TapScene title={route.title} navigator={navigator} {...route.passProps} />);
            case 'settings':
                return (<SettingsScene title={route.title}  navigator={navigator} />);
        }

    };

    render(){
        const routes = [
            {title: 'Tap Scene', id: 'default'},
            {title: 'Settings Scene', id: 'settings'},
        ];

        return (
            <Navigator
                initialRoute={{ title: 'Tap Scene', id: 'default' }}
                renderScene={this.navigatorRenderScene}
            />
        );
    }
}


//index should be the *navigator page, where real scene/pages should be separate js

//Room as the entry page
AppRegistry.registerComponent('Tap2Call', () => Room);

