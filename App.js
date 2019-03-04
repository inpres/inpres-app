import React from 'react';

import {Icon, Button, Text} from "native-base";
import {createBottomTabNavigator, createStackNavigator, createAppContainer} from 'react-navigation';

import QuakeListScreen from "./src/screens/QuakeListScreen";
import QuakeMapScreen from "./src/screens/QuakeMapScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import QuakeViewScreen from "./src/screens/QuakeViewScreen";

const headerDefaultOptions = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: 'blue',
        },
        headerTintColor: '#fff',
    }
};

const MainTabNavigator = createBottomTabNavigator({
    'QuakeList': createStackNavigator({
        QuakeList: {
            screen: QuakeListScreen,
            navigationOptions: {
                title: 'Últimos sismos'
            }
        }
    }, headerDefaultOptions),
    'QuakeMap': createStackNavigator({
        QuakeMap: {
            screen: QuakeMapScreen,
            navigationOptions: {
                title: 'Mapa de sismos'
            }
        }
    }, headerDefaultOptions),
    'Settings': createStackNavigator({
        Settings: {
            screen: SettingsScreen,
            navigationOptions: {
                title: 'Configuración'
            }
        }
    }, headerDefaultOptions)
}, {
    initialRouteName: "QuakeList",
    defaultNavigationOptions: ({navigation}) => ({
        headerStyle: {
            backgroundColor: 'blue',
        },
        headerTintColor: '#fff',
        tabBarIcon: ({tintColor}) => {
            const {routeName} = navigation.state;
            let iconName;

            switch (routeName) {
                case 'QuakeList':
                    iconName = 'list';
                    break;
                case 'QuakeMap':
                    iconName = 'map';
                    break;
                case 'Settings':
                    iconName = 'settings';
                    break;
            }
            return <Icon name={iconName} style={{color: tintColor}}/>;
        },
    }),
    tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: '#ccc',
        activeBackgroundColor: '#0000ff',
        inactiveBackgroundColor: '#0000d0',
        showLabel: false
    }
});

const StackNavigator = createStackNavigator({
    'Home': {
        screen: MainTabNavigator,
        navigationOptions: () => ({
            header: null
        })
    },
    'QuakeView': {
        screen: QuakeViewScreen,
        navigationOptions: {
            // title: 'Drretalle de sismo',
            headerBackImage: <Icon name='md-arrow-back' style={{color: 'blue'}}/>,
            headerStyle: {
                backgroundColor: 'white',
                elevation: 2,
            },
            /*headerRight: (
                <Text onPress={() => alert('This is a button!')}
                      style={{
                          color: 'blue',
                          marginRight: 10
                      }}>
                    ¿Sentiste este sismo?
                </Text>
            ),*/
        }
    }
});

const AppContainer = createAppContainer(StackNavigator);

export default class App extends React.Component<Props> {
    constructor() {
        super();
        this.state = {
            title: ''
        };
    }

    setTitle = (newTitle) => {
        this.setState({
            title: newTitle
        })
    };

    render() {
        return (
            <AppContainer style={{
                margin: 0,
                padding: 0
            }} screenProps={{setTitle: this.setTitle}}/>
        );
    }
}
