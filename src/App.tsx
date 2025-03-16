import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  Default,
  Alphabetically,
  ByLength,
}

const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const sortAlphabetically = () => {
    const sortedGoods = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

    setGoods(isReversed ? [...sortedGoods].reverse() : sortedGoods);
    setSortType(SortType.Alphabetically);
  };

  const sortByLength = () => {
    const sortedGoods = [...goodsFromServer].sort(
      (a, b) => a.length - b.length,
    );

    setGoods(isReversed ? [...sortedGoods].reverse() : sortedGoods);
    setSortType(SortType.ByLength);
  };

  const reverseGoods = () => {
    setGoods([...goods].reverse());
    setIsReversed(!isReversed);

    if (sortType === SortType.Default && isReversed) {
      setIsReversed(false);
    }
  };

  const resetGoods = () => {
    setGoods(goodsFromServer);
    setSortType(SortType.Default);
    setIsReversed(false);
  };

  const showResetButton = sortType !== SortType.Default || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.Alphabetically ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.ByLength ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((item, index) => (
          <li key={index} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
