import { mount } from '@vue/test-utils'
import Header from '@/components/Header.vue'

describe('HeaderComponent', () => {
  let wrapper = mount(Header)
  let searchInput = wrapper.find('input[type="text"]')
  jest.spyOn(wrapper.vm, 'runSearch')

  it('should set value to what is passed in', () => {
    // Arrange
    let newValue = 'myTest'

    // Act
    searchInput.setValue(newValue)
    searchInput.trigger('keyup')

    // Assert
    expect(searchInput.element.value).toEqual(newValue)
  })
  it('should call runSearch method', () => {
    // Act
    searchInput.trigger('keyup')

    // Assert
    expect(wrapper.vm.runSearch).toHaveBeenCalled()
  })
})
