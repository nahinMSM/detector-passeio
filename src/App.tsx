import { useState } from 'react'
import UploadSection from './components/UploadSection'
import ProcessingScreen from './components/ProcessingScreen'
import ResultReport from './components/ResultReport'
import { analyzeVideo } from './services/poseAnalyzer'
import type { AnalysisResult } from './services/poseAnalyzer'

function App() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const handleUpload = async (file: File) => {
    setFile(file)
    setLoading(true)

    try {
      const analysis = await analyzeVideo(file)
      setResult(analysis)
    } catch (erro) {
      console.error("Falha na análise:", erro)
      setResult({
        finalScore: 10,
        visibilidade: 10,
        movimento: 10,
        estabilidade: 10,
        erro: "Ocorreu um erro ao analisar o vídeo. Tente novamente."
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">

      <a
        href="https://curiosidadecanina.com.br"
        className="mb-4 text-sm text-gray-600 hover:text-green-600 transition-all underline underline-offset-4"
      >
        ⬅️ Voltar para Curiosidade Canina
      </a>

      <h1 className="text-4xl font-bold mb-6 text-center">
        Detector de Passeio Desorganizado
      </h1>

      {!file && <UploadSection onUpload={handleUpload} />}
      {loading && <ProcessingScreen />}

      {result && !loading && (
        <ResultReport result={result} />
      )}

    </div>
  )
}

export default App