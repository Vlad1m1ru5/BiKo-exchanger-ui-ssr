import 'jest-styled-components'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import React from 'react'

import Warning from 'client/components/warning'

describe('Test component Warnign', () => {
  const isVisible = true
  const isInvisible = false

  const visibleTitle = 'title'
  const invisibleTitle = ''

  const visibleWarning = shallow(<Warning isVisible={isVisible} title={visibleTitle} />)
  const visibleWarningWithVisibleTitle = shallow(<Warning isVisible={isVisible} title={visibleTitle} />)
  const visibleWarningWithInvisibleTitle = shallow(<Warning isVisible={isVisible} title={invisibleTitle} />)
  const invisibleWarning = mount(<Warning isVisible={isInvisible} title={visibleTitle} />)

  it('Should render visible Warning', ()  => {
    expect(visibleWarning.length).toBe(1)
  })

  it('Should render Warning title', ()  => {
    expect(visibleWarningWithVisibleTitle.prop('title')).toBe(visibleTitle)
  })

  it('Should not render Warning title', ()  => {
    expect(visibleWarningWithInvisibleTitle.prop('title')).toBeFalsy()
  })

  it('Should render invisible Warning', ()  => {
    expect(invisibleWarning.length).toBe(1)
  })

  it('Should hase visibility hidden', () => {
    const renderedInvisibleWarning = renderer.create(<Warning isVisible={isInvisible} title={invisibleTitle} />).toJSON()
    expect(renderedInvisibleWarning).toHaveStyleRule('visibility', 'hidden')
    expect(renderedInvisibleWarning).toMatchSnapshot()
  })
})