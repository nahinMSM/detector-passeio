interface Props {
  onSubmit: (phone: string) => void
}

export default function PhoneGate({ onSubmit }: Props) {

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const phone = e.target.phone.value
    onSubmit(phone)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 text-center">
      <p className="mb-4">
        Digite seu telefone para receber o relatório completo
      </p>

      <input
        name="phone"
        required
        className="border p-2 rounded-lg mr-2 text-center"
        placeholder="(00) 99999-9999"
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
        Ver Relatório
      </button>
    </form>
  )
}