/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AdminDash} from './AdminDash'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AdminDash', () => {
  let AdminDash

  beforeEach(() => {
    AdminDash = shallow(<AdminDash email="cody@email.com" />)
  })

  it('renders the email in an h3', () => {
    expect(AdminDash.find('h3').text()).to.be.equal('Welcome, cody@email.com')
  })
})
