import React from 'react';
import { StyleSheet } from 'react-native';
import { AuthProvider } from './context/AuthContext';
import { LocationProvider } from './context/LocationContext';
import { TrackProvider } from './context/TrackContext';
import Navigator from './Navigator';

const App = () => {

    return (
        <TrackProvider>
            <LocationProvider>
                <AuthProvider>
                    <Navigator />
                </AuthProvider>
            </LocationProvider>
        </TrackProvider>
    );
};

const styles = StyleSheet.create({
});

export default App;
