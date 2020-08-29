import { useFocusEffect } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTrackContext } from '../context/TrackContext';
import { TrackListFlowStackParamList } from '../types';

type Props = StackScreenProps<TrackListFlowStackParamList, 'TrackList'>;

const TrackListScreen = ({ navigation }: Props) => {

    const { fetchTracks, tracks } = useTrackContext();

    useFocusEffect(
        useCallback(() => {

            fetchTracks();

            return () => { };
        }, [])
    );

    return (
        <>
            <FlatList
                data={tracks}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('TrackDetail', { _id: item._id })}>
                            <ListItem bottomDivider chevron title={item.name} children={null} />
                        </TouchableOpacity>
                    );
                }}
            />
        </>
    );
};

const styles = StyleSheet.create({

});

export default TrackListScreen;