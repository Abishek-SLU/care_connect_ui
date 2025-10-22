import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
} from '@angular/core';
import {
  Event,
  NavigationStart,
  Router,
  ActivatedRoute,
  NavigationEnd,
} from '@angular/router';
import { DOCUMENT } from '@angular/common';


import * as AOS from 'aos';
import { CommonService } from 'src/app/core/service/service.index';
@Component({
  selector: 'app-home-one-header',
  templateUrl: './home-one-header.component.html',
  styleUrls: ['./home-one-header.component.css']
})
export class HomeOneHeaderComponent implements OnInit {
  auth: boolean = false;
  authmenu: boolean = false;
  comrytmenu: boolean = true;
  isPatient: boolean = false;
  comlogo: boolean = true;
  whitelogo: boolean = false;
  pharmcart: boolean = false;
  page:any;
  splitVal:any;
  headerTop: boolean = false;
  admin_submenu: boolean = true;
  admin_menu: boolean = false;

  base:any;
  url1:any;
  $menuItem!: JQuery<HTMLElement>;
  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    public commonService: CommonService
  ) {
    if (
      router.url === '/home' ||
      router.url === '/doctors/doctor-register' ||
      router.url === '/register' ||
      router.url === '/login' ||
      router.url === '/forgot-password'
    ) {
      this.authmenu = false;
    } else {
      this.authmenu = true;
    }
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        var res = event.url.split('/');
        this.base = res[1];
        this.page = res[2];
        if (event.url == '/pharmacy/cart') {
          this.pharmcart = true;
        } else {
          this.pharmcart = false;
        }
        if (event.url == '/home' || event.url == '/doctors/doctor-register' || event.url == '/register' || this.base === 'pharmacy' || event.url == '/pages/component' || event.url == '/pages/blank' || event.url == '/login' || event.url == '/forgot-password'){
          this.auth = false;
        } 
        else{
          this.auth = true;
        } 
        if (this.base === 'doctors'){
          this.isPatient = false;
        } 
        else if (this.base === 'patients'){
          this.isPatient = true;
        } 
      }
    });
    this.url1 = this.router.url;
    this.commonService.message.subscribe((res) => {
      if (res === 'patientLogin') {
        this.auth = true;
        console.log("result",res)
        // this.isPatient = true;
      }
      if (res === 'doctorLogin') {
        this.auth = true;
        // this.isPatient = false;
      }

      if (res === 'logout') {
        this.auth = false;
        this.isPatient = false;
      }
    });
  }

  ngOnInit(): void {

    AOS.init({
      duration: 1200,
		  once: true,
    });
    if (localStorage.getItem('auth') === 'true') {
      this.auth = true;
      this.isPatient =
        localStorage.getItem('patient') === 'true' ? true : false;
    }
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        $('html').removeClass('menu-opened');
        $('.sidebar-overlay').removeClass('opened');
        $('.main-wrapper').removeClass('slide-nav');
      }
    });
    
        
  }

  ngAfterViewInit() {
    // this.cdr.detectChanges();
    this.loadDynmicallyScript('assets/js/script.js');
  }
  loadDynmicallyScript(js:any) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.head.appendChild(script);
    script.onload = () => this.doSomethingWhenScriptIsLoaded();
  }
  doSomethingWhenScriptIsLoaded() {}
  change(name:any) {
    this.page = name;
    this.commonService.nextmessage('main');
  }

  addStyle(val:any) {
  }

  doctor(name:any) {
    this.page = name;
    // this.router.navigate(['/doctor/dashboard']);
  }

  logout() {
    localStorage.clear();
    this.auth = false;
    this.isPatient = false;
    this.router.navigate(['/login']);
  }

  home() {
    this.commonService.nextmessage('main');
    this.router.navigateByUrl('/').then(() => {
      this.router.navigate(['/']);
    });
  }

  navigate(name:any) {
    this.page = name;
    if (name === 'Admin') {
      this.router.navigate(['/admin']);
      this.commonService.nextmessage('admin');
    } else if (name === 'Pharmacy Admin') {
      this.router.navigate(['/pharmacy-admin']);
      this.commonService.nextmessage('pharmacy-admin');
    }
  }
}
