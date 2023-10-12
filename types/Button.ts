import {Label} from './db/Labels'; 

export interface ButtonType extends Label{
    callback: Function | undefined,
}

 export enum ButtonEnum {
    labels,
    myWeek,
    pastData, 
    manualEntry,
    start,
    labelObjGeneric
}
