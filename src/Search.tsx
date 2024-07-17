import React from 'react';
import styles from './Search.module.css';
import useRestoreSearchQuery from './useRestoreSearchQuery';

interface SearchProps {
  onSearch: (searchTerm: string) => Promise<void>;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const { searchTerm, setSearchTerm, loading, setLoading } =
    useRestoreSearchQuery(onSearch);

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();
    setLoading(true);
    localStorage.setItem('searchTerm', trimmedSearchTerm);
    onSearch(trimmedSearchTerm).finally(() => setLoading(false));
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        Search
      </button>
      {loading && <div className={styles.loader}>Loading...</div>}
    </div>
  );
};

export default Search;
