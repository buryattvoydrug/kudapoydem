import React, { useContext, useEffect, useState } from 'react'
import Card from '../Components/Card'
import Header from '../Components/Header'
import Hero from '../Components/Hero'
import '../scss/Components/Card.scss'
import '../scss/Components/Feed.scss'
import '../scss/Components/Actual.scss'
import Actual from '../Components/Actual'
import Feed from '../Components/Feed'

export default function Main() {

  

  return (
    <>
      <Header/>
      <Hero/>
      <Actual/>
      <Feed/>
    </>
  )
}
