import React, { useEffect, useMemo, useState } from 'react';
import { Button } from './components/Button.jsx';
import { Eyebrow } from './components/Eyebrow.jsx';
import { Logo } from './components/Logo.jsx';
import {
  formatarData,
  formatarMoedaBR,
  formatarNumeroBR,
  parseMoedaBR,
  valorPorExtenso,
} from './prestacao/format.js';
import { carregar, iniciarNovoExtrato, novoAdicional, novoEvento, salvar } from './prestacao/storage.js';

const WHATSAPP = '5599991970062';
const WHATSAPP_FMT = '(99) 99197-0062';
const PIX = '55996625000147';
const PIX_FMT = '55.996.625/0001-47';
const RAZAO_SOCIAL = 'Dyogo Santos Leal';

function whatsappLink(texto) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
}

function TextField({ value, onChange, placeholder, label, type = 'text', display, className = '' }) {
  const vazio = !String(value ?? '').trim();
  return (
    <label className={['cb-field', vazio ? 'is-empty' : '', className].filter(Boolean).join(' ')}>
      {label ? <span className="cb-label">{label}</span> : null}
      <input
        className="cb-input screen-only"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="cb-print print-only">{display ?? value}</span>
    </label>
  );
}

function MoneyField({ value, onChange, label, className = '', ariaLabel, negativo = false }) {
  const [texto, setTexto] = useState(null);
  const editando = texto !== null;
  const exibido = value ? `${negativo ? '− ' : ''}${formatarMoedaBR(value)}` : '';
  return (
    <label className={['cb-field', 'cb-money', !value ? 'is-empty' : '', className].filter(Boolean).join(' ')}>
      {label ? <span className="cb-label">{label}</span> : null}
      <input
        className="cb-input screen-only"
        inputMode="decimal"
        aria-label={ariaLabel}
        placeholder="R$ 0,00"
        value={editando ? texto : exibido}
        onFocus={() => setTexto(value ? formatarNumeroBR(value) : '')}
        onChange={(e) => setTexto(e.target.value)}
        onBlur={() => {
          onChange(parseMoedaBR(texto));
          setTexto(null);
        }}
      />
      <span className="cb-print print-only">{exibido || formatarMoedaBR(0)}</span>
    </label>
  );
}

function ordenarPorData(eventos) {
  return [...eventos].sort((a, b) => (a.data || '9999').localeCompare(b.data || '9999'));
}

