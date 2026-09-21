import { hojeISO } from './format.js';

const CHAVE = 'dhyogo-prestacao-v1';
const CHAVE_SEQUENCIA = 'dhyogo-prestacao-seq';

export function novoId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function lerSequencia() {
  return Number(localStorage.getItem(CHAVE_SEQUENCIA)) || 1;
}

function numeroDocumento(seq) {
  return `${new Date().getFullYear()}-${String(seq).padStart(3, '0')}`;
}

export function novoEvento() {
  return { id: novoId(), data: '', evento: '', local: '', valor: 0, pago: false };
}

export function novoAdicional() {
  return { id: novoId(), descricao: '', valor: 0 };
}

export function estadoInicial(seq = lerSequencia()) {
  return {
    documento: { numero: numeroDocumento(seq), emissao: hojeISO(), vencimento: '' },
    cliente: { nome: '', documento: '', cidade: '' },
    eventos: [novoEvento()],
    adicionais: [],
    desconto: 0,
    sinal: 0,
    observacoes: '',
  };
}

export function carregar() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE));
    if (!salvo) return estadoInicial();
    const base = estadoInicial();
    return {
      ...base,
      ...salvo,
      documento: { ...base.documento, ...salvo.documento },
      cliente: { ...base.cliente, ...salvo.cliente },
      eventos: Array.isArray(salvo.eventos) ? salvo.eventos : base.eventos,
      adicionais: Array.isArray(salvo.adicionais) ? salvo.adicionais : [],
    };
  } catch {
    return estadoInicial();
  }
}

export function salvar(estado) {
  localStorage.setItem(CHAVE, JSON.stringify(estado));
}

export function iniciarNovoExtrato() {
  const seq = lerSequencia() + 1;
  localStorage.setItem(CHAVE_SEQUENCIA, String(seq));
  return estadoInicial(seq);
}
