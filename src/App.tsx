import React from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
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

enum SortType {
  NONE,
  ALPABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((good1: string, good2: string): number => {
    switch (sortType) {
      case SortType.ALPABET:
        return good1.localeCompare(good2);

      case SortType.LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

type State = {
  isReversed: boolean,
  sortType: SortType,
};

export class App extends React.Component<{}, State> {
  state = {
    isReversed: false,
    sortType: SortType.NONE,
  };

  reverseGoods = () => {
    this.setState(state => ({
      isReversed: !state.isReversed,
    }));
  };

  sortByLength = () => {
    this.setState({ sortType: SortType.LENGTH });
  };

  sortByAlpabet = () => {
    this.setState({ sortType: SortType.ALPABET });
  };

  resetSorting = () => {
    this.setState({
      isReversed: false,
      sortType: SortType.NONE,
    });
  };

  render() {
    const { isReversed, sortType } = this.state;

    const preparedGoods = getReorderedGoods(
      goodsFromServer,
      this.state,
    );

    return (
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={
              classNames(
                'button is-info',
                {
                  'is-light': sortType !== SortType.ALPABET,
                },
              )
            }
            onClick={this.sortByAlpabet}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={
              classNames(
                'button is-success',
                {
                  'is-light': sortType !== SortType.LENGTH,
                },
              )
            }
            onClick={this.sortByLength}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={
              classNames(
                'button is-warning',
                {
                  'is-light': !isReversed,
                },
              )
            }
            onClick={this.reverseGoods}
          >
            Reverse
          </button>

          {
            (sortType !== SortType.NONE || isReversed)
              ? (
                <button
                  type="button"
                  className="button is-danger is-light"
                  onClick={this.resetSorting}
                >
                  Reset
                </button>
              )
              : null
          }
        </div>

        <ul>
          {preparedGoods.map(good => (
            <li key={good} data-cy="Good">
              { good }
            </li>
          ))}
        </ul>
      </div>
    );
  }
}