# 🐾 Detector de Passeio Desorganizado

Plataforma web educativa que analisa vídeos de passeio entre tutor e cão e gera um diagnóstico técnico com score comportamental.

Projeto criado para validar uma solução prática de correção de passeio com potencial de conversão para aulas particulares.

---

## 🎯 Objetivo

Avaliar a qualidade do passeio do tutor com seu cão através de análise de vídeo no navegador, gerando:

- Score geral (0–100)
- Indicadores técnicos:
  - Visibilidade Tutor–Cão
  - Movimento do Passeio
  - Estabilidade da Pose
- Diagnóstico personalizado
- Sugestão de ajuste prioritário (com dicas específicas por indicador e nível de gravidade)
- Conversão para aula particular via WhatsApp

> ℹ️ A ferramenta **não mede tração de guia**. Essa métrica foi removida por não ser mensurável com modelos gratuitos rodando no navegador. Os indicadores atuais refletem apenas o que a análise consegue medir com estabilidade.

---

## 🧠 Arquitetura

### Frontend
- React
- Vite
- TypeScript
- TailwindCSS
- MediaPipe Tasks Vision (pose humana)
- TensorFlow.js + COCO-SSD (detecção de pessoa e cão)

### Infraestrutura
- Hospedagem: https://passeioscore.netlify.app/
- Integração via link no WordPress (sem iframe)
- Sem backend
- Sem banco de dados
- Sem mensalidade
- Coleta de uso via plugin ConacLog no WordPress (registro discreto de acessos)

---

## 🔄 Fluxo da Aplicação

1️⃣ Usuário chega pela página do Curiosidade Canina (link abre em nova aba)  
2️⃣ Lê instruções de gravação  
3️⃣ Faz upload do vídeo  
4️⃣ Vídeo é processado 100% no navegador (MediaPipe + COCO-SSD)  
5️⃣ Relatório completo aparece automaticamente  
6️⃣ Botão para agendar aula via WhatsApp  
7️⃣ Opção de analisar outro vídeo  
8️⃣ Botão para voltar ao site Curiosidade Canina  

Não há mais etapa de telefone nem envio por email.

---

## 📊 Cálculo do Score

O score final é baseado em 3 pilares:

| Indicador | Peso |
|-----------|------|
| Visibilidade Tutor–Cão | 35% |
| Movimento do Passeio | 30% |
| Estabilidade da Pose | 35% |

**O que cada indicador mede na prática:**

- **Visibilidade Tutor–Cão** → frequência com que tutor e cão aparecem juntos e bem enquadrados no vídeo.
- **Movimento do Passeio** → ritmo contínuo ao longo do vídeo (parado demais ou caótico demais reduz a nota).
- **Estabilidade da Pose** → consistência da detecção do tutor ao longo dos frames.

Classificação:

- 0–49 → 🐾 Passeio Desorganizado  
- 50–74 → 🚶 Passeio Instável  
- 75–100 → 🐕 Passeio Estruturado  

---

## ⚠️ Limitações conhecidas

- A ferramenta é uma **estimativa por IA**, não uma avaliação profissional.
- Modelos gratuitos (MediaPipe + COCO-SSD) não distinguem "cão puxando a guia" de "cão caminhando à frente" — por isso a métrica de tração foi removida.
- Vídeos gravados de frente, de costas ou com enquadramento cortado podem reduzir a precisão.
- Melhor resultado com: câmera parada, tutor e cão de perfil, ambos inteiros no quadro, boa iluminação, 20–40 segundos.

---