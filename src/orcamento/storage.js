import { hojeISO } from '../prestacao/format.js';

const CHAVE = 'dhyogo-orcamento-v1';
const CHAVE_SEQUENCIA = 'dhyogo-orcamento-seq';

export function novoId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function lerSequencia() {
  return Number(localStorage.getItem(CHAVE_SEQUENCIA)) || 1;
}

function numeroProposta(seq) {
  return `${String(seq).padStart(4, '0')}/${new Date().getFullYear()}`;
}

export function novoItem() {
  return { id: novoId(), descricao: '', valor: 0 };
}

export function novoEscopo() {
  return { id: novoId(), texto: '' };
}

export function novoCondicao() {
  return { id: novoId(), texto: '' };
}

const ESCOPO_START = [
  'Apresentação profissional de DJ com duração de 4 horas',
  'Controladora Pioneer DJ DDJ-REV5',
  'Repertório personalizado conforme o perfil do cliente e dos convidados',
  'Reunião de alinhamento musical prévia ao evento',
  'Montagem, passagem de som e desmontagem do setup de DJ',
  'Suporte e condução musical durante todo o evento',
];

const CONDICOES_PADRAO = [
  'Esta proposta contempla exclusivamente o serviço de DJ e os itens descritos no escopo acima.',
  'A sonorização e a estrutura elétrica do espaço são de responsabilidade do contratante.',
  'Sonorização profissional e iluminação, caso necessárias, serão orçadas separadamente.',
  'A distância utilizada no cálculo é estimada e poderá ser ajustada conforme o trajeto efetivo até o local do evento.',
  'A reserva da data é confirmada mediante assinatura do contrato e pagamento do sinal de 50%.',
  'Esta proposta só tem validade mediante a minha assinatura.',
];

export function estadoInicial(seq = lerSequencia()) {
  return {
    documento: {
      numero: numeroProposta(seq),
      emissao: hojeISO(),
      validade: '15 dias',
    },
    evento: {
      local: '',
      data: '',
      origem: 'Imperatriz — MA',
      duracao: '4 horas',
    },
    escopo: ESCOPO_START.map((texto) => ({ id: novoId(), texto })),
    itens: [
      { id: novoId(), descricao: 'Serviço de DJ — Pacote Start (4 horas)', valor: 1200 },
      { id: novoId(), descricao: 'Deslocamento — ida e volta', valor: 0 },
    ],
    percentualSinal: 50,
    condicoes: CONDICOES_PADRAO.map((texto) => ({ id: novoId(), texto })),
  };
}

function normalizarCondicoes(condicoes, pct) {
  return condicoes.map((c) => {
    let texto = c?.texto || '';
    if (texto === 'Valores válidos pelo prazo indicado nesta proposta.') {
      texto = 'Esta proposta só tem validade mediante a minha assinatura.';
    }
    if (/pagamento do sinal de \d+%/i.test(texto)) {
      texto = texto.replace(/sinal de \d+%/i, `sinal de ${pct}%`);
    }
    return { ...c, texto };
  });
}

export function carregar() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE));
    if (!salvo) return estadoInicial();
    const base = estadoInicial();
    const percentualSinal = Math.min(100, Math.max(0, Number(salvo.percentualSinal) || 50));
    return {
      ...base,
      ...salvo,
      documento: { ...base.documento, ...salvo.documento },
      evento: { ...base.evento, ...salvo.evento },
      escopo: Array.isArray(salvo.escopo) ? salvo.escopo : base.escopo,
      itens: Array.isArray(salvo.itens) ? salvo.itens : base.itens,
      condicoes: Array.isArray(salvo.condicoes)
        ? normalizarCondicoes(salvo.condicoes, percentualSinal)
        : base.condicoes,
      percentualSinal,
    };
  } catch {
    return estadoInicial();
  }
}

export function salvar(estado) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(estado));
  } catch {
    // quota / modo privado — ignora para não quebrar a edição
  }
}

export function iniciarNovaProposta() {
  const seq = lerSequencia() + 1;
  localStorage.setItem(CHAVE_SEQUENCIA, String(seq));
  return estadoInicial(seq);
}
