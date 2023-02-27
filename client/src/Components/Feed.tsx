import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { PostProps } from '../types';
import Card from './Card';
import { CSSTransition } from 'react-transition-group'
import '../scss/Components/transition.scss'

export default function Feed() {
    
  const { user } = useContext(AuthContext);
  const [feedPosts, setFeedPosts] = useState<PostProps[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('/api/posts/timeline/' + user._id);
      res.data.sort((a: PostProps, b: PostProps) => {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        return +dateB - +dateA
      })
      setFeedPosts(res.data);
    }
    fetchPosts();
  },[user])

  return (
    <>
        <div className="container">
            <CSSTransition in={!!feedPosts?.length} timeout={600} classNames="show">
                <section className="feed">
                    <h2 className="page-title feed__title">Подписки</h2>
                    <div className="list">
                    {feedPosts.map((post) => (
                        <Card key={post._id} type='feed' post={post}/>
                    ))}
                    </div>
                </section>
            </CSSTransition>
        </div>
    </>
  )
}
