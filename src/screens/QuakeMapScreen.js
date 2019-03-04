import React from "react";
import {toArray} from "lodash";

import {StyleSheet} from 'react-native';
import {Icon, View, Text} from 'native-base';

import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';

import firebase from "react-native-firebase";
import LinearGradient from "react-native-linear-gradient";

export default class QuakeMapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quakes: [],
            user: null
        };
    }

    componentDidMount(): void {
        firebase.database()
            .ref('quakes/')
            .orderBy('timestamp')
            .limitToLast(25)
            .on('value', snapshot => {
                this.setState({
                    quakes: toArray(snapshot.val())
                });
            });

        navigator.geolocation.watchPosition(
            ({coords}) => {
                this.setState({
                    ...this.state,
                    user: {
                        longitude: coords.longitude,
                        latitude: coords.latitude
                    }
                })
            },
            error => {
                console.log(error);
            },
            {
                enableHighAccuracy: false
            });
    }

    render() {
        const distanceDelta = Math.exp(Math.log(360) - (5 * Math.LN2));

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
                        description={quake.timestamp}>
                        <View
                            style={{padding: 8, borderRadius: 999, backgroundColor: 'red', opacity: 0.5}}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>
                                {quake.magnitude % 1 === 0 ? `${quake.magnitude}.0` : quake.magnitude}
                            </Text>
                        </View>
                    </Marker>

                })}
                {
                    this.state.user &&
                    <Marker
                        coordinate={{
                            latitude: this.state.user.latitude,
                            longitude: this.state.user.longitude,
                        }}
                        pinColor='blue'>
                        <Icon type='MaterialIcons' name='gps-fixed' style={{color: 'blue'}} />
                    </Marker>
                }
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
