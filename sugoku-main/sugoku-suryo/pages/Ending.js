import React, { useEffect } from 'react'
import { View, Text, Button, StyleSheet, Image, Dimensions } from 'react-native'
import { useDispatch } from 'react-redux'
import { setStatus } from '../store/action'
export default function Finish({ navigation }) {
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(setStatus('')) 
    }, [])
    return (
        <View style={styles.container}>
            <Text style={styles.endGame}>Game Over</Text>
            <Image source={{uri: 'https://source.unsplash.com/By-tZImt0Ms'}}
              style={{width: 350, height: 350}} />
            <View style={styles.divider}></View>
            <Button
                title="Play again"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5784BA',
        alignItems: 'center',
        justifyContent: 'center'
    },
    endGame: {
        fontWeight: 'bold',
      marginBottom: 40,
      fontSize: 45,
      fontStyle: 'italic',
    },
    divider: {
        height: 40
      }
})