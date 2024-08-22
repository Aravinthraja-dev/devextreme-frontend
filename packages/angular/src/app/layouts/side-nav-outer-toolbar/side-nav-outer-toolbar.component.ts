import {
  Component,
  OnInit,
  OnDestroy,
  NgModule,
  Input,
  ViewChild,
} from '@angular/core';
import { DxTreeViewTypes } from 'devextreme-angular/ui/tree-view';
import { DxDrawerModule, DxDrawerTypes } from 'devextreme-angular/ui/drawer';
import { DxScrollViewComponent } from 'devextreme-angular/ui/scroll-view';
import { CommonModule } from '@angular/common';

import { Router, RouterModule, NavigationEnd, Event } from '@angular/router';
import { ScreenService, AppInfoService } from '../../services';
import { SideNavigationMenuModule, AppHeaderModule, AppFooterModule, ResetPasswordFormModule, HeaderHighlighterModule } from '../../components';
import { AnalyticsDashboardModule } from 'src/app/pages/analytics-dashboard/analytics-dashboard.component';
import { AnalyticsGeographyModule } from 'src/app/pages/analytics-geography/analytics-geography.component';

import { Subscription } from 'rxjs';
import { DxSortableModule, DxSortableTypes } from 'devextreme-angular/ui/sortable';
import { DxTabPanelModule } from 'devextreme-angular/ui/tab-panel';
import { DxListModule } from 'devextreme-angular/ui/list';
import { DxTemplateModule } from 'devextreme-angular/core';
import { MenuItem } from 'src/app/types/menus';
import { TabService } from 'src/app/services/tab.service';
import { AnalyticsSalesReportModule } from 'src/app/pages/analytics-sales-report/analytics-sales-report.component';
import { CrmContactDetailsModule } from 'src/app/pages/crm-contact-details/crm-contact-details.component';
import { CrmContactListModule } from 'src/app/pages/crm-contact-list/crm-contact-list.component';
import { PlanningSchedulerModule } from 'src/app/pages/planning-scheduler/planning-scheduler.component';
import { PlanningTaskDetailsModule } from 'src/app/pages/planning-task-details/planning-task-details.component';
import { PlanningTaskListModule } from 'src/app/pages/planning-task-list/planning-task-list.component';
import { AppSignInModule } from 'src/app/pages/sign-in-form/sign-in-form.component';
import { AppSignUpComponentModule } from 'src/app/pages/sign-up-form/sign-up-form.component';
import { UserProfileListModule } from 'src/app/pages/user-profile/user-profile.component';
import { DxButtonModule, DxDropDownButtonModule, DxTabsModule, DxToolbarModule } from 'devextreme-angular';
import { DxDropDownButtonTypes } from 'devextreme-angular/ui/drop-down-button';

@Component({
  selector: 'app-side-nav-outer-toolbar',
  templateUrl: './side-nav-outer-toolbar.component.html',
  styleUrls: ['./side-nav-outer-toolbar.component.scss'],
})
export class SideNavOuterToolbarComponent implements OnInit, OnDestroy {

  @ViewChild(DxScrollViewComponent, { static: true }) scrollView!: DxScrollViewComponent;

  @Input()title!: string;
  topContent = 'Some Content placed here'
  
  downloads: any[] = [];
  menuItems: MenuItem[] = [];
  selectedIndex: number;
  allMenuItems: MenuItem[] = [];
  selectedRoute = '';
  menuOpened!: boolean;
  temporaryMenuOpened = false;
  menuMode: DxDrawerTypes.OpenedStateMode = 'shrink';
  menuRevealMode: DxDrawerTypes.RevealMode = 'expand';
  minMenuSize = 0;
  shaderEnabled = false;
  routerSubscription: Subscription;
  screenSubscription: Subscription;
  isInitialContentVisible: boolean = true; 
  isHeaderVisible: boolean = true;
  isTabVisible: boolean = false; 
  private readonly TAB_STATE_KEY = 'savedTabs';

