import { useState, useEffect } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { LabelMap } from "../../types/db/Labels";
import { ExtendedRecords } from "../../types/db/Schedule";
import { marshalDateTimeToString, secToTime } from "./utils/scheduleUtils/ScheduleUtils";

export default function HistoryContainer(props:{histories:ExtendedRecords[], labelMap:Map<string,LabelMap>}) {
    const {histories, labelMap} = props; 
    const [historyRecords, setHistoryRecords] = useState<ExtendedRecords[]>()

    useEffect(() => {
        setHistoryRecords(histories);
    },[histories])
    return (
        <View style={historyContainer.contentWrapper}>
            <FlatList 
                keyExtractor={(item, index) => { return index.toString()}}  
                alwaysBounceVertical={false} 
                bounces={false}
                style={{height:'100%'}}
                data={historyRecords} 
                renderItem={(itemData) => { 
                    const lMap:LabelMap = labelMap.get(itemData.item.id.toString())? labelMap.get(itemData.item.id.toString())!: {labelName:'',colour:'grey'}
                    return <HistoryRow labelMap={lMap} item={itemData.item}/>
                }
            }/>
        </View>
    )
}

function HistoryRow(props:{labelMap:LabelMap, item:ExtendedRecords}){
    const {labelMap, item} = props;  
    const dateString: string = marshalDateTimeToString(item.date_start)
    return (
        <View style={{...historyRow.buttonWrapper, backgroundColor:labelMap.colour}}> 
            <Text style={historyRow.Text}>{labelMap.labelName}</Text>
            <View style={historyRow.LabelTextView}>
                <Text style={{...historyRow.DateText, ...historyRow.Text}}>{dateString}</Text>
                <Text style={{...historyRow.TimeText, ...historyRow.Text}}>{secToTime(item.achieved_val_ms)}</Text>
            </View>
        </View>
    )
}

const historyContainer = StyleSheet.create({
    contentWrapper: {
      flex:1,
      width:'100%', 
      alignItems:'center',
      marginBottom: 20
    },
  });
  const historyRow = StyleSheet.create({
    buttonWrapper: {
      height: 80,
      width:'90%', 
      left:'5%',
      backgroundColor:'red',
      borderRadius: 10,
      borderColor: 'grey', 
      borderWidth: 1, 
      marginTop: 15,
      alignItems:'center'
    },
    LabelTextView: {
      flexDirection:'row',
      width:'100%',
      marginTop: 10
    },
    Text:{
      color: 'white',
      alignItems: 'center',
      textAlign: 'center',
      fontFamily: 'Kanit_400Regular',
      fontSize: 20,
    },
    TimeText: {
      right: 0,
      width: '50%',
      textAlign: 'center',
    }, 
    DateText: {
      left: 0,
      width: '50%', 
      textAlign: 'center'
    }
  });