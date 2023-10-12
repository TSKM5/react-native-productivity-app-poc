import { ButtonType } from '../../types/Button';
import { StyleSheet, View, Image, Dimensions, Pressable } from 'react-native';

export default function Header(props:{menuButtonCallback:Function}){
    const {menuButtonCallback} = props; 
    return (
        <View style={styles.headerContainer}>
            <Pressable onPress={() => {menuButtonCallback(true)}} style={{...styles.menuImage, left: 0, top: 0}}>
                <Image 
                    resizeMode='contain' 
                    resizeMethod='auto'
                    source={require('./../../assets/images/menu.png')} 
                    style={styles.menuImage}
                />
            </Pressable>
            <Image 
                resizeMode='contain' 
                resizeMethod='auto'
                source={require('./../../assets/images/landingIcon.png')} 
                style={styles.homeImage}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 175,
        marginTop: 25,
        backgroundColor: '#fff'
    }, 
    menuImage: {
        position: 'absolute', 
        left: 30, 
        top: 30, 
        height: 30, 
        width: 30
    }, 
    homeImage: {
        top: 0, 
        right: ((Dimensions.get("window").width - 175) / 2),
        height:175,
        width: 175, 
        position: "absolute"
    }
});
  

  
  
  
  