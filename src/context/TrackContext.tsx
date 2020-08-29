import { GeolocationResponse } from '@react-native-community/geolocation';
import React, { useReducer } from 'react';
import trackerApi from '../api/tracker';
import { Track, TrackAction, TrackContextType, TrackState } from '../types';
import createContext from './createContext';

const reducer = (state: TrackState, action: TrackAction): TrackState => {
    switch (action.type) {
        case 'FETCH_TRACKS':
            return { ...state, tracks: action.tracks };
        default:
            return state;
    }
};

const [useTrackContext, TrackContextProvider] = createContext<TrackContextType>();

type Props = {
    children: React.ReactNode
};

const TrackProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(reducer,
        {
            tracks: []
        });

    const fetchTracks = async () => {
        const response = await trackerApi.get<Track[]>('/tracks');

        dispatch({ type: 'FETCH_TRACKS', tracks: response.data });
    };

    const createTrack = async (name: string, locations: GeolocationResponse[]) => {
        await trackerApi.post('/tracks', { name, locations });
    };

    return (
        <TrackContextProvider value={
            {
                tracks: state.tracks,
                fetchTracks,
                createTrack
            }}>
            {children}
        </TrackContextProvider>
    );
};

export { useTrackContext, TrackProvider };
