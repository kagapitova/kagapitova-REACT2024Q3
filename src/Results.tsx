import React, { ChangeEvent, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Result } from './Types';
import styles from './Results.module.css';
import Details from './Details';

interface ResultsProps {
  results: Result[];
}

const Results: React.FC<ResultsProps> = ({ results }) => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get('page') || '1', 10);
  const [selectedItem, setSelectedItem] = useState(results[0]);
  const [detailsIsOpen, detailsSetIsOpen] = useState(false);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    queryParams.set('page', page.toString());
    navigate(`?${queryParams.toString()}`);
  };

  const handleItemsPerPageChange = (event: ChangeEvent) => {
    const newPage = 1;
    queryParams.set('page', newPage.toString());
    navigate(`?${queryParams.toString()}`);
    const target = event.target as HTMLSelectElement;
    setItemsPerPage(Number(target.value));
  };

  return (
    <div className={styles.detailsContent}>
      <div className={styles.itemsPerPageDropdown}>
        <label className={styles.label}>Items per page:</label>
        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>

      <div
        className={styles.cardContainer}
        onClick={() => {
          if (detailsIsOpen) {
            detailsSetIsOpen(false);
          }
        }}
      >
        {results.slice(startIndex, endIndex).map((item, index) => (
          <div key={index} className={styles.item}>
            <Link
              to={`?page=${currentPage}&details=${index}`}
              onClick={() => {
                setSelectedItem(item);
                detailsSetIsOpen(true);
              }}
              className={styles.link}
            >
              <h2>{item.name}</h2>
            </Link>
            <p>{item.description}</p>
            <p>
              {item.gender} {item.hair_color} {item.birth_year} {item.height}
            </p>
          </div>
        ))}

        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={endIndex >= results.length}
          >
            Next
          </button>
        </div>
      </div>
      <Details
        selectedItem={selectedItem}
        detailsSetIsOpen={detailsSetIsOpen}
        detailsIsOpen={detailsIsOpen}
      />
    </div>
  );
};

export default Results;
