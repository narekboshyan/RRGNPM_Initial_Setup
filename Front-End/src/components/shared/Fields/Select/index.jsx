import React from 'react';
import clsx from 'clsx';
import Field from 'components/shared/Fields/Field';
import { makeStyles, MenuItem } from '@material-ui/core';
import { useMenuStyles } from 'styles/Menu';
import { PICKER_TYPE, FIELD_TYPE } from 'constants/index';

const useStyles = makeStyles({
  menuItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    '&:last-child': {
      marginBottom: 3
    }
  },
  select: {
    '&:before': {
      content: ({ placeholder }) => `'${placeholder}'`,
      opacity: 0.4
    }
  }
});

const Select = React.forwardRef(
  (
    {
      options = [],
      menuItemName,
      applyEmptyOption = false,
      menuItemLabelField = '',
      menuItemValueField = '',
      withMenuItemDivider = true,
      emptyOptionTitle,
      selectProps = {},
      renderer,
      selectClasses = {},
      value,
      placeholder = '',
      clearField,
      ...restProps
    },
    ref
  ) => {
    const menuClasses = useMenuStyles();
    const classes = useStyles({ placeholder });

    return (
      <Field
        ref={ref}
        pickerType={PICKER_TYPE.select}
        fieldType={FIELD_TYPE.select}
        selectClasses={{
          ...selectClasses,
          select: clsx({
            [classes.select]: selectProps.multiple ? !value?.length : !value,
            [selectClasses.select]: selectClasses.select
          })
        }}
        value={value}
        options={[
          ...(applyEmptyOption
            ? [
                <MenuItem
                  role="option"
                  className={`${menuClasses.menuItem} ${classes.menuItem} ${
                    withMenuItemDivider ? menuClasses.menuItemWithDivider : ''
                  }`}
                  key="key-None"
                  value={selectProps.multiple ? null : ''}
                  {...(menuItemName ? { name: menuItemName } : {})}
                >
                  {emptyOptionTitle || 'See all'}
                </MenuItem>
              ]
            : []),
          ...options.map(option => {
            if (renderer) {
              return renderer(option);
            }
            if (typeof option === 'object') {
              return option.renderer
                ? option.renderer()
                : !option.hidden && (
                    <MenuItem
                      role="option"
                      className={`${menuClasses.menuItem} ${classes.menuItem} ${
                        withMenuItemDivider ? menuClasses.menuItemWithDivider : ''
                      }`}
                      key={`key-${option[menuItemValueField]}`}
                      value={option[menuItemValueField]}
                      {...(menuItemName ? { name: menuItemName } : {})}
                    >
                      {option[menuItemLabelField]}
                    </MenuItem>
                  );
            }
            return (
              <MenuItem
                role="option"
                className={`${menuClasses.menuItem} ${classes.menuItem} ${
                  withMenuItemDivider ? menuClasses.menuItemWithDivider : ''
                }`}
                key={`key-${option}`}
                value={option}
                {...(menuItemName ? { name: menuItemName } : {})}
              >
                {option}
              </MenuItem>
            );
          })
        ]}
        selectProps={selectProps}
        clearField={clearField}
        {...restProps}
      />
    );
  }
);

Select.displayName = 'Select';

export default Select;
