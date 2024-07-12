import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Result } from './Types';

type DetailsSetIsOpen = (isOpen: boolean) => void;

type DetailsProps = {
  selectedItem: Result;
  detailsSetIsOpen: DetailsSetIsOpen;
  detailsIsOpen: boolean;
};

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
  if (!detailsIsOpen || selectedItem === undefined) {
    return;
  }
  return (
    <div className="details">
      <h2>Details of the selected item</h2>
      <p>Name: {selectedItem.name}</p>
      <p>Birth year: {selectedItem.birth_year}</p>
      <p>Skin color: {selectedItem.skin_color}</p>
      <p>Mass: {selectedItem.mass}</p>
      <p>Eye color: {selectedItem.eye_color}</p>
      <p>Gender: {selectedItem.gender}</p>
      {selectedItem.index !== -1 && (
        <button onClick={handleDeselect}>Close Details</button>
      )}
    </div>
  );
};

export default Details;
