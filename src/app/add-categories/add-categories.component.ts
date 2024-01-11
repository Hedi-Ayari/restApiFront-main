import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoreService } from '../service/store/Store.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-add-categories',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-categories.component.html',
  styleUrl: './add-categories.component.css'
})
export class AddCategoriesComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({})
  private toastService = inject(HotToastService);


  constructor(private fb: FormBuilder, private StoreService: StoreService) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      date_created: ['', Validators.required],
      status: ['', [Validators.required, this.notEmptyString]],
    })
  }

  notEmptyString(control: AbstractControl) {
    return control.value && control.value.trim() !== '' ? null : { notEmptyString: true };
  }
  onSubmit() {
    this.StoreService.addCategory(this.categoryForm.value).subscribe(
      {
        next: (response) => {
          this.StoreService.categories.push(response)
          this.toastService.success('Category added successfully')
        },
        error: (err) => {
          console.log(err)
        }
      }
    )
  }
}
