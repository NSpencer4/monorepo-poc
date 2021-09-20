import { render, screen } from '@testing-library/react';
import { Picklist } from './index';

describe('<Picklist />', () => {
  test('should render the container', () => {
    render(<Picklist />);

    const renderedText: HTMLElement = screen.getByTestId('container');

    expect(renderedText).toBeTruthy();
  });
});
