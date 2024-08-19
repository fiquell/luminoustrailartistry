// TODO: Rewrite all code.

'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

const Home = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [isMouseMoved, setIsMouseMoved] = useState(false)
  const [pointer, setPointer] = useState({
    x: 0.5 * windowSize.width,
    y: 0.5 * windowSize.height,
  })

  const config = useMemo(
    () => ({
      point: 60,
      widthFactor: 0.3,
      springFactor: 0.4,
      frictionFactor: 0.5,
    }),
    []
  )

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trailRef = useRef(
    Array.from({ length: config.point }, () => ({
      x: pointer.x,
      y: pointer.y,
      dx: 0,
      dy: 0,
    }))
  )

  const updatePointer = (x: number, y: number) => {
    setPointer({ x, y })
  }

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    const handleResizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleResizeWindow = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    const handleMouseMove = (e: MouseEvent) => {
      setIsMouseMoved(true)
      updatePointer(e.pageX, e.pageY)
      setTimeout(() => setIsMouseMoved(false), 1000)
    }

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.targetTouches[0]

      setIsMouseMoved(true)
      updatePointer(touch.pageX, touch.pageY)
      setTimeout(() => setIsMouseMoved(false), 1000)
    }

    handleResizeCanvas()

    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', handleResizeCanvas)
    window.addEventListener('resize', handleResizeWindow)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)

    return () => {
      window.removeEventListener('resize', handleResizeCanvas)
      window.removeEventListener('resize', handleResizeWindow)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')

    if (!ctx) {
      return
    }

    const animate = (t: number) => {
      if (!isMouseMoved) {
        setPointer({
          x:
            (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) *
            window.innerWidth,
          y:
            (0.5 + 0.2 * Math.cos(0.005 * t) + 0.4 * Math.cos(0.001 * t)) *
            window.innerHeight,
        })
      }

      trailRef.current.forEach((p, i) => {
        const target = i === 0 ? pointer : trailRef.current[i - 1]
        const factor = i === 0 ? 0.4 * config.springFactor : config.springFactor

        p.dx += (target.x - p.x) * factor
        p.dy += (target.y - p.y) * factor
        p.dx *= config.frictionFactor
        p.dy *= config.frictionFactor
        p.x += p.dx
        p.y += p.dy
      })

      ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height)
      ctx.lineCap = 'round'
      ctx.strokeStyle = '#c5705d'
      ctx.beginPath()
      ctx.moveTo(trailRef.current[0].x, trailRef.current[0].y)

      for (let i = 1; i < trailRef.current.length - 1; i++) {
        const xc = 0.5 * (trailRef.current[i].x + trailRef.current[i + 1].x)
        const yc = 0.5 * (trailRef.current[i].y + trailRef.current[i + 1].y)

        ctx.quadraticCurveTo(
          trailRef.current[i].x,
          trailRef.current[i].y,
          xc,
          yc
        )
        ctx.lineWidth = config.widthFactor * (config.point - i)
        ctx.stroke()
      }

      ctx.lineTo(
        trailRef.current[trailRef.current.length - 1].x,
        trailRef.current[trailRef.current.length - 1].y
      )
      ctx.stroke()

      window.requestAnimationFrame(animate)
    }

    window.requestAnimationFrame(animate)
  }, [config, isMouseMoved, pointer])

  return <canvas ref={canvasRef} />
}

export default Home
