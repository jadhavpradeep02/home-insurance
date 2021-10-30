import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../services/user.service';
import { User, RegisterUserComponent } from './register-user.component';

describe('RegisterUserComponent', () => {
  let component: RegisterUserComponent;
  let fixture: ComponentFixture<RegisterUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterUserComponent ],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule, HttpClientTestingModule],
      providers:[UserService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('boundary', () => {

    it('form invalid when empty', () => {
      expect(component.userForm.valid).toBeFalsy();
    });

    it('username field validity', () => {
      let errors = {};
      let username = component.userForm.controls['username'];
      expect(username.valid).toBeFalsy();

      // Set username to something correct
      username.setValue("");
      errors = username.errors || {};
      expect(errors["required"]).toBeTruthy();
    });

    it('password field validity', () => {
      let errors = {};
      let password = component.userForm.controls['password'];
      expect(password.valid).toBeFalsy();

      // Set password to something correct
      password.setValue("");
      errors = password.errors || {};
      expect(errors["required"]).toBeTruthy();
    });

    it('confirmPassword field validity', () => {
      let errors = {};
      let confirmPassword = component.userForm.controls['confirmPassword'];
      expect(confirmPassword.valid).toBeFalsy();

      // Set confirmPassword to something correct
      confirmPassword.setValue("");
      errors = confirmPassword.errors || {};
      expect(errors["required"]).toBeTruthy();
    });

    it('email field validity', () => {
      let errors = {};
      let email = component.userForm.controls['email'];
      expect(email.valid).toBeFalsy();

      // Set email to something correct
      email.setValue("");
      errors = email.errors || {};
      expect(errors["required"]).toBeTruthy();
    });

    it('dob field validity', () => {
      let errors = {};
      let dob = component.userForm.controls['dob'];
      expect(dob.valid).toBeFalsy();

      // Set dob to something correct
      dob.setValue("");
      errors = dob.errors || {};
      expect(errors["required"]).toBeTruthy();
    });
  });

  describe('business', () => {
    it("should submit form", () => {
      expect(component.userForm.valid).toBeFalsy();
      component.userForm.controls["username"].setValue("ashok");
      component.userForm.controls["password"].setValue("Ashok@123");
      component.userForm.controls["confirmPassword"].setValue("Ashok@123");
      component.userForm.controls["email"].setValue("ashokumar@gmail.com");
      component.userForm.controls["dob"].setValue("11-10-1994");

      expect(component.userForm.valid).toBeTruthy();

      let user: User;
      // Subscribe to the Observable and store the user in a local variable.
      component.userdata.subscribe((value) => {
        user = value;
      });

      // Trigger the signin function
      component.onSubmit();

      // Now we can check to make sure the emitted value is correct
      expect(user.username).toEqual(user.username);
      expect(user.password).toEqual(user.password);
      //expect(user.confirmPassword).toEqual(user.confirmPassword);
      expect(user.email).toEqual(user.email);
      expect(user.dob).toEqual(user.dob);
    });
  });
});
