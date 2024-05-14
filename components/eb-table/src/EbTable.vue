<template>
  <div class="eb-table--wrapper">
    <slot></slot>
    <table class="eb-table">
      <table-header />
      <table-body :data="data" />
    </table>
  </div>
</template>

<script>
import './style.scss'

import Store from '../../../utils/store'
import { defineComponent, provide } from 'vue'

import TableHeader from './components/TableHeader.js'
import TableBody from './components/TableBody.js'

export default defineComponent({
  name: 'EbTable',
  components: {
    TableHeader,
    TableBody
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    data(data) {
      this.store.dispatch('setData', data)
    }
  },
  setup() {
    const store = new Store({
      state: {
        data: [],
        columns: []
      },
      mutations: {
        'SET_DATA': (state, data) => {
          state.data = data
        },
        'ADD_COLUMN': (state, column) => {
          state.columns.push(column)
        }
      },
      actions: {
        setData: ({ commit }, data) => {
          commit('SET_DATA', data)
        },
        addColumn: ({ commit }, column) => {
          commit('ADD_COLUMN', column)
        }
      }
    })

    provide('EB_TABLE_STORE', store)

    return {
      store
    }
  },
  computed: {
    columns() {
      return this.store.state.columns
    },
    datalist() {
      return this.store.state.data
    }
  }
})
</script>
