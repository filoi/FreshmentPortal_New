import React from 'react';
import ReactDOM from 'react-dom';
import Page500 from './SetPassword';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Page500 />, div);
  ReactDOM.unmountComponentAtNode(div);
});
