import { useState, useEffect, useCallback } from 'react';

const useRestoreSearchQuery = (
  onSearch: (searchTerm: string) => Promise<void>,
) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const restoreSearchQuery = useCallback(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
      onSearch(savedSearchTerm).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [onSearch, setLoading, setSearchTerm]);

  useEffect(() => {
    restoreSearchQuery();
  }, [restoreSearchQuery]);

  return { searchTerm, setSearchTerm, loading, setLoading };
};

export default useRestoreSearchQuery;
