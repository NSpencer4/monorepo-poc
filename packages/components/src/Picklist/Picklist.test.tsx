import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Picklist } from './index';
import { PicklistData, PicklistVariant } from './Picklist.types';
import { PicklistConstants } from './Picklist.constants';

describe('<Picklist />', () => {
  const mockProps = {
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

  beforeEach(() => {
    render(<Picklist {...mockProps} />);
  });

  afterEach(() => {
    cleanup();
  });
  describe('init', () => {
    it('the picklist component container should exist', () => {
      const el: HTMLElement = screen.getByTestId('picklist-container');
      expect(el).toBeTruthy();
    });
    it('sets selectedItems as empty', () => {
      const el: HTMLElement = screen.getByTestId('selected-container');
      expect(el.querySelectorAll('.selectable-text').length).toEqual(0);
    });
    it('should not sort the lists on init or apply a filter term', () => {
      const el: HTMLElement = screen.getByTestId('selectables-container');
      const selectableEls: NodeListOf<HTMLSpanElement> = el.querySelectorAll('.selectable-text');

      selectableEls.forEach((selectableEl: HTMLSpanElement, index: number) => {
        expect(selectableEl.textContent).toBe(`${mockProps.picklistItems[index].id} ${mockProps.picklistItems[index].name}`);
      });
    });
  });
  describe('select', () => {
    it('takes in an id for a selected picklist data obj and removes it from the ' +
         'selectables array and places it in the selected array', () => {
      const selectablesContainer: HTMLElement = screen.getByTestId('selectables-container');
      const selectedContainer: HTMLElement = screen.getByTestId('selected-container');
      const selectBtns: NodeListOf<HTMLSpanElement> = selectablesContainer.querySelectorAll('.select-action');

      fireEvent.click(selectBtns[0]);

      expect(selectablesContainer.textContent).not.toContain(mockProps.picklistItems[0].id);
      expect(selectedContainer.textContent).toContain(mockProps.picklistItems[0].id);
    });
  });
  describe('remove', () => {
    beforeEach(() => {
      // pre-populate the selected section so we can test removing one
      fireEvent.click(screen.getByTestId('select-all-action'));
    });

    it('takes in an id for a selected picklist data obj and removes it from the ' +
         'selected array and places it in the selectables array', () => {
      const selectablesContainer: HTMLElement = screen.getByTestId('selectables-container');
      const selectedContainer: HTMLElement = screen.getByTestId('selected-container');
      const removeBtns: NodeListOf<HTMLSpanElement> = selectedContainer.querySelectorAll('.remove-action');

      fireEvent.click(removeBtns[0]);

      expect(selectablesContainer.textContent).toContain(mockProps.picklistItems[0].id);
      expect(selectedContainer.textContent).not.toContain(mockProps.picklistItems[0].id);
    });
  });
  describe('selectAll', () => {
    it('moves all picklist data from the selectables arr into the selected arr', () => {
      fireEvent.click(screen.getByTestId('select-all-action'));
      const selectedContainer: HTMLElement = screen.getByTestId('selected-container');
      const selectablesContainer: HTMLElement = screen.getByTestId('selectables-container');
      const selectedEls: NodeListOf<HTMLSpanElement> = selectedContainer.querySelectorAll('.selected-text');

      selectedEls.forEach((selectedEl: HTMLSpanElement, index: number) => {
        expect(selectedEl.textContent).toBe(`${mockProps.picklistItems[index].id} ${mockProps.picklistItems[index].name}`);
        expect(selectablesContainer.textContent).not.toContain(`${mockProps.picklistItems[index].id} ${mockProps.picklistItems[index].name}`);
      });
    });
    it(
      'moves all remaining picklist data from the selectable container into the selected container when the selected container is not empty',
      () => {
        const selectablesContainer: HTMLElement = screen.getByTestId('selectables-container');
        // Put one selected item back into the selectables
        fireEvent.click(selectablesContainer.querySelectorAll('.select-action')[0]);
        // Put all selected back
        fireEvent.click(screen.getByTestId('remove-all-action'));

        const selectedContainer: HTMLElement = screen.getByTestId('selected-container');
        const selectedEls: NodeListOf<HTMLSpanElement> = selectedContainer.querySelectorAll('.selectable-text');

        selectedEls.forEach((selectedEl: HTMLSpanElement, index: number) => {
          expect(selectedEl.textContent).toBe(`${mockProps.picklistItems[index].id} ${mockProps.picklistItems[index].name}`);
          expect(selectedContainer.textContent).not.toContain(`${mockProps.picklistItems[index].id} ${mockProps.picklistItems[index].name}`);
        });
      });
  });
  describe('removeAll', () => {
    beforeEach(() => {
      // pre-populate the selected section so we can test removing one
      fireEvent.click(screen.getByTestId('select-all-action'));
    });

    it('moves all picklist data from the selected arr into the selectables arr', () => {
      fireEvent.click(screen.getByTestId('remove-all-action'));
      const selectedContainer: HTMLElement = screen.getByTestId('selected-container');
      const selectablesContainer: HTMLElement = screen.getByTestId('selectables-container');
      const selectableEls: NodeListOf<HTMLSpanElement> = selectablesContainer.querySelectorAll('.selectable-text');

      selectableEls.forEach((selectedEl: HTMLSpanElement, index: number) => {
        expect(selectedEl.textContent).toBe(`${mockProps.picklistItems[index].id} ${mockProps.picklistItems[index].name}`);
        expect(selectedContainer.textContent).not.toContain(`${mockProps.picklistItems[index].id} ${mockProps.picklistItems[index].name}`);
      });
    });

    it(
      'moves all remaining picklist data from the selected arr into the selectables container when the selectables container is not empty',
      () => {
        const selectedContainer: HTMLElement = screen.getByTestId('selected-container');
        // Put one selected item back into the selectables
        fireEvent.click(selectedContainer.querySelectorAll('.remove-action')[0]);
        // Put all selected back
        fireEvent.click(screen.getByTestId('remove-all-action'));

        const selectablesContainer: HTMLElement = screen.getByTestId('selectables-container');
        const selectableEls: NodeListOf<HTMLSpanElement> = selectablesContainer.querySelectorAll('.selectable-text');

        selectableEls.forEach((selectableEl: HTMLSpanElement, index: number) => {
          expect(selectableEl.textContent).toBe(`${mockProps.picklistItems[index].id} ${mockProps.picklistItems[index].name}`);
          expect(selectedContainer.textContent).not.toContain(`${mockProps.picklistItems[index].id} ${mockProps.picklistItems[index].name}`);
        });
      });
  });
  describe('sorting', () => {
    const sortedPicklistData: PicklistData[] = [
      { id: 'Advil', name: '$5.49' },
      { id: 'Claritin', name: '$4.99' },
      { id: 'Flonase', name: '$23.38' },
      { id: 'Motrin', name: '$7.00' },
      { id: 'Tylenol Cold + Flu', name: '$6.99' }
    ];

    beforeEach(() => {
      const sortedProps = {
        ...mockProps,
        sortList: true
      };
      cleanup();
      render(<Picklist {...sortedProps} />);
    });
    it('should sort the selectable list if sort is set to true', () => {
      const el: HTMLElement = screen.getByTestId('selectables-container');
      const selectableEls: NodeListOf<HTMLSpanElement> = el.querySelectorAll('.selectable-text');

      selectableEls.forEach((selectableEl: HTMLSpanElement, index: number) => {
        expect(selectableEl.textContent).toBe(`${sortedPicklistData[index].id} ${sortedPicklistData[index].name}`);
      });
    });
    it('should sort the selected list if sort is set to true', () => {
      const el: HTMLElement = screen.getByTestId('selected-container');
      const selectedEls: NodeListOf<HTMLSpanElement> = el.querySelectorAll('.selected-text');

      selectedEls.forEach((selectedEl: HTMLSpanElement, index: number) => {
        expect(selectedEl.textContent).toBe(`${sortedPicklistData[index].id} ${sortedPicklistData[index].name}`);
      });
    });
  });
  describe('filter items', () => {
    beforeEach(() => {
      const sortedProps = {
        ...mockProps,
        filterTerm: 'f'
      };
      cleanup();
      render(<Picklist {...sortedProps} />);
    });
    it('only shows items that contain the filter term passed in the selectables container', () => {
      const el: HTMLElement = screen.getByTestId('selectables-container');
      const selectableEls: NodeListOf<HTMLSpanElement> = el.querySelectorAll('.selectable-text');

      expect(selectableEls[0].textContent).toBe(`${mockProps.picklistItems[1].id} ${mockProps.picklistItems[1].name}`);
      expect(selectableEls[1].textContent).toBe(`${mockProps.picklistItems[4].id} ${mockProps.picklistItems[4].name}`);
    });
    it('only shows items that contain the filter term passed in the selected container', () => {
      // Populate the selected container
      fireEvent.click(screen.getByTestId('select-all-action'));

      const el: HTMLElement = screen.getByTestId('selected-container');
      const selectedEls: NodeListOf<HTMLSpanElement> = el.querySelectorAll('.selected-text');

      expect(selectedEls[0].textContent).toBe(`${mockProps.picklistItems[1].id} ${mockProps.picklistItems[1].name}`);
      expect(selectedEls[1].textContent).toBe(`${mockProps.picklistItems[4].id} ${mockProps.picklistItems[4].name}`);
    });
    it('only shows items that contain the filter term passed even in both containers', () => {
      const selectableContainerEl: HTMLElement = screen.getByTestId('selectables-container');
      const selectableEls: NodeListOf<HTMLSpanElement> = selectableContainerEl.querySelectorAll('.selectable-text');
      const selectedContainerEl: HTMLElement = screen.getByTestId('selected-container');

      fireEvent.click(selectableContainerEl.querySelectorAll('.select-action')[0]);
      const selectedEls: NodeListOf<HTMLSpanElement> = selectedContainerEl.querySelectorAll('.selected-text');

      expect(selectableEls[0].textContent).toBe(`${mockProps.picklistItems[4].id} ${mockProps.picklistItems[4].name}`);
      expect(selectedEls[0].textContent).toBe(`${mockProps.picklistItems[1].id} ${mockProps.picklistItems[1].name}`);
    });
  });
});

