import React, { useEffect, useMemo, useState } from 'react';
import { Logo } from './components/Logo.jsx';
import {
  formatarData,
  formatarMoedaBR,
  formatarNumeroBR,
  parseMoedaBR,
} from './prestacao/format.js';
import {
  carregar,
  iniciarNovaProposta,
  novoCondicao,
  novoEscopo,
  novoItem,
  salvar,
} from './orcamento/storage.js';

const WHATSAPP = '5599991970062';
const WHATSAPP_FMT = '(99) 99197-0062';
const CNPJ_FMT = '55.996.625/0001-47';
const RAZAO = 'Dyogo Santos Leal';
const ENDERECO = 'Av. Pedro Neiva de Santana, 520 — 3º andar · Jardim América · Imperatriz — MA · CEP 65914-730';

function whatsappLink(texto) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
}

function Field({ value, onChange, placeholder, label, type = 'text', display, className = '', multiline = false, rows = 2 }) {
  const vazio = !String(value ?? '').trim();
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <label className={['or-field', vazio ? 'is-empty' : '', className].filter(Boolean).join(' ')}>
      {label ? <span className="or-label">{label}</span> : null}
      <Tag
        className={['or-input', display ? 'has-print-alt' : ''].filter(Boolean).join(' ')}
        type={multiline ? undefined : type}
        rows={multiline ? rows : undefined}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {display ? <span className="or-print print-only" aria-hidden="true">{display}</span> : null}
    </label>
  );
}

function MoneyField({ value, onChange, ariaLabel, className = '' }) {
  const [texto, setTexto] = useState(null);
  const editando = texto !== null;
  const numero = Number(value) || 0;
  return (
    <label className={['or-field', 'or-money', className].filter(Boolean).join(' ')}>
      <input
        className="or-input"
        inputMode="decimal"
        aria-label={ariaLabel}
        placeholder="R$ 0,00"
        value={editando ? texto : formatarMoedaBR(numero)}
        onFocus={() => setTexto(formatarNumeroBR(numero))}
        onChange={(e) => setTexto(e.target.value)}
        onBlur={() => {
          onChange(parseMoedaBR(texto));
          setTexto(null);
        }}
      />
    </label>
  );
}

const SINAL_CONDICAO_RE = /pagamento do sinal de \d+%/i;

function comSinalAtualizado(condicoes, pct) {
  return condicoes.map((c) =>
    SINAL_CONDICAO_RE.test(c?.texto || '')
      ? { ...c, texto: c.texto.replace(/sinal de \d+%/i, `sinal de ${pct}%`) }
      : c
  );
}

