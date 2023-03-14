import React from 'react';
import SpecialityList from './SpecialityList';
import '../../assets/HomePage.css';
import SearchButton from './SearchButton';

function HomePage() {
  return (
    <div>
      <SpecialityList />
      <SearchButton />
    </div>
  );
}

export default HomePage;