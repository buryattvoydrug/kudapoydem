import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { PostProps } from '../types';

interface LikeProps {
    likes: string[], 
    postId: string
}

export default function LikeButton({likes, postId}: LikeProps) {
    
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likes.length);
    const { user: currentUser } = useContext(AuthContext);
    
    useEffect(() => {
        setIsLiked(likes.includes(currentUser._id));
    },[currentUser._id, likes])

    const handleLike = () => {
        try {
          axios.put('/api/posts/' + postId + '/like', { userId: currentUser._id});
        } catch (err) {
          console.log(err)
        }
        setLikeCount(isLiked? likeCount - 1 : likeCount + 1);
        setIsLiked(!isLiked);
    }
    
  return (
    <>
        <div className="card__likes-info">
            <button onClick={handleLike} className="card__like">
                <img src={require(isLiked? '../assets/images/liked.png' : '../assets/images/heart.png')} alt="like" />
                <span className="card__counter-likes">{likeCount}</span>
            </button>
        </div>
    </>
  )
}
