import axios from 'axios';
import React, { useRef, useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { Post } from '../types';

export default function NewPost() {

  const { user } = useContext(AuthContext);

  const title = useRef<HTMLInputElement>(null);
  const link = useRef<HTMLInputElement>(null);
  const [price, setPrice] = useState('1');
  const [img, setImg] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost: Post = {
      userId: user._id,
      title: title.current!.value,
      link: link.current!.value,
      price: price,
    }
    if (img) {
      const data = new FormData();
      const fileName = Date.now() + img.name;
      data.append("name", fileName);
      data.append("file", img);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.post("/api/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  const handleChangePrice = (e: React.FormEvent<HTMLInputElement>) => {
    setPrice(e.currentTarget.value)
  }
  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files != null) setImg(e.currentTarget.files[0]);
  }

  return (
    <>
        <form onSubmit={handleSubmit} className="new-post__form">
          <input className='new-post__form__input' required ref={title} type="text" placeholder='Название заведения'/>
          <input className='new-post__form__input' required ref={link} type="text" placeholder='Ссылка на заведение'/>
          <input required type="file" accept=".png,.jpeg,.jpg" onChange={handleChangeImg}/>
          <fieldset>
            <div className="new-post__price">
              <input required className='new-post__price__input' id="low-price" name="price" type="radio" value='1' checked={price === '1'} onChange={handleChangePrice}/>
              <label htmlFor="low-price">
                <img src={require('../assets/images/price.png')} alt="" />
              </label>
              <input required className='new-post__price__input' id="middle-price" name="price" type="radio" value='2' checked={price === '2'} onChange={handleChangePrice}/>
              <label htmlFor="middle-price">
                <img src={require('../assets/images/price.png')} alt="" />
              </label>
              <input required className='new-post__price__input' id="high-price" name="price" type="radio" value='3' checked={price === '3'} onChange={handleChangePrice}/>
              <label htmlFor="high-price">
                <img src={require('../assets/images/price.png')} alt="" />
              </label>
            </div>
          </fieldset>
          <button type="submit" className="primary-button new-post__button"> + </button>
        </form>
    </>
  )
}
