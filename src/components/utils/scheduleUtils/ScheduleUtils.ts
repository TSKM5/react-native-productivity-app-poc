import { Schedule } from "../../../../types/db/Schedule";
import * as typeMins from "./FrequencyValidator";

export function setScheduleObj(frequency:string, frequencyValue:number, targetValue:number, targetMetric:string, customDate?:Date):Schedule{
    const date: Date =  customDate? customDate : establishStartDate(); 

    const ret:Schedule = {
        id: undefined,
        label_id: 0,
        date_start: date,
        date_end: establishEndDate(date, frequency, frequencyValue),
        frequency: frequency,
        success: false,
        target_ms: convertToMs(targetMetric, targetValue),
        historyRecords: [],
        frequency_value: frequencyValue,
        target_metric: targetMetric,
        target_value: targetValue,
        current_ms: 0
    }
    
    return ret; 
}

function establishStartDate():Date {
    return new Date(Date.now()); 
}

function establishEndDate(StartDate: Date,frequency:string, value:number):Date {
    let mins:number = 0;  
    switch(frequency){
        case "Days": 
            mins = typeMins.MIN_DAY * value;
        break; 
        case "Weeks": 
            mins = typeMins.MIN_WEEK * value;
        break; 
        case "Months": 
            mins = typeMins.MIN_MONTH * value;
        break; 
        case "Years": 
            mins = typeMins.MIN_MONTH * value;
        break; 
    }

    return  new Date(StartDate.getTime() + convertToMs("Minutes", mins)); 
}


export function convertToMs(frequency:string, value:number):number {
    switch(frequency){
        case "Hours":
            return ((value*60)*60)*1000
        break; 
        case "Minutes": 
            return (value*60)*1000
        break; 
    }
    return 0; 
}


const Days:String[] = ['Sun','Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
const Months:String[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function marshalDateToString(date:Date): string{
    date = new Date(date);
    if(date) {
        return (`${Days[date.getUTCDay()]} ${date.getDate()} ${Months[date.getMonth()]} ${date.getFullYear()}`);
    }

    return '';
}

//create a function to turn date in string with hours and minutes in 12 hour time
function convertTimeToString(date:Date):string{
    let hours:number = date.getHours();
    let minutes:number = date.getMinutes();
    let ampm:string = "AM"; 

    if(hours > 12){
        hours -= 12; 
        ampm = "PM"; 
    }

    if(minutes < 10){
        return `${hours}:0${minutes} ${ampm}`;
    }

    return `${hours}:${minutes} ${ampm}`;
}

export function secToTime(sec: number): string {
    // Convert seconds to minutes
    let minutes = Math.floor(sec / 60);

    // Get hours
    let hours = Math.floor(minutes / 60);

    // Adjust minutes
    minutes = minutes % 60;

    // Return the formatted string
    return `${hours}hr ${minutes}mins`;
}

export function marshalDateTimeToString(date:Date): string{
    try {
        date = new Date(date);
        if(date) {
            return (`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${convertTimeToString(date)}`);
        }
    } catch (e) {
        console.log(">>>>" + e); 
    }

    return '';
}