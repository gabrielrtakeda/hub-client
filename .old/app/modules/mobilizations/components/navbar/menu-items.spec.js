import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { MenuItems } from './'

describe('app/modules/mobilizations/components/navbar/menu-items', () => {
  let wrapper
  const props = {
    blocks: [{ id: 1 }, { id: 2 }],
    mobilization: { id: 1 }
  }

  before(() => {
    wrapper = shallow(<MenuItems {...props} />)
  })

  it('should render without crash', () => {
    expect(wrapper).to.be.ok
  })

  it('should render two NavbarEditionWrapper component properly', () => {
    expect(wrapper.find('NavbarEditionWrapper')).to.have.length(2)
  })

  describe('default', () => {
    it('should render items wrapper div with "inline-block" class name', () => {
      wrapper.find('.menu-item').forEach(item => {
        expect(item.props().className).to.have.string('inline-block')
      })
    })

    it('should render desktop version', () => {
      expect(wrapper.find('.lg-show')).to.have.length(1)
    })
  })

  describe('mobile prop enabled', () => {
    before(() => {
      wrapper = shallow(<MenuItems {...props} mobile />)
    })

    after(() => {
      wrapper = wrapper.setProps(props)
    })

    it('should render items wrapper div without "inline-block" class name', () => {
      wrapper.find('.menu-item').forEach(item => {
        expect(item.props().className).to.not.have.string('inline-block')
      })
    })

    it('should render <DropDownMenu /> component properly', () => {
      expect(wrapper.find('DropDownMenu')).to.have.length(1)
    })

    it('should render mobile version', () => {
      expect(wrapper.find('.lg-hide')).to.have.length(1)
    })
  })
})