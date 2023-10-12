import { Text, View, StyleSheet } from 'react-native';

export default function MyWeek({route, navigation}: {route:any, navigation: any}) {

    return (
        <View style={styles.container}>
            <Text>My Week</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
    },
    labelCreationContainer: {
        flex: 1,
        alignItems:'center',
        top: '15%'
    },
}); 