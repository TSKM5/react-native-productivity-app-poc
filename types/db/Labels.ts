import {Schedule} from './Schedule'; 

export interface Label {
    id: number | undefined, 
    current_schedule: Schedule | undefined, 
    label_name: string
    colour: string, 
}

export interface LabelMap {
    colour: string, 
    labelName: string, 
}