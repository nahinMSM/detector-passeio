interface Classification {
    label: string
    color: string
    bg: string
}

interface Props {
    finalScore: number
    classification: Classification
}

export default function ScoreHeader({ finalScore, classification }: Props) {
    return (
        <div className="text-center space-y-4">
            <h2 className="text-6xl font-bold tracking-tight">
                {finalScore}
                <span className="text-2xl text-gray-500">/100</span>
            </h2>

            <p className={`text-xl font-semibold ${classification.color}`}>
                {classification.label}
            </p>

            <p className="text-gray-600 max-w-md mx-auto">
                Um passeio estruturado de 30–40 minutos pode reduzir até 70% dos problemas dentro de casa.
            </p>
        </div>
    )
}
