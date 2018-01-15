import React, { Component } from 'react';
import './SearchView.css';

import Button from './Button';
import Search from './Search';
import Table from './Table';
import Loading from './Loading';

const DEFAULT_QUERY = 'redux';
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = 25;

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

class App extends Component {

  constructor(props) {
    // Es obligatorio llamar al super para llamar al contructor de la clase padre
    super(props);

    // Necesitamos interactividad para mutar el estado
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
      isLoading: false,
    };
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
    event.preventDefault();
  }

  fetchSearchTopStories(searchTerm, page) {
    this.setState({ isLoading: true });

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  setSearchTopStories(result) {
    const { hits, page } = result;

    const oldHits = page === 0 ? [] : this.state.result.hits;
    const updateHits = [...oldHits, ...hits];

    this.setState({ result: { hits: updateHits, page }, isLoading: false });
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
  }

  // Está recibiendo como parámetro un evento sintáctico.
  // No hay problema de cross browser
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id) {
    const { result } = this.state;
    const updateHits = result.hits.filter(item => item.objectID !== id);

    this.setState((prevState) => ({
      result: { ...prevState.result, hits: updateHits }
    }));
  }

  render() {
    const { result, searchTerm, isLoading } = this.state;
    const page = (result && result.page) || 0;
    return (
      <section className="page">
        <section className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>
            Search
          </Search>
          {result && <Table list={result.hits} onClick={this.onDismiss} />}
          <section className="interactions">
            <ButtonWithLoading
              isLoading={isLoading}
              onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
              More
            </ButtonWithLoading>
          </section>
        </section>
      </section>
    );
  }
}

const withLoading = (Component) => ({ isLoading, ...props }) => isLoading ? <Loading /> : <Component {...props} />;

const ButtonWithLoading = withLoading(Button);

export default App;
