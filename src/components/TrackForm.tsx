import React from 'react';
import { Button, Input } from 'react-native-elements';
import { useLocationContext } from '../context/LocationContext';
import useSaveTrack from '../hooks/useSaveTrack';
import Spacer from './Spacer';

const TrackForm = () => {
    const {
        startRecording,
        stopRecording,
        changeName,
        name,
        recording,
        locations
    } = useLocationContext();

    const [saveTrack] = useSaveTrack();
    return (
        <>
            <Spacer>
                <Input
                    placeholder="Enter name"
                    onChangeText={changeName}
                    value={name} />
            </Spacer>
            <Spacer>
                {recording
                    ? <Button
                        title="Stop"
                        onPress={stopRecording} />
                    : <Button
                        title="Start Recording"
                        onPress={startRecording} />
                }
            </Spacer>
            <Spacer>
                {
                    !recording && locations.length
                        ? <Button title="Save recording" onPress={saveTrack} />
                        : null
                }
            </Spacer>
        </>
    );
};

export default TrackForm;