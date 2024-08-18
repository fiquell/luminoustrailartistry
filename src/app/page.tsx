// TODO: Rewrite all code.
'use client'

import { useEffect, useRef, useState } from 'react'

interface Trail {
  x: number
  y: number
  dx: number
  dy: number
}

interface Pointer {
  x: number
  y: number
}

const config = {
  point: 30,
  widthFactor: 0.3,
  springFactor: 0.4,
  frictionFactor: 0.5,
}

const Home = () => {
  const [isMouseMoved, setIsMouseMoved] = useState<boolean>(false)
  const [isPointer, setIsPointer] = useState<Pointer>({
    x: 0.5 * window.innerWidth,
    y: 0.5 * window.innerHeight,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trailRef = useRef<Trail[]>(
    Array.from({ length: config.point }, () => ({
      x: isPointer.x,
      y: isPointer.y,
      dx: 0,
      dy: 0,
    }))
  )

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    const ctx = canvas.getContext('2d')

    if (!ctx) {
      return
    }

    const initializeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleClick = (event: MouseEvent) => {
      setIsPointer({ x: event.pageX, y: event.pageY })
    }

    const handleMouseMove = (event: MouseEvent) => {
      setIsMouseMoved(true)
      setIsPointer({ x: event.pageX, y: event.pageY })

      setTimeout(() => {
        setIsMouseMoved(false)
      }, 1000)
    }

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.targetTouches[0]

      setIsMouseMoved(true)
      setIsPointer({ x: touch.pageX, y: touch.pageY })

      setTimeout(() => {
        setIsMouseMoved(false)
      }, 1000)
    }

    const animate = (timestamp: number) => {
      if (!isMouseMoved) {
        setIsPointer(() => ({
          x:
            0.5 +
            0.3 *
              Math.cos(0.002 * timestamp) *
              Math.sin(0.005 * timestamp) *
              window.innerWidth,
          y:
            0.5 +
            0.2 * Math.cos(0.005 * timestamp) +
            0.1 * Math.cos(0.01 * timestamp) * window.innerHeight,
        }))
      }

      trailRef.current.map((previous, index) => {
        const target = index === 0 ? isPointer : trailRef.current[index - 1]
        const factor =
          index === 0 ? 0.4 * config.springFactor : config.springFactor

        previous.dx += target.x - previous.x * factor
        previous.dy += target.y - previous.y * factor
        previous.dx *= config.frictionFactor
        previous.dy *= config.frictionFactor
        previous.x + previous.dx
        previous.y + previous.dy

        return previous
      })

      // trailRef.current = trail

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.lineCap = 'round'
      ctx.strokeStyle = '#7469b6'

      ctx.beginPath()
      ctx.moveTo(trailRef.current[0].x, trailRef.current[0].y)

      for (let i = 0; i < trailRef.current.length - 1; i++) {
        const xc = 0.5 * trailRef.current[i].x + trailRef.current[i + 1].x
        const yc = 0.5 * trailRef.current[i].y + trailRef.current[i + 1].y

        ctx.quadraticCurveTo(
          trailRef.current[i].x,
          trailRef.current[i].y,
          xc,
          yc
        )
        ctx.lineWidth = config.widthFactor * config.point - i
        ctx.stroke()
      }

      ctx.lineTo(
        trailRef.current[trailRef.current.length - 1].x,
        trailRef.current[trailRef.current.length - 1].y
      )
      ctx.stroke()

      window.requestAnimationFrame(animate)
    }

    initializeCanvas()
    animate(0)

    window.addEventListener('resize', initializeCanvas)
    window.addEventListener('click', handleClick)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)

    return () => {
      window.removeEventListener('resize', initializeCanvas)
      window.removeEventListener('click', handleClick)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [isMouseMoved, isPointer])

  return <canvas ref={canvasRef} />
}

export default Home
