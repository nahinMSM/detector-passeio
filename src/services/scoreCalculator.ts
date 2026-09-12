export interface Metrics {
  visibilidade: number
  movimento: number
  estabilidade: number
}

export function calculateScore(metrics: Metrics) {
  const finalScore =
    metrics.visibilidade * 0.35 +
    metrics.movimento * 0.30 +
    metrics.estabilidade * 0.35

  return {
    visibilidade: Math.round(metrics.visibilidade),
    movimento: Math.round(metrics.movimento),
    estabilidade: Math.round(metrics.estabilidade),
    finalScore: Math.round(finalScore)
  }
}