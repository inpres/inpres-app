import React from "react";
import {ScrollView} from 'react-native'
import {List} from "native-base";
import {orderBy} from 'lodash';

import firebase from 'react-native-firebase';
import QuakeListItem from "../components/QuakeListItem";

export default class QuakeListScreen extends React.Component {
    static navigationOptions = {
        title: 'Últimos sismos',
    };

    constructor(props) {
        super(props);
        this.state = {
            quakes: []
        };
    }

    componentDidMount(): void {
        firebase.database()
            .ref('quakes/')
            .orderBy('key')
            .limitToLast(25)
            .on('value', snapshot => {
                const quakesObj = snapshot.val();
                let quakesArray = [];
                Object.keys(quakesObj).map((quakeId, index) => {
                    quakesArray.push({
                        _id: quakeId,
                        ...quakesObj[quakeId]
                    })
                });
                this.setState({
                    quakes: orderBy(quakesArray, 'timestamp', 'desc')
                });
            });
    }

    render() {
        return (
            <ScrollView>
                <List style={{backgroundColor: 'white'}}>
                    {this.state.quakes.map(quake => {
                        return <QuakeListItem navigation={this.props.navigation} quake={quake} key={quake._id}/>
                    })}
                </List>
            </ScrollView>
        );
    }
}
