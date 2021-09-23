import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import { Picklist } from './index';
import { PicklistProps, PicklistVariant } from './Picklist.types';

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
};
