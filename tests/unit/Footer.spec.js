import { mount } from '@vue/test-utils'
import Footer from '@/components/Footer.vue'

describe('FooterComponent', () => {
  let wrapper = mount(Footer)

  it('should create p tag with copyright text', () => {
    // Arrange
    const pTag = wrapper.find('#app-footer p')

    // Assert
    expect(pTag.html()).toContain('<p>© 2021 Copyright TestApp</p>')
  })
})
