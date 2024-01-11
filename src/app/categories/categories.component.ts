import { Component, OnInit, inject } from '@angular/core';
import { StoreService } from '../service/store/Store.service';
import { Category } from '../model/category';
import { CommonModule } from '@angular/common';
import { EditCategoriesComponent } from '../edit-categories/edit-categories.component';
import { AddCategoriesComponent } from '../add-categories/add-categories.component';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, EditCategoriesComponent, AddCategoriesComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = []

  private toastService = inject(HotToastService);

  constructor(private storeService: StoreService) { }



  ngOnInit(): void {
    this.storeService.getCategories().subscribe(
      {
        next: (response: Category[]) => {
          // console.log(response)
          this.storeService.categories = response
          this.categories = this.storeService.categories

        },
        error: (err) => {
          console.log(err)
        }
      }

    )
  }

  onDelete(id: number) {
    this.storeService.deleteCategory(id).subscribe({
      next: (response) => {
        console.log(response)
        this.storeService.categories = this.storeService.categories.filter(category => category.id_category != id)
        this.toastService.success('Category deleted successfully')
        this.categories = this.storeService.categories
      },
      error: (err) => {
        if (err.error.message.includes('Cannot delete or update a parent row: a foreign key constraint fails')) {

          this.toastService.error('Cannot delete category with products')
        }
        console.log(err)
      }
    })
  }

  onEdit(item: Category) {
    console.log(item)
    this.storeService.setCategory(item)

  }


}
