import Header from "../../components/Header";
import { View, StyleSheet, TextInput, Text, Alert, Pressable } from "react-native";
import {useEffect, useState } from "react";
import {TextInputStyle, TextInputWithDropdown} from "../../components/utils/UserInputUtils";
import { DropdownObj, FrequencyComparison, GoalModes, ThresholdModes } from "../../../types/UserInputTypes";
import { ButtonType } from "../../../types/Button";
import ColourSwatch from "../../components/colourSwatch/ColourSwatch";
import SaveExitButtonRow from "../../components/utils/buttonUtils/SaveExitButtonRow";
import FrequencyValidator from "../../components/utils/scheduleUtils/FrequencyValidator";
import * as LabelsPersistance from "../../persistence/LabelsPersistance";
import { setScheduleObj } from "../../components/utils/scheduleUtils/ScheduleUtils";
import { ScreenIds } from "../../components/utils/navigation/ScreenIds";
import { Schedule } from "../../../types/db/Schedule";
import { Label } from "../../../types/db/Labels";

export default function CreateLabel({route, navigation}: {route:any, navigation: any}) {
    const { labelParam } = route.params ? route.params : undefined;
    const [incomingLabel, setIncomingLabel] = useState<Label | undefined>(labelParam); 
    const [name, setName] = useState('');
    const [frequencyValue, setFrequencyValue] = useState('');
    const [frequencyDropValue, setFrequencyDropValue] = useState('');
    const [timeValue, setTimeValue] = useState('');
    const [timeDropValue, setTimeDropValue] = useState('');
    const [colour, setColour] = useState(''); 
    const [isSwatchActive, setIsSwatchActive] = useState(false); 

    useEffect(() => {
        if(incomingLabel){
            setColour(incomingLabel.colour); 
            setName(incomingLabel.label_name);

            if(incomingLabel.current_schedule){
                setFrequencyDropValue(incomingLabel.current_schedule.frequency);
                setFrequencyValue(incomingLabel.current_schedule.frequency_value.toString()); 
                setTimeValue(incomingLabel.current_schedule.target_value.toString());
                setTimeDropValue(incomingLabel.current_schedule.target_metric); 
            }

        }
    }, [])

    const colourArray:ButtonType[] = [
        {label_name:'', colour: '#fc5c51',  callback: setColour, id:undefined, current_schedule:undefined}, 
        {label_name:'', colour: '#fc8451',  callback: setColour, id:undefined, current_schedule:undefined},
        {label_name:'', colour: '#e8d35a',  callback: setColour, id:undefined, current_schedule:undefined},
        {label_name:'', colour: '#9ae85a',  callback: setColour, id:undefined, current_schedule:undefined},
        {label_name:'', colour: '#5ae8c5',  callback: setColour, id:undefined, current_schedule:undefined},
        {label_name:'', colour: '#5ae3e8',  callback: setColour, id:undefined, current_schedule:undefined},
        {label_name:'', colour: '#5ac0e8',  callback: setColour, id:undefined, current_schedule:undefined},
        {label_name:'', colour: '#5a62e8',  callback: setColour, id:undefined, current_schedule:undefined},
        {label_name:'', colour: '#5a62e8',  callback: setColour, id:undefined, current_schedule:undefined},
        {label_name:'', colour: '#5a62e8',  callback: setColour, id:undefined, current_schedule:undefined},
        {label_name:'', colour: '#5a62e8',  callback: setColour, id:undefined, current_schedule:undefined},
        {label_name:'', colour: '#5a62e8',  callback: setColour, id:undefined, current_schedule:undefined},
        {label_name:'', colour: '#5a62e8',  callback: setColour, id:undefined, current_schedule:undefined},
        {label_name:'', colour: '#5a62e8',  callback: setColour, id:undefined, current_schedule:undefined},
        {label_name:'', colour: '#5a62e8',  callback: setColour, id:undefined, current_schedule:undefined},
        {label_name:'', colour: '#5a62e8',  callback: setColour, id:undefined, current_schedule:undefined},
    ]

    const frequencyObj: DropdownObj = {
        textInputPlaceHolderVal: "Frequency", 
        dropdownPlaceholderVal: "Type",
        values: [
            {label: "Days", value: '1'},
            {label: "Weeks", value: '2'},
            {label: "Months", value: '3'},
            {label: "Years", value: '4'},
        ], 
        callback: setFrequencyDropValue,  
    }
    const timeObj: DropdownObj = {
        textInputPlaceHolderVal: "Time", 
        dropdownPlaceholderVal: "Type",
        values: [
            {label: "Hours", value: '1'},
            {label: "Minutes", value: '2'},
        ], 
        callback: setTimeDropValue,  
    }

    function validateNumbers():boolean {
        let ret:boolean = false;
        if(parseInt(frequencyValue) > 0 && parseInt(timeValue)) {
            ret = true; 
        }

        return ret; 
    }

    const initSave = () => {
        if(validateNumbers()) {
            const frequencyComparison:FrequencyComparison = {
                Threshold: {
                    Value: parseInt(frequencyValue),
                    Mode: frequencyDropValue as ThresholdModes,
                },
                Goal: {
                    Value: parseInt(timeValue),
                    Mode: timeDropValue as GoalModes,
                }
            }
            if(FrequencyValidator(frequencyComparison)){
                if(incomingLabel){
                    const oldValue: Label = {
                        id: incomingLabel.id,
                        label_name: incomingLabel.label_name,
                        colour: incomingLabel.colour,
                        current_schedule: incomingLabel.current_schedule
                    }
                    const newLabelValues: Label = {
                        id: incomingLabel.id,
                        label_name: name,
                        colour: colour,
                        current_schedule: setScheduleObj(frequencyDropValue, parseInt(frequencyValue), parseInt(timeValue), timeDropValue)
                    }
                    LabelsPersistance.updateData(oldValue.id!, newLabelValues);
                } else {
                    const scheduleType:Schedule  = setScheduleObj(frequencyDropValue, parseInt(frequencyValue), parseInt(timeValue), timeDropValue);
                    console.log(scheduleType)
                    const data:ButtonType = {
                        label_name: name,
                        colour: colour,
                        callback: undefined,
                        id: undefined,
                        current_schedule: scheduleType
                    }        
                    const id:number = LabelsPersistance.setData(data);
                }
                navigation.navigate(ScreenIds.labels);
            } else {
                Alert.alert(
                    'Invalid goal!',
                    'The time is greater than the frewuency duration!',
                    [{ text: 'Okay', style: 'destructive',}]
                );
            }
        } else {
            Alert.alert(
                'Invalid number!',
                'Number has to be above 0.',
                [{ text: 'Okay', style: 'destructive',}]
            );
        }
    }

    const ColourSwatchButton = () => {
        return (
            <View style={{...colourSwatchStyles.TextContainer, backgroundColor: colour ? colour : 'white'}}>
                <Pressable onPress={() => setIsSwatchActive(true)}>
                    <View style={{...colourSwatchStyles.textBox}}> 
                        <Text style={colourSwatchStyles.swatchText}>Colour</Text>
                    </View>
                </Pressable>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.labelCreationContainer}>
                <TextInput placeholderTextColor={"black"} placeholder="Name" style={TextInputStyle.textInput} value={name} onChangeText={setName}></TextInput>
                <TextInputWithDropdown dropdownObj={frequencyObj} value={frequencyValue} setValue={setFrequencyValue} isNumber={true} dropdownValue={incomingLabel ? incomingLabel.current_schedule?.frequency: undefined}/>
                <TextInputWithDropdown dropdownObj={timeObj} value={timeValue} setValue={setTimeValue} isNumber={true} dropdownValue={incomingLabel ? incomingLabel.current_schedule?.target_metric: undefined}/>
                <ColourSwatchButton/>
                <SaveExitButtonRow styles={{marginTop: '20%'}} saveCallback={initSave} exitCallback={() => {navigation.navigate(ScreenIds.labels);}} />   
            </View>
            {
                isSwatchActive && <ColourSwatch buttonArray={colourArray} swatchCallback={setIsSwatchActive} />
            }
        </View>
    );
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


const colourSwatchStyles = StyleSheet.create({
    TextContainer:{
        borderColor:"grey", 
        borderRadius:10, 
        borderWidth: 2,
        width: '80%',
        height: '5%',
        textAlign: "center",   
        marginBottom: 10,
        fontSize: 12,
        fontFamily: 'Kanit_400Regular',
    },
    swatchText: {
        textAlign: 'center',
        alignItems: 'center',
        fontFamily: 'Kanit_400Regular',
        
    },
    textBox: {
        justifyContent: 'center',
        height: '100%',
        width:'100%',
        fontSize: 12,
    },
})

const buttonRow = StyleSheet.create({
    buttonRowContainer: {
        flex: 1, 
    }
})