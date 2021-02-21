import { IAction } from '../../models'

const setAuthorized = (payload: boolean): IAction => {
  return { type: 'authorize', payload: payload }
}

export const actions = { setAuthorized }
