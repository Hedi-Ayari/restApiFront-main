import { Component, inject } from '@angular/core';
import { StoreService } from '../service/store/Store.service';
import { Category } from '../model/category';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Product } from '../model/Product';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoginComponent],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css'
})
export class AddProductsComponent {

  categories: Category[] = []
  products: Product[] = []
  productForm: FormGroup = new FormGroup({});
  editMode: boolean = false;
  private toastService = inject(HotToastService);
  private id: number = 0;


  constructor(private StoreService: StoreService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      lib: ['', Validators.required],
      prix: [1, [Validators.required, Validators.min(0)]],
      qte: [1, [Validators.required, Validators.min(0)]],
      categories: ['', [Validators.required, this.notEmptyString]]
    })
    this.StoreService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    })
    this.StoreService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    })
  }
  notEmptyString(control: AbstractControl) {
    return control.value && control.value.trim() !== '' ? null : { notEmptyString: true };
  }
  onSubmit() {
    const formValue = this.productForm.value;
    const payload: any = {
      lib: formValue.lib,
      prix: formValue.prix,
      qte: formValue.qte,
      categorie: {
        id_category: formValue.categories
      }
    };


    if (!this.editMode) {
      this.StoreService.addProduct(payload).subscribe({
        next: (response) => {
          this.toastService.success('Project added successfully')
          this.products.push(response);
          this.productForm.reset();

        },
        error: (err) => {
          this.toastService.error(err.error.message)
        }
      })
    } else {
      payload.id_produit = this.id;
      this.StoreService.updateProduct(payload).subscribe({
        next: (response) => {
          this.toastService.success('Project Edited successfully')
          const index = this.products.findIndex(product => product.id_produit === response.id_produit);
          this.products[index] = response;
          this.productForm.reset();
          this.editMode = false;
        },
        error: (err) => {
          this.toastService.error(err.error.message)
        }
      })
    }
  }

  onDelete(id: number) {
    this.StoreService.deleteProduct(id).subscribe({
      next: (response) => {
        this.toastService.success('Product deleted successfully')
        this.products = this.products.filter(product => product.id_produit !== id);
      },
      error: (err) => {
        this.toastService.error(err.error.message)
      }
    })
  }

  onEdit(id: number) {
    this.editMode = true
    this.id = id;
    console.log(id)
    this.StoreService.getProduct(id).subscribe({
      next: (response) => {
        // console.log(response)
        this.productForm.patchValue({
          lib: response.lib,
          prix: response.prix,
          qte: response.qte,
          categories: response.categorie.id_category
        })

      },
      error: (err) => {
        this.toastService.error(err.error.message)
      }
    })
  }

}
