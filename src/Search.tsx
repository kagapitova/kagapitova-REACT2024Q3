import React, { useEffect } from 'react';
import styles from './Search.module.css';
import useRestoreSearchQuery from './useRestoreSearchQuery';
interface SearchProps {
  onSearch: (searchTerm: string) => Promise<void>;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const { searchTerm, setSearchTerm, loading, setLoading } =
    useRestoreSearchQuery(onSearch);

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
      onSearch(savedSearchTerm).finally(() => setLoading(false));
    }
  }, []);

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
      <button onClick={handleSearch}>Search</button>
      <div className={loading ? styles.showLoader : styles.loader} />
    </div>
  );
};

export default Search;
