import React from 'react';
import './Logo.css';
import brain from './brain.png';
import Tilt from 'react-tilt';

const Logo = () => {
	return(
		<nav className='ma4 mt0 '>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 90, width: 100 }} >
 				<div className="Tilt-inner"> <img style={{paddingTop: '5px'}} alt='logo' src={brain} /> </div>
			</Tilt>
		</nav>
		);
}

export default Logo;