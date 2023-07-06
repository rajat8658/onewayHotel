import React from 'react'
import {Link} from 'react-router-dom'

function Landingscreen() {
  return (
    <div className='row landing'>
      <div className="col-md-12 text-center">
        <h2 style={{color:'white',fontSize:'120px'}}>OneWay Hotel</h2>
        <h1 style={{color:'white',fontSize:'50px'}}>अतिथि देवो भवः</h1>
        <Link to='/home'>
            <button className='btn btn-primary landing-btn'>Get Started</button>
        </Link>
      </div>
    </div>
  )
}

export default Landingscreen
