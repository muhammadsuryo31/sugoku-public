import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Dimensions, Image } from 'react-native'
import { useDispatch } from 'react-redux'
import { setStatus } from '../store/action'
export default function Home({ navigation }) {
    const dispatch = useDispatch()
    const [playerName, setName] = useState('')
    const [difficulty, setDifficulty] = useState('')
    function startGame  () {
      dispatch(setStatus(''))
      navigation.navigate('Game', {
          player: playerName || 'anonim',
          difficulty: difficulty || 'easy'
      })
      setName('')
      setDifficulty('')
    }
    return (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.mainTitle}>
              Fancy Su(g/d)oku
            </Text>
            </View>
            <Image source={{uri: 'https://source.unsplash.com/p0j-mE6mGo4'}}
              style={{width: 350, height: 350}} />
            <View style={styles.bodyContainer}>
            <Text>Enter your Name:</Text>

            <TextInput
                style={styles.name}
                onChangeText={text => setName(text)}
                value={playerName}
                placeholder="Ex. Suryo / Oyrus"
            />
            
            <Text style={{margin: 15}}>Choose the game difficulty: </Text>
            <View style={styles.difficultyContainer}>
              <View>
                <Button
                  color= 'green'
                  title='Easy'
                  onPress={() => setDifficulty('easy')}
                  disabled={difficulty === 'easy' ? true : false}
                />
              </View>
              <View style={styles.divider}/>
              <View>
                <Button
                  color= 'orange'
                  title='Medium'
                  onPress={() => setDifficulty('medium')}
                  disabled={difficulty === 'medium' ? true : false}
                />
              </View>
              <View style={styles.divider}/>
              <View>
                <Button
                  color= 'red'
                  title='Hard'
                  onPress={() => setDifficulty('hard')}
                  disabled={difficulty === 'hard' ? true : false}
                />
              </View>
            </View>

            <Button title="START!!" onPress={startGame} />
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4CFDF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleContainer: {
      flex: 1,
      backgroundColor: '#F4CFDF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bodyContainer: {
      flex: 2,
      backgroundColor: '#F4CFDF',
      alignItems: 'center',
      justifyContent: 'center'
    },
    name: {
        width: Dimensions.get('window').width/2,
        minHeight: 40,
        textAlign: 'center',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 30
    },
    mainTitle: {
      fontWeight: 'bold',
      marginBottom: 40,
      fontSize: 45,
      fontStyle: 'italic',
    },
    difficultyContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      margin: 20
    },
    divider: {
      width: 10
    }
})