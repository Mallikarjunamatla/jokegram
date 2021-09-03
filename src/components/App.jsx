import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Header from "./Header";
import Home from "./Home";
import Left from "./Left";
import Saved from "./Saved";
import { useEffect } from "react";
import { getUserAuth } from "../action";
import { connect } from "react-redux";
import { useState } from "react";


function App(props) {
	const [load,setLoad] = useState(false);
	const [width, setWidth]   = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);
	useEffect( () => {

		async function get(){
			setLoad(true)
			await props.getUserAuth();
			setLoad(false)
		}
		get();
	//	console.log(props.getUserAuth());
		
	}, []);

	
	

	return (
		<div className="App">
              
				{!props.user ? <img src="/images/spin-loader.gif" alt="" srcset="" /> : 
				<Switch>
					<Route exact path="/">
						<Login />
					</Route>
					<Route exact path="/feed">
						<Header />
						<Home />
					</Route>
					<Route exact path="/feed/saved">
						<Header/> 
						<Saved />
					</Route>
					<Route exact path="/user">
					    <Header/> 
						<Left/>
					</Route>
				</Switch>
}
				

		
	      
	</div>
	);
}

const mapStateToProps = (state) => {
	return{
		user: state.userState.user,
	    loading: state.articleState.loading,
	}
	
};

const mapDispatchToProps = (dispatch) => ({
	getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
