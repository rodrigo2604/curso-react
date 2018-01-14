import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const isSearched = query => item => (
  !query || item.title.toLowerCase().includes(query.toLowerCase())
);

class App extends Component {

  constructor(props) {
    // Es obligatorio llamar al super para llamar al contructor de la clase padre
    super(props);

    // Necesitamos interactividad para mutar el estado
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  setSearchTopStories(result) {
    this.setState({ result });
  }

  fetchSearchTopStories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  // Está recibiendo como parámetro un evento sintáctico.
  // No hay problema de cross browser
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id, event) {
    console.log(event, event.target);
    const { result } = this.state;
    const updateHits = result.hits.filter(item => item.objectID !== id);

    this.setState((prevState) => ({
      result: { ...prevState.result, hits: updateHits }
    }));
  }

  render() {
    const { result, searchTerm } = this.state;
    if (!result) { return null; }

    return (
      <section className="page">
        <section className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Search
          </Search>
          <Table list={result.hits} pattern={searchTerm} onClick={this.onDismiss} />
        </section>
      </section>
    );
  }
}

const Search = ({ value, onChange, children }) => (
  <form>
    {children} <input type="text" value={value} onChange={onChange} />
  </form>
);

const Table = ({ list, pattern, onClick }) => (
  <div className="table">
    {console.log('Es la lista', list)}
    {list.filter(isSearched(pattern)).map(item =>
      <div key={item.objectID} className="table-row">
        <span style={{ width: '40%' }}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={{ width: '30%' }}>
          {item.author}
        </span>
        <span style={{ width: '10%' }}>
          {item.num_comments}
        </span>
        <span style={{ width: '10%' }}>
          {item.points}
        </span>
        <button
          style={{ width: '10%' }}
          onClick={(e) => onClick(item.objectID, e)}>X
        </button>
      </div>
    )}
  </div>
);

export default App;
