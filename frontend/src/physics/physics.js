let nextParticleId = 1

export function createChipParticle(x, y) {
  const angle = Math.random() * Math.PI * 1.6 - Math.PI * 0.8
  const speed = 220 + Math.random() * 120
  return {
    id: nextParticleId++,
    x,
    y,
    vx: Math.cos(angle) * speed * 1.5,
    vy: Math.sin(angle) * speed - 40,
    rotation: Math.random() * 360,
    angularVelocity: (Math.random() - 0.5) * 720,
    life: 0,
    duration: 0.55 + Math.random() * 0.35,
  }
}

export function createChipParticles(x, y, count = 1) {
  return Array.from({ length: count }, () => createChipParticle(x, y))
}

export function updateParticles(particles, dt) {
  const gravity = 1200
  const drag = 0.95

  return particles
    .map((particle) => {
      const next = { ...particle }
      next.vx *= drag
      next.vy += gravity * dt
      next.x += next.vx * dt
      next.y += next.vy * dt
      next.rotation += next.angularVelocity * dt
      next.life += dt
      return next
    })
    .filter((particle) => particle.life < particle.duration)
}
