/**
 * Created by lwpro on 11/26/2016.
 */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/***
 * TODO: how to another service (js), to call the web service of publishing messages
 * TODO: how to another service (js), to call the web service of subscribing messages
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    ListView,
    TextInput,
    image,
    Button,
    ActivityIndicator,
    MapView,
    Picker,
    WebView
} from 'react-native';

class Room extends Component {
    render() {
        return (
            <View>
                <Text style={styles.welcome}>
                    Welcome to Room !
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions}>
                    Double tap R on your keyboard to reload,{'\n'}
                    Shake or press menu button for dev menu
                </Text>
                <Text>
                    This is another line here, to be replaced with buttons.
                </Text>
            </View>
        );
    }
}


AppRegistry.registerComponent('Room', () => Room);

//index is always the entry point ?