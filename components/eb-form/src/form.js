import Store from '../../../utils/store'

export const FORM = {
  LABEL_WIDTH:    'FORM_LABEL_WIDTH',
  STORE: 'FORM_STORE'
}

export const FORM_ITEM = {
  LABEL: 'FORM_ITEM_LABEL',
  STORE: 'FORM_ITEM_STORE'
}


const SET_LABEL = 'SET_LABEL'
const SET_LABEL_POSITION = 'SET_LABEL_POSITION'
const SET_LABEL_WIDTH = 'SET_LABEL_WIDTH'

export function createStore() {
  return new Store({
    state: {
      labelPosition: null,
      labelWidth: null
    },
    mutations: {
      [SET_LABEL_POSITION]: (state, labelPosition) => {
        state.labelPosition = labelPosition
      },
      [SET_LABEL_WIDTH]: (state, labelWidth) => {
        state.labelWidth = labelWidth
      }
    },
    actions: {
      setLabelPosition: ({ commit }, labelPosition) => {
        commit(SET_LABEL_POSITION, labelPosition)
      },
      setLabelWidth: ({ commit }, labelWidth) => {
        commit(SET_LABEL_WIDTH, labelWidth)
      }
    }
  })
}

export function createItemStore() {
  return new Store({
    state: {
      label: null,
      labelPosition: null,
    },
    mutations: {
      [SET_LABEL]: (state, label) => {
        state.label = label
      },
      [SET_LABEL_POSITION]: (state, labelPosition) => {
        state.labelPosition = labelPosition
      },
      [SET_LABEL_WIDTH]: (state, labelWidth) => {
        state.labelWidth = labelWidth
      }
    },
    actions: {
      setLabel: ({ commit }, label) => {
        commit(SET_LABEL, label)
      },
      setLabelPosition: ({ commit }, labelPosition) => {
        commit(SET_LABEL_POSITION, labelPosition)
      },
      setLabelWidth: ({ commit }, labelWidth) => {
        commit(SET_LABEL_WIDTH, labelWidth)
      }
    }
  })
}
