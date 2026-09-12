import { PoseLandmarker, FilesetResolver } from "@mediapipe/tasks-vision"
import type { PoseLandmarkerResult } from "@mediapipe/tasks-vision"
import * as tf from "@tensorflow/tfjs"
import "@tensorflow/tfjs-backend-webgl"
import "@tensorflow/tfjs-backend-cpu"
import * as cocoSsd from "@tensorflow-models/coco-ssd"
import { calculateScore } from "./scoreCalculator"

export interface AnalysisResult {
  finalScore: number
  visibilidade: number
  movimento: number
  estabilidade: number
  erro?: string
}

let poseLandmarker: PoseLandmarker | null = null
let cocoModel: cocoSsd.ObjectDetection | null = null

async function getPoseLandmarker(): Promise<PoseLandmarker> {
  if (poseLandmarker) return poseLandmarker

  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  )

  poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
      delegate: "GPU"
    },
    runningMode: "VIDEO",
    numPoses: 1,
    minPoseDetectionConfidence: 0.5,
    minPosePresenceConfidence: 0.5,
    minTrackingConfidence: 0.5
  })

  return poseLandmarker
}

async function getCocoModel(): Promise<cocoSsd.ObjectDetection> {
  if (cocoModel) return cocoModel
  await tf.ready()
  try {
    await tf.setBackend("webgl")
  } catch {
    await tf.setBackend("cpu")
  }
  cocoModel = await cocoSsd.load({ base: "lite_mobilenet_v2" })
  return cocoModel
}

async function extrairFrames(video: HTMLVideoElement, quantidade = 8): Promise<HTMLCanvasElement[]> {
  const frames: HTMLCanvasElement[] = []
  const duracao = video.duration || 1
  const intervalo = duracao / (quantidade + 1)

  for (let i = 1; i <= quantidade; i++) {
    video.currentTime = intervalo * i
    await new Promise<void>((resolve) => {
      video.onseeked = () => resolve()
    })
    const canvas = document.createElement("canvas")
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext("2d")!
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    frames.push(canvas)
  }
  return frames
}

function poseHumanaPlausivel(resultado: PoseLandmarkerResult): boolean {
  if (!resultado.landmarks || resultado.landmarks.length === 0) return false

  const lm = resultado.landmarks[0]
  if (!lm || lm.length < 25) return false

  const ombroEsq = lm[11]
  const quadrilEsq = lm[23]

  if (
    ombroEsq.visibility < 0.5 ||
    quadrilEsq.visibility < 0.5
  ) return false

  const dist = Math.hypot(ombroEsq.x - quadrilEsq.x, ombroEsq.y - quadrilEsq.y)
  if (dist < 0.03) return false

  if (ombroEsq.x < -0.2 || ombroEsq.x > 1.2) return false
  if (ombroEsq.y < -0.2 || ombroEsq.y > 1.2) return false

  return true
}

async function calcularMetricasEstaveis(
  frames: HTMLCanvasElement[],
  detector: cocoSsd.ObjectDetection,
  poseResults: PoseLandmarkerResult[]
) {
  let framesComAmbos = 0
  let framesComCao = 0
  let framesComPessoa = 0
  const posicoesQuadril: { x: number, y: number }[] = []

  for (let i = 0; i < frames.length; i++) {
    const objetos = await detector.detect(frames[i])
    const pessoa = objetos.find(o => o.class === "person" && o.score > 0.4)
    const cao = objetos.find(o => o.class === "dog" && o.score > 0.4)

    if (pessoa) framesComPessoa++
    if (cao) framesComCao++
    if (pessoa && cao) framesComAmbos++

    const lm = poseResults[i]?.landmarks?.[0]
    if (lm && lm.length >= 25 && lm[23]?.visibility > 0.5) {
      posicoesQuadril.push({ x: lm[23].x, y: lm[23].y })
    }

    await new Promise(r => setTimeout(r, 0))
  }

  let movimentoTutor = 0
  if (posicoesQuadril.length > 1) {
    const xs = posicoesQuadril.map(p => p.x)
    const ys = posicoesQuadril.map(p => p.y)
    movimentoTutor = Math.hypot(
      Math.max(...xs) - Math.min(...xs),
      Math.max(...ys) - Math.min(...ys)
    )
  }

  const proporcaoAmbos = framesComAmbos / frames.length
  const proporcaoPessoa = framesComPessoa / frames.length
  const proporcaoCao = framesComCao / frames.length
  const consistenciaQuadril = posicoesQuadril.length / frames.length

  console.log("[MÉTRICAS ESTÁVEIS]", {
    proporcaoAmbos,
    proporcaoPessoa,
    proporcaoCao,
    movimentoTutor,
    consistenciaQuadril
  })

  // === VISIBILIDADE (0-100, maior = melhor) ===
  // Mede se tutor e cão aparecem juntos e bem enquadrados.
  const sinal1 = proporcaoAmbos * 100
  const sinal2 = proporcaoPessoa * 100
  const sinal3 = consistenciaQuadril * 100
  const visibilidade = Math.round(sinal1 * 0.5 + sinal2 * 0.25 + sinal3 * 0.25)

  // === MOVIMENTO (0-100, maior = melhor) ===
  // Movimento moderado é ideal. Zero = parado. Excessivo = caótico.
  let movimento: number
  if (movimentoTutor < 0.03) movimento = 30
  else if (movimentoTutor < 0.08) movimento = 55
  else if (movimentoTutor <= 0.6) movimento = 90
  else if (movimentoTutor <= 0.9) movimento = 70
  else movimento = 50

  // === ESTABILIDADE (0-100, maior = melhor) ===
  // Consistência da detecção do quadril do tutor.
  let estabilidade: number
  if (consistenciaQuadril >= 0.75) estabilidade = 95
  else if (consistenciaQuadril >= 0.55) estabilidade = 80
  else if (consistenciaQuadril >= 0.35) estabilidade = 60
  else estabilidade = 40

  return { visibilidade, movimento, estabilidade }
}

