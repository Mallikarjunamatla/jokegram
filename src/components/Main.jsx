import React, { useEffect, useState } from "react";
import  { auth, storage } from "../firebase";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import styled from "styled-components";
import  "./Main.css";
import MenuPopupState from "./MenuPopupState";
import { getArticlesAPI, updateArticleAPI,deleteArticleAPI } from "../action";
import firebase from "firebase";
import PostalModal from "./PostalModal";
//import MenuPopupState from "./components/MenuPopupState";
import Textarea from 'react-expanding-textarea';
import {
	FacebookShareButton,
	WhatsappShareButton,
	WhatsappIcon,
	FacebookIcon,
  } from 'react-share';


const Container = styled.div`
   
	grid-area: main;
	
`;

const CommonBox = styled.div`
	text-align: center;
	overflow: hidden;
	margin-bottom: 8px;
	background-color: #fff;
	border-radius: 5px;
	position: relative;
	border: none;
	box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
	
	
`;

const ShareBox = styled(CommonBox)`
	display: flex;
	flex-direction: column;
	margin: 0 0 8px;
	color: #958b7b;
	z-index : 1;
	position : sticky;
	top : 8%;
	div {
		button {
			outline: none;
			color: rgba(0, 0, 0, 0.6);
			font-size: 14px;
			line-height: 1.5;
			min-height: 48px;
			display: flex;
			align-items: center;
			border: none;
			background-color: transparent;
			font-weight: 600;
		}
		&:first-child {
			display: flex;
			align-items: center;
			padding: 8px 16px;
			img {
				width: 48px;
				border-radius: 50%;
				margin-right: 8px;
			}
			button {
				margin: 4px 0;
				flex-grow: 1;
				padding-left: 16px;
				border: 1px solid rgba(0, 0, 0, 0.15);
				border-radius: 35px;
				text-align: left;
			}
		}
		&:nth-child(2) {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			padding-bottom: 4px;
			button {
				img {
					margin: 0 4px 0 -2px;
				}
			}
		}
	}
	@media screen and (max-width : 768px){
		top : 5%;
	}
`;

const DeletePost = styled.div`
    position: relative;
    top: 0px;
    right: 0px;
    float: right;
    cursor: pointer;
    padding-right: 20px;
    font-size: 12px;
    /* color: red; */
    text-align: right;
    flex: 0 auto;
}`;

const Article = styled(CommonBox)`
	padding: 0;
	margin: 0 0 8px;
	overflow: visible;
`;

const SharedActor = styled.div`
	padding-right: 40px;
	flex-wrap: nowrap;
	padding: 12px 16px 0;
	margin-bottom: 8px;
	display: flex;
	align-items: center;
	a {
		margin-right: 12px;
		flex-grow: 1;
		overflow: hidden;
		display: flex;
		img {
			width: 48px;
			height: 48px;
			border-radius: 50%;
		}
		& > div {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			flex-basis: 0;
			margin-left: 8px;
			overflow: hidden;
			span {
				text-align: left;
				&:first-child {
					font-size: 14px;
					font-weight: 700;
					color: #000;
				}
				&:nth-child(n + 2) {
					font-size: 12px;
					color: rgba(0, 0, 0, 0.6);
				}
			}
		}
	}
	button {
		position: absolute;
		top: 0;
		right: 12px;
		border: none;
		outline: none;
		background: transparent;
	}
`;

const Description = styled.div`
	padding: 0 16px;
	overflow: hidden;
	font-size: 14px;
	text-align: left;
`;

const SharedImage = styled.div`
	margin: 8px 16px 0;
	background-color: #f9fafb;
	img {
		width: 100%;
		height: 100%;
	}
`;

const SocialCount = styled.ul`
	line-height: 1.3;
	display: flex;
	align-items: flex-start;
	overflow: auto;
	margin: 0 16px;
	padding: 8px 0;
	border-bottom: 1px solid #e9efdf;
	color: rgba(0, 0, 0, 0.6);
	list-style: none;
	li {
		margin-right: 5px;
		font-size: 12px;
		button {
			display: flex;
			border: none;
			color: rgba(0, 0, 0, 0.6);
			background: transparent;
			span {
				padding-left: 5px;
			}
		}
	}
`;

