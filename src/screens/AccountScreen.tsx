import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacer from '../components/Spacer';
import { useAuthContext } from '../context/AuthContext';

const AccountScreen = () => {

    const { signOut } = useAuthContext();

    return (
        <SafeAreaView>
            <Text style={{ fontSize: 48 }}>Account Screen</Text>
            <Spacer>
                <Button title="Sign Out" onPress={signOut} />
            </Spacer>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

});

export default AccountScreen;