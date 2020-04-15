import React from 'react';
import { Link } from 'react-router-dom';
import TripList from './TripList';
import TripListFilters from './TripListFilters';

const DashboardPage = () => (
  <div className="container">
    <div className="page-header">
      <Link className="btn-push" to="/create">Add Trip</Link>
      <TripListFilters />
    </div>
    <TripList />
  </div>
);

export default DashboardPage;