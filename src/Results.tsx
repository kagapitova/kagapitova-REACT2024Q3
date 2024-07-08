import { Component } from 'react';
import { Result } from './Types';
import styles from './Result.module.css';

interface ResultsProps {
  results: Result[];
}

class Results extends Component<ResultsProps> {
  render() {
    const { results } = this.props;
    return (
      <div className={styles.result_block}>
        {results.map((item, index) => (
          <div key={index} className={styles.item}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>
              {item.gender} {item.hair_color} {item.birth_year} {item.height}{' '}
            </p>
          </div>
        ))}
      </div>
    );
  }
}

export default Results;
