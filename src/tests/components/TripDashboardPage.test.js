import React from 'react'
import { shallow } from 'enzyme'
import trips from '../fixtures/trips'
import { TripDashboardPage } from '../../components/TripDashboardPage'

test('should render TripDashboardPage correctly', () => {
  const wrapper = shallow(<TripDashboardPage trips={trips} />)
  expect(wrapper).toMatchSnapshot()
})