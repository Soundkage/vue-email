import { mount } from '@vue/test-utils'
import ContentTableData from '@/components/ContentTableData.vue'

describe('ContentTableData', () => {
  let wrapper = mount(ContentTableData)

  wrapper.setProps({
    id: {
      type: Number,
      required: true
    },
    emailAddress: String,
    subject: String,
    date: String
  })

  it('should format a date string when getFormattedDate is called', () => {
    // Arrange
    const date = wrapper.find('.content-table-td-date')

    // Act
    // Assert
    console.log('>>>> ', wrapper.vm.props)
  })
})
