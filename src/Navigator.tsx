import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuthContext } from './context/AuthContext';
import AccountScreen from './screens/AccountScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import SplashScreen from './screens/SplashScreen';
import TrackCreateScreen from './screens/TrackCreateScreen';
import TrackDetailScreen from './screens/TrackDetailScreen';
import TrackListScreen from './screens/TrackListScreen';
import { LoginFlowStackParamList, TrackListFlowStackParamList } from './types';

const LoginFlowStack = createStackNavigator<LoginFlowStackParamList>();
const TrackListFlowStack = createStackNavigator<TrackListFlowStackParamList>();
const MainFlowTab = createBottomTabNavigator();

function TrackViewStackScreen() {
    return (
        <TrackListFlowStack.Navigator>
            <TrackListFlowStack.Screen
                name="TrackList"
                component={TrackListScreen}
                options={{
                    title: 'Tracks'
                }} />
            <TrackListFlowStack.Screen
                name="TrackDetail"
                component={TrackDetailScreen} />
        </TrackListFlowStack.Navigator>
    );
}

const Navigator = () => {

    const { token, restoringToken } = useAuthContext();

    if (restoringToken) {
        return <SplashScreen />;
    }

    return (
        <NavigationContainer>
            {token
                ? (
                    <MainFlowTab.Navigator>
                        <MainFlowTab.Screen
                            name="TrackViewStack"
                            component={TrackViewStackScreen}
                            options={{
                                tabBarLabel: "Track List",
                                tabBarIcon: () => <Icon name='th-list' size={20} color='#ff0000' />
                            }} />
                        <MainFlowTab.Screen
                            name="TrackCreate"
                            component={TrackCreateScreen}
                            options={{
                                title: 'Add a track',
                                tabBarIcon: () => <Icon name='plus' size={20} color='#00ff00' />
                            }} />
                        <MainFlowTab.Screen
                            name="Account"
                            component={AccountScreen}
                            options={{
                                title: 'Account',
                                tabBarIcon: () => <Icon name='gear' size={20} color='#0000ff' />
                            }} />
                    </MainFlowTab.Navigator>
                ) : (
                    <LoginFlowStack.Navigator screenOptions={{ headerShown: false }}>
                        <LoginFlowStack.Screen
                            name="Signup"
                            component={SignupScreen} />
                        <LoginFlowStack.Screen
                            name="Signin"
                            component={SigninScreen} />
                    </LoginFlowStack.Navigator>
                )}
        </NavigationContainer>
    );
};

export default Navigator;