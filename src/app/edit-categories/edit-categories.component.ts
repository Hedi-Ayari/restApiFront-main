import { Component, Input, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { StoreService } from '../service/store/Store.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-edit-categories',
  standalone: true,
  imports: [ReactiveFormsModule, CalendarModule],
  templateUrl: './edit-categories.component.html',
  styleUrl: './edit-categories.component.css'
})
export class EditCategoriesComponent implements OnInit {

  categoryForm: FormGroup = new FormGroup({})
  private toastService = inject(HotToastService);
  id: number = 0;



  constructor(private fb: FormBuilder, private StoreService: StoreService) { }

  ngOnInit(): void {

    this.StoreService.category$.subscribe((category) => {
      this.id = category!.id_category;
      const date_created = new Date(category!.date_created);
      const formatted_date = date_created.toISOString().split('T')[0];

      this.categoryForm.patchValue({
        name: category!.name,
        date_created: formatted_date,
        status: category!.status
      })

    })
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

    const formValue = this.categoryForm.value;

    const payload: any = {
      id_category: this.id,
      name: formValue.name,
      date_created: formValue.date_created,
      status: formValue.status,
    };


    this.StoreService.updateCategory(payload).subscribe(
      {
        next: (response) => {
          const index = this.StoreService.categories.findIndex((category) => category.id_category === this.id)
          this.StoreService.categories[index] = response
          this.toastService.success('Category Edited successfully')
        },
        error: (err) => {
          console.log(err)
        }
      }
    )
  }

}
