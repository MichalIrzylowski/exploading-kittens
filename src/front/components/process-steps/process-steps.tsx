import React from 'react';

import { Switch, Route, useRouteMatch } from 'react-router-dom';

interface Step {
  processStep: React.ReactNode;
  route: string;
}

interface ProcessSteps {
  steps: Step[];
}

export const ProcessSteps: React.FC<ProcessSteps> = ({ steps }) => {
  const match = useRouteMatch();

  return (
    <Switch>
      {steps.map(({ processStep, route }) => (
        <Route path={match.path + route} key={route}>
          {processStep}
        </Route>
      ))}
    </Switch>
  );
};
