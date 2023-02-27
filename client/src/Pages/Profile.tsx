import axios from 'axios'
import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../Components/Card'
import Header from '../Components/Header'
import NewPost from '../Components/NewPost'
import { AuthContext } from '../Context/AuthContext'
import '../scss/Components/Profile.scss'
import { PostProps, User, UserUpdate } from '../types'
import { CSSTransition } from 'react-transition-group'
import '../scss/Components/transition.scss'

export default function Profile() {

  const [posts, setPosts] = useState<PostProps[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const username = useParams().username;
  const { user, dispatch } = useContext(AuthContext);

  const [newImg, setNewImg] = useState<File | null>(null);
  const [desc, setDesc] = useState('');

  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/api/users?username=" + username);
      setCurrentUser(res.data);
      setDesc(res.data.desc);
      setFollowed(res.data.followers.includes(user._id));
    }
    fetchUser();
  },[username, user._id])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/api/posts/profile/" + username);
      setPosts(res.data.reverse());
    }
    fetchPosts();
  },[currentUser, username])

  const updateProfileHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let req: UserUpdate = {
      userId: user._id,
      desc: desc,
    };
    if (newImg) {
      try {
        const data = new FormData();
        data.append("file", newImg);
        const res = await axios.post("/api/upload", data);
        req.profilePicture = res.data.url;
      } catch (error) {
        console.log(error);
        console.log('фото не загружено')
      }
    }
    try {
      axios.put("/api/users/" + user._id, req);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files != null) setNewImg(e.currentTarget.files[0]);
  }

  const handleFollow = async () => {
    try {
      console.log(followed);
      if (!followed) {
        await axios.put('/api/users/' + user._id + '/follow', { userId: currentUser?._id });
        dispatch({ type: "FOLLOW", payload: currentUser?._id });
      } else {
        await axios.put('/api/users/' + user._id + '/unfollow', { userId: currentUser?._id });
        dispatch({ type: "UNFOLLOW", payload: currentUser?._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='container'>
      
      <CSSTransition in={!!currentUser} timeout={600} classNames="fadein">
        <>
          <Header toExit={currentUser?._id === user._id}/>
          <form className="profile" onSubmit={updateProfileHandler}>
            <label htmlFor="profile__image__input">

              {newImg 
                ? <img className='profile__image' src={URL.createObjectURL(newImg)} alt="" />
                : <img className='profile__image' 
                    src={currentUser?.profilePicture 
                      ? currentUser.profilePicture 
                      : require('../assets/images/profile.png')} 
                alt="Профиль" />}
              
            </label>
            {currentUser?._id === user._id && 
              <input 
                name='profile__image__input'
                id='profile__image__input' onChange={handleChangeImg} type="file" accept=".png,.jpeg,.jpg"/>
            }

            <h1 className='profile__header'>{currentUser?.username}</h1>

            {currentUser?._id === user._id 
              ? <input className="profile__text profile__text__input" type="text" 
                  value={desc}
                  onChange={(e) => {
                    setDesc(e.currentTarget.value)
                  }}/>
              : <p className="profile__text">{currentUser?.desc}</p>
            }
            
            {!!currentUser && (newImg || desc !== currentUser?.desc) &&
              <button type='submit' className="primary-button">Сохранить изменения</button>
            }

          </form>
        </>
      </CSSTransition>
      <div className="profile-buttons">
        
        {!!currentUser && currentUser?._id !== user._id && 
          <button onClick={handleFollow} className="primary-button">
            {!followed
              ? 'Подписаться'
              : "Отписаться"}
            </button>
        }
        
        {/* <button className="primary-button">Поделиться профилем</button> */}
      </div>
      {currentUser?._id === user._id && <div className="new-post">
        <h2 className="page-title new-post__title">Новая запись</h2>
        <NewPost/>
      </div>}

      <CSSTransition in={!!posts?.length} timeout={600} classNames="show" unmountOnExit>
        <section className="feed">
          <div className="list list_profile">
            {posts.map((post) => (
              <Card key={post._id} type='profile' post={post}/>
            ))}
          </div>
        </section>
      </CSSTransition>
    </div>
  )
}
