import { Injectable } from "@angular/core";
import { MenuItems } from "../types/menuItems";

const menuItem: MenuItems[] = [
  { id: 1, menuName: 'Contact List', menuId: 1 },
  { id: 2, menuName: 'Contact Details', menuId: 2 },
  { id: 3, menuName: 'Task List', menuId: 3 },
  { id: 4, menuName: 'Task Details', menuId: 4 },
  { id: 5, menuName: 'Scheduler', menuId: 5 },
  { id: 6, menuName: 'Dashboard', menuId: 6 },
  { id: 7, menuName: 'Sale Report', menuId: 7 },
  { id: 8, menuName: 'Geography', menuId: 8 },
  { id: 9, menuName: 'Sign In Form', menuId: 9 },
  { id: 10, menuName: 'Sign Up Form', menuId: 10 },
  { id: 11, menuName: 'Reset Password Form', menuId: 11 },
  { id: 12, menuName: 'User Profile', menuId: 12 }
]

@Injectable({
  providedIn: 'root'
})

export class TapmenuService {
  
  constructor() { }

  getmenu(){
    return menuItem;
  }
}