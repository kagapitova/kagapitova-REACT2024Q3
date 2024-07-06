import { Component } from 'react';
import styles from './Search.module.css';

interface SearchProps {
  onSearch: (searchTerm: string) => Promise<void>;
}

interface SearchState {
  searchTerm: string;
  loading: boolean;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchTerm: '',
      loading: true,
    };
  }

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm });
      this.props
        .onSearch(savedSearchTerm)
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleSearch = () => {
    const trimmedSearchTerm = this.state.searchTerm.trim();
    this.setState({ loading: true });
    localStorage.setItem('searchTerm', trimmedSearchTerm);
    this.props
      .onSearch(trimmedSearchTerm)
      .finally(() => this.setState({ loading: false }));
  };

  throwErrorAndLog = () => {
    try {
      throw new Error('This is an example error message.');
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <input
          className={styles.input}
          type="text"
          placeholder="Search..."
          value={this.state.searchTerm}
          onChange={e => this.setState({ searchTerm: e.target.value })}
        />
        <button onClick={this.handleSearch}>Search</button>
        <button onClick={this.throwErrorAndLog}>Error</button>
        <div
          className={this.state.loading ? styles.showLoader : styles.loader}
        />
      </div>
    );
  }
}

export default Search;
