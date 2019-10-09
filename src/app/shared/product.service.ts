import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import {encode} from 'punycode';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter();

   private products: Product[] = [
    new Product(1, '第一个商品', 1.99, 3.5, 'mi奥数', ['电子产品', '硬件设备']),
    new Product(2, '第二个商品', 3.99, 2.5, 'mi奥数', ['电子产品', '硬件设备']),
    new Product(3, '第三个商品', 4.99, 4.5, 'mi奥数', ['电子产品', '硬件设备']),
    new Product(4, '第四个商品', 2.99, 1.5, 'mi奥数', ['电子产品', '硬件设备']),
    new Product(5, '第五个商品', 6.99, 3.5, 'mi奥数', ['图书']),
    new Product(6, '第六个商品', 8.99, 2.5, 'mi奥数', ['电子产品', '硬件设备']),
  ];
   private  comments: Comment[] = [
     new Comment(1, 1, '2017-03-04 23:12:43', '张三', 3, '还行吧'),
     new Comment(2, 1, '2017-03-04 23:12:43', '李四', 3.5, '还行吧'),
     new Comment(3, 3, '2017-03-04 23:12:43', '发送到', 4.5, '还行吧'),
     new Comment(4, 3, '2017-03-04 23:12:43', '水电费', 3, '还行吧'),
     new Comment(5, 5, '2017-03-04 23:12:43', '双方都', 1.5, '还行吧'),
     new Comment(6, 6, '2017-03-04 23:12:43', '水电费V型', 3, '还行吧'),
   ];

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    // @ts-ignore
    return this.http.get('api/products').map(res => res);
    // return this.products;
  }
  getProduct(id: number ): Observable<Product> {
    // @ts-ignore
    return this.http.get('api/product/' + id).map(res => res);
    // return this.products.find((product) => product.id == id );
  }
  getCommentsForProductId(id: number): Observable<Comment[]> {
    // @ts-ignore
    return this.http.get('api/comments/' + id).map(res => {
      console.log(res);
      return res;
    });
     // return this.comments.filter((comment: Comment ) => comment.productId == id);
  }
  getAllCategories(): string[] {
    return ['电子产品', '硬件设备', '图书'];

  }


  search(params: ProductSearchParams): Observable<Product[]> {
    // @ts-ignore
    return this.http.get('/api/products',  { headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: this.encodeParams(params)}).map(res => res);
  }

  private encodeParams(params: ProductSearchParams) {
   return   Object.keys(params)
      .filter(key => params[key])
      .reduce((sum: HttpParams, key: string) => {
        return  sum.append(key, params[key]);
      }, new HttpParams());

  }
}




export  class ProductSearchParams {

  constructor(public title: string,
              public price: number,
              public categories: string) {}
}

export  class  Product {
  constructor(
    public  id: number,
    public title: string,
    public  price: number,
    public rating: number,
    public  desc: string,
    public categories: Array<string>) {

  }
}
export  class Comment {
  constructor(
    public id: number,
    public productId: number,
    public timestamp: string,
    public user: string,
    public rating: number,
    public content: string) {

  }
}
