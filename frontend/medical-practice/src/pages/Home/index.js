import React from 'react';
import SpecialityList from './SpecialityList';
import './assets/index.css';
import SearchButton from './SearchButton';

function HomePage() {
  return (
    <div>
      <h1>
        Trouvez le rendez-vous qu'il vous faut
      </h1>
      <SpecialityList />
      <SearchButton />
      <p>Tout nos professionels de Santé sont à votre disposition</p>
    </div>
  );
}

export default HomePage;