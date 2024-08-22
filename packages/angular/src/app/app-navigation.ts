export const navigation = [
  {
    text: 'Home',
    icon: 'home',
    path: '/home'
  },
  {
    text: 'CRM',
    icon: 'user',
    path: '',
    items: [
      {
        text: 'Contact List',
        path: '/crm-contact-list',
        id: 1
      },
      {
        text: 'Contact Details',
        path: '/crm-contact-details',
        id: 2
      },
    ],
  },
  {
    text: 'Planning',
    icon: 'event',
    path: '',
    items: [
      {
        text: 'Task List',
        path: '/planning-task-list',
        id: 3,
      },
      {
        text: 'Task Details',
        path: '/planning-task-details',
        id: 4,
      },
      {
        text: 'Scheduler',
        path: '/planning-scheduler',
        id: 5,
      },
    ],
  },
  {
    text: 'Analytics',
    icon: 'chart',
    path: '',
    items: [
      {
        text: 'Dashboard',
        path: '/analytics-dashboard',
        id: 6
      },
      {
        text: 'Sales Report',
        path: '/analytics-sales-report',
        id: 7
      },
      {
        text: 'Geography',
        path: '/analytics-geography',
        id: 8
      },
    ],
  },
  {
    text: 'Authentication',
    icon: 'card',
    path: '',
    items: [
      {
        text: 'Sign In Form',
        path: '/sign-in-form',
        id: 9
      },
      {
        text: 'Sign Up Form',
        path: '/sign-up-form',
        id: 10
      },
      {
        text: 'Reset Password Form',
        path: '/reset-password-form',
        id: 11
      }
    ],
  },
  {
    text: 'Common',
    icon: 'box',
    path: '',
    items: [
      {
        text: 'User Profile',
        path: '/user-profile',
        id: 12
      },
    ]
  },
  {
    text: 'Settings',
    icon: 'preferences',
    path: '',
    items: [
      {
        text: 'Book Settings',
      },
      {
        text: 'Vocher Settings',
      },
    ],
  },
];
