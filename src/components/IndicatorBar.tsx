interface Indicator {
  name: string
  value: number
  icon: string
  tip: string
}

interface Props {
  indicators: Indicator[]
  animate: boolean
}

export default function IndicatorBar({ indicators, animate }: Props) {
  return (
    <div className="space-y-6">
      {indicators.map((item) => (
        <div key={item.name} className="group relative">
          <div className="flex justify-between mb-2">
            <span className="font-medium flex items-center gap-2">
              {item.icon} {item.name}
            </span>
            <span className="font-semibold">{item.value}/100</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-1000 ${item.value < 50
                ? "bg-red-500"
                : item.value < 75
                  ? "bg-yellow-400"
                  : "bg-green-500"
                }`}
              style={{
                width: animate ? `${item.value}%` : "0%"
              }}
            />
          </div>

          <div className="absolute left-0 -top-8 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded-lg">
            {item.tip}
          </div>
        </div>
      ))}
    </div>
  )
}
