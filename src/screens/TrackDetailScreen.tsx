import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { useTrackContext } from '../context/TrackContext';
import { TrackListFlowStackParamList } from '../types';

type Props = StackScreenProps<TrackListFlowStackParamList, 'TrackDetail'>;

const TrackDetailScreen = ({ route, navigation }: Props) => {

    const { tracks } = useTrackContext();

    const track = tracks.find(t => t._id === route.params._id);

    if (track === undefined) {
        navigation.goBack();
        return null;
    }

    const initialCoords = track.locations[0].coords;

    return (
        <>
            <Text style={{ fontSize: 48 }}>{track.name}</Text>
            <MapView
                style={styles.map}
                initialRegion={{
                    longitudeDelta: 0.01,
                    latitudeDelta: 0.01,
                    ...initialCoords
                }}>
                <Polyline coordinates={track.locations.map(loc => loc.coords)} />
            </MapView>
        </>
    );
};

const styles = StyleSheet.create({
    map: {
        height: 300
    }
});

export default TrackDetailScreen;