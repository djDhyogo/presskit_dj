import React from 'react';
import { createRoot } from 'react-dom/client';
import PrestacaoPage from './PrestacaoPage.jsx';
import './styles/tokens/fonts.css';
import './styles/tokens/colors.css';
import './styles/tokens/typography.css';
import './styles/tokens/spacing.css';
import './styles/tokens/effects.css';
import './styles/tokens/motion.css';
import './styles/tokens/base.css';
import './styles/site.css';
import './styles/prestacao.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrestacaoPage />
  </React.StrictMode>
);
