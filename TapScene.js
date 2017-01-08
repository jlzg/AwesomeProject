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
    ToolbarAndroid
} from 'react-native';
import _ from 'lodash';
import LocalToastAndroid from './LocalToastAndroid';
import Drawer from 'react-native-drawer';



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
            text: ``//on type, change the state of text here,

        };
    }

    componentDidMount() {
        TimerMixin.setTimeout(
            () => {
                this.loadWebService();
            },
            500
        );
        //after mount, keep polling to update the json response
        this.timer = TimerMixin.setInterval(() => {
            this.loadWebService();
            //debugger;
            // console.log(`current timer: ${new Date()}`);
            // return fetch('https://facebook.github.io/react-native/movies.json')
            //     .then((response) => response.json())
            //     .then((responseJson) => {
            //         console.log("check response: " + responseJson.movies.length);
            //         this.setState({response: responseJson.movies});
            //         this.setState({isLoading: false});
            //         this.setState({dataSource: this.state.dataSource.cloneWithRows(responseJson.movies)});
            //         return responseJson.movies;
            //         //this is background thread, keep polling for new request
            //     })
            //     .catch((error) => {
            //         console.error(error);
            //     });
        }, 60000);
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
        LocalToastAndroid.call('+6512345678 ');
    };

    handleOpenurl(url) {
        //url = "http://www.google.com";
        url = "sms:+6512345678?body=test message";
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
            id: 'settings'
        })
    }

    render() {

        const routes = [
            {title: 'First Scene', index: 0},
            {title: 'Second Scene', index: 1},
        ];

        return (
            <View style={{flexDirection: 'column', flex: 1}}>
                <StatusBar
                    backgroundColor="black"
                    barStyle="light-content"
                />

                <ToolbarAndroid style={styles.toolbar}
                                title={this.props.title}
                                titleColor={'#FFFFFF'}/>
                <TouchableHighlight onPress={this.navSecond.bind(this)}>
                    <Text>Settings</Text>
                </TouchableHighlight>
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

                <TouchableOpacity
                    onPress={this.handleClick.bind(this)}>
                    <View style={styles.button}>
                        <Text style={styles.text}>Tap2call</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this.handleToast.bind(this)}>
                    <View style={styles.button}>
                        <Text style={styles.text}>Show Toast</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this.handleOpenurl.bind(this)}>
                    <View style={styles.button}>
                        <Text style={styles.text}>Leave a message</Text>
                    </View>
                </TouchableOpacity>
                {/***
                 <Drawer
                 ref={(ref) => this._drawer = ref}
                 content={<ControlPanel />}
                 >
                 <MainView />
                 </Drawer>
                 */}

                <ScrollView>
                    {/***
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={row =>
                            <Text>{row.title}: {row.releaseYear}</Text>}
                        enableEmptySections={true}
                    />
                     */}
                    <Text style={styles.welcome}>
                        {_.capitalize(`Just tap the screen to launch the favorite call!`)}
                        {`${_.capitalize(`just tap the screen`)} ${_.capitalize(`to launch the favorite call!`)}`}
                    </Text>
                </ScrollView>



                {/**put textinput and button in a row*/}
                <View style={styles.inputBarContainer}>
                    <TextInput
                        style={styles.inputBarBottom}
                        onChangeText={(text) => this.setState({text})}
                        //onSubmitEditing={(event) => this.postWebService(event.nativeEvent.text)}
                        value={this.state.text}
                    />
                    <Button
                        style={styles.buttonBottom}
                        onPress={this.postWebService.bind(this)}
                        title="speak"/>
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


