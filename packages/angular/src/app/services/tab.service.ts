import { Injectable } from '@angular/core';
import { MenuItem } from '../types/menus';

const menuItems : MenuItem[] = [
    { 
      ID: 1, 
      FirstName: 'Contact List', 
      vocherID: 1
    },
    { 
      ID: 2, 
      FirstName: 'Contact Details', 
      vocherID: 2 ,

    },
    { 
      ID: 3, 
      FirstName: 'Task List', 
      vocherID: 3
    },
    { 
      ID: 4, 
      FirstName: 'Task Details', 
      vocherID: 4
    },
    { 
      ID: 5, 
      FirstName: 'Scheduler', 
      vocherID: 5 
    },
    { 
      ID: 6, 
      FirstName: 'Dashboard', 
      vocherID: 6
    },
    { 
      ID: 7, 
      FirstName: 'Sales Report', 
      vocherID: 7
    },
    { 
      ID: 8, 
      FirstName: 'Geography', 
      vocherID: 8
    },
    { 
      ID: 9, 
      FirstName: 'Reset Password', 
      vocherID: 9
    },
    { 
      ID: 10, 
      FirstName: 'Sign In', 
      vocherID: 10
    },
    { 
      ID: 11, 
      FirstName: 'Sign Up', 
      vocherID: 11
    },
    { 
      ID: 12, 
      FirstName: 'User Profile', 
      vocherID: 12 
    }
  ];


@Injectable({
    providedIn: 'root'
  })
  export class TabService {
  
    constructor() { }
  
    getMenus(){
      return menuItems;
    }

  }
  