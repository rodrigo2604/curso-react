import React from 'react';
import { Switch, Router, Route, Link } from 'react-router-dom';
import SearchView from './SearchView';
import About from './About';

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/search'>Búsqueda de noticias</Link></li>
        <li><Link to='/about'>Acerca</Link></li>
      </ul>
    </nav>
  </header>
);

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/search' component={SearchView} />
      <Route path='/about' component={About} />
    </Switch>
  </main>
);

const App = () => (
  <div>
    <Header />
    <Main />
  </div>
);

export default App;
