//encoding function from 3rdParty
const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) => 
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');
// 

export function setBoard(payload) {
  return {type: 'BOARD/SETBOARD', payload}
}

export function setBoard2(payload) {
  return {type: 'BOARD/SETBOARD2', payload}
}

export function setLoading (payload) {
  return {type: 'BOARD/SETLOADING', payload}
}

export function setStatus (payload) {
  return {type: 'BOARD/SETSTATUS', payload}
}

export function fetchBoard(payload) {
    return async (dispatch) => {
      try {
        dispatch(setLoading(true))
        const response = await fetch(`https://sugoku.herokuapp.com/board?difficulty=${payload}`)
          if (!response.ok) {
            console.log(response, 'response is not 200')
            dispatch(setLoading(false))
          } else {
            const data = await response.json()
            dispatch(setBoard(data.board))
            dispatch(setBoard2(data.board))
            dispatch(setLoading(false))
          }
      } catch(err) {
        console.log(err)
      } 
    }
}

export function solveBoard(payload) {
  return async (dispatch) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeParams({board: payload})
      };
        const response = await fetch(`https://sugoku.herokuapp.com/solve`, requestOptions)
          if (!response.ok) {
            console.log(response, 'response is not 200')
          } else {
            const data = await response.json()
            dispatch(setBoard(data.solution))
          }
      } catch(err) {
        console.log(err)
      } 
  }
}

export function checkBoard(payload) {
  return async (dispatch) => {
    try {
      dispatch(setStatus(''))
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeParams({board: payload})
      };
        const response = await fetch(`https://sugoku.herokuapp.com/validate`, requestOptions)
          if (!response.ok) {
            console.log(response, 'response is not 200')
          } else {
            const data = await response.json()
            dispatch(setStatus(data.status))
          }
      } catch(err) {
        console.log(err)
      } 
  }
}
