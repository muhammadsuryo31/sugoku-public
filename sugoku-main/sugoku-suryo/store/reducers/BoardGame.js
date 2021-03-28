const initialState = {
  loading: false,
  board: [],
  board2: [],
  status: ''
}

function reducer (state=initialState, action) {
    const {type, payload} = action
    switch(type) {
        case 'BOARD/SETBOARD':
          return {...state, board: payload}
        case 'BOARD/SETLOADING': 
        return { ...state, loading: payload}
        case 'BOARD/SETSTATUS': 
        return { ...state, status: payload}
        case 'BOARD/SETBOARD2':
          return {...state, board2: payload}
        default: 
        return state
    }
}

export default reducer