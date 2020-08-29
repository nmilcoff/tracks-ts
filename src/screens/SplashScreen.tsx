import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAuthContext } from '../context/AuthContext';

const SplashScreen = () => {

    const { tryLocalSignin } = useAuthContext();

    useEffect(() => {
        tryLocalSignin();
    }, []);

    return (
        <View style={styles.container}>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default SplashScreen;