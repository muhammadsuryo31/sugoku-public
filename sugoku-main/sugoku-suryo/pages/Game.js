import React, { useEffect, useState } from 'react'
import {Text, StyleSheet, Button, View, TextInput, Dimensions, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBoard, solveBoard, checkBoard, setBoard } from '../store/action'

export default function Game({ route, navigation }) {
    const dispatch = useDispatch()
    const { player, difficulty } = route.params
    const { board, loading, status, board2 } = useSelector(state => state.board)
    useEffect(() => {
        dispatch(fetchBoard(difficulty))
    }, [])

    useEffect(() => {
      if(status) {
        statusCheck()
      }
  }, [status])

    function onChangeInput (indexI, indexJ, value) {
      let input = JSON.parse(JSON.stringify(board))
        input[indexI][indexJ] = +value
        dispatch(setBoard(input))
    }

    function solver () {
      dispatch(solveBoard(board2))
    }

    function checker () {
      dispatch(checkBoard(board))
    }

    function statusCheck () {
      if (status) {
        if (status === 'solved') {
          Alert.alert(
            'Congratulations',
            'You finished the game',
            [
              {
                text: 'end game',
                onPress: () => navigation.navigate('Ending')
              }
            ]
          )
        } else if (status === 'unsolved' || status === 'broken') {
          Alert.alert(
            'Too Bad',
            'Your game are not finished',
            [
              {
                text: 'continue play',
              }
            ]
          )
        }
      }
    }

  return (
    <View style={styles.container}>
    {
      loading ? <Text>fetching data please wait</Text> : 
      <View style={styles.container3}>
        <View>
        <Text style={styles.mainTitle}>
        player name: {player}
        </Text>
        <Text style={styles.mainTitle}>
          difficulty: {difficulty}
        </Text>
        </View>
        <View style={styles.container2}>
          {
            board.map((item, indexI) => {
              return(
                <View
                style={styles.view1}
                key={indexI}>
                {item.map((item2, indexJ) => {
                  return board2[indexI][indexJ] == 0 ? (
                    <TextInput
                    key={indexJ}
                    defaultValue={item2 === 0 ? '' : item2.toString()}
                    maxLength={1}
                    style={styles.playerInput}
                    keyboardType={'numeric'}
                    onChangeText={text =>
                        onChangeInput(
                            indexI,
                            indexJ,
                            text
                        )
                    }
                    />
                ) : (
                  <TextInput
                  key={indexJ}
                  defaultValue={String(item2)}
                  editable={false}
                  maxLength={1}
                  style={styles.boardInput}
                  keyboardType={'numeric'}
                  onChangeText={text =>
                      onChangeInput(
                          indexI,
                          indexJ,
                          text
                      )
                  }
                    />
                  )
                  })}
                  
                </View>
              )
            })
          }
        </View>
        <View style={styles.buttonAction}>
            <Button title="Check answer" color='blue' onPress={checker} />
            <View style={styles.divider}/>
            <Button title="Solve sudoku" color='green' onPress={solver} />
        </View>
      </View>
    }
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B6D8F2',
        alignItems: 'center',
        margin: 0
    },
    container2: {
      height: Dimensions.get('window').height/2,
      width: Dimensions.get('window').width,
      backgroundColor: '#B6D8F2',
      margin: 0
    },
    container3: {
      flex: 1,
        backgroundColor: '#B6D8F2',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 0
    },
    playerInput: {
      height: 48,
      width: 40,
      borderWidth: 2,
      borderColor: 'black',
      textAlign: 'center'
    },
    view1: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    boardInput: {
      height: 48,
      width: 40,
      borderWidth: 2,
      borderColor: 'black',
      color: 'black',
      textAlign: 'center',
      backgroundColor: 'grey'
    },
    mainTitle: {
      fontWeight: 'bold',
      fontSize: 40,
      fontStyle: 'italic',
      textAlign: 'center',
    },
    buttonAction: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'stretch',
      marginBottom: 20,
    },
    divider: {
      width: 10
    }
    
})