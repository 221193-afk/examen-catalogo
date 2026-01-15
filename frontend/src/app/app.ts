import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.services';  // ajusta la ruta
// Importa tus servicios de categorías y productos si los usas aquí
import { CategoryService } from './services/category';
import { ProductService } from './services/product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule /* + RouterModule si usas rutas más adelante */],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  isLoggedIn = false;
  username = '';
  password = '';
  error: string | null = null;

  // Variables del catálogo (decláralas aquí si no las tienes en otro componente)
  selectedCategoryId: number | null = null;
  categories: any[] = [];      // llenar con CategoryService
  products: any[] = [];        // llenar con ProductService

  constructor(
    private authService: AuthService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    // Opcional: cargar categorías al iniciar si quieres
    this.categoryService.getAll().subscribe(cats => this.categories = cats);
  }

  onLogin() {
    if (!this.username || !this.password) {
      this.error = 'Completa todos los campos';
      return;
    }

    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () => {
        this.isLoggedIn = true;
        this.error = null;
        this.username = '';
        this.password = '';
        // Aquí puedes cargar categorías/productos iniciales si quieres
      },
      error: () => {
        this.error = 'Usuario o contraseña incorrectos';
      }
    });
  }
  ngOnInit() {
  if (this.isLoggedIn) {
    this.cargarCategorias();
  }
}

  cargarCategorias() {
  console.log('Intentando cargar categorías después del login...');
  this.categoryService.getAll().subscribe({
    next: (cats) => {
      console.log('Categorías recibidas:', cats);
      this.categories = cats || [];
      // Opcional: selecciona la primera categoría automáticamente
      if (cats?.length > 0) {
        this.selectedCategoryId = cats[0].id;
        this.onCategorySelected();  // carga productos de la primera
      }
    },
    error: (err) => {
      console.error('Error cargando categorías:', err);
      this.error = 'No se pudieron cargar las categorías';
    }
  });
}
  onCategorySelected() {
  console.log('Categoría seleccionada:', this.selectedCategoryId);  // ← agrega este log

  if (!this.selectedCategoryId) {
    this.products = [];
    return;
  }

  console.log('Solicitando productos para categoría:', this.selectedCategoryId);

  this.productService.byCategory(this.selectedCategoryId).subscribe({
    next: (prods) => {
      console.log('Productos recibidos:', prods);
      this.products = prods || [];
    },
    error: (err) => {
      console.error('Error al cargar productos:', err);
      this.products = [];
      // Opcional: mostrar mensaje
      alert('Error al cargar productos: ' + err.message);
    }
  });
}
}