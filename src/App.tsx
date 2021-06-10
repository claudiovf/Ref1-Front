import React, { useEffect, useState, Suspense, lazy } from 'react';
import Header from './Components/Header';
import CurrentDriversPanel from './Components/CurrentDriversPanel';
import CurrentTeamsPanel from './Components/CurrentTeamsPanel';
const DriverProfile = lazy(() => import('./Components/DriverProfile'));
const TeamProfile = lazy(() => import('./Components/TeamProfile'));
const CircuitProfile = lazy(() => import('./Components/CircuitProfile'));
const SearchModal = lazy(() => import('./Components/Search'));
const SettingsModal = lazy(() => import('./Components/SettingsModal'));
import { Switch, Route } from 'react-router-dom';
import { Spacer, AppStyled } from './Components/LayoutComponents';
import LegendsPanel from './Components/LegendsPanel';
import SkySportsPanel from './Components/SkySportsPanel';
import ExploreDrivers from './Components/ExploreDrivers';
import ExploreTeams from './Components/ExploreTeams';
import Standings from './Components/Standings';
import ReactGA from 'react-ga';
import RouteTracker from './RouteTracker';
import HomeCircuits from './Components/HomeCircuits';
import DesktopSwitch from './Components/DesktopSwitch';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { SettingsState } from './store/SettingsStore/settingsTypes';
import { SearchState } from './store/searchTypes';
import { Helmet } from 'react-helmet';


const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [isSettings, setIsSettings] = useState<boolean>(false);
  const settings: SettingsState = useSelector((state: RootState) => state.settings);
  const search: SearchState = useSelector((state: RootState) => state.search);


  useEffect(() => {
    //trigger for lazy modals
    if(search.isOpen) {
      setIsSearch(true);
    } else {
      setIsSearch(false);
    }
    if(settings.isOpen) {
      setIsSettings(true);
    } else {
      setIsSettings(false);
    }

    //window size listener for home view switch
    const handleResize = () => {
      if(window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [search.isOpen, settings.isOpen]);
  

  //google analytics
  const TRACKING_ID = "UA-192952368-1";
  ReactGA.initialize(TRACKING_ID);
  

  return (
    <AppStyled darkMode={settings.isDarkMode}>
      <Helmet>
          <title>Ref1 App - F1 Calendar 2021 | Countdown | Standings | Results | Drivers & Team Stats</title>
          <meta
              name={"description"}
              content={"Formula 1 Calendar 2021 | Countdown + Weather Forecast | Standings | Results | Drivers & Team Stats."}
          />
      </Helmet>

      <Header />
      <Spacer />
      <Switch>
        <Suspense fallback={<></>}>
          <Route exact path="/">
            {isMobile
              ? <>
                <HomeCircuits />
                <CurrentDriversPanel />
                <CurrentTeamsPanel />
                <Standings />
                <ExploreDrivers />
                <ExploreTeams /> 
                <LegendsPanel />
                <SkySportsPanel />
              </>
              : <>
                <HomeCircuits />
                <DesktopSwitch />
              </>
            }

          </Route>
          <Route exact path="/profile/driver/:driverId">
            <DriverProfile />
          </Route>
          <Route exact path="/profile/team/:constructorId">
            <TeamProfile />
          </Route>
          <Route exact path="/profile/circuit/:circuitId">
            <CircuitProfile />
          </Route>
            <Suspense fallback={<></>}>
            {
              isSearch 
              ? <SearchModal />
              : null
            }
            {
              isSettings 
              ? <SettingsModal />
              : null
            }
            </Suspense>
        </Suspense>
      </Switch>

      <RouteTracker />
    </AppStyled>
  );
};

export default App;
