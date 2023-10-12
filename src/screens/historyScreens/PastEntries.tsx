import { useEffect, useState } from 'react';
import { View, StyleSheet, } from 'react-native';
import { Label, LabelMap } from '../../../types/db/Labels';
import * as LabelsPersistance from "../../persistence/LabelsPersistance";
import {getAllHistories} from "../../persistence/HistoryPersistance";
import { ExtendedRecords } from '../../../types/db/Schedule';
import HistoryContainer from '../../components/HistoryContainer';
import OptionsBar from './OptionsBar';


export default function PastEntries({navigation}: {navigation: any}) {
    const [labelButtonReturn, setLabelButtonReturn] = useState<Label[]>(); 
    const [labelsIdsList, setLabelsIdsList] = useState<number[]>([]);
    const [histories, setHistories] = useState<ExtendedRecords[]>()
    const [labelId, setLabelId] = useState(-1); 
    const [labelMap, setLabelMap] = useState<Map<string,LabelMap>>(new Map<string,LabelMap>); 
    const [historiesToshow, setHistoriesToShow] = useState<ExtendedRecords[]>();
    const [dateStart, setDateStart] = useState<Date>(); 
    const [dateEnd, setDateEnd] = useState<Date>(); 

    function sortExtendedRecords(er: ExtendedRecords[]): ExtendedRecords[] {
        return er.sort((a, b) => new Date(a.date_start).getTime() - new Date(b.date_start).getTime());
    }
    
    function manageColourMap(id:Number, colour:string, name:string) {
        const idString:string = id.toString();
        if(!labelMap.has(idString)){
            labelMap.set(idString, {labelName: name, colour:colour});
        }
    }

    useEffect(() => {
        setLabelsIdsList([]);
        manageColourMap(0, 'grey', 'No Label'); 
        const assembleLabels = async () => {
            setLabelButtonReturn([...await LabelsPersistance.getData()])
        }
        assembleLabels(); 
    }, []);

    useEffect(() => {
        const assembleLabelHistories = async () => {
            const iterateThroughLabels = async (): Promise<ExtendedRecords[]> => {
                const currentHistories: ExtendedRecords[] = []
                labelButtonReturn?.forEach((e, index) => {
                    manageColourMap(e.id!, e.colour, e.label_name); 
                    labelsIdsList.push(e.id!);
                    e.current_schedule!.historyRecords.map(h => {
                         currentHistories.push({
                            id: e.id!, 
                            ...h
                         })
                    })
                })
                return currentHistories; 
            }
            let coupledData:ExtendedRecords[] = [];
            coupledData = [...await iterateThroughLabels()];
            coupledData = [...coupledData, ...await getAllHistories(labelsIdsList)];
            // setHistories(coupledData); console.log(coupledData.length)
            setHistories([...sortExtendedRecords(coupledData)]);
        }
        assembleLabelHistories(); 
    },[labelButtonReturn])

    function setValuesUpstream(labelValue: string, dateStart?: Date, dateEnd?: Date) {
        setLabelId(parseInt(labelValue));
        if(dateStart) {
            let dS = new Date(dateStart);
            dS.setHours(0,0,0,0);
            setDateStart(dS);
        } else {
            setDateStart(undefined);
        }
        if(dateEnd) {
            let dE = new Date(dateEnd);
            dE.setHours(23,59,59,999);
            setDateEnd(dE);
        } else {
            setDateEnd(undefined);
        }
    }

    useEffect(() => { 
        if(histories){
            const entriesToShow: ExtendedRecords[] = histories.filter(item => {
                let valid = true;
                console.log(dateStart, dateEnd, labelId)
                if(dateStart) valid = valid && new Date(item.date_start) >= new Date(dateStart);
                if(dateEnd) valid = valid && new Date(item.date_end) <= new Date(dateEnd);
                if(labelId !== -1) {
                    if(labelId !== null && labelId !== undefined) valid = valid && item.id === labelId;
                }
                
                return valid;
            });
            setHistoriesToShow(sortExtendedRecords(entriesToShow));
        }
    }, [histories, labelId, dateStart, dateEnd])
    return (
        <View style={styles.contentWrapper}>
            <OptionsBar labels={labelButtonReturn!} setValuesCallback={setValuesUpstream}/> 
            <HistoryContainer histories={historiesToshow? historiesToshow : []} labelMap={labelMap}/>
        </View>
    );
}

const styles = StyleSheet.create({
  contentWrapper: {
    flex:1,
    width:'100%', 
    alignContent:'center'
  },
});


