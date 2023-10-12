import { Alert } from "react-native";

export default function notYetImplement() {
    Alert.alert(
        'Not Yet Implemented!',
        'This screen is not yet implemented. Please check back later.',
        [{ text: 'Okay', style: 'destructive',}]
    );
}