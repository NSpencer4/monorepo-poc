import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import { Picklist } from './index';
import { PicklistProps, PicklistVariant } from './Picklist.types';
import { PicklistConstants } from './Picklist.constants';

export default {
  title: 'Components/Picklist',
  component: Picklist,
  parameters: {
    jest: ['Picklist.test.tsx'],
  },
} as Meta;

const Template: Story<PicklistProps> = (args: PicklistProps) => (
  <Picklist {...args} />
);

export const Default = Template.bind({});

Default.args = {
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
  selectedItemsCallback: () => console.log('called'),
};
