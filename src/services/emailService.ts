import emailjs from '@emailjs/browser'

export async function sendEmail(phone: string, result: any) {

  await emailjs.send(
    "service_h77sjmk",
    "template_26l3tqg",
    {
      phone,
      score: result.finalScore,
      lideranca: result.lideranca,
      tracao: result.tracao,
      ritmo: result.ritmo,
      postura: result.postura,
      date: new Date().toLocaleString()
    },
    "9_CJMqN9MxgL3gctU"
  )
}