import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup
  invalidRPWD: boolean = false
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z].*')
        ]
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z].*')
        ]
      ],
      email: ['', [Validators.required, Validators.email]],
      pwd: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15)
        ]
      ],
      rpwd: ['']
    })
  }

  register() {}

  //* region Getters
  get FirstName(): FormControl{
    return this.registerForm.get('firstName') as FormControl
  }
  get LastName(): FormControl{
    return this.registerForm.get('lastName') as FormControl
  }
  get Email(): FormControl{
    return this.registerForm.get('email') as FormControl
  }
  get PWD(): FormControl{
    return this.registerForm.get('pwd') as FormControl
  }
  get RPWD(): FormControl{
    return this.registerForm.get('rpwd') as FormControl
  }
  //* end region
}
