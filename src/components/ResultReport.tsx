import { useEffect, useState } from "react"
import ScoreHeader from "./ScoreHeader"
import IndicatorBar from "./IndicatorBar"
import TechnicalAdvice from "./TechnicalAdvice"
import CTASection from "./CTASection"

interface Props {
  result: any
}

export default function ResultReport({ result }: Props) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100)
  }, [])

  const { finalScore, lideranca, tracao, ritmo, postura } = result

  function getClassification(score: number) {
    if (score < 50)
      return {
        label: "🐾 Passeio Desorganizado",
        color: "text-red-500",
        bg: "bg-red-50"
      }
    if (score < 75)
      return {
        label: "🚶 Passeio Instável",
        color: "text-yellow-500",
        bg: "bg-yellow-50"
      }
    return {
      label: "🐕 Passeio Estruturado",
      color: "text-green-600",
      bg: "bg-green-50"
    }
  }

  const classification = getClassification(finalScore)

  const indicators = [
    {
      name: "Liderança",
      value: lideranca,
      icon: "🧭",
      tip: "Avalia quem dita o ritmo do passeio."
    },
    {
      name: "Tração da Guia",
      value: tracao,
      icon: "🐕",
      tip: "Mede a tensão constante na guia."
    },
    {
      name: "Ritmo do Passeio",
      value: ritmo,
      icon: "🚶‍♂️",
      tip: "Analisa variações bruscas de velocidade."
    },
    {
      name: "Postura do Tutor",
      value: postura,
      icon: "🧍",
      tip: "Observa tensão corporal e inclinação."
    }
  ]

  const worstIndicator = indicators.reduce((prev, current) =>
    current.value < prev.value ? current : prev
  )

  return (
    <div
      className={`mt-5 max-w-2xl mx-auto p-10 rounded-3xl shadow-2xl space-y-10 transition-all duration-700
      ${classification.bg}
      ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >

      <ScoreHeader finalScore={finalScore} classification={classification} />

      <IndicatorBar indicators={indicators} animate={animate} />

      <TechnicalAdvice finalScore={finalScore} worstIndicatorName={worstIndicator.name} />

      <CTASection finalScore={finalScore} />

      <div className="text-center pt-6">
        <button
          onClick={() => window.location.reload()}
          className="text-gray-600 hover:text-gray-900 transition-all text-sm underline underline-offset-4"
        >
          ⬅️ Analisar outro vídeo
        </button>
      </div>

    </div>
  )
}