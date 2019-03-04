import React from 'react';

import {Body, Left, ListItem, Text, Right, Icon} from "native-base";
import LinearGradient from "react-native-linear-gradient";

export default class QuakeListItem extends React.Component {
    render() {
        const quake = this.props.quake;
        return (
            <ListItem button
                      onPress={() => this.props.navigation.navigate('QuakeView', {'quakeId': quake._id})}
                      style={{paddingVertical: 0}}
                      avatar
                      itemDivider={false}>
                <Left style={{marginTop: quake.automatic ? 10 : 0}}>
                    <LinearGradient
                        start={{x: 0, y: 1}} end={{x: 1, y: 0}}
                        colors={['#ffb60b', '#df6c25']}
                        style={{padding: 8, borderRadius: 999}}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>
                            {quake.magnitude % 1 === 0 ? `${quake.magnitude}.0` : quake.magnitude}
                        </Text>
                    </LinearGradient>
                </Left>
                <Body style={{border: 'none'}}>
                    <Text>{quake.place}</Text>
                    <Text note style={{fontStyle: 'italic'}}>
                        {quake.date} {quake.time}
                    </Text>
                    {
                        quake.automatic &&
                        <Text note style={{color: quake.automatic ? 'red' : 'green'}}>
                            {quake.automatic ? 'Detectado automáticamente' : 'Veificado'}
                        </Text>
                    }
                </Body>
                <Right style={{
                    justifyContent: 'center',
                }}>
                    <Icon name='ios-arrow-forward'/>
                </Right>
            </ListItem>
        )
    }
}
