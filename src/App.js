import React from 'react'
import Tree from './TreeTools.js/Tree'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavComp/NavBar';
import Matrix from './MatrixTools/Matrix';
import Testcase from './TestcaseGen/Testcase';

function App() {
  return (
    <div>
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Tree />} ></Route>
            </Routes>
            <Routes>
                <Route path="/matrix" element={<Matrix />} ></Route>
            </Routes>
            <Routes>
                <Route path="/testcase" element={<Testcase />} ></Route>
            </Routes>
          
      </Router>
    </div>
  )
}

export default App
