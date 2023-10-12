import { View, StyleSheet, TextInput, Text, Image, Dimensions, Modal, ScrollView, Pressable } from "react-native";
import { ButtonType } from "../../../types/Button";


const TriangleCorner = () => {
    return <View style={colourSwatchStyles.triangleCorner} />;
  };
  

export default function ColourSwatch(props:{buttonArray:ButtonType[], swatchCallback:Function}) {
    const {buttonArray, swatchCallback} = props; 

    function hideSwatch() {
        swatchCallback(false); 
    }
    return (
        <Modal visible={true} transparent={true} animationType="slide">
            <Pressable onPress={hideSwatch}>
                <View style={colourSwatchStyles.screenBacking}/>    
            </Pressable>
            <View style={colourSwatchStyles.colourSwatchContainer}> 
                <Pressable onPress={hideSwatch}>
                    <TriangleCorner />
                </Pressable>
                <View style={colourSwatchStyles.swatchButtonsContainer}>
                    <RoundButtonGrid buttonArray={buttonArray} swatchCallback={swatchCallback}/>
                </View>      
            </View>

        </Modal>
    )
}

const RoundButton = (props:{button:ButtonType, swatchCallback:Function}) => {
    const {button, swatchCallback} = props; 
    
    function initChange() {
        if(button.callback !== undefined){
            button.callback(button.colour);
        }
        swatchCallback(false); 
    }
    return (
        <View style={roundButton.buttonWrapper}>
            <Pressable onPress={initChange}>
                <View style={{...roundButton.button, backgroundColor: button.colour}}>

                </View>
            </Pressable>
        </View>


    )
}
  const RoundButtonGridRow = (props:{buttonArray:ButtonType[], swatchCallback:Function}) => {
    const {buttonArray, swatchCallback} = props; 
    return (
        <View style={roundButton.rowContainer}>
            {
                buttonArray.map((rowData, i) => (
                    <RoundButton button={rowData} swatchCallback={swatchCallback} {...rowData} key={i}/>
                ))
            }
        </View>
    )
  }

  const RoundButtonGrid = (props:{buttonArray:ButtonType[], swatchCallback:Function}) => {
    const {buttonArray, swatchCallback} = props; 
    const rows:ButtonType[][] = []; 
    let rowLength = 4; 

    const rowQty = buttonArray.length / 4; 

    for(let i = 0; i < rowQty; i++) {
      rows.push(buttonArray.splice(0, rowLength));
    }

    return (
        <ScrollView bounces={false} persistentScrollbar={true}>
            <View style={roundButton.gridContainer}> 
                {
                    rows.map((rowData, i) => (
                        <RoundButtonGridRow buttonArray={rowData} key={i} swatchCallback={swatchCallback}/>
                    ))
                }
            </View>
        </ScrollView>
    )
  }

  const roundButton = StyleSheet.create({
    button: {
      width: ((Dimensions.get('window').width / 100) * 10),
      height: ((Dimensions.get('window').width / 100) * 10),
      borderRadius: ((Dimensions.get('window').width / 100) * 10) / 2,
      justifyContent:'center',
      alignContent: 'center',
      alignItems: 'center',
    }, 
    buttonWrapper: {
        margin: '5%',
        width: '10%',
        height: '10%',
    },
    rowContainer: {
      flexDirection:'row',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      width:'100%'
    },
    gridContainer: {
      height: '100%', 
    }
  })

  const colourSwatchStyles = StyleSheet.create({
    swatchText: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    // textBox: {
    //     justifyContent: 'center',
    //     height: '100%',
    //     width:'100%',
    // },
      colourSwatchContainer: {
        top:'50%',
        justifyContent: 'center',
        alignContent:'center',
        flex: 1,
        height: "40%", 
        width: "100%",
        zIndex:100,
        position: 'absolute',
    },
    swatchButtonsContainer: {
        backgroundColor:'white', 
        height: '70%',
        width: '100%',
        zIndex:100,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    triangleCorner: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRightWidth: 50,
        borderTopWidth: 50,
        borderRightColor: "transparent",
        borderTopColor: "white",
        transform: [{ rotate: "270deg" }],
    },
    screenBacking: {
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
        opacity: 0.5,
        zIndex:1
    }
})
