import React, { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import CurrentDriversPanel from './Components/CurrentDriversPanel';
import CurrentTeamsPanel from './Components/CurrentTeamsPanel';
import DriverProfile from './Components/DriverProfile';
import { Switch, Route } from 'react-router-dom';
import { Spacer } from './Components/LayoutComponents';
import TeamProfile from './Components/TeamProfile';
import LegendsPanel from './Components/LegendsPanel';
import SkySportsPanel from './Components/SkySportsPanel';
import SearchModal from './Components/Search';

const App: React.FC = () => {
  const [ isOpen, toggle ] = useState<boolean>(false);

  const handleOpenSearch = (open: boolean) => {
    toggle(open);
  };


  return (
    <div className="App">
      <Header handleOpenSearch={() => handleOpenSearch(true)}/>
      <Switch>
        <Route exact path="/">
          <CurrentDriversPanel />
          <CurrentTeamsPanel />
          <LegendsPanel />
          <SkySportsPanel />
        </Route>
        <Route exact path="/profile/driver/:driverId">
          <Spacer />
          <DriverProfile />
        </Route>
        <Route exact path="/profile/team/:constructorId">
          <Spacer />
          <TeamProfile />
        </Route>
      </Switch>

      <SearchModal isOpen={isOpen}  handleClose={() => handleOpenSearch(false)} />
      

    </div>
  );
};

export default App;
