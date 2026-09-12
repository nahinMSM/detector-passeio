import ImgLogo from "../assets/logo-marca.png"
import { FaWhatsapp } from 'react-icons/fa'

interface Props {
  finalScore: number
}

export default function CTASection({ finalScore }: Props) {
  if (finalScore >= 75) return null

  return (
    <div className="mt-6 bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-gray-100">

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="space-y-3 text-center md:text-left max-w-lg">

          <h3 className="text-xl font-bold text-gray-800">
            {finalScore < 50
              ? "🔥 Seu passeio precisa de ajustes estruturais importantes."
              : "🐾 Seu passeio pode melhorar muito com ajustes simples."}
          </h3>

          <p className="text-gray-600">
            Agende uma aula particular e aprenda como corrigir liderança,
            tração e postura de forma rápida e prática.
          </p>

          <a
            href="https://wa.me/5579999232104?text=Olá!%20quero%20agendar%20uma%20aula."
            target="_blank"
            className="inline-flex items-center gap-3 text-green-600 font-semibold hover:text-green-700 transition-all group"
          >
            <div className="bg-green-500 text-[#F7F3EE] group-hover:bg-green-600 transition-all p-2 rounded-full shadow-md">
              <FaWhatsapp size={32} />
            </div>

            Falar no WhatsApp
          </a>
        </div>

        <div className="shrink-0">
          <img src={ImgLogo} alt="Detector de Passeio" className="w-28 mx-auto" />
        </div>

      </div>
    </div>
  )
}
