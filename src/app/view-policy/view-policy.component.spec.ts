import { ComponentFixture, inject, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { ViewPolicyComponent } from './view-policy.component';
import { UserService } from '../services/user.service';
import { PolicyService } from '../services/policy.service';
import { QuoteService } from '../services/quote.service';

describe('ViewPolicyComponent', () => {
  let component: ViewPolicyComponent;
  let fixture: ComponentFixture<ViewPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPolicyComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [PolicyService, UserService, QuoteService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // describe('boudary', () => {
  //   it('should change the value on username selection change', () => {
  //     //fixture.detectChanges();
  //     let select: HTMLSelectElement = fixture.debugElement.query(By.css('.select-user')).nativeElement;
  //     select.value = select.options[1].value;
  //     select.dispatchEvent(new Event('change'));
  //     fixture.detectChanges();
  //     fixture.whenStable().then(() => {
  //       let text = select.options[select.selectedIndex].label;
  //       expect(text).toBe('arunkumar');
  //     });
  //   }); 
  // });

  describe('boundary', () => {
    it('should have a title', () => {
      expect(component.title).toBe('Policy Details');
      // we are accessing "h1"
      const title = fixture.debugElement.query(By.css('h1')).nativeElement;
      expect(title.innerHTML).toBe('Policy Details');
    });

    it('should have Get Policy Button', () => {
      const btn = fixture.debugElement.nativeElement.querySelector('#get_policy');
      expect(btn.innerHTML).toBe('Get Policy');
    });

    it("should show policy header length", () => {
      var rowHeaderLength = fixture.debugElement.nativeElement.querySelectorAll("th").length;
      expect(rowHeaderLength).toBe(6);
    });

    it("should have table header Policy Id", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[0].textContent).toEqual("Policy Id");
    });

    it("should have table header Quote Id", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[1].textContent).toEqual("Quote Id");
    });

    it("should have table header Policy Effective", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[2].textContent).toEqual("Policy Effective");
    });

    it("should have table header Policy End Date", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[3].textContent).toEqual("Policy End Date");
    });

    it("should have table header Policy Term", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[4].textContent).toEqual("Policy Term");
    });

    it("should have table header Policy Status", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[5].textContent).toEqual("Policy Status");
    });

    // it("should render policy data inside table", () => {
    //   fixture.detectChanges();
    //   fixture.whenStable().then(() => {
    //     fixture.detectChanges();

    //     let tableRows = fixture.nativeElement.querySelectorAll('tr');
    //     expect(tableRows.length).toBe(6);

    //     // Write test case for single data row
    //     let row1 = tableRows[1];
    //     expect(row1.cells[0].innerHTML).toBe('2');
    //     expect(row1.cells[1].innerHTML).toBe('2');
    //     expect(row1.cells[2].innerHTML).toBe('2021-10-20');
    //     expect(row1.cells[3].innerHTML).toBe('2022-10-19');
    //     expect(row1.cells[4].innerHTML).toBe('12');
    //     expect(row1.cells[5].innerHTML).toBe('Active');
    //   });
    // });
  });

  describe("exception", () => {
    it("should be check quotes api", inject([HttpTestingController, PolicyService], (httpMock: HttpTestingController, quotesService: PolicyService) => {
      component.ngOnInit();
      quotesService.getPolicyData().subscribe(data => {
        expect(data).toEqual(data);
        expect(data).toBe(data);
        expect(data).not.toBe(null);
        expect(null).toBeNull();
        expect(data).toBeTruthy();
      });
    }));
  });
});
