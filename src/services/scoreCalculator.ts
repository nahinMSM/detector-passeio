export interface Metrics {
  liderancaPercent: number
  microTracoes: number
  ritmoVariacao: number
  inclinacao: number
}

export function calculateScore(metrics: Metrics) {

  const lideranca = 100 - metrics.liderancaPercent * 0.5
  const tracao = Math.max(60, 100 - metrics.microTracoes * 3)
  const ritmo = 100 - metrics.ritmoVariacao * 20
  const postura = 100 - metrics.inclinacao * 2

  const finalScore =
    lideranca * 0.3 +
    tracao * 0.25 +
    ritmo * 0.25 +
    postura * 0.2

  return {
    lideranca: Math.round(lideranca),
    tracao: Math.round(tracao),
    ritmo: Math.round(ritmo),
    postura: Math.round(postura),
    finalScore: Math.round(finalScore)
  }
}