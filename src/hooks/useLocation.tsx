import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';

export default (callback: (location: GeolocationResponse) => void, isFocused: boolean) => {

    const [err, setErr] = useState<boolean>(false);

    useEffect(() => {
        let subscriber: number | null = null;

        const startWatching = async () => {

            const permission = Platform.select<any>({
                ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
                android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
            });

            const status = await request(permission);
            if (status != "granted") {
                setErr(true);
            };

            subscriber = Geolocation.watchPosition(
                callback,
                (err) => {
                    console.log(err);
                });
        };

        if (isFocused) {
            startWatching();
        } else if (subscriber != null) {
            Geolocation.clearWatch(subscriber);
            subscriber = null;
        }

        return () => {
            if (subscriber != null) {
                Geolocation.clearWatch(subscriber);
            }
        };
    }, [isFocused, callback]);

    return [err];
};