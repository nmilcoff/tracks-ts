import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import Spacer from '../components/Spacer';
import { useAuthContext } from '../context/AuthContext';
import { LoginFlowStackParamList } from '../types';

type Props = StackScreenProps<LoginFlowStackParamList, 'Signup'>;

const SignupScreen = ({ navigation }: Props) => {

    const { isLoading, errorMessage, signUp, clearErrorMessage } = useAuthContext();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => clearErrorMessage);

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Spacer>
                <AuthForm
                    headerText="Sign up for Tracker"
                    errorMessage={errorMessage}
                    isLoading={isLoading}
                    submitButtonText="Sign Up"
                    onSubmit={signUp} />
                <NavLink text="Already have an account? Sign in instead" routeName="Signin" />
            </Spacer>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 180
    }
});

export default SignupScreen;