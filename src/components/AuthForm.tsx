import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { LoginCredentials } from '../types';
import Spacer from './Spacer';

type Props = {
    headerText: String,
    errorMessage: String | null,
    isLoading: boolean
    onSubmit: ({ email, password }: LoginCredentials) => void,
    submitButtonText: string
};
const AuthForm = ({ headerText, isLoading, errorMessage, onSubmit, submitButtonText }: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <Spacer>
                <Text h3>{headerText}</Text>
            </Spacer>
            <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize='none'
                autoCorrect={false} />
            <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                autoCapitalize='none'
                autoCorrect={false} />
            {isLoading ? <ActivityIndicator style={styles.loadingIndicator} size="large" color='#0000ff' /> : null}
            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
            <Button
                title={submitButtonText}
                onPress={() => onSubmit({ email, password })} />
        </>
    );
};

const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 16,
        color: '#ff0000',
        marginBottom: 15
    },
    loadingIndicator: {
        margin: 10
    },
});

export default AuthForm;