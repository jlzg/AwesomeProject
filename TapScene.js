/**
 * Created by lwpro on 1/8/2017.
 */
import React, {Component} from 'react';
import TimerMixin from 'react-timer-mixin';
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


} from 'react-native';
import _ from 'lodash';
import LocalToastAndroid from './LocalToastAndroid';
//import  nativeImageSource from 'nativeImageSource';



//import {Button}    from 'react-native-button';
var HEADER = '#3b5998';
var BGWASH = 'rgba(255,255,255,0.8)';
var DISABLED_WASH = 'rgba(255,255,255,0.25)';

var TEXT_INPUT_REF = 'urlInput';
var WEBVIEW_REF = 'webview';
var DEFAULT_URL = 'https://m.facebook.com';

var styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#F5FCFF',
    // },
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
        //paddingLeft: 10,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.5

    },
    inputBarBottom: {
        fontSize: 20,
        //height: 40,
        //width: 400,
        padding: 10,
        textAlign: 'left',
        flex:1,

    },
    buttonBottom: {
        fontSize: 20,
        borderColor: 'gray',
        //position: 'absolute',
        //left:     0,
        //right: 0,
        //bottom: 0,
        //flexDirection: 'row',

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
    // button: {
    //     flex: 0.5,
    //     width: 0,
    //     margin: 5,
    //     borderColor: 'gray',
    //     borderWidth: 1,
    //     backgroundColor: 'gray',
    // },
});

//class Room extends Component {
export default class TapScene extends Component{

    closeControlPanel(){
        this.refs.drawer.close()
    }
    openControlPanel(){
        this.refs.drawer.open()
    }
    constructor() {
        super();
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            response: [],
            dataSource: this.ds.cloneWithRows([]),//how to continuous poll the web serviec
            isLoading: true,
            language: ["Java", "js"],
            favoriteNumber: '6512345678',
            favnumber: ``,
            msg:`Leave a message`,
            text: ``//on type, change the state of text here,

        };
    }

    componentDidMount() {

        AsyncStorage.getItem("favnumber").then((value) => {
            this.setState({"favnumber": value});
        }).done();

    }

    shouldComponentUpdate() {

        AsyncStorage.getItem("favnumber").then((value) => {
            this.setState({"favnumber": value});
        }).done();

        return true;

    }

    loadWebService(){

        //console.log("has the time out been activated ?");
        //console.log("has the time out been activated ?");

        return fetch('https://facebook.github.io/react-native/movies.json')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("check response: " + responseJson.movies);
                this.setState({response: responseJson.movies});
                this.setState({isLoading: false});
                this.setState({dataSource: this.state.dataSource.cloneWithRows(responseJson.movies)});
                return responseJson.movies;
                //this is background thread, keep polling for new request
            })
            .catch((error) => {
                console.error(error);
            });
    }

    handleClick() {
        // Linking.canOpenURL('tel:98765432100').then(supported => {
        //     if (supported) {
        //         Linking.openURL('tel:98765432100');
        //     } else {
        //         console.log('Don\'t know how to open URI: ' + 'tel:9876543210');
        //     }
        // });
        //LocalToastAndroid.call('+6512345678 ');

        if(!this.state.favnumber)
            LocalToastAndroid.show('Please set up your favorite number first', LocalToastAndroid.SHORT);
        else
            LocalToastAndroid.call(this.state.favnumber);
    };

    sendMSG(url) {
        //url = "http://www.google.com";
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

    postWebService(){

        //console.log("has the time out been activated ?");
        console.log("posting the message to web service: "+ this.state.text);
        //this.setState({dataSource: this.state.dataSource.cloneWithRows(`{title: this.state.text, releaseYear: '2016'}`)});
        this.setState({text: ""});
        //this.setState({dataSource: this.state.dataSource.cloneWithRows(voice)});
        // return fetch('https://facebook.github.io/react-native/movies.json')
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //         console.log("check response: " + responseJson.movies);
        //         this.setState({response: responseJson.movies});
        //         this.setState({isLoading: false});
        //         this.setState({dataSource: this.state.dataSource.cloneWithRows(responseJson.movies)});
        //         return responseJson.movies;
        //         //this is background thread, keep polling for new request
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
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
                {/***
                    <StatusBar
                        backgroundColor="black"
                        barStyle="light-content"
                    />
                 **/}

                <ToolbarAndroid
                    style={styles.toolbar}
                    actions={[{title: 'Settings', icon: require('./settings.png'), show: 'always'}]}
                    onActionSelected={this.navSecond.bind(this)}
                    onIconClicked={this.navSecond.bind(this)}
                    titleColor={'#000000'}
                />
                {/***
                <ToolbarAndroid style={styles.toolbar}
                                title={this.props.title}
                                titleColor={'#FFFFFF'}/>
                <TouchableHighlight onPress={this.navSecond.bind(this)}>
                    <Text>Settings</Text>
                </TouchableHighlight>
                 */}
                {/***
                 <Navigator
                 initialRoute={{ title: 'Awesome Scene', index: 0 }}
                 renderScene={(route, navigator) =>
                        <Text>Hello {route.title}!</Text>
                    }
                 style={{padding: 100}}
                 />


                 <Navigator
                 initialRoute={routes[0]}
                 initialRouteStack={routes}
                 renderScene={(route, navigator) =>
                        <TouchableHighlight onPress={() => {
                            if (route.index === 0) {
                                navigator.push(routes[1]);
                            } else {
                                navigator.pop();
                            }
                        }}>
                            <Text>Hello {route.title}!</Text>
                        </TouchableHighlight>
                    }
                 style={{padding: 100}}
                 />
                 */}
                <View style={{alignSelf: "stretch", flex: 9, alignItems: 'stretch'}}>
                <TouchableOpacity
                    style={{flex:1}}
                    onPress={this.handleClick.bind(this)}>
                    {/***
                    <View style={{alignSelf: "stretch", flex: 1}}>
                        <Text>Tap2call</Text>
                    </View>
                     ***/}
                    <Image
                        style={{flex:1}}
                    />
                    <Text style={styles.welcome}>
                        {`${_.capitalize(`just tap the screen to call favorite.`)}`}
                    </Text>
                </TouchableOpacity>
                </View>


                {/**put textinput and button in a row*/}
                <View style={styles.inputBarContainer}>
                    <TextInput
                        style={styles.inputBarBottom}
                        onChangeText={(msg) => this.setState({msg})}
                        //onSubmitEditing={(event) => this.postWebService(event.nativeEvent.text)}
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

    //vs the approach of web socket, being pushed from the server ?
    pollChats(){
        //how to make this continuously keep polling
        return setTimeout(function(){
            fetch('https://facebook.github.io/react-native/movies.json')
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log("check response: "+ responseJson.movies);
                    this.setState({response: responseJson.movies});
                    this.setState({isLoading: false});
                    this.setState({dataSource: this.state.dataSource.cloneWithRows(responseJson.movies)});
                    return responseJson.movies;
                })
                .catch((error) => {
                    console.error(error);
                });
        }, 6000);
        // return fetch('https://facebook.github.io/react-native/movies.json')
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //         console.log("check response: "+ responseJson.movies);
        //         this.setState({response: responseJson.movies});
        //         this.setState({isLoading: false});
        //         this.setState({dataSource: this.state.dataSource.cloneWithRows(responseJson.movies)});
        //         return responseJson.movies;
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
    }
}



//register of list and text view.
//listview is kepping polling web service response

//textbox for new comments


