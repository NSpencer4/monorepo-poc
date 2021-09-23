export enum PicklistVariant {
  Primary = 'picklist-primary',
  Secondary = 'picklist-secondary',
}

export interface PicklistProps {
  /** Sets the theme variation */
  variant?: PicklistVariant;
  /** Sets the id attribute value */
  id?: string;
  /** Sets the class attribute value */
  className?: string;
}
