import { Component, OnInit } from '@angular/core';
import { StoreService } from '../service/store/Store.service';
import { Product } from '../model/Product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = []

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.storeService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        // console.log(this.products);
      }
    )
  }

  buy() {
    console.log("buy")
  }
}