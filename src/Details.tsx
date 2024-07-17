import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Result } from './Types';

interface DetailsProps {
  selectedItem: Result | undefined;
  detailsSetIsOpen: (isOpen: boolean) => void;
  detailsIsOpen: boolean;
}

const Details: React.FC<DetailsProps> = ({
  selectedItem,
  detailsSetIsOpen,
  detailsIsOpen,
}) => {
  const queryParams = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();

  const handleDeselect = () => {
    detailsSetIsOpen(false);
    queryParams.delete('details');
    navigate(`?${queryParams.toString()}`);
  };

  if (!detailsIsOpen || !selectedItem) {
    return null;
  }

  return (
    <div className="details" data-testid="details-view">
      <h2>Details of the selected item</h2>
      <p>Name: {selectedItem.name}</p>
      <p>Birth year: {selectedItem.birth_year}</p>
      <p>Skin color: {selectedItem.skin_color}</p>
      <p>Mass: {selectedItem.mass}</p>
      <p>Eye color: {selectedItem.eye_color}</p>
      <p>Gender: {selectedItem.gender}</p>
      <button onClick={handleDeselect}>Close Details</button>
    </div>
  );
};

export default Details;
