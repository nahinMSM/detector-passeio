import ImgLogo from "../assets/logo-marca.png"

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
            <div className="bg-green-500 group-hover:bg-green-600 transition-all p-3 rounded-full shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.04 2C6.58 2 2.17 6.41 2.17 11.87c0 1.96.51 3.8 1.48 5.43L2 22l4.88-1.61c1.57.86 3.36 1.31 5.16 1.31 5.46 0 9.87-4.41 9.87-9.87C21.91 6.41 17.5 2 12.04 2zm0 17.99c-1.64 0-3.24-.44-4.64-1.26l-.33-.2-2.9.95.95-2.83-.21-.35a7.84 7.84 0 01-1.21-4.22c0-4.35 3.53-7.88 7.88-7.88 4.34 0 7.87 3.53 7.87 7.88 0 4.35-3.53 7.88-7.87 7.88z" />
              </svg>
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
