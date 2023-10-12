import { Text, View, StyleSheet, Pressable } from "react-native";


const Button = (props:{ buttonStyles: {}, onClick:Function, children:string}) => {
    const {onClick, children, buttonStyles} = props; 
    const initCallback = () => {
        onClick()
    }
    return (
        <View style={buttonStyles}> 
            <Pressable onPress={() => initCallback()}>
                <View>
                   <Text style={ButtonStyles.buttonText}>{children}</Text>
                </View>
            </Pressable>
        </View>


    )
}

export default function SaveExitButtonRow(props:{saveCallback:Function, exitCallback:Function, styles: {}}) {
    const {saveCallback, exitCallback, styles} = props; 
    
    return (
        <View style={{...ButtonStyles.rowStyles, ...styles}}>
            <Button onClick={saveCallback} buttonStyles={{...ButtonStyles.button, backgroundColor: '#5271FF', marginLeft:'5%', marginRight:'2.5%'}}>Save</Button>
            <Button onClick={exitCallback} buttonStyles={{...ButtonStyles.button, backgroundColor: '#D43030', marginLeft:'2.5%', marginRight:'5%'}}>Exit</Button>
        </View>
    )
}

const ButtonStyles = StyleSheet.create({
    rowStyles: {
        flexDirection: 'row', 
        width: '100%', 
        height: '5%',
        justifyContent: 'center'
    },
    button: {
        width: '40%',
        height: '100%',
        borderRadius:10, 
        textAlign: 'center',
        alignContent: 'center',
        justifyContent:'center'

    },
    buttonText: {
        textAlign: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: 'Kanit_400Regular',
    }
});
