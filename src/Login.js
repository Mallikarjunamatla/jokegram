import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import {makeStyles } from '@material-ui/core/styles';
import {Modal} from '@material-ui/core';
import {Button, Input} from '@material-ui/core';
import { signInWithGoogleAPI } from "./action";

const Container = styled.div``;

const Nav = styled.nav`
	max-width: 1128px;
	margin: auto;
	padding: 12px 0 16px;
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	justify-content: space-between;
	position: relative;

	& > a {
		width: 130px;
		height: 35px;
		@media (max-width: 768px) {
			padding: 0 5px;
		}
	}
`;

const Join = styled.a`
	font-size: 16px;
	padding: 10px;
	text-decoration: none;
	border-radius: 5px;
	color: rgba(0, 0, 0, 0.6);
	margin-right: 8px;

	&:hover {
		background-color: rgba(0, 0, 0, 0.08);
		color: rgba(0, 0, 0, 1);
	}
`;

const SignIn = styled.a`
	box-shadow: inset 0 0 0 1px #0a66c2;
	border-radius: 25px;
	color: #0a66c2;
	font-size: 16px;
	font-weight: 600;
	transition-duration: 167ms;
	line-height: 40px;
	padding: 10px 25px;
	text-align: center;
	background-color: transparent;
	&:hover {
		background-color: rgba(112, 181, 249, 0.15);
		box-shadow: inset 0 0 0 2px #0a66c2;
	}
`;

const Section = styled.section`
	display: flex;
	flex-wrap: wrap;
	align-content: start;
	min-height: 700px;
	padding-bottom: 138px;
	padding-top: 40px;
	padding: 60px 0;
	position: relative;
	width: 100%;
	max-width: 1128px;
	align-items: center;
	margin: auto;
	@media (max-width: 768px) {
		min-height: 0;
	}
`;

const Hero = styled.div`
	width: 100%;
	h1 {
		padding-bottom: 0;
		width: 55%;
		font-size: 56px;
		color: #2977c9;
		font-weight: 200;
		line-height: 70px;
		@media (max-width: 768px) {
			text-align: center;
			width: 100%;
			font-size: 20px;
			line-height: 2;
		}
	}
	img {
		width: 700px;
		height: 670px;
		position: absolute;
		bottom: -2px;
		right: -150px;
		@media (max-width: 768px) {
			top: 230px;
			position: initial;
			width: initial;
			height: initial;
		}
	}
    
`;

const Form = styled.div`
	margin-top: 100px;
	width: 408px;
	@media (max-width: 768px) {
		margin: 20px auto 0;
	}
`;

const Google = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #fff;
	height: 56px;
	width: 100%;
	border-radius: 30px;
	box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%), inset 0 0 0 2px rgb(0 0 0 / 0%), inset 0 0 0 1px rgb(0 0 0 / 0);
	border: none;
	vertical-align: middle;
	transition-duration: 167ms;
	font-size: 20px;
	color: rgba(0, 0, 0, 0.6);
	z-index: 0;
	&:hover {
		background-color: rgba(207, 207, 207, 0.25);
		color: rgba(0, 0, 0, 0.75);
		box-shadow: inset 0 0 0 2px rgb(0 0 0 / 60%), inset 0 0 0 3px rgb(0 0 0 / 0%), inset 0 0 0 2px rgb(0 0 0 / 0);
	}
	img {
		margin-right: 25px;
	}
`;

function getModalStyle() {
    const top = 50; 
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
function Login(props) {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const  [open , setOpen] = useState(false);
    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("");
    
    const [password, setPassword] = useState("");


    const loginWithPassword = (e) => {

        e.preventDefault();
       const payload = {
            email : email,
            password : password,
        };
        props.signInWithPassword(payload)
}






const signUp =  (e) => {

        e.preventDefault();
        const payload = {
            name : username,
            email : email,
            password : password,
        };
        props.registerHandler(payload)
}

    
	return (
		<Container>
			{props.user && <Redirect to="/feed" />}
                <Modal  
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <div style={modalStyle} className={classes.paper}>
                    <form className="app__signup">
                        <center>
                        <img 
                            className="app__headerImage"
                            height="40px;"
                            src="LogoJ.jpg"
                            alt=""
                        />
                        </center>

                        <Input 
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        /> 
                        <Input 
                        placeholder="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input 
                        placeholder="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" onClick={signUp}>Sign Up</Button>

                    </form>

                    </div>
                </Modal>
            <Nav>
				<a href="/">
					<img src="LogoJ.jpg" alt="" />
				</a>
				<div>
					<Join>Join Now</Join>
					<SignIn>Sign In</SignIn>
				</div>
			</Nav>
			<Section>
				<Hero>
					<h3>🅹🅾🅺🅴🅶🆁🅰🅼  🅷🅴🆁🅴 🆃🅾 🅲🆁🅰🅲🅺 🅹🅾🅺🅴🆂</h3>

                    
					
				</Hero>
				<Form>
                    

                           <Input
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) =>{
                                
                                setEmail(e.target.value)
                            } }
                            />
                            <Input
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />

                            <Button type="submit" onClick={loginWithPassword}
                            >
                            Sign In
                            </Button>
                        

                        <p>
                            Not a member?{"   "}
                            <span className="login__register" onClick={() => setOpen(true)}>
                            Sign Up
                            </span>
                        </p>
                    
					<Google onClick={() => props.signInWithGoogleAPI()}>
						<img src="/images/google.svg" alt="" />
						Sign in with Google
					</Google>
				</Form>
			</Section>
		</Container>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
	};
};

const mapDispatchToProps = (dispatch) => ({
	signInWithGoogleAPI: () => dispatch(signInWithGoogleAPI()),
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
