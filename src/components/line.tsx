'use client'

import { MouseEvent, useCallback, useEffect, useRef } from 'react'

const Line = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const pathXRef = useRef(0.5)
  const progressRef = useRef(0)

  let frame: number
  let duration = Math.PI / 2

  const interpolate = (start: number, end: number, factor: number) => {
    return start * (1 - factor) + end * factor
  }

  const updatePath = useCallback((progress: number) => {
    const width = svgRef.current?.getBoundingClientRect().width || 0

    pathRef.current?.setAttribute(
      'd',
      `M0 104 Q${width * pathXRef.current} ${104 + progress}, ${width} 104`
    )
  }, [])

  const resetAnimation = () => {
    progressRef.current = 0
    duration = Math.PI / 2
  }

  const animatePath = () => {
    const updatedProgress = progressRef.current * Math.sin(duration)

    progressRef.current = interpolate(progressRef.current, 0, 0.005)
    duration += 0.05
    updatePath(updatedProgress)

    if (Math.abs(progressRef.current) > 1) {
      frame = requestAnimationFrame(animatePath)
    }
  }

  const handleMouseEnter = () => {
    if (frame) {
      cancelAnimationFrame(frame)
      resetAnimation()
    }
  }

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const { clientX, movementY } = event
    const pathBounds = pathRef.current?.getBoundingClientRect()

    if (pathBounds) {
      progressRef.current += movementY * 0.8
      pathXRef.current = (clientX - pathBounds.left) / pathBounds.width
      updatePath(progressRef.current)
    }
  }

  const handleMouseLeave = () => {
    animatePath()
  }

  useEffect(() => {
    updatePath(progressRef.current)
  }, [updatePath])

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}>
      <svg ref={svgRef} className='h-52 w-full'>
        <path
          ref={pathRef}
          className='fill-none stroke-current stroke-[2px]'></path>
      </svg>
    </div>
  )
}

export default Line
