import { useEffect, useState } from "react"
import ScoreHeader from "./ScoreHeader"
import IndicatorBar from "./IndicatorBar"
import TechnicalAdvice from "./TechnicalAdvice"
import CTASection from "./CTASection"
import type { AnalysisResult } from "../services/poseAnalyzer"

interface Props {
  result: AnalysisResult
}

export default function ResultReport({ result }: Props) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100)
  }, [])

  const { finalScore, visibilidade, movimento, estabilidade } = result

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
      name: "Visibilidade Tutor–Cão",
      value: visibilidade,
      icon: "👀",
      tip: "Mede se tutor e cão aparecem juntos e bem enquadrados no vídeo."
    },
    {
      name: "Movimento do Passeio",
      value: movimento,
      icon: "🚶‍♂️",
      tip: "Analisa se o passeio tem ritmo contínuo e estável."
    },
    {
      name: "Estabilidade da Pose",
      value: estabilidade,
      icon: "🧍",
      tip: "Verifica se o tutor foi detectado de forma consistente durante o vídeo."
    }
  ]

  const worstIndicator = indicators.reduce((prev, current) =>
    current.value < prev.value ? current : prev
  )

  if (result.erro) {
    return (
      <div
        className={`mt-5 max-w-2xl mx-auto p-10 rounded-3xl shadow-2xl transition-all duration-700 bg-red-50
        ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <div className="text-center space-y-4">
          <p className="text-4xl">⚠️</p>
          <h2 className="text-xl font-semibold text-red-600">
            Não foi possível analisar este vídeo
          </h2>
          <p className="text-gray-700 max-w-md mx-auto">
            {result.erro}
          </p>
        </div>

        <div className="text-center pt-8">
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

  return (
    <div
      className={`mt-5 max-w-2xl mx-auto p-10 rounded-3xl shadow-2xl space-y-10 transition-all duration-700
      ${classification.bg}
      ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="text-center">
        <p className="text-xs text-gray-500 italic">
          ℹ️ Análise aproximada por inteligência artificial. O resultado é uma estimativa baseada em vídeo e pode variar conforme enquadramento, iluminação e qualidade da gravação.
        </p>
      </div>

      <ScoreHeader finalScore={finalScore} classification={classification} />

      <IndicatorBar indicators={indicators} animate={animate} />

      <TechnicalAdvice finalScore={finalScore} worstIndicatorName={worstIndicator.name} worstIndicatorValue={worstIndicator.value} />

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