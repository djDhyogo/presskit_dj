export function parseMoedaBR(valor) {
  if (typeof valor === 'number') return Number.isFinite(valor) ? valor : 0;
  const limpo = String(valor ?? '').trim().replace(/[^\d,.-]/g, '');
  if (!limpo) return 0;
  // Com vírgula, ela é o separador decimal (pt-BR) e os pontos são milhares.
  if (limpo.includes(',')) {
    return parseFloat(limpo.replace(/\./g, '').replace(',', '.')) || 0;
  }
  return parseFloat(limpo) || 0;
}

export function formatarMoedaBR(valor) {
  return (Number(valor) || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatarNumeroBR(valor) {
  return (Number(valor) || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function hojeISO() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

export function formatarData(iso) {
  if (!iso) return '';
  const [a, m, d] = iso.split('-');
  return a && m && d ? `${d}/${m}/${a}` : iso;
}

const UNIDADES = [
  '', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez',
  'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove',
];
const DEZENAS = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
const CENTENAS = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];
const ESCALAS = [
  [1e9, 'bilhão', 'bilhões'],
  [1e6, 'milhão', 'milhões'],
  [1e3, 'mil', 'mil'],
];

function ate999(n) {
  if (n === 100) return 'cem';
  const partes = [];
  const c = Math.floor(n / 100);
  const r = n % 100;
  if (c) partes.push(CENTENAS[c]);
  if (r) {
    if (r < 20) partes.push(UNIDADES[r]);
    else partes.push(DEZENAS[Math.floor(r / 10)] + (r % 10 ? ` e ${UNIDADES[r % 10]}` : ''));
  }
  return partes.join(' e ');
}

function inteiroPorExtenso(n) {
  if (n === 0) return 'zero';
  const grupos = [];
  let resto = n;
  for (const [valor, singular, plural] of ESCALAS) {
    const q = Math.floor(resto / valor);
    if (q) {
      const texto = valor === 1e3 && q === 1 ? 'mil' : `${ate999(q)} ${q === 1 ? singular : plural}`;
      grupos.push({ texto, q });
    }
    resto %= valor;
  }
  if (resto) grupos.push({ texto: ate999(resto), q: resto });
  if (grupos.length === 1) return grupos[0].texto;
  const ultimo = grupos[grupos.length - 1];
  const inicio = grupos.slice(0, -1).map((g) => g.texto).join(' ');
  const liga = ultimo.q < 100 || ultimo.q % 100 === 0 ? ' e ' : ' ';
  return inicio + liga + ultimo.texto;
}

export function valorPorExtenso(valor) {
  const negativo = valor < 0;
  const centavosTotais = Math.round(Math.abs(Number(valor) || 0) * 100);
  const reais = Math.floor(centavosTotais / 100);
  const centavos = centavosTotais % 100;
  const partes = [];
  if (reais) {
    const de = reais >= 1e6 && reais % 1e6 === 0 ? ' de' : '';
    partes.push(`${inteiroPorExtenso(reais)}${de} ${reais === 1 ? 'real' : 'reais'}`);
  }
  if (centavos) partes.push(`${ate999(centavos)} ${centavos === 1 ? 'centavo' : 'centavos'}`);
  if (!partes.length) return 'zero reais';
  return (negativo ? 'menos ' : '') + partes.join(' e ');
}
