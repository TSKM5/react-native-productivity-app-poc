import AsyncStorage from '@react-native-async-storage/async-storage';
import { ExtendedRecords, HistoryRecords, Schedule } from "../../types/db/Schedule";
import { Label } from '../../types/db/Labels';

const keyHistoryUndefined:string = 'HistoryUndefined'; 

export function setUndefinedData(data:HistoryRecords) {
    const setStringValue = async () => {
        try {
            const ret: HistoryRecords[] = await getUndefinedData(); 

            await AsyncStorage.setItem(keyHistoryUndefined, JSON.stringify([data, ...ret]))
        } catch(e) {
            console.log('Unsuccessfull Set')
            console.log(e);
        }
        console.log('Done.')
    }
    setStringValue();
}

export async function getUndefinedData():Promise<HistoryRecords[]> {
    const getMyObject = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem(keyHistoryUndefined)
          return jsonValue != null ? JSON.parse(jsonValue) : []
        } catch(e) {
            console.log('Unsuccessfull Get')
        }
      
        console.log('Done.')
    }
    const ret:HistoryRecords[] = await getMyObject() ;
    return ret;
}

function formLabelScheduleKey(labelId:number):string{
    return "ScheduleHistory" + labelId; 
}

export async function getScheduleData(labelId:number):Promise<Schedule[]> {
    const getMyObject = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem(formLabelScheduleKey(labelId))
          return jsonValue != null ? JSON.parse(jsonValue) : []
        } catch(e) {
            console.log('Unsuccessfull Get')
        }
      
        console.log('Done.')
    }
    const ret:Schedule[] = await getMyObject() ;
    return ret;
}

export async function setArchiveData(labelId:number, sched:Schedule){
    const data:Schedule[] = await getScheduleData(labelId) ;
    const newIndex:number = setId(data); ;
    sched.id = newIndex; 
    const setStringValue = async () => {
        try {
            await AsyncStorage.setItem(labelId === 0? keyHistoryUndefined: formLabelScheduleKey(labelId), JSON.stringify([...data, sched]))
        } catch(e) {
            console.log('Unsuccessfull Set')
            console.log(e);
        }
        console.log('Done.')
    }
    await setStringValue();
}

function setId(data:Schedule[]):number{
    let max = 0; 
    if(data.length > 0) {
        data.map(e => {
            if(e.id){
                if(e.id > max) {
                    max = e.id; 
                }
            }
        })
    }
    return max + 1; 
}

export async function getAllHistories(labelsArr:number[]):Promise<ExtendedRecords[]> {
    const retHistory: ExtendedRecords[] = []; 
    labelsArr.map(async e => {
        const getMyObject = async () => {
            try {
              const jsonValue = await AsyncStorage.getItem(formLabelScheduleKey(e))
              return jsonValue != null ? JSON.parse(jsonValue) : []
            } catch(e) {
                console.log('Unsuccessfull Get')
            }
            
            console.log('Done.')
        }
        const ret:Schedule[] = await getMyObject();
        ret.map(b => {
            console.log(b)
            b.historyRecords.map(c => {
                retHistory.push({
                    id: e, 
                    ...c
                })
            })
        })
    })

    const getUndefinedDataWrapper = async () => {
        const ret: HistoryRecords[] = await getUndefinedData(); 
        ret.map(e => {
            retHistory.push({
                id: 0, 
                ...e
            })
            console.log(retHistory.length)
        })
    }

    await getUndefinedDataWrapper(); 
    return retHistory;
}