const SocialActions = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin: 4px 12px;
	min-height: 40px;
	padding-bottom: 5px;
	button {
		display: inline-flex;
		align-items: center;
		padding: 8px;
		border: none;
		background: transparent;
		span {
			margin-left: 4px;
			color: rgba(0, 0, 0, 0.6);
			font-size: 14px;
		}
	}
	button.active {
		span {
			color: #0a66c2;
			font-weight: 600;
		}
		svg {
			fill: #0a66c2;
		}
	}
`;

const Comments = styled.div`
    display : flex;
	flex-direction: column;
	border : 2px solid gray;
	padding-left : 0px;
	justify-content : flex-start;
	
	
  `

const Content = styled.div`
	text-align: center;
	& > img {
		width: 30px;
	}
`;

function Main(props) {
	const [showModal, setShowModal] = useState("close");
	const [comments,setComments] = useState([]);
	const [comment,setComment] = useState([]);
	const [save,setSave] = useState(false);
	const [articlesData,setArticlesData] = useState([]);
	const [postIndex,setPostIndex] = useState(null);
	const [id,setId] = useState(null);



	

	useEffect(() => {
		props.getArticles();
	}, []);

	// useEffect(() =>{
	// 	const data = JSON.parse(window.localStorage.getItem("data"));
	//   console.log(data);
	//    setArticlesData(data);
	// },[])

	// useEffect(() =>{
	// 	window.localStorage.setItem("data",JSON.stringify(articlesData));
	  
	// })

	

    // What follows is for comments under a post, when a change is made, it refreshes
  

   

	const clickHandler = (event) => {
		event.preventDefault();
		if (event.target !== event.currentTarget) {
			return;
		}
		switch (showModal) {
			case "open":
				setShowModal("close");
				break;
			case "close":
				setShowModal("open");
				break;
			default:
				setShowModal("close");
				break;
		}
	};
 



	
	function commentsHandler(event, postIndex, id) {
		event.preventDefault();
		
		// let currentComments = props.articles[postIndex].comments.size;
		// let whoCommented = props.articles[postIndex].comments;
		// let user = props.user.email;
		// let userIndex = whoLiked.indexOf(user);
		let comm = {
			text : comment,
			username : props.user.displayName,
			timestamp: firebase.firestore.Timestamp.now()
		}

		const payload = {
			update: {
				comments: [...comments,comm],
			},
			id: id,
		};

		props.commentsHandler(payload);
		setComment("");
	}
	function likeHandler(event, postIndex, id) {
		event.preventDefault();
		let currentLikes = props.articles[postIndex].likes.count;
		let whoLiked = props.articles[postIndex].likes.whoLiked;
		let user = props.user.email;
		let userIndex = whoLiked.indexOf(user);

		if (userIndex >= 0) {
			currentLikes--;
			whoLiked.splice(userIndex, 1);
		} else if (userIndex === -1) {
			currentLikes++;
			whoLiked.push(user);
		}

		const payload = {
			update: {
				likes: {
					count: currentLikes,
					whoLiked: whoLiked,
				},
			},
			id: id,
		};

		props.likeHandler(payload);
	}

	function downVoteHandler(event, postIndex, id) {

		event.preventDefault();
		let currentDownVotes = props.articles[postIndex].downvotes.count;
		let whoDownVoted = props.articles[postIndex].downvotes.whoDownVoted;
		let user = props.user.email;
		let userIndex = whoDownVoted.indexOf(user);

		if (userIndex >= 0) {
			currentDownVotes--;
			whoDownVoted.splice(userIndex, 1);
		} else if (userIndex === -1) {
			currentDownVotes++;
			whoDownVoted.push(user);
		}


		

		const payload = {
			update: {
				downvotes: {
					count: currentDownVotes,
					whoDownVoted: whoDownVoted,
				},
			},
			id: id,
		};
		console.log(currentDownVotes)

	  console.log(whoDownVoted)
	
		props.downVoteHandler(payload);
	}


	function saveHandler(event, postIndex, id) {
		event.preventDefault();
		let saved = props.articles[postIndex].saved;
		
		const payload = {
			update: {
				saved: !saved,
			},
			id: id,
		};

		props.saveHandler(payload);
	}
 

	function deleteArticle(id,postindex) {

		//let storage = Storage.storage()
		const img = props.articles[postindex].sharedImg;
		const httpsReference = storage.refFromURL(img);

	
		console.log(httpsReference.name);
		// const  httpsReference = storage.getInstance().getReferenceFromUrl(img);
		// const imgname = httpsReference.name;
		
		const payload = {

			imagename : httpsReference.name,
			id: id,
		};

		props.deleteArticle(payload);
	}
 


	return (
		<Container>
			<ShareBox>
				<div>
					{props.user.photoURL ? <img src={props.user.photoURL} alt="" /> : <img src="/images/user.svg" alt="" />}
					<button onClick={clickHandler} disabled={props.loading ? true : false}>
					Let's make the world laugh!
					</button>
				</div>
				<div>
					<button>
						<img src="/images/photo-icon.svg" alt="" />
						<span>Photo</span>
					</button>
					<button>
						<img src="/images/video-icon.svg" alt="" />
						<span>Video</span>
					</button>
					
					<button>
						<img src="/images/article-icon.svg" alt="" />
						<span>Write a Joke</span>
					</button>
				</div>
			</ShareBox>
			<Content>
				{props.loading && <img src="/images/spin-loader.gif" alt="" />}
				{props.articles.length > 0 &&
					props.articles.map((article, key) => (
						<Article key={key}>
							<SharedActor>
								<a>
									{article.actor.image ? <img src={article.actor.image} alt="" /> : <img src="/images/user.svg" alt="" />}
									<div>
										<span>{article.actor.title}</span>
										<span>{article.actor.description}</span>
										 <span>{article.actor.date.toDate().toLocaleDateString()}</span> 
									</div> 
								</a>
							
								{
										((article.actor.title ) === auth.currentUser.displayName || (props.user && auth.currentUser.email === "admin@gmail.com") )
										&&
										<DeletePost>
										{/* This is where the 3 dots menu appear to delete POSTS */}
											<MenuPopupState 
												
												id={props.ids[key]}
												postindex={key}
												
												functiontopass={deleteArticle}
												labeltopass={"Delete this post"}
											/>
										</DeletePost>


									}

							
								



								{/* <button>
									<img src="/images/ellipses.svg" alt="" />
								</button> */}
							</SharedActor>
							<Description>{article.description}</Description>
							<SharedImage>
								<a>{!article.sharedImg && article.video ? <ReactPlayer width={"100%"} url={article.video} /> : article.sharedImg && <img src={article.sharedImg} alt="" />}</a>
							</SharedImage>
							<SocialCount>
								{props.articles[key].likes.count > 0 && (
									<>
										<li>
											<button>
												<img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" alt="" />
												{/* <img src="https://static-exp1.licdn.com/sc/h/7fx9nkd7mx8avdpqm5hqcbi97" alt="" /> */}
												<span>{props.articles[key].likes.count}</span>
											</button>
										</li>
										<li>
											<a>{article.comments.length} comments </a>
										</li>
									</>
								)}
								
								{props.articles[key].downvotes.count > 0 && (
									<>
										<li>
											<button>
												<img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" alt="" />
												{/* <img src="https://static-exp1.licdn.com/sc/h/7fx9nkd7mx8avdpqm5hqcbi97" alt="" /> */}
												<span>{props.articles[key].downvotes.count}</span>
											</button>
										</li>
										<li>
											<a>downvoted </a>
										</li>
									</>
								)}
								
							</SocialCount>
							<SocialActions>
								<button onClick={(event) => likeHandler(event, key, props.ids[key])} className={props.articles[key].likes.whoLiked.indexOf(props.user.email) >= 0 ? "active" : null}>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="rgba(0, 0, 0, 0.6)" width="24" height="24" focusable="false">
										<path d="M19.46 11l-3.91-3.91a7 7 0 01-1.69-2.74l-.49-1.47A2.76 2.76 0 0010.76 1 2.75 2.75 0 008 3.74v1.12a9.19 9.19 0 00.46 2.85L8.89 9H4.12A2.12 2.12 0 002 11.12a2.16 2.16 0 00.92 1.76A2.11 2.11 0 002 14.62a2.14 2.14 0 001.28 2 2 2 0 00-.28 1 2.12 2.12 0 002 2.12v.14A2.12 2.12 0 007.12 22h7.49a8.08 8.08 0 003.58-.84l.31-.16H21V11zM19 19h-1l-.73.37a6.14 6.14 0 01-2.69.63H7.72a1 1 0 01-1-.72l-.25-.87-.85-.41A1 1 0 015 17l.17-1-.76-.74A1 1 0 014.27 14l.66-1.09-.73-1.1a.49.49 0 01.08-.7.48.48 0 01.34-.11h7.05l-1.31-3.92A7 7 0 0110 4.86V3.75a.77.77 0 01.75-.75.75.75 0 01.71.51L12 5a9 9 0 002.13 3.5l4.5 4.5H19z"></path>
									</svg>
									<span>Like</span>
								</button>

								<button onClick={(event) => downVoteHandler(event, key, props.ids[key])} >
									<img src="/images/Downvote(1).svg" alt="" />
									<span>Downvote</span>
								</button>

						

								
								<button onClick={(event) => saveHandler(event, key, props.ids[key])} className={props.articles[key].saved ? "active" : null} >
								    
								    <img src="/images/item-icon.svg" alt="" />
									<span>{props.articles[key].saved ? "Saved" : "Save"}</span>
								</button>
								<FacebookShareButton
								url={"https://firebase.google.com/docs/dynamic-links/rest"}
								quote={'Title or jo bhi aapko likhna ho'}
								hashtag={'#portfolio...'}
								>
								<FacebookIcon size={40} round={true} />
								</FacebookShareButton>

								<WhatsappShareButton
								url={"https://firebase.google.com/docs/dynamic-links/rest"}
								quote={'Title or jo bhi aapko likhna ho'}
								hashtag={'#portfolio...'}
								>
								<WhatsappIcon size={40} round={true} />
								</WhatsappShareButton>
							
								
							</SocialActions>
							<div className="post__commentBox">
								<form className="post__commentBox">
									<Textarea
										className="post__input"
										type="text"
										placeholder="Add a comment"
										value={comment}
										onChange={(e) => setComment(e.target.value)}
									/>

									<button
										className="post__button"
										disable={!comment}
										type="submit"
										onClick={(event) => commentsHandler(event, key, props.ids[key])}

									>
										<img  src="/images/comment-icon.svg" alt="" />
										<span>Post</span>
									</button>
								
									
									
							</form>
						</div>
						
						</Article>
					))}
			</Content>
			<PostalModal showModal={showModal} clickHandler={clickHandler} />
		</Container>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
		loading: state.articleState.loading,
		articles: state.articleState.articles,
		ids: state.articleState.ids,
	};
};

const mapDispatchToProps = (dispatch) => ({
	getArticles: () => dispatch(getArticlesAPI()),
	likeHandler: (payload) => dispatch(updateArticleAPI(payload)),
	saveHandler: (payload) => dispatch(updateArticleAPI(payload)),
	commentsHandler: (payload) => dispatch(updateArticleAPI(payload)),
	downVoteHandler: (payload) => dispatch(updateArticleAPI(payload)),
	deleteArticle : (payload) => dispatch(deleteArticleAPI(payload)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
