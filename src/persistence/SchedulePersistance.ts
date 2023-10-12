import AsyncStorage from '@react-native-async-storage/async-storage';
import { Schedule } from '../../types/db/Schedule';


export function setData(labelId:number, data:Schedule) {
    let schedules:Schedule[] = []; 
    const getDataMethod = async () => {
       schedules = await getData(labelId); 
    }
    getDataMethod();

    data.id = setId(schedules); 
    console.log(JSON.stringify(data));
    const setStringValue = async () => {
        try {
            await AsyncStorage.setItem(labelId.toString(), JSON.stringify([...schedules,data]));
        } catch(e) {
            console.log('Unsuccessfull Set')
            console.log(e);
        }
        console.log('Done.')
    }
    setStringValue();
}


export async function getData(labelId:number):Promise<Schedule[]> {
    const getMyObject = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem(labelId.toString())
          return jsonValue != null ? JSON.parse(jsonValue) : []
        } catch(e) {
            console.log('Unsuccessfull Get')
        }
      
        console.log('Done.')
    }
    const ret:Schedule[] = await getMyObject() ;
    return ret;
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