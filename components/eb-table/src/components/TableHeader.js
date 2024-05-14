import { defineComponent, inject, h } from 'vue'

export default defineComponent({
  name: 'TableHeader',
  setup() {
    const store = inject('EB_TABLE_STORE')

    const wrappedHeaderRowRender = (columns) => {
      return h(
        'tr',
        {
          class: 'eb-table--row'
        },
        columns.map((column) => {
          return h(
            'th',
            {
              class: 'eb-table--cell'
            },
            column?.slots?.header ? 
              column.slots.header({ props: column.props }) : 
              column.props.label
          )
        })
      )
    }

    return {
      store,
      wrappedHeaderRowRender
    }
  },
  render() {
    const columns = this?.store?.state.columns || []

    return h(
      'thead', 
      { 
        tabIndex: -1,
        class: 'eb-table--header'
      }, 
      this.wrappedHeaderRowRender(columns)
    )
  }
})