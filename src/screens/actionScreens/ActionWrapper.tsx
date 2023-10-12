import { useEffect, useState } from "react";
import { LabelsDropdownComponent, TextInputStyle } from "../../components/utils/UserInputUtils";
import ActionButtonWidget from "./ActionButtonWidget";
import { LabelsDropdownObj, labelsDropdownValues } from "../../../types/UserInputTypes";
import { View, StyleSheet } from "react-native";
import SaveExitButtonRow from "../../components/utils/buttonUtils/SaveExitButtonRow";
import * as LabelsPersistance from "../../persistence/LabelsPersistance";
import * as HistoryPersistance from "../../persistence/HistoryPersistance";
import { Label } from "../../../types/db/Labels";
import { ScreenIds } from "../../components/utils/navigation/ScreenIds";
import { HistoryRecords } from "../../../types/db/Schedule";
import { setScheduleObj } from "./../../components/utils/scheduleUtils/ScheduleUtils"; 

export default function ActionWrapper({navigation}: {navigation: any}) {
    const [isStart, setIsStart] = useState(true);
    const [labelValue, setLabelValue] = useState('');
    const [labelId, setLabelId] = useState(-1); 
    const [labelBackgroundColour, setLabelBackgroundColour] = useState('');
    const [labelButtonReturn, setLabelButtonReturn] = useState<Label[]>(); 
    const [timerValue, setTimerValue] = useState(0); 
    const [startDate, setStartDate] = useState(new Date(Date.now()));
    const [dropdownObj, setDropdownobj] = useState<LabelsDropdownObj>({
        value: labelValue, 
        dropdownPlaceholderVal: 'Labels',
        labelsDropdownValues: [], 
        callback: setLabelStates
    }); 

    function setLabelStates(labelValue: string, backgroundColor: string, labelId:number) {
        setLabelValue(labelValue);
        setLabelBackgroundColour(backgroundColor);
        setLabelId(labelId);
    }
    function setToDropdown(){
        const retArr:labelsDropdownValues[] = []; 
        labelButtonReturn?.map(l => {
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
                labelsDropdownValues: retArr, 
                callback: dropdownObj.callback
            }
        ); 
    }

    const marshalData = async () => {
        try {
            const ret:Label[] = await LabelsPersistance.getData();
            setLabelButtonReturn([...ret]);   
            setToDropdown();
        } catch(e) {
            
        }
    }

    function saveRecord() {
        const setLabelHistory = async (label:Label) => {
            await LabelsPersistance.updateData(labelId, label)
        }

        const hr: HistoryRecords = {
            date_start: startDate,
            date_end: new Date(Date.now()),
            achieved_val_ms: timerValue
        }
        console.log('labelId ===' + labelId)
        if(labelId !== -1) {
            const index:number | undefined  = labelButtonReturn?.findIndex(item => item.id === labelId)
            console.log("inside if >>>>" + index + " " + labelButtonReturn)
            if(index !== -1 && index !== undefined && labelButtonReturn){
                const dateToday = new Date(Date.now())
                const schEnd = labelButtonReturn[index].current_schedule?.date_end; 
                if(schEnd != undefined) {
                    if(schEnd > dateToday) {
                        HistoryPersistance.setArchiveData(labelButtonReturn[index].id!, labelButtonReturn[index].current_schedule!);
                        labelButtonReturn[index].current_schedule = setScheduleObj(
                            labelButtonReturn[index].current_schedule!.frequency,
                            labelButtonReturn[index].current_schedule!.frequency_value,
                            labelButtonReturn[index].current_schedule!.target_value,
                            labelButtonReturn[index].current_schedule!.target_metric,
                            labelButtonReturn[index].current_schedule!.date_end,
                            )
                    } else {
                        labelButtonReturn[index].current_schedule?.historyRecords.push(hr);
                        labelButtonReturn[index].current_schedule!.current_ms += hr.achieved_val_ms;
                        setLabelHistory(labelButtonReturn[index]);
                    }
                }
            }
        } else {
            HistoryPersistance.setUndefinedData(hr);
        }
        navigation.navigate(ScreenIds.home)
    }

    useEffect(() => {
        setToDropdown(); 
    }, [labelButtonReturn]);

    useEffect(() => {
        marshalData();
    }, []);

    return (
        <View style={styles.container}>
            <ActionButtonWidget isStart={isStart} setIsStart={setIsStart} timerCallback={setTimerValue} />
            <View style={{
                ...TextInputStyle.textInput, 
                marginTop: '5%', 
                justifyContent: 'flex-end', 
                alignContent: 'center', 
                alignItems: 'center', 
                flexDirection: 'column',
                backgroundColor: labelBackgroundColour? labelBackgroundColour : ''}}>
                <LabelsDropdownComponent dropdownObj={dropdownObj} /> 
            </View>
            {
                !isStart && (
                    <SaveExitButtonRow saveCallback={() => {saveRecord()}} exitCallback={() => {navigation.navigate(ScreenIds.home)}} styles={{marginTop: '10%',}} /> 
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%', 
        height: '100%',
        alignItems: 'center', 
        alignContent: 'center'
    }
}); 


