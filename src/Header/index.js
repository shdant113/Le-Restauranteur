import React from 'react';

const Header = () => {
	return (
		<div>
			<header className='header'>
				<div className='nav'>
					<li className="nav-bar">Navigation
						<ul>
							<li><a href="/">Home</a></li>
							<li><a href="/">Search</a></li>
							<li><a href="/">Log Out</a></li>
						</ul>
					</li>
				</div>
				<div>
					<h1>
						Where To Eat?
					</h1>
				</div>
				<div>
					<a href='/'>Your Profile</a>
				</div>
			</header>
		</div>
	)
}	

export default Header;