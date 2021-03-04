import React,{Component} from 'react'
import { Button,  Text, View, Image} from 'react-native';

export default function Landing({ navigation }){
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#888888'}}>
            <View style={{flex:1}}>
            </View >
             <View style={{flex:4,justifyContent:'center',alignItems:'center'}}> 
                    <Image 
                    style={{borderWidth:3,borderColor:'#acfacb', borderRadius:30,height:200, width:200}}
                    source={require('../assets/logoSB.png')} 
                    />

                </View>
                <View style={{flex:2}}>
            </View >
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
            <View style={{flex:3}}>
            
                </View>
         
        </View>
        )
}