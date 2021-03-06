import '!style-loader!css-loader!sass-loader!../styles/global.scss';
import results from './.coverage.json';
import { withTests } from '@storybook/addon-jest';
import { addDecorator } from '@storybook/react';

addDecorator(withTests({results}));

const customViewports = {
  mobile: {
    name: 'mobile',
    styles: {
      width: '360px',
      height: '680px',
    },
  },
  tablet: {
    name: 'tablet',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  desktop: {
    name: 'desktop',
    styles: {
      width: '1280px',
      height: '768px',
    }
  }
};

export const parameters = {
  actions: {argTypesRegex: "^on[A-Z].*"},
  viewMode: 'docs',
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'white',
        value: '#ffffff',
      },
      {
        name: 'grey',
        value: '#efefef',
      },
      {
        name: 'black',
        value: '#000000',
      }
    ],
  },
  viewport: {
    viewports: customViewports,
  },
}

