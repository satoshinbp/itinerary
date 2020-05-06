import React from 'react'
import { shallow } from 'enzyme'
import trips from '../fixtures/trips'
import events from '../fixtures/events'
import hotels from '../fixtures/hotels'
import { ScheduleDashboardPage } from '../../components/ScheduleDashboardPage'

test('should render ScheduleDashboardPage correctly for one day trip', () => {
  const wrapper = shallow(<ScheduleDashboardPage trip={trips[2]} events={[events[2]]} hotels={[]} />)
  expect(wrapper).toMatchSnapshot()
})

test('should render ScheduleDashboardPage correctly for multi days trip', () => {
  const wrapper = shallow(<ScheduleDashboardPage trip={trips[0]} events={[events[0]]} hotels={[hotels[0], hotels[2]]} />)
  expect(wrapper).toMatchSnapshot()
})


// test for Modal open case to be implemented