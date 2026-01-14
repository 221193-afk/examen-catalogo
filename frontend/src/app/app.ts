import { Component, OnInit } from '@angular/core';
import { CategoryService } from './services/category';
import { ProductService } from './services/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html'
})
export class AppComponent implements OnInit {

  categories: any[] = [];
  products: any[] = [];

  selectedCategoryId: number = 0;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;

      if (this.categories.length > 0) {
        this.selectedCategoryId = this.categories[0].id;
        this.loadProducts(this.selectedCategoryId);
      }
    });
  }

  onCategoryChange(event: any) {
    const id = Number(event.target.value);
    this.selectedCategoryId = id;
    this.loadProducts(id);
  }

  loadProducts(id: number) {
    this.productService.byCategory(id).subscribe(data => {
      this.products = data;
    });
  }
}