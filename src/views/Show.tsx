import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getShow } from '../services/show'
import { Background } from '../components/Background'
import { Cover } from '../components/Cover'
import { Metadata } from '../components/Metadata'
import { ShowModel } from '../models/interfaces/ShowModel'
import './Show.css'

const Show = (): JSX.Element|null => {
  const { id } = useParams()
  const [show, setShow] = useState<ShowModel|null>(null)
  useEffect(() => {
    getShow(id).then(show => setShow(show))
  }, [])

  if (!show) {
    return null
  }

  return (
    <>
      <Background image={show.backgroundImage} />
      <div className="show-view">
        <Cover image={show.posterImage} />
        <Metadata data={show} />
      </div>
    </>
  )
}

export default Show
