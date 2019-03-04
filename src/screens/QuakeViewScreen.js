import React from "react";

import {StyleSheet} from 'react-native';
import {Text, Card, CardItem, Body, Container} from "native-base";
import firebase from "react-native-firebase";

import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';

export default class QuakeViewScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quake: {
                timestamp: null,
                depth: null,
                magnitude: null,
                place: null,
                longitude: null,
                latitude: null,
                time: null,
                date: null
            }
        };
    }

    componentDidMount(): void {
        const quakeId = this.props.navigation.getParam('quakeId', 'NO-ID');

        firebase.database()
            .ref(`quakes/${quakeId}`)
            .once('value', snapshopt => {
                this.setState({
                    quake: snapshopt.val()
                });
            });
    }

    render() {
        const distanceDelta = Math.exp(Math.log(360) - (4 * Math.LN2));

        return (
            <Container style={{
                elevation: 2,
            }}>
                <Card style={{
                    paddingBottom: 15,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0,
                    marginLeft: 0,
                    borderWidth: 0,
                    borderRadius: 0,
                    borderColor: 'white',
                }}>
                    <CardItem style={{
                        paddingBottom: 10
                    }}>
                        <Body style={{}}>
                        <Text style={styles.small}>{this.state.quake.date} {this.state.quake.time}</Text>
                        <Text style={styles.big}>{this.state.quake.magnitude}</Text>
                        <Text style={styles.medium}>{this.state.quake.place}</Text>
                        <Text style={styles.small}>{this.state.quake.depth} Km. de profundidad</Text>
                        </Body>
                    </CardItem>
                </Card>

                <Container style={{

                }}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: -31.178596,
                            longitude: -64.289182,
                            latitudeDelta: distanceDelta,
                            longitudeDelta: distanceDelta,
                        }}>
                        {
                            (this.state.quake.latitude && this.state.quake.longitude) &&
                            <Marker
                                coordinate={{
                                    latitude: parseFloat(this.state.quake.latitude),
                                    longitude: parseFloat(this.state.quake.longitude),
                                }}
                                title={this.state.quake.place}
                                description={this.state.quake.timestamp}
                            />
                        }
                    </MapView>
                </Container>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    small: {
        fontStyle: 'italic',
        fontSize: 14,
        width: '100%',
        textAlign: 'center',
        color: 'gray',
        paddingTop: 0,
    },
    medium: {
        width: '100%',
        textAlign: 'center',
        paddingBottom: 5
    },
    big: {
        fontSize: 50,
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
