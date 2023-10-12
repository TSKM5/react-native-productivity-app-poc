import { FrequencyComparison } from "../../../../types/UserInputTypes";

export const MIN_DAY:number = 1440; 
export const MIN_WEEK:number = 10080; 
export const MIN_MONTH:number = 43800; 
export const MIN_YEAR:number = 525599; 

export default function FrequencyValidator(frequencyComparison:FrequencyComparison):boolean {
    let min:number = 0; 
    let ret:boolean = false; 

    switch(frequencyComparison.Goal.Mode) {
        default:
            min = frequencyComparison.Goal.Value; 
            break; 
        case "Hours": 
            min = frequencyComparison.Goal.Value * 60; 
            break; 
    }

    switch(frequencyComparison.Threshold.Mode) {
        case "Days":
            if(min <= MIN_DAY * frequencyComparison.Threshold.Value){
                ret = true; 
            }
            break; 
        case "Weeks":
            if(min <= MIN_WEEK * frequencyComparison.Threshold.Value){
                ret = true; 
            }
            break; 
        case "Months":
            if(min <= MIN_MONTH * frequencyComparison.Threshold.Value){
                ret = true; 
            }
            break; 
        case "Years":
            if(min <= MIN_YEAR * frequencyComparison.Threshold.Value){
                ret = true; 
            }
            break; 
    }

    return ret; 
}