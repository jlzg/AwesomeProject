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
    AsyncStorage
} from 'react-native';
import LocalToastAndroid from './LocalToastAndroid';

const styles = StyleSheet.create({
    containerToolbar: {
        flex: 1,
        //justifyContent: 'center',
        justifyContent: 'flex-start',
        // https://github.com/facebook/react-native/issues/2957#event-417214498
        //alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },
    toolbar: {
        backgroundColor: '#e9eaed',
        height: 56,
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


});


//class Room extends Component {
export default class SettingsScene extends Component{

    constructor() {
        super();

        this.state = {
            response: [],
            isLoading: true,
            language: ["Java", "js"],
            favoriteNumber: '6512345678',
            favnumber: ``,
            text: ``//on type, change the state of text here,

        };
    }

    componentDidMount() {

        AsyncStorage.getItem("favnumber").then((value) => {
            if(value != null){
                this.setState({"favnumber": value});
            }
            else{
                this.setState({"favnumber": "Save the favorite number here"});
            }

        }).done();

    }


    saveFavnumber(){

        //console.log("has the time out been activated ?");
        //console.log("has the time out been activated ?");
        AsyncStorage.setItem("favnumber", this.state.favnumber,
            () => LocalToastAndroid.show('Number saved successfully', LocalToastAndroid.SHORT));
        //this.setState({"favnumber": this.state.favnumber});

    }

    navBack(){
        this.props.navigator.pop();
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
                        title="Save the favorite number below"
                        actions={[{title: 'Settings', icon: require('./backIcon.jpg'), show: 'always'}]}
                        onActionSelected={this.props.navigator.pop}
                        onIconClicked={this.props.navigator.pop}
                        titleColor={'#000000'}
                    />



                {/**put textinput and button in a row
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
                 */}
                <View style={styles.inputBarContainer}>
                    <TextInput
                        style={styles.inputBarBottom}
                        onChangeText={(favnumber) => this.setState({favnumber})}
                        //onSubmitEditing={(event) => this.postWebService(event.nativeEvent.text)}
                        value={this.state.favnumber}
                    />
                    <Button
                        style={styles.buttonBottom}
                        onPress={this.saveFavnumber.bind(this)}
                        title="Save"/>
                </View>
            </View>

        );
    }


}



//register of list and text view.
//listview is kepping polling web service response

//textbox for new comments


