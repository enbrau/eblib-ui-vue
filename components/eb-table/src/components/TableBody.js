import { defineComponent, inject, h } from 'vue'

export default defineComponent({
  name: 'TableBody',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const store = inject('EB_TABLE_STORE')
    
    const wrappedRowRender = (row, $index) => {
      const columns = store.state.columns
      return h(
        'tr', 
        {
          class: 'eb-table--row'
        },
        columns.map((column) => {
          return h(
            'td',
            {
              class: 'eb-table--cell'
            },
            column.slots?.default ? 
              (column.slots.default({ row, $index, props: column.props })) :
              (column.props.prop ? row[column.props.prop] : '')
          )
        })
      )
    }

    return {
      store,
      wrappedRowRender
    }
  },
  render() {
    return h(
      'tbody', 
      { 
        tabIndex: -1,
        class: 'eb-table--body'
      }, 
      [
        this.data.reduce((acc, row) => {
          return acc.concat(this.wrappedRowRender(row, acc.length))
        }, [])
      ]
    )
  }
})
