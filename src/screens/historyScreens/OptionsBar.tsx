import React, { useState, useEffect } from "react";
import { View, Pressable, StyleSheet, Image, Text } from "react-native";
import { DateObjects, LabelsDropdownObj, labelsDropdownValues } from "../../../types/UserInputTypes";
import { Label } from "../../../types/db/Labels";
import { LabelsDropdownComponent } from "../../components/utils/UserInputUtils";
import CalendarWidget from "../../components/CalendarWidget";

export default function OptionsBar(props:{labels:Label[], setValuesCallback:Function}){
    const {labels, setValuesCallback} = props; 
    const [labelValue, setLabelValue] = useState('');
    const [labelBackgroundColour, setLabelBackgroundColour] = useState('');
    const [labelId, setLabelId] = useState(-1); 
    const [isOn, setIsOn] = useState<Boolean>(true);
    const [dateStart, setDateStart] = useState<Date>(); 
    const [dateEnd, setDateEnd] = useState<Date>(); 
    const [dateStartDisplayString, setDateStartDisplayString] = useState<String>(); 
    const [dateEndDisplayString, setDateEndDisplayString] = useState<String>(); 
    const [dropdownObj, setDropdownobj] = useState<LabelsDropdownObj>({
        value: labelValue, 
        dropdownPlaceholderVal: 'Labels',
        labelsDropdownValues: [], 
        callback: setLabelStates,
    });

    function clearFields() {
        console.log(dropdownObj.value); 
        setLabelValue('');
        setLabelBackgroundColour('');
        setLabelId(-1);
        setDateStart(undefined);
        setDateEnd(undefined);
        setDateStartDisplayString(undefined);
        setDateEndDisplayString(undefined);
    }

    function setLabelStates(labelValue: string, backgroundColor: string, labelId:number) {
        setLabelValue(labelValue);
        setLabelBackgroundColour(backgroundColor);
        setLabelId(labelId);
        setValuesCallback(labelId);
    }

    const calWidgetStart: DateObjects = {
        dateValue: {
            dateValue: dateStart,
            setDateValue: setDateStart
        },
        dateDisplayString: {
            dateDisplayString: dateStartDisplayString,
            setDateDisplayString: setDateStartDisplayString
        }
    }
    const calWidgetEnd: DateObjects = {
        dateValue: {
            dateValue: dateEnd,
            setDateValue: setDateEnd
        },
        dateDisplayString: {
            dateDisplayString: dateEndDisplayString,
            setDateDisplayString: setDateEndDisplayString
        }
    }

    function setToDropdown(){
        const retArr:labelsDropdownValues[] = []; 
        const noneDropdownOption: labelsDropdownValues = {
            label: 'None',
            value: '0',
            colour: 'white',
            labelId: 0
        }
        labels?.map(l => {
            const retItem:labelsDropdownValues = {
                label: l.label_name,
                value: l.id ? l.id.toString() : '0',
                colour: l.colour,
                labelId: l.id ? l.id: 0,
            }
            retArr.push(retItem);
        }); 
        setDropdownobj(
            {
                value: dropdownObj.value, 
                dropdownPlaceholderVal: dropdownObj.dropdownPlaceholderVal,
                labelsDropdownValues: [noneDropdownOption, ...retArr], 
                callback: dropdownObj.callback
            }
        ); 
    }

    useEffect(() => {
        setToDropdown(); 
        setValuesCallback(labelId, dateStart, dateEnd);
    },[labelId, dateStart, dateEnd])

    useEffect(() => {
        setToDropdown(); 
    },[labels])

    return (
        <View style={{...optionsBar.contentWrapper, height: isOn? optionsBar.contentWrapper.height + 125 : optionsBar.contentWrapper.height}}>
            <Pressable style={{ alignItems: 'center' }} onPress={() => setIsOn(!isOn)}>
                <Image 
                    resizeMode='contain' 
                    resizeMethod='auto'
                    source={require('./../../../assets/images/filter.png')} 
                    style={optionsBar.filterImage}
                />
            </Pressable>
            {
                isOn  && (
                    <View style={optionsBar.filterContentWrapper}>
                        <View style={optionsBar.widgetWrapper}>
                            <CalendarWidget placeholder='Start' widgetObject={calWidgetStart}/>
                            <CalendarWidget placeholder='End' widgetObject={calWidgetEnd}/>
                        </View>
                        <View style={{...optionsBar.labelsDropdown, backgroundColor: labelBackgroundColour ? labelBackgroundColour : 'white'}}>
                            <LabelsDropdownComponent dropdownObj={dropdownObj} previousVal={labelValue}/> 
                        </View>
                        <Pressable style={optionsBar.clearButton} onPress={() => clearFields()}>
                            {/* <View> */}
                                <Text style={optionsBar.clearText}>Clear</Text>
                            {/* </View> */}
                        </Pressable>
                    </View>
                )
            }
        </View>
    )
}

const optionsBar = StyleSheet.create({
  contentWrapper: {
    height:50,
    width:'100%', 
    alignItems: 'center',
  },
  filterImage: {
    height: 30, 
    width: 30, 
  },
  filterContentWrapper:{
    // backgroundColor: 'pink', 
    width: '100%', 
    height: 140, 
    alignItems: 'center',
    paddingTop: 10,
  },
  widgetWrapper:{
    flexDirection: 'row',
    justifyContent:'center',
  },
  labelsDropdown:{
    borderColor:"grey", 
    borderRadius:10, 
    borderWidth: 2,
    width: '80%',
    height: 30,
    textAlign: "center",   
    marginBottom: 10,
    fontFamily: 'Kanit_400Regular',
    marginTop: 10
  },
  clearButton:{
    borderColor:"red", 
    borderRadius:10, 
    borderWidth: 2,
    width: '40%',
    height: 30,
    textAlign: "center",   
    fontFamily: 'Kanit_400Regular',
    marginBottom: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  }, 
  clearText:{
    color: 'red',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Kanit_400Regular',
    fontSize: 20,
    justifyContent: 'center',
    alignContent: 'center',
  },
});