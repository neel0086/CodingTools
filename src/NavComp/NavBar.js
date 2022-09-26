import React from 'react'
import './NavStyle.css'
import logo from '../images/logo.png'
import { Link } from 'react-router-dom'
function NavBar() {
  return (
    <div>
      <div class="nav">
    <input type="checkbox" id="nav-check" />
    <div class="nav-header">
      <div class="nav-title">
        <img className='logostyle' src={logo}/>
        CodingTools
      </div>
    </div>
    <div class="nav-btn">
      <label for="nav-check">
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
    
    <div class="nav-links">
      <Link to='/'>TreeVisualizer</Link>
      {/* <Link to='/matrix'>MatrixVisualizer</Link>
      <Link to='testcase'>TestcaseGenrator</Link> */}
    </div>
</div>
    </div>
  )
}

export default NavBar
