import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from 'src/app/services/product.service';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  public isAdmin: boolean = false; // Thêm biến isAdmin
  public isLoggedIn: boolean = false; // Thêm biến kiểm tra đăng nhập
  productCount: number = 0;

  constructor(private productService: ProductService,
    private webSocketService: WebSocketService 
  ) { }

  ngOnInit() {
    // Lấy role từ localStorage, kiểm tra kiểu dữ liệu
    const role = localStorage.getItem('roles');
    console.log('Role from localStorage:', role);
    // Nếu role là mảng (ví dụ: '["ADMIN"]'), cần parse JSON
    let isAdmin = false;
    if (role) {
      try {
        const parsed = JSON.parse(role);
        if (Array.isArray(parsed)) {
          isAdmin = parsed.includes('ADMIN');
        } else {
          isAdmin = parsed === 'ADMIN';
        }
      } catch {
        isAdmin = role === 'ADMIN';
      }
    }
    this.isAdmin = isAdmin;

    const token = localStorage.getItem('access_token');
    this.isLoggedIn = !!token;

    if (this.isLoggedIn) {
      this.productService.getAll()
        .subscribe((products: Product[]) => {
          if (this.isAdmin) {
            this.products = products;
          } else {
            this.products = products.filter(p => p.productType === 'user-product');
          }
        });
    } else {
      this.products = [];
    }

    // Đăng ký topic phù hợp với role
    if (this.isAdmin) {
      this.webSocketService.subscribeProductCount('/topic/product-count/admin', (count: number) => {
        //console.log('Received user count:', count);
        this.productCount = count;
      });
    } else {
      this.webSocketService.subscribeProductCount('/topic/product-count/user', (count: number) => {
        //console.log('User user count:', count);
        this.productCount = count;
      });
    }
  }

  // Gọi hàm này sau khi logout
  clearProductsOnLogout() {
    this.products = [];
    this.isLoggedIn = false;
    this.isAdmin = false;
  }
}