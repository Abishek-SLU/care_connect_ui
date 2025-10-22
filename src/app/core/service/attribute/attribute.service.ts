import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  constructor() { }
  
  public usersideMenuresponsive(): void {

      $(document).on('click', '.main-nav a', function (e) {
        if ($(this).parent().hasClass('has-submenu')) {
          e.preventDefault();
        }
        if (!$(this).hasClass('submenu')) {
          $('ul', $(this).parents('ul:first')).slideUp(350);
          $('a', $(this).parents('ul:first')).removeClass('submenu');
          $(this).next('ul').slideDown(350);
          $(this).addClass('submenu');
        } else if ($(this).hasClass('submenu')) {
          $(this).removeClass('submenu');
          $(this).next('ul').slideUp(350);
        }
      });
            window.addEventListener("resize", function (event) {
              if (window.innerWidth > 991) {
                  (document.getElementById('windows')as HTMLDivElement).classList.remove('menu-opened');
                  (document.getElementById('sidebar')as HTMLDivElement).classList.remove('opened');
                  (document.getElementById('home')as HTMLDivElement).style.display="block";
                  (document.getElementById('doctor')as HTMLDivElement).style.display="block";
                  (document.getElementById('patient')as HTMLDivElement).style.display="block";
                  (document.getElementById('pharmacy')as HTMLDivElement).style.display="block";
                  (document.getElementById('pages')as HTMLDivElement).style.display="block";
                  (document.getElementById('blog')as HTMLDivElement).style.display="block";
              }else {
                (document.getElementById('home')as HTMLDivElement).style.display="none";
                (document.getElementById('doctor')as HTMLDivElement).style.display="none";
                  (document.getElementById('patient')as HTMLDivElement).style.display="none";
                  (document.getElementById('pharmacy')as HTMLDivElement).style.display="none";
                  (document.getElementById('pages')as HTMLDivElement).style.display="none";
                  (document.getElementById('blog')as HTMLDivElement).style.display="none";
              }
          })
            

    
      // Mobile menu sidebar overlay	
      $('body').append('<div class="sidebar-overlay" id = "sidebar"></div>');
      $(document).on('click', '#mobile_btn', function() {
        $('main-wrapper').toggleClass('slide-nav');
        $('.sidebar-overlay').toggleClass('opened');
        $('html').addClass('menu-opened test');
        return false;
      });
      
      $(document).on('click', '.sidebar-overlay', function() {
        $('html').removeClass('menu-opened');
        $(this).removeClass('opened');
        $('main-wrapper').removeClass('slide-nav');
      });
      
      $(document).on('click', '#menu_close', function() {
        $('html').removeClass('menu-opened');
        $('.sidebar-overlay').removeClass('opened');
        $('main-wrapper').removeClass('slide-nav');
      });
  }

  public adminsideMenuresponsive(): void {

  }


}
