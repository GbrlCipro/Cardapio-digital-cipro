const DIAS = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado']

/**
 * Retorna { hora, minuto, diaSemana } no timezone da loja,
 * independentemente do fuso horário do dispositivo do cliente.
 */
function agoraNaLoja(timezone) {
  const partes = new Intl.DateTimeFormat('pt-BR', {
    timeZone: timezone,
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date())

  const mapa = Object.fromEntries(partes.map((p) => [p.type, p.value]))

  const diaSemanaMap = {
    domingo: 'domingo',
    'segunda-feira': 'segunda',
    'terça-feira': 'terca',
    'quarta-feira': 'quarta',
    'quinta-feira': 'quinta',
    'sexta-feira': 'sexta',
    sábado: 'sabado',
  }

  return {
    hora: Number(mapa.hour),
    minuto: Number(mapa.minute),
    diaSemana: diaSemanaMap[mapa.weekday] ?? DIAS[new Date().getDay()],
  }
}

function paraMinutos(horaStr) {
  const [h, m] = horaStr.split(':').map(Number)
  return h * 60 + m
}

/**
 * Verifica se a loja está aberta agora, considerando horários que
 * cruzam a meia-noite (ex: 18:00–00:30).
 */
export function lojaEstaAberta(horarios, timezone) {
  const { hora, minuto, diaSemana } = agoraNaLoja(timezone)
  const agoraMin = hora * 60 + minuto

  const diaIndex = DIAS.indexOf(diaSemana)
  const diaAnteriorNome = DIAS[(diaIndex + 6) % 7]

  const testarIntervalo = (config, minutosBase) => {
    if (!config) return false
    const abre = paraMinutos(config.abre)
    let fecha = paraMinutos(config.fecha)
    if (fecha <= abre) fecha += 24 * 60 // cruza a meia-noite
    return minutosBase >= abre && minutosBase < fecha
  }

  // Turno de hoje
  if (testarIntervalo(horarios[diaSemana], agoraMin)) return true

  // Turno que começou ontem e ainda não fechou (cruzou a meia-noite)
  const configOntem = horarios[diaAnteriorNome]
  if (configOntem) {
    const abre = paraMinutos(configOntem.abre)
    const fecha = paraMinutos(configOntem.fecha)
    if (fecha <= abre && agoraMin < fecha) return true
  }

  return false
}

/** Retorna o horário de hoje formatado, ex: "18:00 - 23:00", ou null se fechado o dia todo. */
export function horarioDeHoje(horarios, timezone) {
  const { diaSemana } = agoraNaLoja(timezone)
  const config = horarios[diaSemana]
  if (!config) return null
  return `${config.abre} - ${config.fecha}`
}
