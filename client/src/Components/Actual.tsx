import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import { PostProps } from '../types';
import Card from './Card';
import Scrollable from './Scrollable';
import { CSSTransition } from 'react-transition-group'
import '../scss/Components/transition.scss'


export default function Actual() {

  const [posts, setPosts] = useState<PostProps[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [startPadding, setStartPadding] = useState<number | undefined>(0)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('/api/posts/');
      setPosts(res.data.sort((a: PostProps, b: PostProps) => 
        b.likes.length - a.likes.length
      ));
      
    }
    fetchPosts();
  },[])

  useEffect(() => {
    setStartPadding(titleRef.current?.offsetLeft)
    const updateStartPadding = () => {
        setStartPadding(titleRef.current?.offsetLeft)
    }
    window.addEventListener('resize', updateStartPadding)
  },[])

  console.log()

  return (
    <>
        <CSSTransition in={!!posts?.length} timeout={600} classNames="show">
            <section className="actual">
                
                <div className="container">
                    <h2 ref={titleRef} className="page-title actual__title">Актуально ⚡️</h2>
                </div>

                <Scrollable _class="actual__list" startPadding={startPadding || 0}>
                    {posts.map((post) => (
                        <Card key={post._id} type='actual' post={post}/>
                    ))}
                </Scrollable>
                
            </section>
        </CSSTransition>
    </>
  )
}
