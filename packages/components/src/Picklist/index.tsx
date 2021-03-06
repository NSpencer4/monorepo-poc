import React, { useMemo } from 'react';
import cn from 'classnames';
import { PicklistData, PicklistProps, PicklistVariant } from './Picklist.types';
import { PicklistConstants } from './Picklist.constants';
import { useState } from 'react';
import _ from 'lodash';
import './Picklist.scss';

export const Picklist: React.FC<PicklistProps> = ({
  variant = PicklistVariant.Primary,
  className,
  id,
  selectablesContainerHeaderText = PicklistConstants.SELECTABLES_HEADER_TEXT,
  selectedContainerHeaderText = PicklistConstants.SELECTED_HEADER_TEXT,
  selectedContainerPlaceholderText = PicklistConstants.SELECTED_PLACEHOLDER_TEXT,
  sortList = false,
  filterTerm = '',
  noResultsForFilterTermMessage = PicklistConstants.NO_RESULTS_FILTER_MESSAGE,
  picklistItems,
  selectedItemsCallback
}): JSX.Element => {
  const [selectedItems, setSelectedItems] = useState<PicklistData[]>([]);
  const [selectableItems, setSelectableItems] = useState<PicklistData[]>(picklistItems);
  const selectOptionText: string = PicklistConstants.SELECT_OPTION;
  const selectAllOptionText: string = PicklistConstants.SELECT_ALL_OPTION;
  const removeOptionText: string = PicklistConstants.REMOVE_OPTION;
  const removeAllOptionText: string = PicklistConstants.REMOVE_ALL_OPTION;

  const sortItems = () => {
    setSelectableItems(_.sortBy(selectableItems, 'id'));
    setSelectedItems(_.sortBy(selectedItems, 'id'));
    return [...selectedItems, ...selectableItems];
  };

  useMemo(() => {
    if (sortList) sortItems();
  }, [sortList]);

  // notifyParentSelections
  useMemo(() => selectedItemsCallback(selectedItems), [selectedItems, selectedItemsCallback]);

  const select = (selectedId: string) => {
    setSelectableItems(
      selectableItems.filter((item: PicklistData) => {
        if (item.id === selectedId) {
          setSelectedItems([...selectedItems, item]);
        }
        return item.id !== selectedId;
      })
    );
  };

  const remove = (removedId: string) => {
    setSelectedItems(
      selectedItems.filter((item: PicklistData) => {
        if (item.id === removedId) {
          setSelectableItems([...selectableItems, item]);
        }
        return item.id !== removedId;
      })
    );
  };

  const selectAll = () => {
    setSelectedItems([...selectedItems, ...selectableItems]);
    setSelectableItems([]);
  };

  const removeAll = () => {
    setSelectableItems([...selectableItems, ...selectedItems]);
    setSelectedItems([]);
  };

  const filterList = (vals: PicklistData[], filterStr: string): PicklistData[] => {
    if (filterStr) {
      return vals.filter(data => (data.id + data.name).trim().toLowerCase().indexOf(filterStr.trim().toLowerCase()) !== -1);
    }
    return vals;

  };

  return (
    <div data-testid="picklist-container" id={id} className={cn(variant, className)}>
      <section id="container-row" data-testid="container-row" className="row">
        <section className="col-md-5 selectables-col">
          <section id="selectables-container-heading-row" data-testid="selectables-container-heading-row"
                   className="row">
            <section id="selectables-container-title-col" data-testid="selectables-container-title-col"
                     className="col-md-7 col-sm-8 col-7">
              <span id="selectables-header" data-testid="selectables-header">{selectablesContainerHeaderText}</span>
            </section>
            <div id="selectables-container-action-col" data-testid="selectables-container-action-col"
                 className="col-md-5 col-sm-4 col-5">
              <button id="select-all-text" data-testid="select-all-action"
                      className="cta"
                      onClick={() => selectAll()}
                      disabled={selectableItems.length === 0}>
                {selectAllOptionText}
              </button>
            </div>
          </section>

          <section id="selectables-container-row" data-testid="selectables-container-row" className="row">
            <section id="selectables-container" data-testid="selectables-container" className="data-container">
              {
                (filterList(selectableItems, filterTerm).length <= 0
                  && selectableItems.length > 0
                  && noResultsForFilterTermMessage
                ) &&
                (<div className="row">
                  <div className="col-md-12 col-sm-12 col-12 placeholder-col">
                    <span id="no-results-text" data-testid="no-results-text">
                  {noResultsForFilterTermMessage}
                    </span>
                  </div>
                </div>)
              }
              {
                filterList(selectableItems, filterTerm).map((selectableItem: PicklistData) => {
                  return (
                    <div className="row table-row">
                      <div className="col-md-10 col-sm-8 col-9 row-text">
                        <span className="selectable-text">
                        <strong>{selectableItem.id}</strong> {selectableItem.name}
                        </span>
                      </div>
                      <div className="col-md-2 col-sm-4 col-3 select-container">
                        <button className="cta select-action"
                                onClick={() => select(selectableItem.id)}>
                          {selectOptionText}
                        </button>
                      </div>
                    </div>
                  );
                })
              }
            </section>
          </section>
        </section>

        <section className="col-md-5 col-md-offset-1 selected-container-col">
          <section id="selected-container-heading-row" data-testid="selected-container-heading-row" className="row">
            <section id="selected-container-title-col" data-testid="selected-container-title-col"
                     className="col-md-7 col-sm-7 col-6">
              <span id="selected-header" data-testid="selected-header">{selectedContainerHeaderText}</span>
            </section>
            <section id="selected-container-action-col" data-testid="selected-container-action-col"
                     className="col-md-5 col-sm-5 col-6">
              <button id="remove-all-text" data-testid="remove-all-action"
                      className="cta"
                      disabled={selectedItems.length === 0}
                      onClick={() => removeAll()}>
                {removeAllOptionText}
              </button>
            </section>
          </section>

          <section id="selected-container-row" data-testid="selected-container-row" className="row">
            <section id="selected-container" data-testid="selected-container" className="data-container">
              {selectedItems?.length <= 0 && (
                <div className="row">
                  <div className="col-md-12 col-sm-12 col-12 placeholder-col">
                    <span id="placeholder-text" data-testid="placeholder-text">
                    {selectedContainerPlaceholderText}
                    </span>
                  </div>
                </div>
              )}
              {
                filterList(selectedItems, filterTerm).map((selectedItem: PicklistData) => {
                  return (
                    <div className="row table-row">
                      <div className="col-md-10 col-sm-8 col-8 row-text">
                    <span className="selected-text">
                      <strong>{selectedItem.id}</strong> {selectedItem.name}
                    </span>
                      </div>
                      <div className="col-md-2 col-sm-4 col-4 action-container">
                        <button className="cta remove-action"
                                onClick={() => remove(selectedItem.id)}>
                          {removeOptionText}
                        </button>
                      </div>
                    </div>
                  );
                })
              }
            </section>
          </section>
        </section>
      </section>
    </div>
  );
};
