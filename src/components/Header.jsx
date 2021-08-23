import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { signOutAPI } from "../action";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Menu from './Menu';

const Container = styled.div`
	background-color: #fff;
	border-bottom: 1px solid rgba(0, 0, 0, 0.08);
	padding: 0 24px;
	position: sticky;
	top: 0;
	left: 0;
	/* width: 100vw; */
	z-index: 10;
`;

const Content = styled.div`
	display: flex;
	align-items: center;
	margin: 0 auto;
	height: 100%;
	max-width: 1128px;
`;

const Logo = styled.span`
	margin-right: 8px;
	font-size: 0;
`;

const Search = styled.div`
	opacity: 1;
	flex-grow: 1;
	position: relative;
	@media (max-width: 768px) {
		flex-grow: unset;
	}
	& > div {
		max-width: 280px;
		input {
			border: none;
			box-shadow: none;
			background-color: #eef3f8;
			border-radius: 2px;
			color: rgba(0, 0, 0, 0.9);
			width: 218px;
			padding: 0 8px 0 40px;
			line-height: 1.75;
			font-weight: 400;
			font-size: 14px;
			height: 34px;
			vertical-align: text-top;
			border-color: #dce6f1;
			@media (max-width: 768px) {
				width: 140px;
			}
		}
	}
`;

const SearchIcon = styled.div`
	width: 40px;
	z-index: 1;
	position: absolute;
	top: 10px;
	left: 5px;
	border-radius: 0 2px 2px 0;
	margin: 0;
	pointer-events: none;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Nav = styled.nav`
	margin-left: auto;
	display: block;
	@media (max-width: 768px) {
		position: fixed;
		left: 0;
		bottom: 0;
		background: white;
		width: 100%;
	}
`;

const NavListWrap = styled.ul`
	display: flex;
	flex-wrap: nowrap;
	list-style-type: none;
	justify-content: space-between;
	.activeClass {
		span::after {
			content: "";
			transform: scaleX(1);
			border-bottom: 2px solid var(--white, #fff);
			position: absolute;
			left: 0;
			bottom: 0;
			transition: transform 0.2s ease-in-out;
			width: 100%;
			border-color: rgba(0, 0, 0, 0.9);
		}
	}
`;

const NavList = styled.li`
	display: flex;
	align-items: center;
	a {
		align-items: center;
		background: transparent;
		display: flex;
		flex-direction: column;
		font-size: 12px;
		font-weight: 400;
		justify-content: center;
		line-height: 1.5;
		min-height: 52px;
		min-width: 80px;
		position: relative;
		text-decoration: none;
		img{
			width : 25px;
			fill : yellow;
		}
		span {
			color: rgba(0, 0, 0, 0.6);
			display: flex;
			align-items: center;
			text-align: center;
		}
		@media (max-width: 768px) {
			min-width: 50px;
			font-size: 9px;
			span > img {
				width: 40%;
			}
		}
	}
	&:hover,
	&:active {
		a {
			span {
				color: rgba(0, 0, 0, 0.9);
			}
		}
	}
`;

const SignOut = styled.div`
	position: absolute;
	top: 45px;
	background: white;
	border-radius: 0 0 5px 5px;
	width: 100px;
	height: 40px;
	font-size: 16px;
	text-align: center;
	transition-duration: 167ms;
	display: none;
	z-index: 15;
`;

const SignOutMobile = styled.div`
	display: none;
	@media (max-width: 768px) {
		display: flex;
		padding-left: 1rem;
		font-size: 14px;
	}
`;

const User = styled(NavList)`
	a > img {
		border-radius: 50%;
		width: 25px;
		height: 25px;
	}
	span {
		display: flex;
		align-items: center;
	}
	&:hover {
		${SignOut} {
			@media (min-width: 768px) {
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
`;

const MediaMenu = styled.div`
     position : absolute;
	`;



function Header(props) {

     const [open,setOpen] =useState(false);

	const openMenu = (event) =>{
		event.preventDefault();
        
		setOpen(true);
		console.log(open)
	}

	const closeMenu = (e) =>{
		e.preventDefault();

		setOpen(false);
		console.log(open)
	}

	return (
		<Container>
			<Content>
				
							<button onClick={openMenu} >
									<img src="/images/reorder-three.svg"  style={{width :"25px"}}alt="" />
									
							</button>
						{open && <MediaMenu>
								<Menu></Menu>
								<button onClick={closeMenu} >
									&times;
									
								</button>
							</MediaMenu>
						}
				
				<Logo>
				
					<NavLink to="/feed">
					<img src="/images/LogoJ.jpg" alt="" />
					</NavLink>
					
				</Logo>
				<Search>
					<div>
						<input type="text" placeholder="Search" />
					</div>
					<SearchIcon>
						<img src="/images/search-icon.svg" alt="" />
					</SearchIcon>
				</Search>
				<SignOutMobile onClick={() => props.signOut()}>
					<a>Sign Out</a>
				</SignOutMobile>
				<Nav>
					<NavListWrap>
						<NavList >
							<NavLink to="/feed" exact activeClassName={'activeClass'} >
								<a href="">
									<img src="/images/home.svg" alt="" />
									<span>Home</span>
								</a>
								 
						     </NavLink>
						</NavList>
						<NavList>
							    <NavLink to="/feed" >
									<a href="">
										<img src="/images/people-sharp.svg" alt="" />
										<span>Friends</span>
									</a>
									
								</NavLink>
						</NavList>
						<NavList>
								<NavLink to="/feed">
									<a href="">
										<img src="/images/users.svg" alt="" />
										<span>Following</span>
									</a>
									
								</NavLink>
						</NavList>
						<NavList>
								<NavLink to="/feed">
									<a>
										<img src="/images/chatbubble-ellipses-outline.svg" alt="" />
										<span>Messages</span>
									</a>
									
								</NavLink>
						</NavList>
						<NavList>
								<NavLink to="/feed">
									<a href="">
										<img src="/images/nav-notifications.svg" alt="" />
										<span>Notifications</span>
									</a>
									
								</NavLink>
						</NavList>
						<User>
							<a>
								{props.user && props.user.photoURL ? <img src={props.user.photoURL} alt="" /> : <img src="/images/user.svg" alt="" />}
								<span>
									Me <img src="/images/down-icon.svg" alt="" />
								</span>
							</a>
							<SignOut onClick={() => props.signOut()}>
								<a>Sign Out</a>
							</SignOut>
						</User>
						
					</NavListWrap>
				</Nav>
			</Content>
		</Container>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
	};
};

const mapDispatchToProps = (dispatch) => ({
	signOut: () => dispatch(signOutAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
