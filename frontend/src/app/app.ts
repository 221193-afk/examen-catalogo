import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from './services/category';
import { ProductService } from './services/product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // 🔥 ESTO ES LO QUE FALTABA
  templateUrl: './app.html'
})
export class AppComponent implements OnInit {

  categories: any[] = [];
  products: any[] = [];

  selectedCategoryId: number | null = null;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

  onCategorySelected() {
    if (this.selectedCategoryId !== null) {
      this.productService
        .byCategory(this.selectedCategoryId)
        .subscribe(data => this.products = data);
    } else {
      this.products = [];
    }
  }
}