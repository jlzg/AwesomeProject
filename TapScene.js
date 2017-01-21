/**
 * Created by lwpro on 1/8/2017.
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
    ToolbarAndroid,
    AsyncStorage,
    Image,
    AppState
} from 'react-native';
import _ from 'lodash';
import LocalToastAndroid from './LocalToastAndroid';
var HEADER = '#3b5998';
var BGWASH = 'rgba(255,255,255,0.8)';
var DISABLED_WASH = 'rgba(255,255,255,0.25)';

var styles = StyleSheet.create({
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    inputBarContainer: {
        fontSize: 20,
        borderColor: 'gray',
        position: 'absolute',
        left:     0,
        paddingLeft: 10,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.5

    },
    inputBarBottom: {
        fontSize: 20,
        padding: 10,
        textAlign: 'left',
        flex:1,
    },
    buttonBottom: {
        fontSize: 20,
        borderColor: 'gray',
    },

    container: {
        flex: 1,
        backgroundColor: HEADER,
    },
    addressBarRow: {
        flexDirection: 'row',
        padding: 8,
    },
    webView: {
        backgroundColor: BGWASH,
        height: 350,
    },
    addressBarTextInput: {
        backgroundColor: BGWASH,
        borderColor: 'transparent',
        borderRadius: 3,
        borderWidth: 1,
        height: 24,
        paddingLeft: 10,
        paddingTop: 3,
        paddingBottom: 3,
        flex: 1,
        fontSize: 14,
    },
    navButton: {
        width: 20,
        padding: 3,
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BGWASH,
        borderColor: 'transparent',
        borderRadius: 3,
    },
    disabledButton: {
        width: 20,
        padding: 3,
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: DISABLED_WASH,
        borderColor: 'transparent',
        borderRadius: 3,
    },
    goButton: {
        height: 24,
        padding: 3,
        marginLeft: 8,
        alignItems: 'center',
        backgroundColor: BGWASH,
        borderColor: 'transparent',
        borderRadius: 3,
        alignSelf: 'stretch',
    },
    statusBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        height: 22,
    },
    statusBarText: {
        color: 'white',
        fontSize: 13,
    },
    spinner: {
        width: 20,
        marginRight: 6,
    },
    buttons: {
        flexDirection: 'row',
        height: 30,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    toolbar: {
        backgroundColor: '#e9eaed',
        height: 56,
        //flex: 0.5
    },
});


export default class TapScene extends Component{
    constructor() {
        super();
        this.state = {
            response: [],
            isLoading: true,
            favoriteNumber: '6512345678',
            favnumber: ``,
            msg:`Leave a message`,
            //appState: ``,
            //previousAppState:``,
            text: ``//on type, change the state of text here,

        };

        AsyncStorage.getItem("favnumber").then((value) => {
            this.setState({"favnumber": value});
        }).done(
            () =>
            {
                if(this.state.favnumber)
                    LocalToastAndroid.call(this.state.favnumber)
            }
        );

        //AppState.addEventListener('change', this._handleAppStateChange);
        //LocalToastAndroid.show("from constructor: "+AppState.currentState, LocalToastAndroid.SHORT);
    }

    // _handleAppStateChange (appState)  {
    //     //var previousAppStates = this.state.previousAppStates.slice();
    //     //previousAppStates.push(this.state.appState);
    //     if(this.state.previousAppState != appState && this.state.previousAppState == 'background') {
    //         this.setState({"previousAppState": appState});
    //         if (this.state.favnumber)
    //             LocalToastAndroid.call(this.state.favnumber);
    //     }
    // };

    componentDidMount() {
        AsyncStorage.getItem("favnumber").then((value) => {
            this.setState({"favnumber": value});
        }).done(
            // () =>
            // {
            //     if(this.state.favnumber)
            //         LocalToastAndroid.call(this.state.favnumber)
            // }
        );
        //LocalToastAndroid.show("from did mount: "+this.state.favnumber, LocalToastAndroid.SHORT);
        // if(this.state.favnumber)
        //     LocalToastAndroid.call(this.state.favnumber);
    }

    shouldComponentUpdate() {
        AsyncStorage.getItem("favnumber").then((value) => {
            this.setState({"favnumber": value});
        }).done();
        return true;
    }

    handleClick() {
        if(!this.state.favnumber)
            LocalToastAndroid.show('Please set up your favorite number first', LocalToastAndroid.SHORT);
        else
            LocalToastAndroid.call(this.state.favnumber);
    };

    sendMSG(url) {
        url = "sms:+"+this.state.favnumber+"?body="+this.state.msg+"";
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log('Don\'t know how to open URI: ' + url);
            }
        });
    };


    handleToast() {
        LocalToastAndroid.show('Awesome', LocalToastAndroid.SHORT);
    };

    navSecond(){
        this.props.navigator.push({
            id: 'settings',
            title: 'Settings Scene'
        })
    }

    render() {

        const routes = [
            {title: 'First Scene', index: 0},
            {title: 'Second Scene', index: 1},
        ];

        return (
            <View style={{flexDirection: 'column', flex: 1}}>

                <ToolbarAndroid
                    style={styles.toolbar}
                    actions={[{title: 'Settings', icon: require('./settings.png'), show: 'always'}]}
                    onActionSelected={this.navSecond.bind(this)}
                    onIconClicked={this.navSecond.bind(this)}
                    titleColor={'#000000'}
                />

                <View style={{alignSelf: "stretch", flex: 9, alignItems: 'stretch'}}>
                <TouchableOpacity
                    style={{flex:1}}
                    onPress={this.handleClick.bind(this)}>
                    <Image
                        style={{flex:1}}
                    />
                    <Text style={styles.welcome}>
                        {`${_.capitalize(`just tap the screen to call favorite.`)}`}
                    </Text>
                </TouchableOpacity>
                </View>


                <View style={styles.inputBarContainer}>
                    <TextInput
                        style={styles.inputBarBottom}
                        onChangeText={(msg) => this.setState({msg})}
                        value={this.state.msg}
                    />
                    <Button
                        style={styles.buttonBottom}
                        onPress={this.sendMSG.bind(this)}
                        title="Send"/>
                </View>
            </View>
        );
    }
}
