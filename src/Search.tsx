import { Component } from 'react';
import styles from './Search.module.css';

interface SearchProps {
  onSearch: (searchTerm: string) => Promise<void>;
}

interface SearchState {
  searchTerm: string;
  loading: boolean;
  error: boolean;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchTerm: 'lu',
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm });
      this.props
        .onSearch(savedSearchTerm)
        .finally(() => this.setState({ loading: false }))
        .catch(() => this.setState({ error: true, loading: false }));
    } else {
      this.props
        .onSearch(this.state.searchTerm)
        .finally(() => this.setState({ loading: false }))
        .catch(() => this.setState({ error: true, loading: false }));
    }
  }

  handleSearch = () => {
    const trimmedSearchTerm = this.state.searchTerm.trim();
    this.setState({ loading: true, error: false });
    localStorage.setItem('searchTerm', trimmedSearchTerm);
    this.props
      .onSearch(trimmedSearchTerm)
      .finally(() => this.setState({ loading: false }))
      .catch(() => this.setState({ error: true, loading: false }));
  };

  throwErrorAndLog = () => {
    try {
      throw new Error('This is an example error message.');
    } catch (error) {
      console.error(error);
      this.setState({ error: true });
    }
  };

  resetError = () => {
    this.setState({ error: false });
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
        <div
          className={this.state.loading ? styles.showLoader : styles.loader}
        />
      </div>
    );
  }
}

export default Search;
