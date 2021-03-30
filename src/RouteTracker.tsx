/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';


export const eventGa = (category: string, action: string, label: string): void => {
    ReactGA.event({
      category: category,
      action: action,
      label: label
    });
  };

const RouteTracker: React.FC<{ history: any }> = ({ history }: {history: any}) => {
    history.listen((location: { pathname: string; }, _action: any) => {
        ReactGA.set({ page: location.pathname });
        ReactGA.pageview(location.pathname);
    });
    return <></>;
};

export default withRouter(RouteTracker);