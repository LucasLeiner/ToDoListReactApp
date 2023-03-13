import React from 'react';
import './App.css';
import Header from './Header.js';


class App extends React.Component{
  render() {
    return (
      <div className="App relative flex justify-center h-[915px] w-[412px] border border-4 border-black rounded-2xl bg-gray-50">

      <span className="absolute -right-2 top-20 border border-4 border-black h-10 rounded-md"></span>
      <span className="absolute -right-2 top-44 border border-4 border-black h-24 rounded-md"></span>
      <Header/>
      </div>
    );
  }
}

export default App;
