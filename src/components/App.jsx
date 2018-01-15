import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import SearchView from './SearchView';
import About from './About';

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/search'>Búsqueda de noticias</Link></li>
        <li><Link to='/about/email'>Acerca</Link></li>
      </ul>
    </nav>
  </header>
);

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/search' component={SearchView} />
      <Route path='/about/:typeContact' component={About} />
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
