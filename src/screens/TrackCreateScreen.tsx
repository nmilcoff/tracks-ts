import { useIsFocused } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import Map from '../components/Map';
import TrackForm from '../components/TrackForm';
import { useLocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';

const TaskCreateScreen = () => {

    const { addLocation, recording } = useLocationContext();

    const isFocused = useIsFocused();
    const callback = useCallback((location) => {
        addLocation(location, recording);
    }, [recording]);

    const [err] = useLocation(callback, isFocused || recording);

    return (
        <SafeAreaView>
            <Text style={{ fontSize: 48 }}>Create a track</Text>
            <Map />
            {err ? <Text>Please enable location services</Text> : null}
            <TrackForm />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

});

export default TaskCreateScreen;