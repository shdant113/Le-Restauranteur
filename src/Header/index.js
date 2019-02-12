import React from 'react';

const Header = (props) => {
	return (
		<div>
			<header className='header'>
				<div className='wrap'>
					<div className='nav'>
						<li className="nav-bar">Navigation
							<ul>
								<li><a onClick={props.goToMain}>Home</a></li>
								<li><a onClick={props.handleLogout}>Log Out</a></li>
							</ul>
						</li>
					</div>
					<div>
						<h1 className="header-h1">
							Where To Eat?
						</h1>
					</div>
					<div>
						<li><a onClick={props.goToProfile}>Your Profile</a></li>
					</div>
				</div>
			</header>
		</div>
	)
}	

export default Header;