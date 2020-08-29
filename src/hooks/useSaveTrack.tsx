import { useNavigation } from "@react-navigation/native";
import { useLocationContext } from "../context/LocationContext";
import { useTrackContext } from "../context/TrackContext";

export default () => {
    const { createTrack } = useTrackContext();
    const { name, locations, reset } = useLocationContext();

    const navigation = useNavigation();

    const saveTrack = async () => {
        await createTrack(name, locations);

        reset();

        navigation.navigate('TrackList');
    }

    return [saveTrack];
};