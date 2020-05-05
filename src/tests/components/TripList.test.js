import React from 'react'
import { shallow } from 'enzyme'
import { TripList } from '../../components/TripList'
import trips from '../fixtures/trips'

test('should render TripList with trips', () => {
  const wrapper = shallow(<TripList trips={trips} />)
  expect(wrapper).toMatchSnapshot()
})

test('should render TripList with empty message', () => {
  const wrapper = shallow(<TripList trips={[]} />)
  expect(wrapper).toMatchSnapshot()
})
