import React from 'react'
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import styled from 'styled-components';


const Container = styled.div`
	background-color: #f5f5f5;
	
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

	
`;

const NavList = styled.li`
   img{
        width : 25px;
   }
	
`;






const Menu = () => {
    return (
        <Container>
			<Content>
				
				
			
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

                        <NavList>
								<NavLink to="/user">
									<a href="">
										<img src="/images/person-circle-outline.svg" alt="" />
										<span>My Profile</span>
									</a>
									
								</NavLink>
                               
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
	
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
