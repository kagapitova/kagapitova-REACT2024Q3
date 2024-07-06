import React, { Component } from 'react';
import Search from './Search';
import Results from './Results';
import { Result } from './Types';

interface AppState {
  searchTerm: string;
  results: Result[];
}

type ApiData = {
  results: Result[];
};

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: '',
      results: [],
    };
  }

  handleSearch = (searchTerm: string) => {
    const uri = searchTerm
      ? `https://swapi.dev/api/people/?search=${searchTerm}`
      : `https://swapi.dev/api/people/`;
    return fetch(uri)
      .then(response => response.json() as Promise<ApiData>)
      .then((data: ApiData) => {
        this.setState({ results: data.results });
      })
      .catch(error => {
        console.error('API Error:', error);
      });
  };

  render() {
    return (
      <div>
        <h1>Star Wars Search</h1>
        <h4>Here you can find a character by name.</h4>
        <Search onSearch={this.handleSearch} />
        <Results results={this.state.results} />
      </div>
    );
  }
}

export default App;