export default function OrcamentoPage() {
  const [estado, setEstado] = useState(carregar);

  useEffect(() => {
    salvar(estado);
  }, [estado]);

  useEffect(() => {
    const root = document.documentElement;
    const ligar = () => root.classList.add('is-printing');
    const desligar = () => root.classList.remove('is-printing');
    window.addEventListener('beforeprint', ligar);
    window.addEventListener('afterprint', desligar);
    return () => {
      window.removeEventListener('beforeprint', ligar);
      window.removeEventListener('afterprint', desligar);
    };
  }, []);

  const { documento, evento, escopo, itens, percentualSinal, condicoes } = estado;

  const contas = useMemo(() => {
    const total = itens.reduce((s, i) => s + (Number(i.valor) || 0), 0);
    const pct = Math.min(100, Math.max(0, Number(percentualSinal) || 0));
    const sinal = Math.round(total * (pct / 100) * 100) / 100;
    const saldo = Math.round((total - sinal) * 100) / 100;
    return { total, sinal, saldo, pct };
  }, [itens, percentualSinal]);

  const set = (patch) => setEstado((s) => ({ ...s, ...patch }));
  const setDocumento = (campo, valor) => setEstado((s) => ({ ...s, documento: { ...s.documento, [campo]: valor } }));
  const setEvento = (campo, valor) => setEstado((s) => ({ ...s, evento: { ...s.evento, [campo]: valor } }));
  const setEscopo = (id, texto) => setEstado((s) => ({ ...s, escopo: s.escopo.map((e) => (e.id === id ? { ...e, texto } : e)) }));
  const setItem = (id, patch) => setEstado((s) => ({ ...s, itens: s.itens.map((i) => (i.id === id ? { ...i, ...patch } : i)) }));
  const setCondicao = (id, texto) => setEstado((s) => ({ ...s, condicoes: s.condicoes.map((c) => (c.id === id ? { ...c, texto } : c)) }));

  function novaProposta() {
    if (window.confirm('Começar uma nova proposta? Os dados atuais serão apagados.')) {
      setEstado(iniciarNovaProposta());
    }
  }

  function baixarPdf() {
    const tituloOriginal = document.title;
    const root = document.documentElement;
    document.title = `Proposta ${documento.numero} - DJ Dhyogo`;
    root.classList.add('is-printing');
    window.print();
    root.classList.remove('is-printing');
    document.title = tituloOriginal;
  }

  function setPercentualSinal(valor) {
    const pct = Math.min(100, Math.max(0, Number(valor) || 0));
    setEstado((s) => ({
      ...s,
      percentualSinal: pct,
      condicoes: comSinalAtualizado(s.condicoes, pct),
    }));
  }

  const msgWhats = [
    `Olá! Segue a proposta comercial nº ${documento.numero}.`,
    `Investimento total: ${formatarMoedaBR(contas.total)}.`,
    evento.local ? `Local: ${evento.local}.` : '',
    'Posso enviar o PDF completo.',
  ].filter(Boolean).join(' ');

  return (
    <div className="orcamento">
      <div className="or-actions no-print">
        <a className="or-link" href="/">← Site</a>
        <div className="or-actions-btns">
          <button type="button" className="or-btn or-btn-ghost" onClick={novaProposta}>Nova proposta</button>
          <a className="or-btn or-btn-ghost" href={whatsappLink(msgWhats)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <button type="button" className="or-btn" onClick={baixarPdf}>Imprimir / Salvar em PDF</button>
        </div>
      </div>

      <main className="or-sheet">
        <header className="or-hero">
          <div className="or-hero-top">
            <div className="or-brand">
              <Logo height={34} tone="white" className="or-logo" />
              <a className="or-site" href="https://dhyogo.com.br/">dhyogo.com.br</a>
            </div>
            <div className="or-docinfo">
              <div className="or-docinfo-row">
                <span className="or-docinfo-label">Proposta nº</span>
                <Field className="or-inline" value={documento.numero} onChange={(v) => setDocumento('numero', v)} />
              </div>
              <div className="or-docinfo-row">
                <span className="or-docinfo-label">Emissão</span>
                <Field
                  className="or-inline"
                  type="date"
                  value={documento.emissao}
                  display={formatarData(documento.emissao)}
                  onChange={(v) => setDocumento('emissao', v)}
                />
              </div>
              <div className="or-docinfo-row">
                <span className="or-docinfo-label">Validade</span>
                <Field className="or-inline" value={documento.validade} onChange={(v) => setDocumento('validade', v)} placeholder="15 dias" />
              </div>
            </div>
          </div>
          <div>
            <h1>Proposta comercial — Dhyogo</h1>
            <p className="or-company">
              {RAZAO} · CNPJ {CNPJ_FMT}
              <br />
              {ENDERECO}
            </p>
          </div>
        </header>

        <div className="or-content">
          <div className="or-meta">
            <div className="or-meta-item">
              <Field label="Local do evento" placeholder="Cidade — UF" value={evento.local} onChange={(v) => setEvento('local', v)} />
            </div>
            <div className="or-meta-item">
              <Field label="Data do evento" placeholder="A confirmar" value={evento.data} onChange={(v) => setEvento('data', v)} />
            </div>
            <div className="or-meta-item">
              <Field label="Cidade de origem" value={evento.origem} onChange={(v) => setEvento('origem', v)} />
            </div>
            <div className="or-meta-item">
              <Field label="Duração" value={evento.duracao} onChange={(v) => setEvento('duracao', v)} />
            </div>
          </div>

          <section className="or-section">
            <h2><span className="or-num">01</span> Escopo do serviço</h2>
            <ul className="or-escopo">
              {escopo.map((e) => (
                <li key={e.id} className={!e.texto.trim() ? 'is-vazio' : ''}>
                  <Field value={e.texto} onChange={(v) => setEscopo(e.id, v)} placeholder="Item do escopo" multiline />
                  <button type="button" className="or-remove no-print" aria-label="Remover" onClick={() => set({ escopo: escopo.filter((x) => x.id !== e.id) })}>×</button>
                </li>
              ))}
            </ul>
            <button type="button" className="or-add no-print" onClick={() => set({ escopo: [...escopo, novoEscopo()] })}>+ Item do escopo</button>
          </section>

          <section className="or-section">
            <h2><span className="or-num">02</span> Investimento</h2>
            <div className="or-summary">
              <div>
                <table className="or-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Valor</th>
                      <th className="no-print"><span className="sr-only">Ações</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {itens.map((item) => (
                      <tr key={item.id} className={!item.descricao.trim() && !item.valor ? 'is-vazio' : ''}>
                        <td>
                          <Field value={item.descricao} onChange={(v) => setItem(item.id, { descricao: v })} placeholder="Descrição do item" />
                        </td>
                        <td className="or-num-col">
                          <MoneyField ariaLabel="Valor" value={item.valor} onChange={(v) => setItem(item.id, { valor: v })} />
                        </td>
                        <td className="no-print">
                          <button type="button" className="or-remove" aria-label="Remover item" onClick={() => set({ itens: itens.filter((i) => i.id !== item.id) })}>×</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button type="button" className="or-add no-print" onClick={() => set({ itens: [...itens, novoItem()] })}>+ Item</button>
              </div>
              <div className="or-total-card">
                <span className="or-total-label">Investimento total</span>
                <div className="or-total-value">{formatarMoedaBR(contas.total)}</div>
                <div className="or-total-caption">Serviço de DJ + adicionais</div>
              </div>
            </div>

            <div className="or-payment-grid">
              <div className="or-payment-item">
                <span className="or-payment-label">Sinal de reserva</span>
                <div className="or-payment-ctrl no-print">
                  <input
                    className="or-pct-input"
                    type="number"
                    min="0"
                    max="100"
                    inputMode="numeric"
                    aria-label="Percentual do sinal"
                    value={percentualSinal}
                    onChange={(e) => setPercentualSinal(e.target.value)}
                  />
                  <span>% na assinatura do contrato</span>
                </div>
                <span className="or-payment-hint print-only">{contas.pct}% na assinatura do contrato</span>
                <strong>{formatarMoedaBR(contas.sinal)}</strong>
              </div>
              <div className="or-payment-item">
                <span className="or-payment-label">Saldo</span>
                <span className="or-payment-hint">{100 - contas.pct}% até a data do evento</span>
                <strong>{formatarMoedaBR(contas.saldo)}</strong>
              </div>
            </div>
          </section>

          <section className="or-section">
            <h2><span className="or-num">03</span> Condições gerais</h2>
            <div className="or-notes">
              <ol>
                {condicoes.map((c, i) => (
                  <li key={c.id} className={!c.texto.trim() ? 'is-vazio' : ''}>
                    <Field value={c.texto} onChange={(v) => setCondicao(c.id, v)} placeholder={`Condição ${i + 1}`} multiline rows={1} />
                    <button type="button" className="or-remove no-print" aria-label="Remover condição" onClick={() => set({ condicoes: condicoes.filter((x) => x.id !== c.id) })}>×</button>
                  </li>
                ))}
              </ol>
              <button type="button" className="or-add no-print" onClick={() => set({ condicoes: [...condicoes, novoCondicao()] })}>+ Condição</button>
            </div>
          </section>

          <div className="or-sign">
            <div>
              <b>{RAZAO} — DJ Dhyogo</b>
              CNPJ {CNPJ_FMT} · Contratado
            </div>
            <div>
              <b>&nbsp;</b>
              Contratante — de acordo
            </div>
          </div>
        </div>

        <footer className="or-footer">
          <span>{RAZAO.toUpperCase()} · CNPJ {CNPJ_FMT}</span>
          <a href="https://dhyogo.com.br/">dhyogo.com.br</a>
          <span className="no-print">WhatsApp {WHATSAPP_FMT}</span>
        </footer>
      </main>
    </div>
  );
}
