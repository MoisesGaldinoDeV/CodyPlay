import { Achievement } from '../types';

export const ACHIEVEMENTS_LIST: Achievement[] = [
  {
    id: 'ach_first_step',
    title: 'Primeiro Passo',
    description: 'Concluiu a primeira aula na plataforma CodePlay.',
    icon: '🚀',
    xpValue: 50,
    category: 'progress'
  },
  {
    id: 'ach_html_master',
    title: 'Arquiteto HTML5',
    description: 'Dominou tags semânticas, formulários e listas no Módulo 01.',
    icon: '🏗️',
    xpValue: 100,
    category: 'progress'
  },
  {
    id: 'ach_css_flexbox',
    title: 'Mestre do CSS Flexbox',
    description: 'Estilizou com sucesso o projeto To-Do com layout responsivo.',
    icon: '🎨',
    xpValue: 120,
    category: 'progress'
  },
  {
    id: 'ach_js_ninja',
    title: 'Ninja do JavaScript',
    description: 'Criou funções interativas e manipulação do DOM.',
    icon: '⚡',
    xpValue: 150,
    category: 'progress'
  },
  {
    id: 'ach_cert_mod1',
    title: 'Conquistador de Certificado Módulo 01',
    description: 'Concluiu todas as 6 aulas do Módulo de Lista de Tarefas.',
    icon: '📜',
    xpValue: 200,
    category: 'projects'
  },
  {
    id: 'ach_streak_7',
    title: 'Foco Inabalável (7 Dias)',
    description: 'Manteve uma sequência de aprendizado por 7 dias seguidos.',
    icon: '🔥',
    xpValue: 250,
    category: 'streak'
  },
  {
    id: 'ach_landing_page',
    title: 'Especialista em Landing Pages',
    description: 'Concluiu o Módulo 02 com CSS Grid e integração WhatsApp.',
    icon: '💻',
    xpValue: 300,
    category: 'projects'
  },
  {
    id: 'ach_portal_clinica',
    title: 'Engenheiro Web Sênior',
    description: 'Concluiu o Módulo 03 desenvolvendo o portal institucional completo.',
    icon: '🏥',
    xpValue: 500,
    category: 'projects'
  }
];
