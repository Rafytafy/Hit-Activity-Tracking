import React,{Component} from 'react'
import { Button,  Text, View } from 'react-native';

export default function Landing({ navigation }){
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <View style={{flex:6}}>
            
                </View>
            <View style={{flex:1,height:40,width:250,fontSize:16,backgroundColor:'#bbc2ff',borderWidth:2,borderColor:'#acfacb',borderRadius:20,justifyContent:'center',alignItems:'center'}}>
            <Button 
            color='rgba(0, 0, 0, 0)'
            title='Login'
            onPress={() => navigation.navigate('Login')}/>
            </View>
            <View style={{flex:1}}>
                
                </View>
            <View style={{flex:1,height:40,width:250,fontSize:16,backgroundColor:'#bbc2ff',borderWidth:2,borderColor:'#acfacb',borderRadius:20,justifyContent:'center',alignItems:'center'}}>
            <Button 
            color='rgba(0, 0, 0, 0)'
            title='Sign Up'
            onPress={() => navigation.navigate('SignUp')}/>
            </View>
            <View style={{flex:6}}>
            
                </View>
         
        </View>
        )
}