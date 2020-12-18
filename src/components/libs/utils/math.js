export function getRandomNumber(limit) {
  return (Math.floor(Math.random() * limit));
}

export function getNextRoundRobin(total, current) {
  return (Math.floor((current + 1) % total));
}
