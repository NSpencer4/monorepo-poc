export enum PicklistVariant {
  Primary = 'picklist-primary',
  Secondary = 'picklist-secondary',
}

export interface PicklistData {
  id: string;
  name: string;
}

export interface PicklistProps {
  /** Sets the theme variation */
  variant: PicklistVariant;
  /** Sets the id attribute value */
  id?: string;
  /** Sets the class attribute value */
  className?: string;
  /** Sets the "selectables" container header text */
  selectablesContainerHeaderText: string;
  /** Sets the "selected" container header text */
  selectedContainerHeaderText: string;
  /** Sets the "selected" container placeholder text */
  selectedContainerPlaceholderText: string;
  /** If true, the list will be sorted in ascending order */
  sortList: boolean;
  /** If set, this will filter the results if a result contains the filter term text */
  filterTerm?: string;
  /** Set the no results message that displays if there are no results */
  noResultsForFilterTermMessage?: string;
  /** Sets the "selectable" items */
  picklistItems: PicklistData[];
  /** Sets the callback function for extracting the results */
  selectedItemsCallback: (results: PicklistData[]) => unknown;
}
