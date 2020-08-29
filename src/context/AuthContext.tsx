import AsyncStorage from '@react-native-community/async-storage';
import React, { useReducer } from "react";
import trackerApi from '../api/tracker';
import { AuthAction, AuthContextType, AuthState, LoginCredentials } from "../types";
import createContext from "./createContext";

function reducer(prevState: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case 'LOADING':
            return {
                ...prevState,
                isLoading: true,
                errorMessage: null
            };
        case 'SIGN_OUT':
            return {
                ...prevState,
                isLoading: false,
                restoringToken: false,
                token: null,
                errorMessage: null
            };
        case 'SIGN_IN':
            return {
                ...prevState,
                restoringToken: false,
                isLoading: false,
                token: action.token,
                errorMessage: null
            };
        case 'ADD_ERROR':
            return {
                ...prevState,
                isLoading: false,
                errorMessage: action.errorMessage
            };
        case 'CLEAR_ERROR_MESSAGE':
            return {
                ...prevState,
                errorMessage: null
            }
    }
};

const [useAuthContext, CurrentUserProvider] = createContext<AuthContextType>();

type Props = {
    children: React.ReactNode
};

const AuthProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(reducer,
        {
            restoringToken: true,
            isLoading: false,
            token: null,
            errorMessage: null
        });

    const signIn = async ({ email, password }: LoginCredentials) => {
        try {
            dispatch({ type: 'LOADING' });

            const response = await trackerApi.post('/signin', { email, password });
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: 'SIGN_IN', token: response.data.token });

        } catch (err) {
            dispatch({ type: 'ADD_ERROR', errorMessage: 'Something went wrong' });
        }
    };

    const signUp = async ({ email, password }: LoginCredentials) => {
        try {
            dispatch({ type: 'LOADING' });

            const response = await trackerApi.post('/signup', { email, password });
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: 'SIGN_IN', token: response.data.token });

        } catch (err) {
            dispatch({ type: 'ADD_ERROR', errorMessage: 'Something went wrong' });
        }
    };

    const signOut = async () => {
        await AsyncStorage.removeItem('token');

        dispatch({ type: 'SIGN_OUT' });
    };

    const clearErrorMessage = () => {
        dispatch({ type: 'CLEAR_ERROR_MESSAGE' });
    }

    const tryLocalSignin = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            dispatch({ type: 'SIGN_IN', token });
        } else {
            dispatch({ type: 'SIGN_OUT' });
        }
    };

    return (
        <CurrentUserProvider value={
            {
                isLoading: state.isLoading,
                token: state.token,
                errorMessage: state.errorMessage,
                restoringToken: state.restoringToken,
                signIn,
                signUp,
                signOut,
                clearErrorMessage,
                tryLocalSignin
            }}>
            {children}
        </CurrentUserProvider>
    );
};

export { useAuthContext, AuthProvider };
