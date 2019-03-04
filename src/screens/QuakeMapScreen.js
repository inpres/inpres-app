import React from "react";
import {StyleSheet} from 'react-native';

import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';

import firebase from "react-native-firebase";
import {toArray} from "lodash";

export default class QuakeMapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quakes: []
        };
    }

    componentDidMount(): void {
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log(position);
            },
            error => {
                console.log(error);
            },
            {
                enableHighAccuracy: false
            });

        firebase.database()
            .ref('quakes/')
            .orderBy('timestamp')
            .limitToLast(25)
            .on('value', snapshot => {
                this.setState({
                    quakes: toArray(snapshot.val())
                });
            });
    }

    render() {
        const distanceDelta = Math.exp(Math.log(360) - (4 * Math.LN2));

        return (
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: -31.178596,
                    longitude: -64.289182,
                    latitudeDelta: distanceDelta,
                    longitudeDelta: distanceDelta,
                }}>
                {this.state.quakes.map((quake, index) => {
                    return <Marker
                        key={index}
                        coordinate={{
                            latitude: parseFloat(quake.latitude),
                            longitude: parseFloat(quake.longitude),
                        }}
                        title={quake.place}
                        description={quake.timestamp}
                    />

                })}
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
