import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import Spacer from './Spacer';

type Props = {
    text: string,
    routeName: string
}
const NavLink = ({ text, routeName }: Props) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
            <Spacer>
                <Text style={styles.navLink}>{text}</Text>
            </Spacer>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    navLink: {
        color: 'blue',
        fontSize: 16,
        alignSelf: 'center'
    }
});

export default NavLink;