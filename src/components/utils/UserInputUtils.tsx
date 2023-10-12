import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardTypeOptions } from 'react-native';
import { Dropdown } from './react-native-element-dropdown/src/index';
import { DropdownObj, LabelsDropdownObj } from '../../../types/UserInputTypes';
import { isNumber } from 'lodash';

export {DropdownComponent, TextInputWithDropdown, TextInputStyle, LabelsDropdownComponent};

const DropdownComponent = (props:{dropdownObj:DropdownObj, previousVal:string|undefined}) => {
  const {dropdownObj, previousVal} = props; 
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  
  useEffect(() => {
    const initPreviousVal = () => {
      if(previousVal){
        dropdownObj.values.map(a => {
          if(a.label === previousVal){
            setValue(a.value);
            return; 
          }
        })
      }
    }
  
    initPreviousVal(); 
  }, [])



  return (
    <View style={dropdownStyles.container}>
      <Dropdown
        style={[dropdownStyles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={dropdownStyles.placeholderStyle}
        selectedTextStyle={dropdownStyles.selectedTextStyle}
        iconStyle={dropdownStyles.iconStyle}
        data={dropdownObj.values}
        iconColor='black'
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? dropdownObj.dropdownPlaceholderVal : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          console.log(value)
          dropdownObj.callback(item.label)
          setIsFocus(false);
        }}
      />
    </View>
  );
};

const TextInputWithDropdown = (props:{isNumber:boolean, dropdownObj:DropdownObj, value:string, setValue:Function, dropdownValue:string|undefined}) => {
  const {dropdownObj, setValue, isNumber, value, dropdownValue} = props; 
  
  let KeyboardType:KeyboardTypeOptions = 'default';

  if(isNumber) {
    KeyboardType = 'number-pad'
  }
  const setValueHandler = (value:any) => {
    setValue(value)
  }
  return (
    <View style={TextInputStyle.textInput}> 
      <TextInput 
        placeholderTextColor={"black"} 
        placeholder={dropdownObj.textInputPlaceHolderVal} 
        style={DropdownTextInputStyle.Text}
        onChangeText={setValueHandler}
        keyboardType={KeyboardType}
        value={value}
      />
      <View style={DropdownTextInputStyle.Combo}>
        <DropdownComponent dropdownObj={dropdownObj} previousVal={dropdownValue}/> 
      </View>
    </View>
  )
}

const dropdownStyles = StyleSheet.create({
  container: {
    height: '90%',
    top: '5%',
  },
  dropdown: {
    flex:1,
    height: '100%',
    top: 0, 
    right: 0, 
    // borderRadius: 10,
    paddingHorizontal: 8,
    // backgroundColor: 'gray'
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 10,
  },
  placeholderStyle: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'Kanit_400Regular',
  },
  selectedTextStyle: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'Kanit_400Regular',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

const DropdownTextInputStyle = StyleSheet.create({
  Text: {
      left: 0, 
      width: '70%',
      textAlign: 'center',
      fontFamily: 'Kanit_400Regular', 
  },
  Combo: {
      width: '30%',
      right: 0,
      height: '100%',
      top: 0,
      borderTopRightRadius: 8, 
      borderTopLeftRadius:0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 8,
  }
})

const TextInputStyle = StyleSheet.create({
  textInput:{
    flexDirection: "row",
    borderColor:"grey", 
    borderRadius:10, 
    borderWidth: 2,
    width: '80%',
    height: '5%',
    textAlign: "center",   
    marginBottom: 15,
    fontFamily: 'Kanit_400Regular',
  },
});

const LabelsDropdownComponent = (props:{dropdownObj:LabelsDropdownObj, previousVal?:string}) => {
  const {dropdownObj, previousVal} = props; 
  const [value, setValue] = useState(dropdownObj.value);
  const [isFocus, setIsFocus] = useState(false);
  useEffect(() => {
    const initPreviousVal = () => {
      if(previousVal){
        dropdownObj.labelsDropdownValues.map(a => {
          if(a.label === previousVal){
            setValue(a.value);
            return; 
          }
        })
      }
    }
  
    initPreviousVal(); 
  }, [])
  return (
    <View style={{...dropdownStyles.container, width: '100%', height: '100%', justifyContent:'center', alignContent: 'center', alignItems: 'center'}}>
      <Dropdown
        style={[dropdownStyles.dropdown, isFocus && { borderColor: 'blue'}]}
        placeholderStyle={dropdownStyles.placeholderStyle}
        selectedTextStyle={{...dropdownStyles.selectedTextStyle, fontSize: 20, textAlign: 'center'}}
        iconStyle={{...dropdownStyles.iconStyle, marginRight: '5%'}}
        data={dropdownObj.labelsDropdownValues}
        iconColor='black'
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? dropdownObj.dropdownPlaceholderVal : '...'}
        value={value === '' ? dropdownObj.dropdownPlaceholderVal : value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          dropdownObj.callback(item.label, item.colour, item.labelId)
          setIsFocus(false);
        }}
      />
    </View>
  );
};