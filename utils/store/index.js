import { ref } from 'vue'

class Store {
  constructor(options) {
    let vm = ref(options.state || {})
    this.state = vm.value

    this.mutations = {}
    let mutations  = options.mutations || {}
    Object.keys(mutations).forEach(key => {
      this.mutations[key] = params => {
        mutations[key].call(this, this.state, params)
      }
    })
    
    this.actions = {}
    let actions = options.actions || {}
    Object.keys(actions).forEach(key => {
      this.actions[key] = params => {
        actions[key].call(this, this, params)
      }
    })
  }

  commit = (key, params) => {
    this.mutations[key](params)
  }

  dispatch = (type, payload) => {
    this.actions[type](payload)
  }
}

export default Store