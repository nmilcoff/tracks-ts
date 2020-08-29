import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import MapView, { Circle, Polyline } from 'react-native-maps';
import { useLocationContext } from '../context/LocationContext';

const Map = () => {

    const { currentLocation, locations } = useLocationContext();

    if (!currentLocation) {
        return <ActivityIndicator size="large" style={{ marginTop: 200 }} color="#00ff00" />;
    }

    return (
        <MapView
            style={styles.map}
            initialRegion={{
                ...currentLocation.coords,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }} >
            <Circle
                center={currentLocation.coords}
                radius={30}
                strokeColor='rgba(158, 158, 255, 1.0)'
                fillColor='rgba(158, 158, 255, 0.3)' />
            <Polyline coordinates={locations.map(loc => loc.coords)} />
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        height: 300
    }
});

export default Map;