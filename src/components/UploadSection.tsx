import { useRef, useState } from "react"
import ImgOp1 from "../../src/assets/opc1.png"
import ImgOp2 from "../../src/assets/opc2.png"

export default function UploadSection({ onUpload }: any) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  function handleClick() {
    inputRef.current?.click()
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFileName(file.name)
      onUpload(file)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-10">

      {/* INSTRUÇÕES DE GRAVAÇÃO */}
      <div className="bg-white p-8 rounded-3xl shadow-xl space-y-6">

        <h2 className="text-2xl font-bold text-center">
          📹 Como Gravar o Vídeo Ideal
        </h2>

        <div className="grid md:grid-cols-2 gap-6 text-sm">

          <div className="space-y-3">
            <h3 className="font-semibold">1️⃣ Opção 1</h3>
            <strong>Cámera parada</strong>
            <img src={ImgOp1} alt="Exemplo de gravação" className="rounded-xl shadow-lg" />
            <p>✅ Grave de lado (perfil)</p>
            <p>✅ Mostre você e o cão inteiros</p>
            <p>✅ Caminhe por 20–40 segundos</p>
            <p>❌ Não grave muito de perto</p>
            <p>❌ Evite cortar cabeça ou pés</p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">2️⃣ Opção 2</h3>
            <strong>Pessoa filmando</strong>
            <img src={ImgOp2} alt="Exemplo de gravação" className="rounded-xl shadow-lg" />
            <p>✅ Peça para alguém filmar</p>
            <p>✅ Certifique-se de foco e estabilidade</p>
            <p>✅ Siga as mesmas instruções de perfil</p>
            <p>❌ Não filme só o cachorro</p>
            <p>❌ Evite cortar cabeça ou pés</p>
          </div>

        </div>

        <div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-700">
          💡 Dica: Grave em ambiente com espaço livre.
        </div>

      </div>

      {/* UPLOAD */}
      <div className="flex flex-col items-center gap-4">

        <input
          ref={inputRef}
          type="file"
          accept="video/*"
          onChange={handleChange}
          className="hidden"
        />

        <button
          onClick={handleClick}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-2xl font-semibold shadow-lg"
        >
          🎥 Selecionar Vídeo
        </button>

        {fileName && (
          <p className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-xl">
            Arquivo selecionado: <span className="font-medium">{fileName}</span>
          </p>
        )}

        <p className="text-xs text-gray-500 text-center max-w-xs">
          Após o envio, o vídeo será analisado automaticamente.
        </p>

      </div>
    </div>
  )
}