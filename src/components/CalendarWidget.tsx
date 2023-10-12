import React, { useState } from "react";
import { View, Pressable, Image, Text, StyleSheet} from "react-native";
import { marshalDateToString } from "./utils/scheduleUtils/ScheduleUtils";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DateObjects } from "../../types/UserInputTypes";

export default function CalendarWidget(props:{placeholder:string, widgetObject:DateObjects}) {
    const { placeholder, widgetObject } = props; 
    const [dtIsVisible, setDtIsVisible] = useState<boolean>(false); 
    const [dtDate, setDtDate] = useState<Date>(); 
    const [value, setValue] = useState('');
    function marshalDate(date:Date){
        widgetObject.dateDisplayString.setDateDisplayString(marshalDateToString(date));
        widgetObject.dateValue.setDateValue(date);
    }
    return (
        <View style={calendarWidget.ContentWrapper}> 
            <Pressable onPress={() => setDtIsVisible(true)}>
                <Image 
                    resizeMode='contain' 
                    resizeMethod='auto'
                    source={require('./../../assets/images/calendar.png')} 
                    style={calendarWidget.Image}
                />
            </Pressable>
            <Pressable style={calendarWidget.TextInputWrapper} onPress={() => setDtIsVisible(true)}>
                <Text style={calendarWidget.TextInputWrapper}>{widgetObject.dateDisplayString.dateDisplayString ? widgetObject.dateDisplayString.dateDisplayString : placeholder }</Text>
            </Pressable>
            <DateTimePickerModal
                isVisible={dtIsVisible}
                mode="date"
                onConfirm={(date:Date) => {marshalDate(date); setDtIsVisible(false)}}
                onCancel={() => setDtIsVisible(false)}
                date={new Date(Date.now())}
            />
        </View>
    )
}

const calendarWidget = StyleSheet.create({
    ContentWrapper: {
        width: '45%',
        height: 30, 
        flexDirection:'row',
        margin: 5,
    }, 
    TextInputWrapper:{
        right:0, 
        flex:5,
        height: '100%',
        borderBottomColor: 'black', 
        borderBottomWidth: 1,
        textAlign: 'center',
        fontFamily: 'Kanit_400Regular',
        color:'black',
        // width:'100%'
    },
    Image: {
        flex:1,
        height: 30, 
        width: 30, 
    },
});