import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import WeddingPage from "./components/pages/theWedding/weddingPage";
import OurStoryPage from "./components/pages/ourStory/ourStoryPage";
import RegistryPage from "./components/pages/registry/registryPage";
import RegisterItemDetail from "./components/pages/registry/registeredItemDetail";
import Home from "./components/pages/home";
import PhotoPage from "./components/pages/photos/photoPage";
import CincinnatiPage from "./components/pages/cincinnati/cincinnatiPage";
import routes from "./constants/routes";
import { Provider } from "mobx-react";
import stores from "./stores";

const App = props => {
  return (
    <Provider {...stores}>
      <Switch>
        <Route exact path={routes.Home} component={Home} />
        <Route path={routes.TheWedding} component={WeddingPage} />
        <Route path={routes.OurStory} component={OurStoryPage} />
        <Route path={`${routes.Registry}/:id`} component={RegisterItemDetail} />
        <Route path={routes.Registry} component={RegistryPage} />
        <Route path={routes.Photos} component={PhotoPage} />
        <Route path={routes.Cincinnati} component={CincinnatiPage}/>
      </Switch>
    </Provider>
  );
};

export default App;
