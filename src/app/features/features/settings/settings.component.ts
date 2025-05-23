import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { PaperProcessingService } from '../../../services/paper-processing.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { CounterSettingsComponent } from "../counter-settings/counter-settings.component";
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-settings',
  imports: [CommonModule,
    ReactiveFormsModule, CounterSettingsComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  role: string = "";
  username: string = "";
  paperProcessingForm: FormGroup;
  submitted = false;
  submitSuccess = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private paperProcessingService: PaperProcessingService,
    private router: Router,
    private loginService: LoginService,
    private userService: UserService
  ) {
    this.paperProcessingForm = this.formBuilder.group({
      grade: ['', Validators.required],
      category: ['', Validators.required],
      fromPaperNo: ['', [Validators.required, Validators.min(1)]],
      toPaperNo: ['', [Validators.required, Validators.min(1)]],
      sequenceNo: ['', [Validators.required, Validators.min(1)]]
    }, {
      validators: this.fromToValidator
    });
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(
      (userdata) => {
        console.log('User:', userdata);
        this.username = userdata.username;
        this.role = userdata.role;
        console.log(this.username + " 123456 ***" + this.role);
        
      },
      (error) => {
        console.error('Failed to fetch user data', error);
      }
    );
  }

  // Custom validator to ensure fromPaperNo is less than toPaperNo
  fromToValidator(group: FormGroup): { [key: string]: boolean } | null {
    const from = group.get('fromPaperNo')?.value;
    const to = group.get('toPaperNo')?.value;

    if (from && to && Number(from) >= Number(to)) {
      return { 'fromGreaterThanTo': true };
    }
    return null;
  }

  get f() { return this.paperProcessingForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.submitSuccess = false;
    this.errorMessage = '';

    if (this.paperProcessingForm.invalid) {
      return;
    }

    const paperProcessingData = {
      grade: this.paperProcessingForm.value.grade,
      category: this.paperProcessingForm.value.category,
      fromPaperNo: Number(this.paperProcessingForm.value.fromPaperNo),
      toPaperNo: Number(this.paperProcessingForm.value.toPaperNo),
      sequenceNo: Number(this.paperProcessingForm.value.sequenceNo)
    };

    this.paperProcessingService.submitPaperProcessing(paperProcessingData)
      .subscribe({
        next: () => {
          this.submitSuccess = true;
          this.resetForm();
        },
        error: (error) => {
          this.errorMessage = 'Failed to submit paper processing data. Please try again.';
          console.error('Error submitting paper processing data:', error);
        }
      });
  }

  resetForm() {
    this.submitted = false;
    this.paperProcessingForm.reset();
  }

  registerEmployees() {
    this.router.navigate(['/features/registerEmployee']);
  }

  registerSchools() {
    this.router.navigate(['/auth/register']);
  }

  trackQPPreparation() {
    this.router.navigate(['/features/scrumboard']);
  }

  manageOrders() {
    this.router.navigate(['/features/manageOrders']);
  }

  manageSchools() {
    this.router.navigate(['/features/manageSchools']);
  }

  manageEmployees() {
    this.router.navigate(['/features/manageEmployees']);
  }

  processOrders() {
    this.router.navigate(['/features/processOrders']);
  }

  settings() {
    this.router.navigate(['/features/settings']);
  }

  logout() {
    this.loginService.logout();
  }

  goToDashboard() {
    if (this.role === "ROLE_ADMIN") {
      this.router.navigate(['/dashboards/adminDashboard']);
    } else {
      this.router.navigate(['/dashboards/employeeDashboard']);
    }
  }
}