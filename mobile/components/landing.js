import React,{Component} from 'react'
import { Button,  Text, View } from 'react-native';

export default function landing({ navigation }){
    return(
        <View style={{flex:1,justifyContent:'center'}}>
            <Button 
            title='Login'
            onPress={() => navigation.navigate('login')}/>
             <Button 
            title='Sign Up'
            onPress={() => navigation.navigate('signUp')}/>
        </View>
        )
}