import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {NavLink } from "react-router-dom";
const Container = styled.div`
	grid-area: left;
	background-color: #F0F2F5;
	margin-left : 0px;
`;

const ArtCard = styled.div`
	text-align: center;
	overflow: hidden;
	margin-bottom: 8px;
	
	
	
	position: relative;
	border: none;
`;

const UserInfo = styled.div`
	
	padding: 12px 12px 16px;
	word-wrap: break-word;
	word-break: break-word;
	
`;

const CardBackground = styled.div`
	
	background-position: center;
	background-size: 462px;
	height: 54px;
	margin: -12px -12px 0;
`;

const Photo = styled.div`
	box-shadow: none;
	background: url(${props => props.photoUrl});
	width: 72px;
	height: 72px;
	box-sizing: border-box;
	background-clip: content-box;
	
	background-position: center;
	/* background-size: 60%; */
	background-repeat: no-repeat;
	border-radius : 50%;
	margin: -38px auto 12px;
	
`;

const Link = styled.div`
	font-size: 16px;
	line-height: 1.5;
	color: rgba(0, 0, 0, 0.9);
	font-weight: 600;
`;

const AddPhotoText = styled.div`
	color: #0a66c2;
	margin-top: 4px;
	font-size: 12px;
	line-height: 1.33;
	font-weight: 400;
`;

const Widget = styled.div`
	
	padding: 12px 0;
	& > a {
		text-decoration: none;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 4px 12px;
		&:hover {
			background-color: #F1F1F1;
		}
		div {
			display: flex;
			flex-direction: column;
			text-align: left;
			span {
				font-size: 12px;
				line-height: 1.333;
				&:first-child {
					color: rgba(0, 0, 0, 0.6);
				}
				&:nth-child(2) {
					color: #000;
				}
			}
		}
	}
`;

const Item = styled.a`
	display: block;
	
	text-align: left;
	padding: 12px;
	font-size: 12px;
	span {
		display: flex;
		align-items: center;
	}
	&:hover {
		background-color: #F1F1F1;
	}
`;

const CommunityCard = styled(ArtCard)`
	padding: 8px 0 0;
	text-align: left;
	display: flex;
	flex-direction: column;
	a {
		color: #000;
		padding: 4px 12px;
		font-size: 12px;
		&:hover {
			color: #0a66c2;
		}
		span {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		&:last-child {
			color: rgba(0, 0, 0, 0.6);
		
			padding: 12px;
			&:hover {
				background-color: #F1F1F1;
			}
		}
	}
`;

function Left(props) {
	let photoUrl = props.user.photoURL ? props.user.photoURL : "/images/photo.svg";
	return (
		<Container>
			<ArtCard>
				<UserInfo>
					<CardBackground />
					<a>
						<Photo photoUrl={photoUrl} />
						<Link>Welcome, {props.user ? props.user.displayName : "there"}!</Link>
					</a>
					<a>
						<AddPhotoText>Add a photo</AddPhotoText>
					</a>
				</UserInfo>
				<Widget>
					<a>
						<div>
							<strong>Friends</strong>
							
						</div>
						<img src="/images/users.svg" alt=""  style={{width : "26px"}}/>
					</a>

					<a>
						<div>
							<strong>Following</strong>
							
						</div>
						<img src="/images/people-sharp.svg" alt=""  style={{width : "26px"}}/>
					</a>
				</Widget>
				<Item>
					<NavLink to="/feed/saved">
						<span>
							<img src="/images/item-icon.svg" alt="" />
							Saved posts
						</span>
					</NavLink>
					
				</Item>
			</ArtCard>
			<CommunityCard>
				<a>
					<strong>Groups</strong>
				</a>
				
				<a>
					<span>Follow Hashtags</span>
				</a>
				<a>
					<span>Discover More</span>
				</a>
			</CommunityCard>
		</Container>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
	};
};

export default connect(mapStateToProps)(Left);
