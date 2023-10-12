
export interface DropdownObj {
    textInputPlaceHolderVal: string,
    dropdownPlaceholderVal: string, 
    values: DropdownValues[], 
    callback: Function, 
}

export interface DropdownValues { 
    label: string, 
    value: string, 
}

export interface TextInputObject { 
    placeholderVal: string, 
    callback: Function, 
}

export interface FrequencyComparison { 
    Threshold: ThresholdValue, 
    Goal: GoalValue, 
}

export interface ThresholdValue {
    Value: number, 
    Mode: ThresholdModes, 
}

export interface GoalValue {
    Value: number, 
    Mode: GoalModes,
}

export type ThresholdModes = "Days" | "Weeks" | "Months" | "Years";
export type GoalModes = "Hours" | "Minutes";

export interface LabelsDropdownObj {
    value: string,
    dropdownPlaceholderVal: string, 
    labelsDropdownValues: labelsDropdownValues[], 
    callback: Function, 
}

export interface labelsDropdownValues {
    label: string, 
    value: string, 
    colour: string,
    labelId:number
}

export interface DateObjects {
    dateValue: {
        dateValue: Date | undefined,
        setDateValue: Function,
    },
    dateDisplayString: {
        dateDisplayString:String | undefined,
        setDateDisplayString:Function,
    }
}