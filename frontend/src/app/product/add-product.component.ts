import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, Product } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  //styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product: Partial<Product> = {
    name: '',
    description: '',
    price: 0, // kiểu number, form đã có step="0.01"
    imgUrl: '',
    productType: ''
  };

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  addProduct() {
    this.productService.addProduct(this.product).subscribe(
      () => {
        alert('Thêm sản phẩm thành công!');
        this.router.navigate(['/']);
      },
      error => {
        alert('Thêm sản phẩm thất bại!');
        console.error(error);
      }
    );
  }
}
