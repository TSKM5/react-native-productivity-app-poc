import { View, StyleSheet } from 'react-native';
import { ButtonType, } from '../../types/Button';
import { ButtonGrid, TriangleButton } from '../components/utils/buttonUtils/ButtonUtils';
import { ScreenIds } from '../components/utils/navigation/ScreenIds';
import notYetImplement from '../components/utils/NotImplementedYet';

export default function Home({navigation}: {navigation: any}) {
  const triangleButton:ButtonType = {label_name: 'Start', colour: '#94D769', callback: () => {navigation.navigate("ActionWrapper")},id: undefined, current_schedule: undefined}
  const squareButtonArr:ButtonType[] = [
    {label_name: 'Labels',  colour: '#5271FF', callback: () => {navigation.navigate(ScreenIds.labels)}, id:undefined, current_schedule: undefined}, 
    {label_name: 'My Week', colour: '#5271FF',  callback: () => {notYetImplement()}, id:undefined, current_schedule: undefined},
    {label_name: 'Past Data', colour: '#5271FF',   callback: () => {navigation.navigate(ScreenIds.pastEntries)}, id:undefined, current_schedule: undefined},
  ];


  return (
      <View style={styles.buttonWrapper}>
        {/* square  */}
        <View style={styles.gridButtonWrapper}>
            <ButtonGrid buttonArray={squareButtonArr}/>
        </View>
        {/* triangle button */}
        <View style={styles.triangleButtonWrapper}>
          <TriangleButton percentWidth={60} buttonObj={triangleButton}/>
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
    marginTop: 10
  },
  buttonWrapper: {
    flex:1,
    width:'100%', 
  },
  gridButtonWrapper: {
    flex:2,
    width: '100%',
  }, 
  triangleButtonWrapper: {
    flex: 1, 
    justifyContent: 'center',
    marginBottom: 70,
  }, 
  imageWrapper: {
    flex:1, 
    flexDirection:'row', 
    justifyContent: 'center',
  }
});
