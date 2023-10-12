import { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text, Image, TouchableWithoutFeedback } from "react-native";



export default function ActionButtonWidget(props:{isStart:boolean, setIsStart: Function, timerCallback: Function}) {
    const {isStart, setIsStart, timerCallback} = props; 
    const [timer, setTimer] = useState(0); 

    useEffect(() => {
        if(isStart){
            const updateTime = () => {
            setTimer(timer + 1);
            }
            const interval = setInterval(updateTime, 1000);
        
            return () => clearInterval(interval);
        }
    }, [timer, isStart]);

    useEffect(() => {
        timerCallback(timer);
    },[timer])

    function formatTime() {
        const hours = Math.floor(timer / 3600).toString().padStart(2, '0'); 
        const minutes = Math.floor(timer / 60).toString().padStart(2, '0'); 
        const seconds = (timer % 60).toString().padStart(2, '0'); 

        return `${hours}:${minutes}:${seconds}`
    }

    const imgUrl = isStart ? 
        require('./../../../assets/images/pause.png') : 
        require('./../../../assets/images/play.png'); 

    return (
        <View style={{...styles.buttonWrapper, backgroundColor: isStart ? '#5271FF' : '#D43030'}}> 
            <View style={styles.textWrapper}>
                <Text style={styles.text}>{formatTime()}</Text>
            </View>
            <View style={styles.imageWrapper}>
                <TouchableWithoutFeedback onPress={() => setIsStart(!isStart)}>
                    <Image 
                        resizeMode='contain' 
                        resizeMethod='auto'
                        source={imgUrl} 
                        style={styles.image}
                    />
                </TouchableWithoutFeedback>

            </View>
        </View>
    )
}
const buttonWidthValue = (Dimensions.get("window").width / 100) * 60; 

const styles = StyleSheet.create({
    buttonWrapper: {
        width: buttonWidthValue, 
        height: buttonWidthValue, 
        borderRadius: 5, 
    },
    textWrapper: {
        width: '100%',
        height: '40%',
        top: (buttonWidthValue / 100) * 30,
        justifyContent: 'center'
    }, 
    text: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Kanit_400Regular',
        fontSize: 45,
    }, 
    imageWrapper: {
        position: 'absolute',
        height: '30%',
        width: '100%',
        top: (buttonWidthValue / 100) * 70,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: '50%',
        width: '50%'
    }
}); 
