import CONSTANT from './constant'

export const add = () => ({ type: CONSTANT.ADD })

export const sub = () => ({ type: CONSTANT.SUB })

export const setLanguage = (data) => ({ type: CONSTANT.SET_LANGUAGE, data })