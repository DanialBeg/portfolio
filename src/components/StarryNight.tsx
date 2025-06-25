import { useEffect } from 'react'

const StarryNight = () => {
  useEffect(() => {
    const createStarryNight = () => {
      const starryBg = document.getElementById('starry-bg')
      if (!starryBg) return

      starryBg.innerHTML = ''
      
      // Create static stars
      const starCount = 150
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div')
        star.className = 'star'
        
        const x = Math.random() * 100
        const y = Math.random() * 100
        const size = Math.random() * 3 + 1 // 1-4px
        
        star.style.left = x + '%'
        star.style.top = y + '%'
        star.style.width = size + 'px'
        star.style.height = size + 'px'
        star.style.animationDelay = Math.random() * 3 + 's'
        
        starryBg.appendChild(star)
      }
      
      // Create shooting stars function (Rolls Royce style)
      const createShootingStar = () => {
        const shootingStar = document.createElement('div')
        shootingStar.className = 'shooting-star'
        
        // Create more elegant trajectories like Rolls Royce
        const startSide = Math.floor(Math.random() * 4) // 0: top, 1: right, 2: bottom, 3: left
        let startX: number, startY: number, endX: number, endY: number
        
        switch(startSide) {
          case 0: // Start from top
            startX = Math.random() * 100
            startY = -10
            endX = Math.random() * 100
            endY = 110
            break
          case 1: // Start from right
            startX = 110
            startY = Math.random() * 100
            endX = -10
            endY = Math.random() * 100
            break
          case 2: // Start from bottom
            startX = Math.random() * 100
            startY = 110
            endX = Math.random() * 100
            endY = -10
            break
          case 3: // Start from left
            startX = -10
            startY = Math.random() * 100
            endX = 110
            endY = Math.random() * 100
            break
          default:
            // Default case to ensure variables are always assigned
            startX = Math.random() * 100
            startY = -10
            endX = Math.random() * 100
            endY = 110
            break
        }
        
        shootingStar.style.left = startX + '%'
        shootingStar.style.top = startY + '%'
        
        // Set CSS custom properties for smooth animation
        shootingStar.style.setProperty('--start-x', startX + '%')
        shootingStar.style.setProperty('--start-y', startY + '%')
        shootingStar.style.setProperty('--end-x', endX + '%')
        shootingStar.style.setProperty('--end-y', endY + '%')
        
        // Calculate angle for proper trail alignment
        const deltaX = endX - startX
        const deltaY = endY - startY
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)
        shootingStar.style.setProperty('--angle', angle + 'deg')
        
        starryBg.appendChild(shootingStar)
        
        // Remove shooting star after animation
        setTimeout(() => {
          if (starryBg.contains(shootingStar)) {
            starryBg.removeChild(shootingStar)
          }
        }, 4000)
      }
      
      // Create shooting stars at random intervals
      const scheduleNextShootingStar = () => {
        const delay = Math.random() * 5000 + 5000 // 5-10 seconds
        setTimeout(() => {
          createShootingStar()
          scheduleNextShootingStar() // Schedule the next one
        }, delay)
      }
      
      // Start the shooting star cycle
      scheduleNextShootingStar()
      
      // No interval to store since we're using setTimeout chain
    }
    
    createStarryNight()
    
    const handleResize = () => {
      setTimeout(createStarryNight, 100)
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <div className="starry-night" id="starry-bg"></div>
}

export default StarryNight