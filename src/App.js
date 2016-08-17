import React from 'react';
import './stylesheets/components.scss';
import TodoList from './TodoList';

class App extends React.Component {
  render() {
    return (
      <div className="container">
          <TodoList/>
      </div>
    );
  }
}

export default App;
