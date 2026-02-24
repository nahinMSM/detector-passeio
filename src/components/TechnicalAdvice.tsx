interface Props {
  finalScore: number
  worstIndicatorName: string
}

function getTechnicalAdvice(indicator: string) {
  switch (indicator) {
    case "Liderança":
      return `\nSeu cão está assumindo decisões durante o passeio.\nIsso normalmente acontece quando o tutor permite que o ritmo,\na direção e as pausas sejam conduzidas pelo animal.\n\nComece reduzindo a antecipação:\npare antes de mudanças de direção e só avance quando a guia estiver solta.\nPequenos ajustes de postura e timing fazem grande diferença aqui.\n`

    case "Tração da Guia":
      return `\nExiste tensão constante na guia, o que indica desequilíbrio de comunicação.\n\nEvite continuar andando quando houver tração.\nInterrompa o movimento, reorganize sua postura e retome apenas\nquando a guia estiver relaxada.\n\nConsistência nesse ponto altera completamente a dinâmica do passeio.\n`

    case "Ritmo do Passeio":
      return `\nO passeio apresenta variações bruscas de velocidade,\no que gera instabilidade emocional no cão.\n\nMantenha um ritmo previsível e firme.\nMudanças de direção devem ser feitas com intenção clara,\nnão como reação ao comportamento do cão.\n`

    case "Postura do Tutor":
      return `\nSua postura corporal pode estar transmitindo tensão ou insegurança.\n\nEvite inclinar o tronco para frente e tensionar os ombros.\nCaminhe com coluna ereta e movimento fluido.\nO cão lê micro sinais corporais o tempo todo.\n`

    default:
      return `\nAjustes simples na condução podem reorganizar completamente o passeio.\n`
  }
}

export default function TechnicalAdvice({ finalScore, worstIndicatorName }: Props) {
  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-inner">
      {finalScore >= 90 ? (
        <>
          <h3 className="text-lg font-semibold mb-4">🏆 Passeio de Alto Nível</h3>

          <p className="text-gray-700 leading-relaxed">
            Seu passeio demonstra excelente controle emocional,
            liderança equilibrada e comunicação clara com o cão.<br />A guia está leve, o ritmo consistente e sua postura transmite segurança.
            Esse é o padrão ideal de condução.<br />Continue mantendo essa consistência para preservar
            estabilidade comportamental dentro e fora de casa.
          </p>
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold mb-4">🔧 Ajuste Técnico Prioritário</h3>

          <p className="text-gray-700 leading-relaxed">
            {getTechnicalAdvice(worstIndicatorName)}
          </p>
        </>
      )}
    </div>
  )
}
