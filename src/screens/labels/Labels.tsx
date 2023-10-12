import { View, StyleSheet } from 'react-native';
import { ButtonType } from '../../../types/Button';
import { ButtonGridScrollable } from '../../components/utils/buttonUtils/ButtonUtils';
import { useEffect, useState } from 'react';
import React from 'react';
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import * as LabelsPersistance from "../../persistence/LabelsPersistance";
import { Label } from '../../../types/db/Labels';
import { ScreenIds } from '../../components/utils/navigation/ScreenIds';

export default function Labels({navigation}: {navigation: any}) {
    const isFocused = useIsFocused();
    const newLabelButton:ButtonType = {
        callback: () => { navigation.navigate(ScreenIds.createLabels, { labelParam: undefined }); },
        id: undefined,
        current_schedule: undefined,
        label_name: '+',
        colour: '#767881'
    }

    function marshalLabelsToButtons(label:Label):ButtonType {
        const ret: ButtonType = {
            ...label,
            callback: () => {navigation.navigate(ScreenIds.createLabels, {labelParam:{
                id: label.id,
                current_schedule: label.current_schedule,
                label_name: label.label_name,
                colour: label.colour
            }})},
        }
        return ret; 
    }
    const [labelButtons, setLabelButtons] = useState<ButtonType[]>([newLabelButton]); 

    const marshalData = async () => {
        try {
            const returnData:Label[] = await LabelsPersistance.getData();
            setLabelButtons([newLabelButton, ...returnData.map(item => marshalLabelsToButtons(item))]);   
        } catch(e) {
            
        }
    }

    useFocusEffect(()=> {
        marshalData();
    })

    useEffect(() => {
        marshalData();
    }, [isFocused])

    return (
        <View style={styles.container}>
            <View style={styles.gridWrapper}>    
                <ButtonGridScrollable buttonArray={labelButtons}/>
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      gridWrapper: {
        flex: 1,
        width:'100%',
        justifyContent: 'center',
        alignContent: 'center'
      }, 
      scrollView: {
        flex: 3, 
        width: '100%'
      }
});


