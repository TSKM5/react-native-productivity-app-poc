import AsyncStorage from '@react-native-async-storage/async-storage';
import { ButtonType } from '../../types/Button';
import { Label } from '../../types/db/Labels';
import { setArchiveData } from './HistoryPersistance';
import { setScheduleObj } from '../components/utils/scheduleUtils/ScheduleUtils';

const key:string = 'key'; 

export function setData(data:Label):number {
    let id = -1; 
    const setStringValue = async () => {
        try {
            const ret: Label[] = await getData(); 
            data.id = setId(ret);

            await AsyncStorage.setItem(key, JSON.stringify([data, ...ret]))
            id = data.id; 
        } catch(e) {
            console.log('Unsuccessfull Set')
            console.log(e);
        }
        console.log('Done.')
    }
    setStringValue();
    return id; 
}


export async function getData():Promise<Label[]> {
    const getMyObject = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem(key)
          return jsonValue != null ? JSON.parse(jsonValue) : []
        } catch(e) {
            console.log('Unsuccessfull Get')
        }
      
        console.log('Done.')
    }
    const ret:Label[] = await getMyObject() ;
    return ret;
}


export async function updateData(id:number, newValue:Label) {
    let data: Label[] = []; 
    await expireSchedule(newValue);
    const getDataMethod = async () => {
        data = await getData(); 
    }
    await getDataMethod();
    const index:number = data.findIndex(item => item.id === id);
    data[index] = newValue; 

    const setDataMethod = async () => {
        await AsyncStorage.setItem(key, JSON.stringify([...data]))
    } 
    await setDataMethod(); 
}

export async function getALabel(id:number):Promise<Label | undefined> {
    let data:Label[] = await getData(); 

    data.map(d => {
        if(d.id === id){
            return d; 
        }
    })
    return undefined; 
}

function setId(data:Label[]):number{
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

async function expireSchedule(label:Label) {
 if(label.current_schedule){
    const dateToday = new Date(Date.now());
    if(label.current_schedule.date_end > dateToday) {   
        if(label.id){
            if(label.current_schedule.target_ms <= label.current_schedule.current_ms)
            setArchiveData(label.id, label.current_schedule);
            label.current_schedule = setScheduleObj(label.current_schedule.frequency, label.current_schedule.frequency_value, label.current_schedule.target_value, label.current_schedule.target_metric);
        }
    }
 }
}