import React from 'react';
import { Logo } from './components/Logo.jsx';

const MAIL = 'djdhyogo@icloud.com';

function Mail() {
  return <a href={`mailto:${MAIL}`}>{MAIL}</a>;
}

export default function PrivacyPolicy() {
  return (
    <div className="site privacy">
      <header className="nav">
        <div className="shell nav-inner">
          <a href="/" className="nav-brand" aria-label="DJ DHYOGO — início">
            <Logo height={22} />
          </a>
          <nav className="nav-links" aria-label="Seções">
            <a className="nav-link" href="/">Início</a>
            <a className="nav-link" href="/#contato">Contato</a>
          </nav>
        </div>
      </header>

      <main className="shell privacy-main">
        <p className="privacy-kicker">DJ Dhyogo</p>
        <h1>Privacy Policy</h1>
        <p className="privacy-jump"><a href="#portugues">Versão em português</a></p>

        <p>This privacy policy applies to the app (hereby referred to as “Application”) for mobile devices that was created by Dhyogo DJ (hereby referred to as “Service Provider”) as a Free service. This service is intended for use “AS IS”.</p>

        <h2>Information Collection and Use</h2>
        <p>The Application collects information when you download and use it. This information may include information such as</p>
        <ul>
          <li>Your device’s Internet Protocol address (e.g. IP address)</li>
          <li>The pages of the Application that you visit, the time and date of your visit, the time spent on those pages</li>
          <li>The time spent on the Application</li>
          <li>The operating system you use on your mobile device</li>
        </ul>
        <p>The Application collects your device’s location, which helps the Service Provider determine your approximate geographical location and make use of in below ways:</p>
        <ul>
          <li>Geolocation Services: The Service Provider utilizes location data to provide features such as personalized content, relevant recommendations, and location-based services.</li>
          <li>Analytics and Improvements: Aggregated and anonymized location data helps the Service Provider to analyze user behavior, identify trends, and improve the overall performance and functionality of the Application.</li>
          <li>Third-Party Services: Periodically, the Service Provider may transmit anonymized location data to external services. These services assist them in enhancing the Application and optimizing their offerings.</li>
        </ul>
        <p>The Service Provider may use the information you provided to contact you from time to time to provide you with important information, required notices and marketing promotions.</p>
        <p>For a better experience, while using the Application, the Service Provider may require you to provide us with certain personally identifiable information, including but not limited to <Mail />. The information that the Service Provider request will be retained by them and used as described in this privacy policy.</p>

        <h2>Third Party Access</h2>
        <p>Only aggregated, anonymized data is periodically transmitted to external services to aid the Service Provider in improving the Application and their service. The Service Provider may share your information with third parties in the ways that are described in this privacy statement.</p>
        <p>Please note that the Application utilizes third-party services that have their own Privacy Policy about handling data. Below are the links to the Privacy Policy of the third-party service providers used by the Application:</p>
        <ul>
          <li><a href="https://www.google.com/policies/privacy/" target="_blank" rel="noopener noreferrer">Google Play Services</a></li>
        </ul>
        <p>The Service Provider may disclose User Provided and Automatically Collected Information:</p>
        <ul>
          <li>as required by law, such as to comply with a subpoena, or similar legal process;</li>
          <li>when they believe in good faith that disclosure is necessary to protect their rights, protect your safety or the safety of others, investigate fraud, or respond to a government request;</li>
          <li>with their trusted services providers who work on their behalf, do not have an independent use of the information we disclose to them, and have agreed to adhere to the rules set forth in this privacy statement.</li>
        </ul>

        <h2>Opt-Out Rights</h2>
        <p>You can stop all collection of information by the Application easily by uninstalling it. You may use the standard uninstall processes as may be available as part of your mobile device or via the mobile application marketplace or network.</p>

        <h2>Data Retention Policy</h2>
        <p>The Service Provider will retain User Provided data for as long as you use the Application and for a reasonable time thereafter. If you’d like them to delete User Provided Data that you have provided via the Application, please contact them at <Mail /> and they will respond in a reasonable time.</p>

        <h2>Children</h2>
        <p>The Service Provider does not use the Application to knowingly solicit data from or market to children under the age of 13.</p>
        <p>The Application does not address anyone under the age of 13. The Service Provider does not knowingly collect personally identifiable information from children under 13 years of age. In the case the Service Provider discover that a child under 13 has provided personal information, the Service Provider will immediately delete this from their servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact the Service Provider (<Mail />) so that they will be able to take the necessary actions.</p>

        <h2>Security</h2>
        <p>The Service Provider is concerned about safeguarding the confidentiality of your information. The Service Provider provides physical, electronic, and procedural safeguards to protect information the Service Provider processes and maintains.</p>

        <h2>Changes</h2>
        <p>This Privacy Policy may be updated from time to time for any reason. The Service Provider will notify you of any changes to the Privacy Policy by updating this page with the new Privacy Policy. You are advised to consult this Privacy Policy regularly for any changes, as continued use is deemed approval of all changes.</p>
        <p>This privacy policy is effective as of 2025-01-28</p>

        <h2>Your Consent</h2>
        <p>By using the Application, you are consenting to the processing of your information as set forth in this Privacy Policy now and as amended by us.</p>

        <h2>Contact Us</h2>
        <p>If you have any questions regarding privacy while using the Application, or have questions about the practices, please contact the Service Provider via email at <Mail />.</p>

        <hr />

        <h1 id="portugues">Política de Privacidade</h1>
        <p>Esta política de privacidade se aplica ao aplicativo (doravante referido como “Aplicativo”) para dispositivos móveis, criado por Dhyogo DJ (doravante referido como “Fornecedor de Serviço”) como um serviço gratuito. Este serviço é oferecido para uso “COMO ESTÁ”.</p>

        <h2>Coleta e Uso de Informações</h2>
        <p>O Aplicativo coleta informações quando você o baixa e usa. Essas informações podem incluir dados como:</p>
        <ul>
          <li>O endereço de Protocolo de Internet do seu dispositivo (ex: endereço IP)</li>
          <li>As páginas do Aplicativo que você visita, o horário e a data da sua visita, o tempo gasto nessas páginas</li>
          <li>O tempo gasto no Aplicativo</li>
          <li>O sistema operacional que você utiliza no seu dispositivo móvel</li>
        </ul>
        <p>O Aplicativo coleta a localização do seu dispositivo, o que ajuda o Fornecedor de Serviço a determinar sua localização geográfica aproximada e a utilizá-la de maneiras a seguir:</p>
        <ul>
          <li>Serviços de Geolocalização: O Fornecedor de Serviço utiliza os dados de localização para fornecer recursos como conteúdo personalizado, recomendações relevantes e serviços baseados em localização.</li>
          <li>Análises e Melhorias: Dados agregados e anonimizados de localização ajudam o Fornecedor de Serviço a analisar o comportamento do usuário, identificar tendências e melhorar o desempenho e a funcionalidade geral do Aplicativo.</li>
          <li>Serviços de Terceiros: Periodicamente, o Fornecedor de Serviço pode transmitir dados de localização anonimizados para serviços externos. Esses serviços os ajudam a melhorar o Aplicativo e otimizar suas ofertas.</li>
        </ul>
        <p>O Fornecedor de Serviço pode usar as informações que você forneceu para entrar em contato com você de tempos em tempos, para fornecer informações importantes, notificações necessárias e promoções de marketing.</p>
        <p>Para uma melhor experiência, enquanto estiver usando o Aplicativo, o Fornecedor de Serviço pode solicitar que você forneça certas informações pessoais identificáveis, incluindo, mas não se limitando a, <Mail />. As informações solicitadas pelo Fornecedor de Serviço serão retidas por ele e utilizadas conforme descrito nesta política de privacidade.</p>

        <h2>Acesso de Terceiros</h2>
        <p>Apenas dados agregados e anonimizados são periodicamente transmitidos para serviços externos para ajudar o Fornecedor de Serviço a melhorar o Aplicativo e seu serviço. O Fornecedor de Serviço pode compartilhar suas informações com terceiros de maneiras descritas nesta política de privacidade.</p>
        <p>Observe que o Aplicativo utiliza serviços de terceiros que possuem sua própria Política de Privacidade sobre o manuseio de dados. Abaixo estão os links para a Política de Privacidade dos provedores de serviço de terceiros utilizados pelo Aplicativo:</p>
        <ul>
          <li><a href="https://www.google.com/policies/privacy/" target="_blank" rel="noopener noreferrer">Serviços do Google Play</a></li>
        </ul>
        <p>O Fornecedor de Serviço pode divulgar Informações Fornecidas pelo Usuário e Informações Coletadas Automaticamente:</p>
        <ul>
          <li>como exigido por lei, como para cumprir uma intimação, ou processo legal semelhante;</li>
          <li>quando acreditarem de boa fé que a divulgação é necessária para proteger seus direitos, proteger sua segurança ou a segurança de outros, investigar fraudes ou responder a uma solicitação governamental;</li>
          <li>com seus prestadores de serviços confiáveis que trabalham em seu nome, não têm uso independente das informações que divulgamos para eles e concordaram em aderir às regras estabelecidas nesta política de privacidade.</li>
        </ul>

        <h2>Direitos de Exclusão</h2>
        <p>Você pode interromper toda a coleta de informações pelo Aplicativo facilmente desinstalando-o. Você pode usar os processos padrão de desinstalação que podem estar disponíveis como parte do seu dispositivo móvel ou através do mercado de aplicativos móveis ou rede.</p>

        <h2>Política de Retenção de Dados</h2>
        <p>O Fornecedor de Serviço reterá os dados fornecidos pelo usuário enquanto você usar o Aplicativo e por um tempo razoável após isso. Se você deseja que excluam os Dados Fornecidos pelo Usuário que você forneceu através do Aplicativo, entre em contato com eles através do e-mail <Mail /> e eles responderão em um tempo razoável.</p>

        <h2>Crianças</h2>
        <p>O Fornecedor de Serviço não usa o Aplicativo para solicitar dados ou fazer marketing direcionado a crianças com menos de 13 anos.</p>
        <p>O Aplicativo não é direcionado a ninguém com menos de 13 anos. O Fornecedor de Serviço não coleta intencionalmente informações pessoais identificáveis de crianças menores de 13 anos. Caso o Fornecedor de Serviço descubra que uma criança menor de 13 anos forneceu informações pessoais, o Fornecedor de Serviço imediatamente excluirá essas informações de seus servidores. Se você é um pai ou responsável e souber que seu filho forneceu informações pessoais, entre em contato com o Fornecedor de Serviço (<Mail />) para que eles possam tomar as medidas necessárias.</p>

        <h2>Segurança</h2>
        <p>O Fornecedor de Serviço está preocupado em proteger a confidencialidade de suas informações. O Fornecedor de Serviço fornece salvaguardas físicas, eletrônicas e procedimentais para proteger as informações que processa e mantém.</p>

        <h2>Alterações</h2>
        <p>Esta Política de Privacidade pode ser atualizada de tempos em tempos por qualquer motivo. O Fornecedor de Serviço notificará você sobre quaisquer alterações na Política de Privacidade, atualizando esta página com a nova Política de Privacidade. Recomendamos que você consulte regularmente esta Política de Privacidade para verificar se houve alterações, pois o uso contínuo será considerado como aprovação de todas as alterações.</p>
        <p>Esta política de privacidade é eficaz desde 2025-01-28</p>

        <h2>Seu Consentimento</h2>
        <p>Ao usar o Aplicativo, você está consentindo com o processamento de suas informações conforme estabelecido nesta Política de Privacidade, agora e conforme emendada por nós.</p>

        <h2>Entre em Contato Conosco</h2>
        <p>Se você tiver alguma dúvida sobre privacidade ao usar o Aplicativo, ou tiver dúvidas sobre as práticas, entre em contato com o Fornecedor de Serviço por e-mail em <Mail />.</p>
      </main>

      <div className="shell">
        <footer className="rodape">
          <div className="rodape-inner">
            <Logo height={18} tone="lilas" />
            <span className="rodape-meta">© 2025 · 55.996.625 Dyogo Santos Leal · CNPJ 55.996.625/0001-47</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