  constructor(private screen: ScreenService, private router: Router, public appInfo: AppInfoService, private tabService: TabService) {
    this.routerSubscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.selectedRoute = event.urlAfterRedirects.split('?')[0];
        //console.log('Selected Route', this.selectedRoute);
        this.updateTabsForRoute(this.selectedRoute);
      }
    });
    this.selectedIndex = -1;
    this.allMenuItems = tabService.getMenus();
    const savedTabState = localStorage.getItem(this.TAB_STATE_KEY);
      if (savedTabState) {
      const parsedState = JSON.parse(savedTabState);
      this.menuItems = parsedState.menuItems || [];
      this.downloads = parsedState.downloads || [];
      this.selectedIndex = parsedState.selectedIndex !== undefined ? parsedState.selectedIndex : -1;
      this.isTabVisible = this.menuItems.length > 0;
      }
  }

  toggleInitialContent() {
    this.isInitialContentVisible = !this.isInitialContentVisible;
  }

  ngOnInit() {
    this.menuOpened = this.screen.sizes['screen-large'];
    this.screenSubscription = this.screen.changed.subscribe(() => this.updateDrawer());
    this.updateDrawer();
    window.addEventListener('beforeunload', this.saveTabState.bind(this));
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.screenSubscription.unsubscribe();
    this.saveTabState();
    window.removeEventListener('beforeunload', this.saveTabState.bind(this));
  }

  saveTabState() {
    const tabState = {
      menuItems: this.menuItems,
      downloads: this.downloads,
      selectedIndex: this.selectedIndex
    };
    localStorage.setItem(this.TAB_STATE_KEY, JSON.stringify(tabState));
  }

  updateDrawer() {
    const isXSmall = this.screen.sizes['screen-x-small'];
    const isLarge = this.screen.sizes['screen-large'];

    this.menuMode = isLarge ? 'shrink' : 'overlap';
    this.menuRevealMode = isXSmall ? 'slide' : 'expand';
    this.minMenuSize = isXSmall ? 0 : 48;
    this.shaderEnabled = !isLarge;
  }

  get hideMenuAfterNavigation() {
    return this.menuMode === 'overlap' || this.temporaryMenuOpened;
  }

  get showMenuAfterClick() {
    return !this.menuOpened;
  }  

  navigationChanged(event: DxTreeViewTypes.ItemClickEvent) {
    const path = (event.itemData as any).path;
    const pointerEvent = event.event;
    const selectedItem = (event.itemData as any).id;
    console.log('PAth', path);
    
    if (path && this.menuOpened) {
      if (event.node?.selected) {
        pointerEvent?.preventDefault();
      } else {
        this.router.navigate([path]);
        const selectedOne = this.allMenuItems.find(obj => obj.vocherID === selectedItem);
        console.log('Selected One', selectedOne);
        if(selectedOne){
          this.menuItems.push({...selectedOne});
          console.log('menu', this.menuItems);
          this.downloads.push(selectedOne.FirstName);
          console.log('Tap', this.downloads);
          this.selectedIndex = this.menuItems.length - 1;
          this.isTabVisible = true;
        }
        console.log('Selected Index', this.selectedIndex);
      }


      if (this.hideMenuAfterNavigation) {
        this.temporaryMenuOpened = false;
        this.menuOpened = false;
        pointerEvent?.stopPropagation();
      }
    } else {
      pointerEvent?.preventDefault();
    }
  }

  closeAllTab() {
    this.menuItems = [];
    this.downloads = [];
    this.isTabVisible = false;
    localStorage.removeItem(this.TAB_STATE_KEY);
  }

  onItemClick(e: DxDropDownButtonTypes.ItemClickEvent): void {
    const tabIndex = e.itemData.tabIndex;
    console.log('Tap index', tabIndex);

    if (tabIndex > -1) {
      this.selectedIndex = tabIndex;

      const item = this.menuItems[tabIndex];
      const route = this.getRouteForItem(item.vocherID);
      console.log('Navigating to route:', route);

      this.router.navigate([route]);
    } else {
      console.log('Item not found in downloads array');
    }

  }

  onHeaderClose(){
    this.isHeaderVisible = false;
   }

  navigationClick() {
    if (this.showMenuAfterClick) {
      this.temporaryMenuOpened = true;
      this.menuOpened = true;
    }
  }

  updateTabsForRoute(url: string){
    console.log('Updateroute',url);
    const route = url.replace('/','');
    const existingTab = this.menuItems.find(item => this.getRouteForItem(item.vocherID) === route);
    if (!existingTab) {
        const menuItem = this.allMenuItems.find(item => this.getRouteForItem(item.vocherID) === route);
        if (menuItem) {
          this.menuItems.push({ ...menuItem });
          this.downloads.push(menuItem.FirstName);
          this.selectedIndex = this.menuItems.length - 1;
        }
    }
  }

  onTabDragStart(e: DxSortableTypes.DragStartEvent) {
    e.itemData = e.fromData[e.fromIndex];
  }

  onTabDrop(e: DxSortableTypes.ReorderEvent) {
    e.fromData.splice(e.fromIndex, 1);
    e.toData.splice(e.toIndex, 0, e.itemData);
  }

  onTabTitleClick(content: MenuItem){
    const tabRoute = this.getRouteForItem(content.vocherID);
    console.log('Tab route', tabRoute);
    if(tabRoute){
      this.router.navigate(['/'+tabRoute]);
    }
  }

  closeButtonHandler(itemData: any) {
    const index = this.menuItems.indexOf(itemData);

    if (index > -1) {
      this.menuItems.splice(index, 1);

      const downloadIndex = this.downloads.indexOf(itemData.FirstName);
      if(downloadIndex > -1){
        this.downloads.splice(downloadIndex, 1);
      }

      if (index >= this.menuItems.length && index > 0) {
        this.selectedIndex = index - 1;
      } else if (this.menuItems.length > 0) {
        this.selectedIndex = Math.min(index, this.menuItems.length - 1);
      } else {
        this.isTabVisible = false;
      }

      const newRoute = this.menuItems.length > 0 
        ? this.getRouteForItem(this.menuItems[this.selectedIndex].vocherID)
        : '/'; 

      this.router.navigate([newRoute]);
    }
  }

  showCloseButton() {
    return this.menuItems.length >= 1;
  }

  getRouteForItem(vocherID: number): string {
    switch (vocherID) {
        case 1: return 'crm-contact-list';
        case 2: return 'crm-contact-details';
        case 3: return 'planning-task-list';
        case 4: return 'planning-task-details';
        case 5: return 'planning-scheduler';
        case 6: return 'analytics-dashboard';
        case 7: return 'analytics-sales-report';
        case 8: return 'analytics-geography';
        case 9: return 'sign-in-form';
        case 10: return 'sign-up-form';
        case 11: return 'reset-password-form';
        case 12: return 'user-profile';
        default: return '';
    }
  }

 
}

@NgModule({
  imports: [
    RouterModule,
    SideNavigationMenuModule,
    DxDrawerModule,
    AppHeaderModule,
    CommonModule,
    AppFooterModule,
    DxSortableModule, 
    DxTabPanelModule, 
    DxListModule, 
    DxTemplateModule,
    AnalyticsDashboardModule,
    AnalyticsGeographyModule,
    AnalyticsSalesReportModule,
    CrmContactDetailsModule,
    CrmContactListModule,
    PlanningSchedulerModule,
    PlanningTaskDetailsModule,
    PlanningTaskListModule,
    ResetPasswordFormModule,
    AppSignInModule,
    AppSignUpComponentModule,
    UserProfileListModule,
    DxButtonModule, 
    DxDropDownButtonModule, 
    DxToolbarModule,
    HeaderHighlighterModule,
    DxTabsModule
  ],
  exports: [SideNavOuterToolbarComponent],
  declarations: [SideNavOuterToolbarComponent ],
})
export class SideNavOuterToolbarModule { }
