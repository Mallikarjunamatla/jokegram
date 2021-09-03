import React from 'react'
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import { signOutAPI } from '../action';


const Container = styled.div`
	background-color: gray;
	
	
	z-index: 999;
`;

const Content = styled.div`
	display: flex;
    flex-direction : column;
	align-items: center;
	
	height: 100%;
	
`;




const Nav = styled.nav`
	
`;

const NavListWrap = styled.ul`
     list-style : none;
	
`;

const NavList = styled.li`
padding-top : 20px;

	a{
		color : #fff;
		text-decoration : none;
		font-size : 18px;
		
		
	}
	a:hover{
		color : aqua;
	}
   
	
`;






const Menu = (props) => {
    return (
        <Container>
			<Content>
				
				
			
				<Nav>
					<NavListWrap>
						<NavList >
							<NavLink to="/feed" exact activeClassName={'activeClass'} >
								<a href="">
									
									<span>Home</span>
								</a>
								 
						     </NavLink>
						</NavList>
						<NavList>
							    <NavLink to="/feed" >
									<a href="">
										
										<span>Friends</span>
									</a>
									
								</NavLink>
						</NavList> 
						<NavList>
								<NavLink to="/feed">
									<a href="">
										
										<span>Following</span>
									</a>
									
								</NavLink>
						</NavList>
						<NavList>
								<NavLink to="/feed">
									<a>
										
										<span>Messages</span>
									</a>
									
								</NavLink>
						</NavList>
						<NavList>
								<NavLink to="/feed">
									<a href="">
										
										<span>Notifications</span>
									</a>
									
								</NavLink>
						</NavList>

                        <NavList>
								<NavLink to="/user">
									<a href="">
									
										<span>My Profile</span>
									</a>
									
								</NavLink>
                               
						</NavList>
                      <NavList>
						<a>
										
							<span onClick={() => props.signOut()}>Log Out</span>
						</a>
					 </NavList>
						
						
					</NavListWrap>
				</Nav>
			</Content>
		</Container>
    );
}

const mapStateToProps = (state) => {
	return{
		
	}
	
};

const mapDispatchToProps = (dispatch) => ({
	 signOut: () => dispatch(signOutAPI()),
	
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
