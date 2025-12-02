import {
  Component,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import {
  Event,
  NavigationStart,
  Router,
  ActivatedRoute,
  NavigationEnd,
} from '@angular/router';
import * as AOS from 'aos';
import { CommonService } from 'src/app/core/service/service.index';

@Component({
  selector: 'app-home-one-header',
  templateUrl: './home-one-header.component.html',
  styleUrls: ['./home-one-header.component.css']
})
export class HomeOneHeaderComponent implements OnInit, AfterViewInit {
  auth = false;
  authmenu = false;
  comrytmenu = true;
  isPatient = false;
  comlogo = true;
  whitelogo = false;
  pharmcart = false;
  page: any;
  splitVal: any;
  headerTop = false;
  admin_submenu = true;
  admin_menu = false;
  base: any;
  url1: any;

  displayName = '';
  displayRole = '';
  userImage = 'assets/img/doctors/doctor-thumb-02.jpg';

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
        const res = event.url.split('/');
        this.base = res[1];
        this.page = res[2];

        if (event.url === '/pharmacy/cart') {
          this.pharmcart = true;
        } else {
          this.pharmcart = false;
        }

        if (
          event.url === '/home' ||
          event.url === '/doctors/doctor-register' ||
          event.url === '/register' ||
          this.base === 'pharmacy' ||
          event.url === '/pages/component' ||
          event.url === '/pages/blank' ||
          event.url === '/login' ||
          event.url === '/forgot-password'
        ) {
          this.auth = false;
        } else {
          this.auth = true;
        }

        if (this.base === 'doctors') {
          this.isPatient = false;
        } else if (this.base === 'patients') {
          this.isPatient = true;
        }
      }
    });

    this.url1 = this.router.url;

    this.commonService.message.subscribe((res) => {
      if (res === 'patientLogin') {
        this.auth = true;
        this.isPatient = true;
        this.loadUserDetails();
      }
      if (res === 'doctorLogin') {
        this.auth = true;
        this.isPatient = false;
        this.loadUserDetails();
      }
      if (res === 'logout') {
        this.auth = false;
        this.isPatient = false;
        this.displayName = '';
        this.displayRole = '';
        this.userImage = 'assets/img/doctors/doctor-thumb-02.jpg';
      }
    });
  }

  ngOnInit(): void {
    AOS.init({
      duration: 1200,
      once: true,
    });
    this.loadUserDetails();
    if (localStorage.getItem('auth') === 'true') {
      this.auth = true;
      this.isPatient = localStorage.getItem('patient') === 'true';
      this.loadUserDetails();
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
    this.loadDynmicallyScript('assets/js/script.js');
  }

  loadDynmicallyScript(js: any) {
    const script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.head.appendChild(script);
    script.onload = () => this.doSomethingWhenScriptIsLoaded();
  }

  doSomethingWhenScriptIsLoaded() { }

  change(name: any) {
    this.page = name;
    this.commonService.nextmessage('main');
  }

  doctor(name: any) {
    this.page = name;
  }

  logout() {
    localStorage.clear();
    this.auth = false;
    this.isPatient = false;
    this.displayName = '';
    this.displayRole = '';
    this.userImage = 'assets/img/doctors/doctor-thumb-02.jpg';
    this.commonService.nextmessage('logout');
    this.router.navigate(['/login']);
  }

  home() {
    this.commonService.nextmessage('main');
    this.router.navigateByUrl('/').then(() => {
      this.router.navigate(['/']);
    });
  }

  navigate(name: any) {
    this.page = name;
    if (name === 'Admin') {
      this.router.navigate(['/admin']);
      this.commonService.nextmessage('admin');
    } else if (name === 'Pharmacy Admin') {
      this.router.navigate(['/pharmacy-admin']);
      this.commonService.nextmessage('pharmacy-admin');
    }
  }

  private loadUserDetails(): void {
    const roleName = localStorage.getItem('roleName');
    const id = localStorage.getItem('id');

    if (!roleName || !id) {
      return;
    }

    if (roleName === 'DOCTOR') {
      this.commonService.getDoctorDetails(id).subscribe((res) => {
        const data = res.data || res;
        this.displayName = `${data.firstname} ${data.lastname}`;
        this.displayRole = 'Doctor';
        this.userImage = 'assets/img/doctors/doctor-thumb-02.jpg';
      });
    } else if (roleName === 'PATIENT') {
      this.commonService.getPatientDetails(id).subscribe((res) => {
        const data = res.data || res;
        this.displayName = `${data.firstname} ${data.lastname}`;
        this.displayRole = 'Patient';
        this.userImage = 'assets/img/patients/patient.jpg';
      });
    }
  }
}