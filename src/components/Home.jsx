import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import Left from "./Left";
import Main from "./Main";
import Right from "./Right";

const Container = styled.div`
	max-width: 100%;

`;

const Content = styled.div`
	max-width: 1128px;
	margin: auto;
`;

const Section = styled.section`
	

	@media (max-width: 768px) {
		flex-direction: column;
		padding: 0 5px;
		margin: 16px 0;
	}
`;

const Layout = styled.div`
	display: grid;
	grid-template-areas: "left main right";
	grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
	column-gap: 25px;
	row-gap: 25px;
	margin: 25px 0;
	
	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
		padding: 0 5px;
	}
`;

const LeftLayout = styled.div`

	
	
	& > section {
		position : sticky;
	    top : 7%;
		
		
	}
`;

const RightLayout = styled.div`

	
	
	& > section {
		position : sticky;
	    top : 7%;
		
	}
`;


function Home(props) {
   const [width,setWidth] =useState(null);
   const [height,setHeight] =useState(null);
	const updateDimensions = () => {
		setWidth(window.innerWidth);
		setHeight(window.innerHeight);
	}
	useEffect(() => {
		window.addEventListener("resize", updateDimensions);
		return () => window.removeEventListener("resize", updateDimensions);
	}, []);
	return (
		<Container>
			{!props.user && <Redirect to="/" />}
			<Content>
				
				<Layout>
				   {width > 768 && (<LeftLayout>
					   <section>
					     <Left />
					   </section>
				   </LeftLayout>)
                  }
					<Main />
					<RightLayout>
						<section>
						<Right/>
						</section>
					</RightLayout>
				</Layout>
			</Content>
		</Container>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.userState.user,

	};
};

export default connect(mapStateToProps)(Home);