export async function analyzeVideo(file: File): Promise<AnalysisResult> {
  console.log("=== INÍCIO DA ANÁLISE ===")
  console.log("Arquivo:", file.name, "Tamanho:", file.size, "Tipo:", file.type)

  const video = document.createElement("video")
  video.src = URL.createObjectURL(file)
  video.muted = true
  video.playsInline = true

  await new Promise<void>((resolve, reject) => {
    video.onloadedmetadata = () => resolve()
    video.onerror = () => reject(new Error("Não foi possível carregar o vídeo"))
  })

  console.log("Duração:", video.duration, "Resolução:", video.videoWidth, "x", video.videoHeight)

  if (video.duration < 5) {
    URL.revokeObjectURL(video.src)
    return resultadoInvalido("Vídeo muito curto. Grave pelo menos 10 segundos de passeio.")
  }

  const frames = await extrairFrames(video, 8)
  console.log("Frames extraídos:", frames.length)

  const detector = await getCocoModel()
  let framesComCao = 0
  let framesComPessoa = 0

  for (let i = 0; i < frames.length; i++) {
    const objetos = await detector.detect(frames[i])
    const nomes = objetos.map(o => `${o.class}:${o.score.toFixed(2)}`)
    console.log(`[COCO frame ${i}]`, nomes.join(", ") || "nada")
    if (objetos.some(o => o.class === "dog" && o.score > 0.3)) framesComCao++
    if (objetos.some(o => o.class === "person" && o.score > 0.3)) framesComPessoa++
    await new Promise(r => setTimeout(r, 0))
  }

  console.log(`[RESUMO COCO] Cão em ${framesComCao}/${frames.length} | Pessoa em ${framesComPessoa}/${frames.length}`)

  const landmarker = await getPoseLandmarker()
  const timestamp = performance.now()
  const resultados: PoseLandmarkerResult[] = []

  for (let i = 0; i < frames.length; i++) {
    const resultado = landmarker.detectForVideo(frames[i], timestamp + i * 100)
    resultados.push(resultado)
    const lm = resultado.landmarks?.[0]
    if (lm && lm.length >= 25) {
      console.log(`[POSE frame ${i}] visibilidades:`,
        "ombroE:", lm[11]?.visibility?.toFixed(2),
        "quadrilE:", lm[23]?.visibility?.toFixed(2)
      )
    } else {
      console.log(`[POSE frame ${i}] nenhuma pose detectada`)
    }
    await new Promise(r => setTimeout(r, 0))
  }

  const framesValidos = resultados.filter(r => poseHumanaPlausivel(r))
  const taxaDeteccao = framesValidos.length / frames.length
  console.log(`[VALIDAÇÃO] Poses humanas plausíveis: ${framesValidos.length}/${frames.length} (${(taxaDeteccao * 100).toFixed(0)}%)`)

  if (taxaDeteccao < 0.3) {
    URL.revokeObjectURL(video.src)
    return resultadoInvalido(
      "Não foi possível identificar um tutor conduzindo o passeio. Grave com o tutor e o cão visíveis no enquadramento, de preferência de perfil."
    )
  }

  const proporcaoPessoa = framesComPessoa / frames.length
  console.log(`[VALIDAÇÃO 2] Pessoa detectada em ${framesComPessoa}/${frames.length} frames (${(proporcaoPessoa * 100).toFixed(0)}%)`)

  if (proporcaoPessoa < 0.3) {
    URL.revokeObjectURL(video.src)
    return resultadoInvalido(
      "Não foi possível identificar um tutor conduzindo o passeio. Grave com o tutor e o cão visíveis no enquadramento, de preferência de perfil."
    )
  }

  const metricas = await calcularMetricasEstaveis(frames, detector, resultados)
  console.log("[MÉTRICAS FINAIS]", metricas)

  URL.revokeObjectURL(video.src)
  console.log("=== FIM DA ANÁLISE ===")

  return calculateScore(metricas)
}

function resultadoInvalido(mensagem: string): AnalysisResult {
  return {
    finalScore: 10,
    visibilidade: 10,
    movimento: 10,
    estabilidade: 10,
    erro: mensagem
  }
}