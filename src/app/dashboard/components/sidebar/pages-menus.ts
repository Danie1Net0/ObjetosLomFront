import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS_SUPER_ADMIN: NbMenuItem[] = [
  {
    title: 'USUÁRIOS',
    group: true,
  },
  {
    title: 'Gerenciar Usuários',
    icon: 'people-outline',
    children: [
      {
        title: 'Listar Usuários',
        link: 'usuarios/listar',
        icon: 'list',
      },
      {
        title: 'Solicitações Pendentes',
        link: 'usuarios/solicitacoes',
        icon: 'alert-circle',
      }
    ]
  },
  {
    title: 'OBJETOS DE APRENDIZAGEM',
    group: true
  },
  {
    title: 'Gerenciar Objetos',
    icon: 'book-outline',
    children: [
      {
        title: 'Listar Objetos',
        link: '',
        icon: 'list',
      },
      {
        title: 'Solicitações Pendentes',
        link: '',
        icon: 'alert-circle',
      }
    ]
  }
];

export const MENU_ITEMS_ADMIN: NbMenuItem[] = [
  {
    title: 'OBJETOS DE APRENDIZAGEM',
    group: true
  },
  {
    title: 'Gerenciar Objetos',
    icon: 'book-outline',
    children: [
      {
        title: 'Listar Objetos',
        link: '',
        icon: 'list',
      },
      {
        title: 'Solicitações Pendentes',
        link: '',
        icon: 'alert-circle',
      }
    ]
  }
];

export const MENU_ITEMS_CLIENT: NbMenuItem[] = [
  {
    title: 'OBJETOS DE APRENDIZAGEM',
    group: true
  },
  {
    title: 'Gerenciar Objetos',
    icon: 'book-outline',
    children: [
      {
        title: 'Meus Objetos',
        link: '',
        icon: 'list',
      },
      {
        title: 'Novo Objeto',
        link: '',
        icon: 'plus-circle',
      }
    ]
  }
];
