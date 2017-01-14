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
        justifyContent: 'flex-start',
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
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

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


});


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
                this.setState({"favnumber": "+1-541-754-3010"});
            }

        }).done();

    }

    saveFavnumber(){
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
                        //onActionSelected={this.props.navigator.pop}
                        onActionSelected={this.navBack.bind(this)}
                        //onIconClicked={this.props.navigator.pop}
                        onIconClicked={this.navBack.bind(this)}
                        titleColor={'#000000'}
                    />

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


