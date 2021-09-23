import * as React from 'react';
import cn from 'classnames';
import { PicklistProps, PicklistVariant } from './Picklist.types';

export const Picklist: React.FC<PicklistProps> = ({
  variant = PicklistVariant.Primary,
  className,
  id,
}): JSX.Element => {
  return (
    <div id={id} className={cn(variant, className)}>
      Mock
    </div>
  );
};
