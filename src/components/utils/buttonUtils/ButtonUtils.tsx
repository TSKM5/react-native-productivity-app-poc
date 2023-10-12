import { ButtonType } from '../../../../types/Button';
import { StyleSheet, Text, View, Dimensions, ScrollView, Pressable} from 'react-native';

  export { ButtonGrid, TriangleButton, ButtonGridScrollable }
  
  const excecuteCallback = (callback: Function | undefined) => {
    if(callback != null){
      callback(); 
    }
  }
  const SquareButton = (props:ButtonType) => (
      <View style={{...styles.squareButton, backgroundColor:props.colour}}>
       <Pressable onPress={() => excecuteCallback(props.callback)}> 
        <View style={styles.textBox}>
          <Text style={styles.displayText}>{props.label_name}</Text>
        </View>
       </Pressable>
      </View>
  );

  const Row = (props:{buttons:ButtonType[]}) => {
    const {buttons} = props; 
    
    return (
        <View style={styles.row}>
          {
            buttons.map((item:ButtonType, index) => (
              <SquareButton {...item} key={index}/>
            ))
          }
        </View>
    )
  } 

  function ButtonGrid(props:{buttonArray:ButtonType[]}){
    const {buttonArray} = props; 
    const isEven:Boolean = buttonArray.length % 2 === 0; 
    let ret = []; 

    for(let i = 0; i < buttonArray.length; i++ ){
      let test = i; 
      if(i == buttonArray.length-1 && !isEven){
        const newArr:ButtonType[] = [buttonArray[i]];
        ret.push(newArr);
      }
      else {
        const newArr:ButtonType[] = [buttonArray[i], buttonArray[test+1]]
        ret.push(newArr)
      } 
      i++;
    }
    return (
      <View style={styles.container}>
        {
          ret.map((row, i) => (
            <Row buttons={row} key={i} /> 
          ))
        }
      </View>
    )
  }

  function ButtonGridScrollable(props:{buttonArray:ButtonType[]}){
    let {buttonArray} = props; 
    const isEven:Boolean = buttonArray.length % 2 === 0; 
    let ret = []; 

    for(let i = 0; i < buttonArray.length; i++ ){
      let test = i; 
      if(i == buttonArray.length-1 && !isEven){
        const newArr:ButtonType[] = [buttonArray[i]];
        ret.push(newArr);
      }
      else {
        const newArr:ButtonType[] = [buttonArray[i], buttonArray[test+1]]
        ret.push(newArr)
      } 
      i++;
    }
    return (
      <ScrollView bounces={false} persistentScrollbar={true}>
        <View style={styles.containerScrollable}>
          {
            ret.map((row, i) => (
              <Row buttons={row} key={i} /> 
            ))
          }
        </View>
      </ScrollView>
    )
  }

  function TriangleButton(props:{percentWidth:number, buttonObj:ButtonType}){
    const {percentWidth} = props; 
    const {buttonObj} = props; 

    const windowWidth = Dimensions.get('window').width;
    const width = (windowWidth / 100) * percentWidth; 
    const sideLength = width / 1.5; 
    const left = (windowWidth - width) / 4;

    return (  
      <Pressable onPress={() => excecuteCallback(buttonObj.callback)}>     
        <View>
            <View style={{...styles.triangle, borderBottomWidth:width, borderLeftWidth:sideLength, borderRightWidth:sideLength, left: left}}>
              <Text style={{...styles.displayText, position: 'absolute', paddingBottom: 25, fontSize: 45}}>{buttonObj.label_name}</Text>
            </View>
        </View>
      </Pressable>

    )
  }


  const styles = StyleSheet.create({
    container: {
      width: '100%', 
      height: '90%',
      justifyContent: 'center',
      // marginTop: 50,
    },
    containerScrollable: {
      width: '100%', 
      height: '90%',
      justifyContent: 'center',
      marginTop: 30
    },
    squareButton: {
      marginHorizontal: '5%',     
      flex: 1,
      width: '25%',
      height: '100%',
      backgroundColor: '#5271FF',
      borderRadius: 7,
    },
    row: {
      flexDirection: 'row',
      height: 100,
      margin: '5%',
    },
    textBox: {
      justifyContent: 'center',
      height: '100%',
      width:'100%',

    },
    displayText: {
      color: 'white',
      alignItems: 'center',
      textAlign: 'center',
      fontFamily: 'Kanit_400Regular',
      fontSize: 25,
    },
    triangle: {
      width: 0,
      height: 0,
      backgroundColor: "transparent",
      borderStyle: "solid",
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderBottomColor: "#94D769",
      alignItems: "center", 
      justifyContent: 'flex-end'
    },
  });

