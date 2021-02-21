import { createContext, useReducer, useContext } from 'react'
import { IAction } from '../../models'
import { actions } from './actions'

interface IState {
  authorized: boolean
}

const initialState: IState = {
  authorized: false
}

const StateContext = createContext<IState>(initialState)
const DispatchContext = createContext<any>(null)

function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case actions.setAuthorized(false).type:
      return { ...initialState, authorized: action.payload }
    default:
      console.error('Action type not handled')
      return state
  }
}
function Provider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, { ...initialState })
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  )
}
function useState(): IState {
  const context = useContext(StateContext)
  if (context === undefined) throw new Error('useState must be used within a state provider')
  return context
}
function useDispatch() {
  const context = useContext(DispatchContext)
  if (context === undefined) throw new Error('useDispatch must be used within a provider')

  return context
}

const useContextState = (): [IState, any] => [useState(), useDispatch()]

export { Provider as CountProvider, useContextState }
