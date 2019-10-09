import { Component, OnInit } from '@angular/core';
import {Product, ProductService} from '../shared/product.service';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  dataSource: Observable<any>;
  // products: Array<any> = [];
  products: Observable<any>;
 /* private products: Product[];*/
  private imgUrl = 'http://placehold.it/320x150' ;
  private keyword: string;
  private titleFilter: FormControl = new FormControl();
  constructor(private productService: ProductService,
              private http: HttpClient ) {
    this.titleFilter.valueChanges
      .subscribe(value => this.keyword = value );
    // 此处get 只是定义并没有调用
    // this.dataSource = this.http.get('api/products') ;
    // 或者这么写，在模板中使用async 管道方法直接订阅
   // this.products= this.http.get('api/products') ;
  }
  ngOnInit() {
    this.products = this.productService.getProducts();
    this.productService.searchEvent.subscribe(
      params => this.products = this.productService.search(params)
    );


    // subscribe 才是真正调用方法
   /* this.dataSource.subscribe((data)=>{
      this.products = data
    })*/
  }
}

