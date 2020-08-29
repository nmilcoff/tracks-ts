import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import Spacer from '../components/Spacer';
import { useAuthContext } from '../context/AuthContext';
import { LoginFlowStackParamList } from '../types';

type Props = StackScreenProps<LoginFlowStackParamList, 'Signin'>;

const SigninScreen = ({ navigation }: Props) => {

    const { isLoading, errorMessage, signIn, clearErrorMessage } = useAuthContext();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            clearErrorMessage();
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Spacer>
                <AuthForm
                    headerText="Sign in to your account"
                    errorMessage={errorMessage}
                    isLoading={isLoading}
                    submitButtonText="Sign In"
                    onSubmit={signIn} />
                <NavLink text="Don't have an account? Sign up instead" routeName="Signup" />
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

export default SigninScreen;