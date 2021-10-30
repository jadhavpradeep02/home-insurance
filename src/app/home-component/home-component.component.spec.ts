import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { HomeComponentComponent } from './home-component.component';

describe('HomeComponentComponent', () => {
  let component: HomeComponentComponent;
  let fixture: ComponentFixture<HomeComponentComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponentComponent ],
      imports: [RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponentComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('boundary', () => {
    it('should have a title', () => {
      expect(component.title).toBe('Home Page');
      // we are accessing "h1"
      const title = fixture.debugElement.query(By.css('h1')).nativeElement;
      expect(title.innerHTML).toBe('Home Page');
    });

    it('should have Register User Button', () => {
      const btn = fixture.debugElement.nativeElement.querySelector('#rgister_user');
      expect(btn.innerHTML).toBe('Register User');
    });

    it('should have Get Quote Button', () => {
      const btn = fixture.debugElement.nativeElement.querySelector('#get_quote');
      expect(btn.innerHTML).toBe('Get Quote');
    });

    it('should have View Quote Button', () => {
      const btn = fixture.debugElement.nativeElement.querySelector('#view_quote');
      expect(btn.innerHTML).toBe('View Quote');
    });

    it('should have View Policies Button', () => {
      const btn = fixture.debugElement.nativeElement.querySelector('#view_policy');
      expect(btn.innerHTML).toBe('View Policies');
    });

    // it('should navigate', () => {
    //   const navigateSpy = jest.spyOn(router, 'navigate');

    //   component.registerUser();
    //   expect(navigateSpy).toHaveBeenCalledWith(['/register-user']);
    // });
  });
});
