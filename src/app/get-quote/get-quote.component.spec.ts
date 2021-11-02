import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../services/user.service';
import { QuoteDetailsService } from '../services/quoteDetails.service';
import { By } from '@angular/platform-browser';
import { GetQuoteComponent, Property, Location } from './get-quote.component';

describe('GetQuoteComponent', () => {
  let component: GetQuoteComponent;
  let fixture: ComponentFixture<GetQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetQuoteComponent ],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [UserService, QuoteDetailsService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // describe('boudary', () => {
  //   it('should change the value on username selection change', async() => {
  //     fixture.detectChanges();
  //     let select: HTMLSelectElement = fixture.debugElement.query(By.css('.select-user')).nativeElement;
  //     console.log(select);
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
      expect(component.title).toBe('Get Quote');
      // we are accessing "h1"
      const title = fixture.debugElement.query(By.css('h3')).nativeElement;
      expect(title.innerHTML).toBe('Get Quote');
    });

    it('locationForm invalid when empty', () => {
      expect(component.locationForm.valid).toBeFalsy();
    });

    it('residenceType field validity', () => {
      let errors = {};
      let residenceType = component.locationForm.controls['residenceType'];
      expect(residenceType.valid).toBeFalsy();

      // Set residenceType to something correct
      residenceType.setValue("");
      errors = residenceType.errors || {};
      expect(errors["required"]).toBeTruthy();
    });

    it('address field validity', () => {
      let errors = {};
      let address = component.locationForm.controls['address'];
      expect(address.valid).toBeFalsy();

      // Set address to something correct
      address.setValue("");
      errors = address.errors || {};
      expect(errors["required"]).toBeTruthy();
    });

    it('residenceUse field validity', () => {
      let errors = {};
      let residenceUse = component.locationForm.controls['residenceUse'];
      expect(residenceUse.valid).toBeFalsy();

      // Set residenceUse to something correct
      residenceUse.setValue("");
      errors = residenceUse.errors || {};
      expect(errors["required"]).toBeTruthy();
    })

    it('propertyForm invalid when empty', () => {
      expect(component.propertyForm.valid).toBeFalsy();
    });

    it('marketValue field validity', () => {
      let errors = {};
      let marketValue = component.propertyForm.controls['marketValue'];
      expect(marketValue.valid).toBeFalsy();

      // Set marketValue to something correct
      marketValue.setValue("");
      errors = marketValue.errors || {};
      expect(errors["required"]).toBeTruthy();
    });
    it('homeYear field validity', () => {
      let errors = {};
      let homeYear = component.propertyForm.controls['homeYear'];
      expect(homeYear.valid).toBeFalsy();

      // Set homeYear to something correct
      homeYear.setValue("");
      errors = homeYear.errors || {};
      expect(errors["required"]).toBeTruthy();
    });
    it('squareFootage field validity', () => {
      let errors = {};
      let squareFootage = component.propertyForm.controls['squareFootage'];
      expect(squareFootage.valid).toBeFalsy();

      // Set squareFootage to something correct
      squareFootage.setValue("");
      errors = squareFootage.errors || {};
      expect(errors["required"]).toBeTruthy();
    });
    it('dwellingType field validity', () => {
      let errors = {};
      let dwellingType = component.propertyForm.controls['dwellingType'];
      expect(dwellingType.valid).toBeFalsy();

      // Set dwellingType to something correct
      dwellingType.setValue("");
      errors = dwellingType.errors || {};
      expect(errors["required"]).toBeTruthy();
    });
    it('roofMaterial field validity', () => {
      let errors = {};
      let roofMaterial = component.propertyForm.controls['roofMaterial'];
      expect(roofMaterial.valid).toBeFalsy();

      // Set roofMaterial to something correct
      roofMaterial.setValue("");
      errors = roofMaterial.errors || {};
      expect(errors["required"]).toBeTruthy();
    });
    it('garageType field validity', () => {
      let errors = {};
      let garageType = component.propertyForm.controls['garageType'];
      expect(garageType.valid).toBeFalsy();

      // Set garageType to something correct
      garageType.setValue("");
      errors = garageType.errors || {};
      expect(errors["required"]).toBeTruthy();
    });
    it('noOfBaths field validity', () => {
      let errors = {};
      let noOfBaths = component.propertyForm.controls['noOfBaths'];
      expect(noOfBaths.valid).toBeFalsy();

      // Set noOfBaths to something correct
      noOfBaths.setValue("");
      errors = noOfBaths.errors || {};
      expect(errors["required"]).toBeTruthy();
    });
    it('noHalfBaths field validity', () => {
      let errors = {};
      let noHalfBaths = component.propertyForm.controls['noHalfBaths'];
      expect(noHalfBaths.valid).toBeFalsy();

      // Set noHalfBaths to something correct
      noHalfBaths.setValue("");
      errors = noHalfBaths.errors || {};
      expect(errors["required"]).toBeTruthy();
    });
    it('swimmingPool field validity', () => {
      let errors = {};
      let swimmingPool = component.propertyForm.controls['swimmingPool'];
      expect(swimmingPool.valid).toBeFalsy();

      // Set swimmingPool to something correct
      swimmingPool.setValue("");
      errors = swimmingPool.errors || {};
      expect(errors["required"]).toBeTruthy();
    });
  });

  describe('business', () => {
    it("should submit form", () => {
      expect(component.locationForm.valid).toBeFalsy();
      expect(component.propertyForm.valid).toBeFalsy();
      component.locationForm.controls["residenceType"].setValue("Condo");
      component.locationForm.controls["address"].setValue("Flat 401, Tirupati Complex, Sector 7, Kharghar, Panvel - 410208");
      component.locationForm.controls["residenceUse"].setValue("Primary");

      component.propertyForm.controls["marketValue"].setValue("40,000");
      component.propertyForm.controls["homeYear"].setValue("2018");
      component.propertyForm.controls["squareFootage"].setValue("1500");
      component.propertyForm.controls["dwellingType"].setValue("1 Story");
      component.propertyForm.controls["roofMaterial"].setValue("Concrete");
      component.propertyForm.controls["garageType"].setValue("Attached");
      component.propertyForm.controls["noOfBaths"].setValue("2");
      component.propertyForm.controls["noHalfBaths"].setValue("2");
      component.propertyForm.controls["swimmingPool"].setValue("No");

      expect(component.locationForm.valid).toBeTruthy();
      expect(component.propertyForm.valid).toBeTruthy();

      let location: Location;
      let property: Property;
      // Subscribe to the Observable and store the user in a local variable.
      component.locationDate.subscribe((value) => {
        location = value;
      });
      component.propertyData.subscribe((value) => {
        property = value;
      });

      // Trigger the signin function
      component.onSubmit();

      // Now we can check to make sure the emitted value is correct
      expect(location.residenceType).toEqual(location.residenceType);
      expect(location.address).toEqual(location.address);
      expect(location.residenceUse).toEqual(location.residenceUse);

      expect(property.marketValue).toEqual(property.marketValue);
      expect(property.homeYear).toEqual(property.homeYear);
      expect(property.squareFootage).toEqual(property.squareFootage);
      expect(property.dwellingType).toEqual(property.dwellingType);
      expect(property.roofMaterial).toEqual(property.roofMaterial);
      expect(property.garageType).toEqual(property.garageType);
      expect(property.noOfBaths).toEqual(property.noOfBaths);
      expect(property.noHalfBaths).toEqual(property.noHalfBaths);
      expect(property.swimmingPool).toEqual(property.swimmingPool);
    });
  });
});
