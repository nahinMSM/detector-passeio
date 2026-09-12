interface Props {
  finalScore: number
  worstIndicatorName: string
  worstIndicatorValue: number
}

function getTechnicalAdvice(indicator: string, value: number) {

  if (indicator === "Visibilidade Tutor–Cão") {
    if (value < 50) {
      return `\nA condução está dispersa: tutor e cão caminham como dois passeios separados.\n\nO cão decide o ritmo, a direção e as paradas — e o tutor apenas acompanha.\n\nO que ajustar no passeio:\n✅ Comece reduzindo a distância: mantenha o cão ao seu lado\n✅ Pare sempre que a guia esticar e só retome quando ele relaxar\n✅ Use mudanças de direção para reconectar a atenção dele\n\nQuando o tutor volta a conduzir de perto, o passeio inteiro se reorganiza.`
    }
    if (value < 75) {
      return `\nO passeio tem momentos em que tutor e cão se desconectam — o cão se adianta,\nfica para trás ou muda de direção sem que o tutor conduza.\n\nO que ajustar no passeio:\n✅ Reforce a proximidade nos trechos em que ele se afasta\n✅ Evite deixar a guia esticar antes de agir\n✅ Marque o ritmo com o corpo, não com a voz\n\nPequenos ajustes de conexão mudam a dinâmica do passeio inteiro.`
    }
    return `\nA conexão tutor–cão está boa, mas ainda há trechos em que o cão assume a frente.\n\nO que refinar no passeio:\n✅ Reforce a condução nas mudanças de direção\n✅ Mantenha a guia levemente frouxa como padrão\n✅ Varie o percurso para consolidar a resposta do cão\n\nConsistência é o que transforma um passeio bom em um passeio estruturado.`
  }

  if (indicator === "Movimento do Passeio") {
    if (value < 50) {
      return `\nO ritmo do passeio está irregular: paradas frequentes, acelerações bruscas\ne mudanças de direção sem intenção clara.\n\nIsso gera instabilidade emocional no cão — ele fica alerta, ansioso e reage a tudo.\n\nO que ajustar no passeio:\n✅ Defina um passo constante antes de sair\n✅ Não pare por reação ao cão; pare por decisão sua\n✅ Faça mudanças de direção com calma e antecedência\n\nRitmo previsível é o que acalma o cão e fortalece a condução.`
    }
    if (value < 75) {
      return `\nO passeio tem ritmo razoável, mas oscila em alguns trechos —\nprincipalmente quando o cão tenta acelerar ou puxar.\n\nO que ajustar no passeio:\n✅ Mantenha o mesmo passo mesmo quando ele apressa\n✅ Faça pausas curtas e intencionais, não reativas\n✅ Evite frear de repente; reduza a velocidade com o corpo\n\nEstabilidade de ritmo é o que sustenta a calma do cão durante todo o trajeto.`
    }
    return `\nO ritmo do passeio está consistente. Ainda há espaço para refinar\na fluidez das mudanças de direção.\n\nO que refinar no passeio:\n✅ Antecipe as curvas com o corpo, não com a guia\n✅ Mantenha o passo mesmo em terrenos irregulares\n✅ Reforce o ritmo em ambientes com distração\n\nFluidez no ritmo é o que diferencia um passeio bom de um passeio profissional.`
  }

  if (indicator === "Estabilidade da Pose") {
    if (value < 50) {
      return `\nA postura do tutor durante o passeio demonstra tensão e insegurança.\n\nO cão lê isso como ausência de liderança — e assume a condução.\n\nO que ajustar no passeio:\n✅ Caminhe com coluna ereta e ombros relaxados\n✅ Evite puxar a guia com o corpo; use timing, não força\n✅ Respire fundo antes de corrigir qualquer comportamento\n\nPostura firme e tranquila é linguagem que o cão entende — e respeita.`
    }
    if (value < 75) {
      return `\nSua postura é estável na maior parte do passeio, mas oscila\nquando o cão tenta acelerar ou mudar de direção.\n\nO que ajustar no passeio:\n✅ Mantenha o tronco ereto mesmo sob tensão\n✅ Não incline o corpo para frente para "acompanhar" o cão\n✅ Use a respiração para manter o ritmo interno\n\nPostura constante é o que impede que o cão volte a assumir a condução.`
    }
    return `\nSua postura está firme e consistente durante todo o passeio.\nAinda dá para refinar a suavidade dos movimentos.\n\nO que refinar no passeio:\n✅ Mantenha o relaxamento mesmo em situações de estímulo\n✅ Evite movimentos bruscos com a guia\n✅ Reforce a postura em ambientes novos\n\nSuavidade com firmeza é o padrão dos passeios de alto nível.`
  }

  return `\nAjustes simples na condução podem reorganizar completamente o passeio.\n`
}

export default function TechnicalAdvice({ finalScore, worstIndicatorName, worstIndicatorValue }: Props) {
  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-inner">
      {finalScore >= 90 ? (
        <>
          <h3 className="text-lg font-semibold mb-4">🏆 Passeio de Alto Nível</h3>

          <p className="text-gray-700 leading-relaxed">
            Seu passeio demonstra boa condução, ritmo consistente e postura firme
            durante todo o trajeto.<br />
            Tutor e cão caminham juntos, com comunicação clara e sem tensão.<br />
            Esse é o padrão ideal — continue mantendo essa consistência para preservar
            estabilidade comportamental dentro e fora de casa.
          </p>
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold mb-4">🔧 Ponto de Atenção Prioritário</h3>

          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {getTechnicalAdvice(worstIndicatorName, worstIndicatorValue)}
          </p>
        </>
      )}
    </div>
  )
}