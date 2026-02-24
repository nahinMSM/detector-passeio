import { calculateScore } from './scoreCalculator'

export async function analyzeVideo(file: File) {

  // Simulação baseada no tamanho do vídeo
  const sizeFactor = file.size % 100

  const metrics = {
    liderancaPercent: sizeFactor,
    microTracoes: sizeFactor / 10,
    ritmoVariacao: sizeFactor / 50,
    inclinacao: sizeFactor / 5
  }

  return calculateScore(metrics)
}