import { GeolocationResponse } from "@react-native-community/geolocation";

export type LoginFlowStackParamList = {
    Signin: undefined;
    Signup: undefined;
};

export type TrackListFlowStackParamList = {
    TrackList: undefined,
    TrackDetail: { _id: string }
};

export type LoginCredentials = {
    email: string,
    password: string
};

export type AuthState = {
    restoringToken: boolean,
    isLoading: boolean,
    token: string | null,
    errorMessage: string | null
};

export type AuthAction =
    | { type: 'LOADING' }
    | { type: 'SIGN_OUT' }
    | { type: 'CLEAR_ERROR_MESSAGE' }
    | { type: 'SIGN_IN', token: string | null }
    | { type: 'ADD_ERROR', errorMessage: string };

export type AuthContextType = {
    signIn(credentials: LoginCredentials): void,
    signUp(credentials: LoginCredentials): void,
    signOut(): void,
    clearErrorMessage(): void,
    tryLocalSignin(): void,
} & AuthState;

export type LocationAction =
    | { type: 'GET_LOCATION' }
    | { type: 'START_RECORDING' }
    | { type: 'STOP_RECORDING' }
    | { type: 'ADD_CURRENT_LOCATION', location: GeolocationResponse }
    | { type: 'ADD_LOCATION', location: GeolocationResponse }
    | { type: 'CHANGE_NAME', name: string }
    | { type: 'RESET' };

export type LocationState = {
    recording: boolean,
    locations: GeolocationResponse[],
    currentLocation: GeolocationResponse | null,
    name: string
};

export type LocationContextType = {
    startRecording(): void,
    stopRecording(): void,
    addLocation(location: GeolocationResponse, recording: boolean): void,
    changeName(name: string): void,
    reset(): void
} & LocationState;

export type Track = {
    _id: string,
    name: string,
    locations: GeolocationResponse[]
};

export type TrackAction =
    | { type: 'FETCH_TRACKS', tracks: Track[] };

export type TrackState = {
    tracks: Track[]
};

export type TrackContextType = {
    fetchTracks(): void,
    createTrack(name: string, locations: GeolocationResponse[]): void
} & TrackState;