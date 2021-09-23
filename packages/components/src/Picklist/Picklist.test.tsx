import React from 'react';
import { render, screen } from '@testing-library/react';
import { Picklist } from './index';
import { PicklistVariant } from './Picklist.types';
import { PicklistConstants } from './Picklist.constants';

describe('<Picklist />', () => {
  test('should render the container', () => {
    const args = {
      variant: PicklistVariant.Primary,
      className: 'mock-class',
      id: 'mock-id',
      selectablesContainerHeaderText: PicklistConstants.SELECTABLES_HEADER_TEXT,
      selectedContainerHeaderText: PicklistConstants.SELECTED_HEADER_TEXT,
      selectedContainerPlaceholderText: PicklistConstants.SELECTED_PLACEHOLDER_TEXT,
      sortList: false,
      filterTerm: '',
      noResultsForFilterTermMessage: PicklistConstants.NO_RESULTS_FILTER_MESSAGE,
      picklistItems: [
        { id: 'Advil', name: '$5.49' },
        { id: 'Tylenol Cold + Flu', name: '$6.99' },
        { id: 'Motrin', name: '$7.00' },
        { id: 'Claritin', name: '$4.99' },
        { id: 'Flonase', name: '$23.38' }
      ],
      selectedItemsCallback: () => '',
    };

    render(<Picklist {...args} />);

    const renderedText: HTMLElement = screen.getByTestId('container');

    expect(renderedText).toBeTruthy();
  });
});