export default function PrestacaoPage() {
  const [estado, setEstado] = useState(carregar);
  const [pixCopiado, setPixCopiado] = useState(false);

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

  const { documento, cliente, eventos, adicionais, desconto, sinal, observacoes } = estado;

  const contas = useMemo(() => {
    const subtotal = eventos.reduce((s, e) => s + (Number(e.valor) || 0), 0);
    const totalAdicionais = adicionais.reduce((s, a) => s + (Number(a.valor) || 0), 0);
    const total = subtotal + totalAdicionais - (Number(desconto) || 0);
    const pagos = eventos.filter((e) => e.pago).reduce((s, e) => s + (Number(e.valor) || 0), 0);
    const recebido = pagos + (Number(sinal) || 0);
    const saldo = total - recebido;
    let status = 'Em aberto';
    if (total > 0 && saldo <= 0) status = 'Quitado';
    else if (recebido > 0) status = 'Parcialmente pago';
    return { subtotal, total, pagos, saldo, status, qtd: eventos.filter((e) => e.evento || e.valor).length };
  }, [eventos, adicionais, desconto, sinal]);

  const set = (patch) => setEstado((s) => ({ ...s, ...patch }));
  const setDocumento = (campo, valor) => setEstado((s) => ({ ...s, documento: { ...s.documento, [campo]: valor } }));
  const setCliente = (campo, valor) => setEstado((s) => ({ ...s, cliente: { ...s.cliente, [campo]: valor } }));
  const setEvento = (id, patch) =>
    setEstado((s) => ({ ...s, eventos: s.eventos.map((e) => (e.id === id ? { ...e, ...patch } : e)) }));
  const removerEvento = (id) => setEstado((s) => ({ ...s, eventos: s.eventos.filter((e) => e.id !== id) }));
  const setAdicional = (id, patch) =>
    setEstado((s) => ({ ...s, adicionais: s.adicionais.map((a) => (a.id === id ? { ...a, ...patch } : a)) }));
  const removerAdicional = (id) => setEstado((s) => ({ ...s, adicionais: s.adicionais.filter((a) => a.id !== id) }));

  function novoExtrato() {
    if (window.confirm('Começar um novo extrato? Os dados atuais serão apagados.')) {
      setEstado(iniciarNovoExtrato());
    }
  }

  function baixarPdf() {
    const tituloOriginal = document.title;
    document.title = `Extrato ${documento.numero} - DJ Dhyogo`;
    window.addEventListener('afterprint', () => { document.title = tituloOriginal; }, { once: true });
    document.documentElement.classList.add('is-printing');
    window.print();
  }

  async function copiarPix() {
    try {
      await navigator.clipboard.writeText(PIX);
      setPixCopiado(true);
      setTimeout(() => setPixCopiado(false), 2000);
    } catch {
      window.prompt('Copie a chave Pix:', PIX);
    }
  }

  const statusClasse = contas.status === 'Quitado' ? 'is-quitado' : contas.status === 'Parcialmente pago' ? 'is-parcial' : 'is-aberto';
  const msgComprovante = `Olá, Dhyogo! Segue o comprovante de pagamento do extrato Nº ${documento.numero} (${formatarMoedaBR(Math.max(contas.saldo, 0))}).`;
  const msgDuvida = `Olá, Dhyogo! Tenho uma dúvida sobre o extrato Nº ${documento.numero}.`;

  return (
    <div className="site cobranca">
      <header className="nav no-print">
        <div className="shell nav-inner">
          <a href="/" className="nav-brand" aria-label="DJ DHYOGO — início">
            <Logo height={22} />
          </a>
          <div className="nav-actions">
            <Button variant="secondary" size="sm" onClick={novoExtrato}>Novo extrato</Button>
            <Button variant="primary" size="sm" onClick={baixarPdf}>Baixar PDF</Button>
          </div>
        </div>
      </header>

      <main className="shell cb-main">
        <article className="cb-doc">
          <header className="cb-head">
            <div className="cb-emissor">
              <Logo height={34} className="screen-only" />
              <Logo height={34} tone="roxo" className="print-only" />
              <div className="cb-emissor-info">
                <strong>DJ Dhyogo</strong>
                <span>{RAZAO_SOCIAL} · CNPJ {PIX_FMT}</span>
                <span>WhatsApp {WHATSAPP_FMT} · @dhyogodj · dhyogo.com.br</span>
              </div>
            </div>

            <div className="cb-titulo">
              <Eyebrow>Documento Nº {documento.numero}</Eyebrow>
              <h1>Extrato de Apresentações</h1>
              <span className={`cb-status ${statusClasse}`}>{contas.status}</span>
            </div>

            <div className="cb-docinfo">
              <TextField label="Número" value={documento.numero} onChange={(v) => setDocumento('numero', v)} />
              <TextField
                label="Emissão"
                type="date"
                value={documento.emissao}
                display={formatarData(documento.emissao)}
                onChange={(v) => setDocumento('emissao', v)}
              />
              <TextField
                label="Vencimento"
                type="date"
                value={documento.vencimento}
                display={formatarData(documento.vencimento)}
                onChange={(v) => setDocumento('vencimento', v)}
              />
            </div>
          </header>

          <section className="cb-section cb-cliente">
            <h2>Contratante</h2>
            <div className="cb-grid-3">
              <TextField label="Nome ou empresa" placeholder="Nome do contratante" value={cliente.nome} onChange={(v) => setCliente('nome', v)} />
              <TextField label="CPF / CNPJ" placeholder="000.000.000-00" value={cliente.documento} onChange={(v) => setCliente('documento', v)} />
              <TextField label="Cidade" placeholder="Cidade / UF" value={cliente.cidade} onChange={(v) => setCliente('cidade', v)} />
            </div>
          </section>

          <section className="cb-section">
            <h2>Apresentações</h2>
            <table className="cb-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Evento</th>
                  <th>Local / Cidade</th>
                  <th className="cb-num">Valor</th>
                  <th>Status</th>
                  <th className="no-print"><span className="sr-only">Ações</span></th>
                </tr>
              </thead>
              <tbody>
                {ordenarPorData(eventos).map((e) => {
                  const vazio = !e.data && !e.evento && !e.local && !e.valor;
                  return (
                    <tr key={e.id} className={vazio ? 'is-vazio' : ''}>
                      <td data-label="Data">
                        <TextField type="date" value={e.data} display={formatarData(e.data)} onChange={(v) => setEvento(e.id, { data: v })} />
                      </td>
                      <td data-label="Evento">
                        <TextField placeholder="Nome do evento" value={e.evento} onChange={(v) => setEvento(e.id, { evento: v })} />
                      </td>
                      <td data-label="Local">
                        <TextField placeholder="Local / cidade" value={e.local} onChange={(v) => setEvento(e.id, { local: v })} />
                      </td>
                      <td data-label="Valor" className="cb-num">
                        <MoneyField ariaLabel="Valor" value={e.valor} onChange={(v) => setEvento(e.id, { valor: v })} />
                      </td>
                      <td data-label="Status">
                        <button
                          type="button"
                          className={`cb-pill screen-only ${e.pago ? 'is-pago' : ''}`}
                          aria-pressed={e.pago}
                          onClick={() => setEvento(e.id, { pago: !e.pago })}
                        >
                          {e.pago ? 'Pago' : 'Pendente'}
                        </button>
                        <span className={`cb-print print-only ${e.pago ? 'is-pago' : ''}`}>{e.pago ? 'Pago' : 'Pendente'}</span>
                      </td>
                      <td className="cb-row-actions no-print">
                        <button type="button" className="cb-remove" aria-label="Excluir apresentação" onClick={() => removerEvento(e.id)}>
                          ×
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button
              type="button"
              className="cb-add no-print"
              onClick={() => set({ eventos: [...eventos, novoEvento()] })}
            >
              + Adicionar show
            </button>
          </section>

          <section className="cb-section cb-bottom">
            <div className="cb-pagamento">
              <h2>Como pagar</h2>
              <div className="cb-pix">
                <span className="cb-label">Pix · chave CNPJ</span>
                <div className="cb-pix-row">
                  <strong className="cb-pix-key">{PIX_FMT}</strong>
                  <button type="button" className="cb-copy no-print" onClick={copiarPix}>
                    {pixCopiado ? 'Chave copiada' : 'Copiar chave'}
                  </button>
                </div>
                <span className="cb-pix-nome">Favorecido: {RAZAO_SOCIAL}</span>
              </div>
              <label className={['cb-field', 'cb-obs', observacoes.trim() ? '' : 'is-empty'].filter(Boolean).join(' ')}>
                <span className="cb-label">Observações</span>
                <textarea
                  className="cb-input screen-only"
                  rows={3}
                  placeholder="Prazo, instruções de pagamento, detalhes combinados..."
                  value={observacoes}
                  onChange={(e) => set({ observacoes: e.target.value })}
                />
                <span className="cb-print print-only">{observacoes}</span>
              </label>
              <p className="cb-contato">
                Após o pagamento, envie o comprovante pelo WhatsApp {WHATSAPP_FMT}.
              </p>
            </div>

            <div className="cb-resumo">
              <h2>Resumo</h2>
              <dl>
                <div className="cb-linha">
                  <dt>Apresentações ({contas.qtd})</dt>
                  <dd>{formatarMoedaBR(contas.subtotal)}</dd>
                </div>

                {adicionais.map((a) => (
                  <div key={a.id} className={['cb-linha', 'cb-linha-edit', !a.valor && !a.descricao ? 'is-vazio' : ''].filter(Boolean).join(' ')}>
                    <dt>
                      <TextField placeholder="Adicional (deslocamento, hospedagem...)" value={a.descricao} onChange={(v) => setAdicional(a.id, { descricao: v })} />
                    </dt>
                    <dd>
                      <MoneyField ariaLabel="Valor do adicional" value={a.valor} onChange={(v) => setAdicional(a.id, { valor: v })} />
                      <button type="button" className="cb-remove no-print" aria-label="Remover adicional" onClick={() => removerAdicional(a.id)}>×</button>
                    </dd>
                  </div>
                ))}
              </dl>
              <button type="button" className="cb-add cb-add-sm no-print" onClick={() => set({ adicionais: [...adicionais, novoAdicional()] })}>
                + Adicional
              </button>
              <dl>
                <div className={['cb-linha', 'cb-linha-edit', desconto ? '' : 'is-vazio'].filter(Boolean).join(' ')}>
                  <dt>Desconto</dt>
                  <dd><MoneyField ariaLabel="Desconto" negativo value={desconto} onChange={(v) => set({ desconto: v })} /></dd>
                </div>

                <div className="cb-linha cb-linha-total">
                  <dt>Total</dt>
                  <dd>{formatarMoedaBR(contas.total)}</dd>
                </div>

                {contas.pagos > 0 ? (
                  <div className="cb-linha">
                    <dt>Shows já pagos</dt>
                    <dd>− {formatarMoedaBR(contas.pagos)}</dd>
                  </div>
                ) : null}

                <div className={['cb-linha', 'cb-linha-edit', sinal ? '' : 'is-vazio'].filter(Boolean).join(' ')}>
                  <dt>Sinal / adiantamento</dt>
                  <dd><MoneyField ariaLabel="Sinal ou adiantamento recebido" negativo value={sinal} onChange={(v) => set({ sinal: v })} /></dd>
                </div>
              </dl>

              <div className="cb-saldo">
                <span className="cb-label">{contas.saldo < 0 ? 'Crédito do contratante' : 'Saldo a pagar'}</span>
                <strong>{formatarMoedaBR(Math.abs(contas.saldo))}</strong>
                <span className="cb-extenso">({valorPorExtenso(Math.abs(contas.saldo))})</span>
              </div>
            </div>
          </section>

          <section className="cb-acoes no-print">
            <Button variant="primary" href={whatsappLink(msgComprovante)} target="_blank" rel="noopener noreferrer">
              Enviar comprovante
            </Button>
            <Button variant="secondary" href={whatsappLink(msgDuvida)} target="_blank" rel="noopener noreferrer">
              Tirar dúvidas
            </Button>
          </section>

          <footer className="cb-footer">
            <span>© {new Date().getFullYear()} DJ Dhyogo · {RAZAO_SOCIAL} · CNPJ {PIX_FMT}</span>
            <span>Documento sem valor fiscal.</span>
          </footer>
        </article>
      </main>
    </div>
  );
}
