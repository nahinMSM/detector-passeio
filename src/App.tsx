import { useState } from 'react'
import UploadSection from './components/UploadSection'
import ProcessingScreen from './components/ProcessingScreen'
import PhoneGate from './components/PhoneGate'
import ResultReport from './components/ResultReport'
import { analyzeVideo } from './services/poseAnalyzer'
// import { sendEmail } from './services/emailService'

function App() {

  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [phoneUnlocked, setPhoneUnlocked] = useState(false)

  const handleUpload = async (file: File) => {
    setFile(file)
    setLoading(true)

    const analysis = await analyzeVideo(file)

    setResult(analysis)
    setLoading(false)
  }

  const handlePhoneSubmit = async (phone: string) => {
    // await sendEmail(phone, result)
    console.log("Enviando resultado para:", phone, "com dados:", result)
    setPhoneUnlocked(true)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">

      <h1 className="text-4xl font-bold mb-6 text-center">
        Detector de Passeio Desorganizado
      </h1>

      {!file && <UploadSection onUpload={handleUpload} />}
      {loading && <ProcessingScreen />}

      {result && !phoneUnlocked && (
        <PhoneGate onSubmit={handlePhoneSubmit} />
      )}

      {result && phoneUnlocked && (
        <ResultReport result={result} />
      )}

    </div>
  )
}

export default App