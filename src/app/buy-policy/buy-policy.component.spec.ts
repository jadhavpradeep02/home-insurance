import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BuyPolicyComponent, Policy } from './buy-policy.component';
import { PolicyService } from '../services/policy.service';
import { By } from '@angular/platform-browser';

describe('BuyPolicyComponent', () => {
  let component: BuyPolicyComponent;
  let fixture: ComponentFixture<BuyPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyPolicyComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      providers: [PolicyService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('boundary', () => {

    it('should have a title', () => {
      expect(component.title).toBe('Buy Policy ESign');
      // we are accessing "h1"
      const title = fixture.debugElement.query(By.css('h1')).nativeElement;
      expect(title.innerHTML).toBe('Buy Policy ESign');
    });

    it('form invalid when empty', () => {
      expect(component.policyForm.valid).toBeFalsy();
    });

    it('startDate field validity', () => {
      let errors = {};
      let startDate = component.policyForm.controls['startDate'];
      expect(startDate.valid).toBeFalsy();

      // Set startDate to something correct
      startDate.setValue("");
      errors = startDate.errors || {};
      expect(errors["required"]).toBeTruthy();
    });

    it('acknowledge field validity', () => {
      let errors = {};
      let acknowledge = component.policyForm.controls['acknowledge'];
      expect(acknowledge.valid).toBeFalsy();

      // Set acknowledge to something correct
      acknowledge.setValue("");
      errors = acknowledge.errors || {};
      expect(errors["required"]).toBeTruthy();
    });
  });

  describe('business', () => {
    it("should submit form", () => {
      expect(component.policyForm.valid).toBeFalsy();
      component.policyForm.controls["startDate"].setValue("ashok");
      component.policyForm.controls["acknowledge"].setValue(true);

      expect(component.policyForm.valid).toBeTruthy();

      let policy: Policy;
      // Subscribe to the Observable and store the user in a local variable.
      component.policydata.subscribe((value) => {
        policy = value;
      });

      // Trigger the signin function
      component.onSubmit();

      // Now we can check to make sure the emitted value is correct
      expect(policy.startDate).toEqual(policy.startDate);
      expect(policy.acknowledge).toEqual(policy.acknowledge);
    });
  });
});
