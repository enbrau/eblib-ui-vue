import { EbTable, EbTableColumn } from '../components'

export default {
  title: 'EBLib-UI/Data Display/EbTable',
  component: EbTable,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  render: (args) => ({
    components: { EbTable, EbTableColumn },
    setup() {
      return { 
        args,
        data: [
          {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          },
          {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
          }
        ]
      }
    },
    template: `
      <eb-table :data="data">
        <eb-table-column label="ID" prop="key" />
        <eb-table-column label="Name">
          <template #header="{props}">
            <span>{{ props.label }}</span>
          </template>
          <template #default="{row}">
            {{ row.name }}
          </template>
        </eb-table-column>
        <eb-table-column label="Age">
          <template #default="{row}">
            {{ row.age }}
          </template>
        </eb-table-column>
        <eb-table-column label="Address">
          <template #default="{row}">
            {{ row.address }}
          </template>
        </eb-table-column>
      </eb-table>
    `
  })
}

export const Default = {
  args: {}
}
