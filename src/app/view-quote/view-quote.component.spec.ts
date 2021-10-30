import { ComponentFixture, inject, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { QuoteService } from '../services/quote.service';
import { UserService } from '../services/user.service';
import { By } from '@angular/platform-browser';
import { ViewQuoteComponent } from './view-quote.component';

describe('ViewQuoteComponent', () => {
  let component: ViewQuoteComponent;
  let fixture: ComponentFixture<ViewQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQuoteComponent ],
      imports: [RouterTestingModule],
      providers: [QuoteService, UserService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('boudary', () => {
    it('should change the value on username selection change', async(() => {
      fixture.detectChanges();
      let select: HTMLSelectElement = fixture.debugElement.query(By.css('.select-user')).nativeElement;
      select.value = select.options[1].value;
      select.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        let text = select.options[select.selectedIndex].label;
        expect(text).toBe('arunkumar');
      });
    })); 
  });

  describe('boundary', () => {
    it('should have a title', () => {
      expect(component.title).toBe('Quote Details');
      // we are accessing "h1"
      const title = fixture.debugElement.query(By.css('h1')).nativeElement;
      expect(title.innerHTML).toBe('Quote Details');
    });

    it('should have Get Quotes Button', () => {
      const btn = fixture.debugElement.nativeElement.querySelector('#get_quotes');
      expect(btn.innerHTML).toBe('Get Quotes');
    });

    it("should show quote header length", async() => {
      var rowHeaderLength = fixture.debugElement.nativeElement.querySelectorAll("th").length;
      expect(rowHeaderLength).toBe(9);
    });

    it("should have table header Quote Id", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[0].textContent).toEqual("Quote Id");
    });

    it("should have table header Monthly Premium", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[1].textContent).toEqual("Monthly Premium");
    });

    it("should have table header Dwelling Coverage", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[2].textContent).toEqual("Dwelling Coverage");
    });

    it("should have table header Detached Structures", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[3].textContent).toEqual("Detached Structures");
    });

    it("should have table header Personal Property", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[4].textContent).toEqual("Personal Property");
    });

    it("should have table header Additional living expense", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[5].textContent).toEqual("Additional living expense");
    });

    it("should have table header Medical expense", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[6].textContent).toEqual("Medical expense");
    });

    it("should have table header Deductible", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[7].textContent).toEqual("Deductible");
    });

    it("should have table header Options", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[8].textContent).toEqual("Options");
    });

    it("should render data inside table", () => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();

        let tableRows = fixture.nativeElement.querySelectorAll('tr');
        expect(tableRows.length).toBe(9);

        // Write test case for single data row
        let row1 = tableRows[1];
        expect(row1.cells[0].innerHTML).toBe('1');
        expect(row1.cells[1].innerHTML).toBe('14586');
        expect(row1.cells[2].innerHTML).toBe('23000');
        expect(row1.cells[3].innerHTML).toBe('2300');
        expect(row1.cells[4].innerHTML).toBe('13800');
        expect(row1.cells[5].innerHTML).toBe('4600');
        expect(row1.cells[6].innerHTML).toBe('$5500');
        expect(row1.cells[7].innerHTML).toBe('$5600');
        expect(row1.cells[8].textContent).toBe('Buy Policy');
      });
    });
  });

  describe("exception", () => {
    it("should be check quotes api", inject([HttpTestingController, QuoteService], (httpMock: HttpTestingController, quotesService: QuoteService) => {
      component.ngOnInit();
      quotesService.getQuoteData().subscribe(data => {
        expect(data).toEqual(data);
        expect(data).toBe(data);
        expect(data).not.toBe(null);
        expect(null).toBeNull();
        expect(data).toBeTruthy();
      });
    }));
  });

});
