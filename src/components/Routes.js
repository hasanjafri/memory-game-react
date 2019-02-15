import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Game from './Game';
import Hiscores from './Hiscores';

const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Game} />
            <Route path="/hiscores" exact component={Hiscores} />
        </Switch>
    )
}

export default Routes;