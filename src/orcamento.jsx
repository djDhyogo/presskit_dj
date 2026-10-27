import React from 'react';
import { createRoot } from 'react-dom/client';
import OrcamentoPage from './OrcamentoPage.jsx';
import './styles/tokens/fonts.css';
import './styles/tokens/colors.css';
import './styles/tokens/typography.css';
import './styles/tokens/spacing.css';
import './styles/tokens/effects.css';
import './styles/tokens/motion.css';
import './styles/tokens/base.css';
import './styles/orcamento.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <OrcamentoPage />
  </React.StrictMode>
);
