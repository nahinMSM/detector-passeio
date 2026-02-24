# 🐾 Detector de Passeio Desorganizado

Plataforma web educativa que analisa vídeos de passeio entre tutor e cão e gera um diagnóstico técnico com score comportamental.

Projeto criado para validar uma solução prática de correção de passeio com potencial de conversão para aulas particulares.

---

## 🎯 Objetivo

Avaliar a qualidade do passeio do tutor com seu cão através de análise de vídeo no navegador, gerando:

- Score geral (0–100)
- Indicadores técnicos:
  - Liderança
  - Tração da guia
  - Ritmo do passeio
  - Postura do tutor
- Diagnóstico personalizado
- Sugestão de ajuste prioritário
- Conversão para aula particular via WhatsApp

---

## 🧠 Arquitetura

### Frontend
- React
- Vite
- TypeScript
- TailwindCSS
- MediaPipe
- TensorFlow.js
- Chart.js
- EmailJS

### Infraestrutura
- Hospedagem: Vercel ou Netlify
- Integração via link no WordPress
- Sem backend
- Sem banco de dados
- Sem mensalidade

---

## 🔄 Fluxo da Aplicação

1️⃣ Usuário entra na página  
2️⃣ Lê instruções de gravação  
3️⃣ Faz upload do vídeo  
4️⃣ Vídeo é processado no navegador  
5️⃣ Sistema solicita telefone para liberar relatório completo  
6️⃣ Usuário informa número  
7️⃣ EmailJS envia para: `nahin.adestrador.oficial@gmail.com`  
8️⃣ Relatório completo aparece  
9️⃣ Botão para agendar aula via WhatsApp  
🔟 Opção de analisar outro vídeo  

---

## 📊 Cálculo do Score

O score final é baseado em 4 pilares:

| Indicador | Peso |
|-----------|------|
| Liderança | 30% |
| Tração | 30% |
| Ritmo | 20% |
| Postura | 20% |

Classificação:

- 0–49 → 🐾 Passeio Desorganizado  
- 50–74 → 🚶 Passeio Instável  
- 75–100 → 🐕 Passeio Estruturado  

---