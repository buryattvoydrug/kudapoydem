import React from 'react'
import Card from '../Components/Card'
import FavsHero from '../Components/FavsHero'
import Header from '../Components/Header'
import Hero from '../Components/Hero'

export default function Favs() {
  return (
    <>
    <Header/>
    <FavsHero/>
    <section className="feed">
        <div className="list">
          {/* <Card type='feed'/>
          <Card type='feed'/>
          <Card type='feed'/>
          <Card type='feed'/>
          <Card type='feed'/>
          <Card type='feed'/>
          <Card type='feed'/> */}
        </div>
      </section>
    </>
  )
}
