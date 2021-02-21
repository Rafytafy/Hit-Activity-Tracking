import {StyleSheet} from 'react-native'

const styles= StyleSheet.create({
    loginContainer:{
        flex:2,
        backgroundColor: "#bac0ff",
        alignSelf:'center',
        justifyContent:'center',
       
    },

    inputBox: {
        borderBottomWidth:2,
        borderBottomColor:'#aef2ca',
        color:'#f2f2f2',
        padding: 8
    },

    loginButton:{
        backgroundColor: '#aef2ca',
        height: 40,
        color: 'white',
        border: false,
        display: 'block',
        width: 100,
        marginTop: 20,
    
    }
   
})

export default styles