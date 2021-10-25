import { SAMPLE_CHECK } from '../ActionNames'

const initialState = {
  sample_check: 0,
}

const SampleCheck = (store, action) => {
  const { sample_check } = action
  return Object.assign({}, store, {
    sample_check,
  })
}

export default (store = initialState, action) => {
  switch (action.type) {
    case SAMPLE_CHECK:
      return SampleCheck(store, action)
    default:
      return store
  }
}
