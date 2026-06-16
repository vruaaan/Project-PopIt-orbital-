let nextParticleId = 1

export function createChipParticle(x, y) {
  const angle = Math.random() * Math.PI * 1.8 - Math.PI * 1.4  
  const speed = 220 + Math.random() * 120
  return {
    id: nextParticleId++,
    x,
    y,
    vx: Math.cos(angle) * speed * 6.5,
    vy: Math.sin(angle) * speed * 0.5 - 600,
    rotation: Math.random() * 360,
    angularVelocity: (Math.random() - 0.5) * 720,
    life: 0,
    duration: 1.55 + Math.random() * 0.35,
  }
}

export function createChipParticles(x, y, count = 1) {
  return Array.from({ length: count }, () => createChipParticle(x, y))
}

export function updateParticles(particles, dt, floorY) {
  const gravity = 1200
  const drag = 0.95
  const floorDrag = 0.85;

  return particles
    .map((particle) => {
      const next = { ...particle }

      if (next.resting) {
        next.vx *= floorDrag
        next.angularVelocity *= floorDrag
        next.rotation += next.angularVelocity * dt
        next.x += next.vx * dt
        next.life += dt * 0.4
      }
      else {
        next.vx *= drag
        next.vy += gravity * dt
        next.x += next.vx * dt
        next.y += next.vy * dt
        next.rotation += next.angularVelocity * dt
        next.life += dt
      }
      if (floorY !== undefined && next.y >= floorY) {
          next.y = floorY
          next.vy = 0
          next.resting = true
      }

      return next
    })
    .filter((particle) => particle.life < particle.duration)
}
