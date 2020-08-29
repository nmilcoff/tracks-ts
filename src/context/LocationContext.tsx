import { GeolocationResponse } from "@react-native-community/geolocation";
import React, { useReducer } from "react";
import { LocationAction, LocationContextType, LocationState } from "../types";
import createContext from './createContext';

const locationReducer = (state: LocationState, action: LocationAction): LocationState => {
    switch (action.type) {
        case 'ADD_CURRENT_LOCATION':
            return { ...state, currentLocation: action.location };

        case 'ADD_LOCATION':
            return { ...state, locations: [...state.locations, action.location] };

        case 'START_RECORDING':
            return { ...state, recording: true };

        case 'STOP_RECORDING':
            return { ...state, recording: false };

        case 'CHANGE_NAME':
            return { ...state, name: action.name };

        case 'RESET':
            return { ...state, name: '', locations: [] };

        default:
            return state;
    }
};

const [useLocationContext, CurrentLocationProvider] = createContext<LocationContextType>();

type Props = {
    children: React.ReactNode
};

const LocationProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(locationReducer, {
        recording: false,
        locations: [],
        currentLocation: null,
        name: ''
    });

    const startRecording = () => {
        dispatch({ type: 'START_RECORDING' });
    };
    const stopRecording = () => {
        dispatch({ type: 'STOP_RECORDING' });
    };
    const addLocation = (location: GeolocationResponse, recording: boolean) => {
        console.log("received location!");

        dispatch({ type: 'ADD_CURRENT_LOCATION', location });

        if (recording) {
            dispatch({ type: 'ADD_LOCATION', location });
        }
    };

    const changeName = (name: string) => {
        dispatch({ type: 'CHANGE_NAME', name });
    };

    const reset = () => {
        dispatch({ type: 'RESET' });
    }

    return (
        <CurrentLocationProvider value={
            {
                recording: state.recording,
                locations: state.locations,
                currentLocation: state.currentLocation,
                name: state.name,
                startRecording,
                stopRecording,
                addLocation,
                changeName,
                reset
            }}>
            {children}
        </CurrentLocationProvider>
    );
};

export { useLocationContext, LocationProvider };
