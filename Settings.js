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
    ToolbarAndroid
} from 'react-native';

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
            text: ``//on type, change the state of text here,

        };
    }


    saveFavnumber(){

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

    navBack(){
        this.props.navigator.pop();
    }

    render() {

        const routes = [
            {title: 'First Scene', index: 0},
            {title: 'Second Scene', index: 1},
        ];

        return (

            <View>
                    <ToolbarAndroid
                        style={styles.toolbar}
                        title="Back"
                        actions={[{title: 'Settings', icon: require('./go-back.png'), show: 'always'}]}
                        onActionSelected={this.props.navigator.pop}
                        onIconClicked={this.props.navigator.pop}
                        titleColor={'#000000'}
                    />

                        <Text>Save the favorite number here</Text>
                <TextInput
                    style={styles.inputBarBottom}
                    onChangeText={(text) => this.setState({text})}
                    //onSubmitEditing={(event) => this.postWebService(event.nativeEvent.text)}
                    value={this.state.text}
                />
                <Button
                    style={styles.buttonBottom}
                    onPress={this.saveFavnumber.bind(this)}
                    title="Save"/>
            </View>

        );
    }


}



//register of list and text view.
//listview is kepping polling web service response

//textbox for new comments


