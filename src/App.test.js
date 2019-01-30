import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AssignmentsList from './components/AssignmentsList';
import NewAssignment from './components/NewAssignment';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders an assignment list without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AssignmentsList />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders a form to create a new assignment without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewAssignment />, div);
  ReactDOM.unmountComponentAtNode(div);
});