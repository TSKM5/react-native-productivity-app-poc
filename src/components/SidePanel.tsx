import { View, Text, StyleSheet, Modal, Pressable, Image, Alert } from "react-native";
import notYetImplement from "./utils/NotImplementedYet";


export default function SidePanel(props:{sidePanelCallback:Function}){
    const {sidePanelCallback} = props;
    return (
        <View style={sidePanel.contentWrapper}>
            <View style={sidePanel.modalWrapper}>
                <SidePanelContent sidePanelCallback={sidePanelCallback}/>
            </View>
            <Pressable style={sidePanel.modalBackgroundWrapper} onPress={() => { sidePanelCallback(false) }}>
                <View style={sidePanel.modalBackgroundWrapper}>
                </View>
            </Pressable>
        </View>
    )
}

function SidePanelContent(props:{sidePanelCallback:Function}){
    const {sidePanelCallback} = props;


    return (
        <View style={sidePanel.contentWrapper}>
            <View style={sidePanelContent.landingImageWrapper}>
                <Image 
                    resizeMode='contain' 
                    resizeMethod='auto'
                    source={require('./../../assets/images/landingIconInvert.png')} 
                    style={sidePanelContent.landingImage}
                />
            </View>
            <View style={sidePanelContent.contentButton}>
                <PanelIconButton icon={require('./../../assets/images/profile.png')} text='Profile' callback={() => {notYetImplement()}}/>
            </View>
            <View style={sidePanelContent.contentButton}>
                <PanelIconButton icon={require('./../../assets/images/settings.png')} text='Settings' callback={() => {notYetImplement()}}/>
            </View>
            {/* add new menu items above */}
            <View style={{...sidePanelContent.contentButton, marginTop:'140%'}}>
                <PanelIconButton icon={require('./../../assets/images/arrow.png')} text='Close Menu' callback={() => {sidePanelCallback(false)}}/>
            </View>
        </View>
    )
}

function PanelIconButton(props:{icon:NodeRequire, text:string, callback:Function}){
    const {icon, text, callback} = props;
    return (
        <View style={panelIconButton.container}>
            <Pressable style={{height:'100%', width:'100%', flexDirection:'row'}} onPress={() => {callback()}}>
                <Image 
                    resizeMode='contain' 
                    resizeMethod='auto'
                    source={icon as any} 
                    style={panelIconButton.icon}
                />
                <View style={panelIconButton.textWrapper}>
                  <Text style={panelIconButton.text}>{text}</Text>
                </View>
            </Pressable>
        </View>
    )
}

const sidePanel = StyleSheet.create({
    contentWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        // backgroundColor: 'grey',
        zIndex: 100,
    },
    modalWrapper: {
        // position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '50%',
        backgroundColor: '#5271FF',
        zIndex: 101,
    },
    modalBackgroundWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
        opacity: 0.5,
        zIndex: 100,
    },
  });

const sidePanelContent = StyleSheet.create({
    landingImageWrapper: {
        top: '15%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    landingImage: {
        height: 75,
        width: 75,
    },
    contentButton: {
        top: '30%',
        height:30,
        marginBottom: '20%',

    },
    contentButtonBottom: {
        height:30,
        marginBottom: '20%',
        top: '50%'

    },
  });
const panelIconButton = StyleSheet.create({
    container: {
        width: '100%',
        height:'100%',
    },
    icon: {
        height: 30,
        width: 30,
        right:0,
        marginLeft: 10,
    },
    textWrapper: {
        width:'70%', 
        height:'100%', 
        left:'30%',
        top:0, 
        justifyContent:'center'
    },
    text: {
        textAlign:'center',
        fontFamily: 'Kanit_400Regular',
        fontSize: 22,
        color: 'white',
    },
  });