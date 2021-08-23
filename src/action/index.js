import db, { auth, provider, storage } from "../firebase";
import { SET_LOADING_STATUS, SET_USER, GET_ARTICLES, GET_WIDTH, GET_hEIGHT } from "./actionType"
import firebase from 'firebase';

export function setUser(payload) {
	return {
		type: SET_USER,
		user: payload,
	};
}

export function setLoading(status) {
	return {
		type: SET_LOADING_STATUS,
		status: status,
	};
}

export function getArticles(payload, id) {
	return {
		type: GET_ARTICLES,
		payload: payload, 
		id: id,
	};
}

export function getUserAuth() {
	
	return (dispatch) => {
		dispatch(setLoading(true))
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				dispatch(setUser(user));
				dispatch(setLoading(false))
			}
		});
	};
}

export  function signInAPIPassword(email,password) {
	return (dispatch) => {
		auth.signInWithEmailAndPassword(email,password)
			.then((payload) => dispatch(setUser(payload.user)))
			.catch((err) => alert(err.message));
	};
}


export   function signInAPI() {

	
	
	return (dispatch) => {
	  //var provider = new firebase.auth.GoogleAuthProvider();
	  // In memory persistence will be applied to the signed in Google user
	  // even though the persistence was set to 'none' and a page redirect
	  // occurred.
	 
	  auth.signInWithPopup(provider)
	  .then((payload) => dispatch(setUser(payload.user)))
	  .catch((err) => alert(err.message));
	};	
			
	
	//auth.setPersistence(auth.Persistence.SESSION)
	
}

export function signOutAPI() {
	return (dispatch) => {
		auth.signOut()
			.then(() => dispatch(setUser(null)))
			.catch((err) => alert(err.message));
	};
}

export function postArticleAPI(payload) {
	return (dispatch) => {
		if (payload.image !== "") {
			dispatch(setLoading(true));
			const upload = storage.ref(`images/${payload.image.name}`).put(payload.image);
			upload.on(
				"state_changed",
				(snapshot) => {
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				},
				(err) => alert(err),
				async () => {
					const downloadURL = await upload.snapshot.ref.getDownloadURL();
					db.collection("articles").add({
						actor: {
							description: payload.user.email,
							title: payload.user.displayName,
							date: payload.timestamp,
							image: payload.user.photoURL,
						},
						video: payload.video,
						sharedImg: downloadURL,

						likes: {
							count: 0,
							whoLiked: [],
						},
						downvotes : {
							count: 0,
							whoDownVoted: [],
						},
						comments: [],

						description: payload.description,
					});
					dispatch(setLoading(false));
				}
			);
		} else if (payload.video) {
			dispatch(setLoading(true));
			db.collection("articles").add({
				actor: {
					description: payload.user.email,
					title: payload.user.displayName,
					date: payload.timestamp,
					image: payload.user.photoURL,
				},
				video: payload.video,
				sharedImg: "",
				likes: {
					count: 0,
					whoLiked: [],
				},
				comments: 0,
				description: payload.description,
			});
			dispatch(setLoading(false));
		} else if (payload.image === "" && payload.video === "") {
			dispatch(setLoading(true));
			db.collection("articles").add({
				actor: {
					description: payload.user.email,
					title: payload.user.displayName,
					date: payload.timestamp,
					image: payload.user.photoURL,
				},
				video: "",
				sharedImg: "",
				likes: {
					count: 0,
					whoLiked: [],
				},
				downvotes : {
					count: 0,
					whoDownVoted: [],
				},
				comments: [],
				description: payload.description,
			});
			dispatch(setLoading(false));
		}
	};
}


export function getArticlesAPI() {
	return (dispatch) => {
		dispatch(setLoading(true));
		let payload;
		let id;
		db.collection("articles")
			.orderBy("actor.date", "desc")
			.onSnapshot((snapshot) => {
				payload = snapshot.docs.map((doc) => doc.data());
				id = snapshot.docs.map((doc) => doc.id);
				dispatch(getArticles(payload, id));
			});
		dispatch(setLoading(false));   
	};  
} 

export function updateArticleAPI(payload) {
	return (dispatch) => {
		db.collection("articles").doc(payload.id).update(payload.update);
	};
}


export function deleteArticleAPI(payload) {
	// event.preventDefault();
	
	
return(dispatch) =>{

	db.collection("articles").doc(payload.id).delete().then(function() {
		console.log("Document successfully deleted!");
	}).catch(function(error) {
		console.log("Error removing document: ", error);            
	});
	// Get a reference to the storage service, which is used to create references in your storage bucket
	

	// Create a storage reference from our storage service
	const storageRef = storage.ref();

	// Create a reference to the file to delete
	const desertRef = storageRef.child(`images/${payload.imagename}`);

	// Delete the file
	desertRef.delete().then(function() {
	// File deleted successfully
	console.log("Deleted")

	}).catch(function(error) {
	// Uh-oh, an error occurred!

	});
}
	

}

export function getWidthAPI(payload){

	return {
		type: GET_WIDTH,
		width: payload.width,
	};
}

export function getHeightAPI(payload){

	return {
		type: GET_hEIGHT,
		width: payload.height,
	};
}

