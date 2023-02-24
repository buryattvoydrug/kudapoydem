import React, { useEffect, useRef, useState } from 'react'

interface ScrollableProps {
    _class: string
    children: React.ReactNode
    startPadding: number
}

export default function Scrollable(props: ScrollableProps) {
  const scrollContainer = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({
    isScrolling: false,
    clientX: 0,
    scrollX: 0,
  })

  const onMouseMove = (e: MouseEvent) => {
    if (!scrollContainer.current) {
        return 
    }
    e.preventDefault()
    const {clientX, scrollX, isScrolling} = position
    if (isScrolling) {
        const scroll = scrollX  + 1.5 * (clientX  - e.clientX)
        scrollContainer.current.scrollLeft = scroll
        setPosition({
            ...position,
            scrollX: scroll,
            clientX: e.clientX,
        })
    }
  }

  const onMouseUp = (e: MouseEvent) => {
    e.preventDefault()
    setPosition({
        ...position,
        isScrolling: false,
    })
  }

  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault()
    setPosition({
        ...position,
        isScrolling: true,
        clientX: e.clientX,
    })
  }

  useEffect(() => {
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mousemove', onMouseMove)

    return () => {
        document.removeEventListener('mousedown', onMouseDown)
        document.removeEventListener('mouseup', onMouseUp)
        document.removeEventListener('mousemove', onMouseMove)
    }
  })

  return (
    <div
    ref={scrollContainer} 
    className={props._class}
    style={{padding: '0 ' + props.startPadding + 'px'}}
    >
        {props.children}
    </div>
  )
}
