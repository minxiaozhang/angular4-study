import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product, ProductService, Comment} from '../shared/product.service';
import {WebSocketService} from '../shared/web-socket.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private  product: Product;
  private  comments: Comment[];

  newRating: number = 5;
  newComment: string = '';

  subscription:Subscription;

  constructor(private  routeInfo: ActivatedRoute,
              private productService: ProductService,
              private  webSocketService: WebSocketService) { }
  isCommentHidden: boolean = true;

  isWatched: boolean = false;
  currentBid: number;

  ngOnInit() {
    const productId: number = this.routeInfo.snapshot.params.productId;
    // this.product = this.productService.getProduct(productId);
    this.productService.getProduct(productId).subscribe(
      product => {
        this.product = product;
        this.currentBid = product.price;
      }
    );
    // this.comments = this.productService.getCommentsForProductId(productId);
    this.productService.getCommentsForProductId(productId).subscribe(
      comments => this.comments = comments
    );

  }
  addComment() {
    console.log(this.newRating);
    const comment = new Comment(0, this.product.id, new Date().toISOString(), '游客', this.newRating, this.newComment);
    this.comments.unshift(comment);
    const sum = this.comments.reduce((sum, comment) => sum + comment.rating, 0);
    this.product.rating = sum / this.comments.length;
    this.newComment = null;
    this.newRating = 5;
    this.isCommentHidden = true ;
  }

  watchProduct() {
    if(this.subscription){ //如果不为空说明 关注过
      this.subscription.unsubscribe(); //取消订阅
      this.isWatched =false;
      this.subscription=null;
    }else {  //如果为空说明没有关注过
      this.isWatched =true;
      this.subscription= this.webSocketService.creatObservableSocket('ws://localhost:8083',this.product.id)
        .subscribe(
          products => {
            console.log("products",products)
            if(products.length>0){
              let product = products.find(p =>p.productId==this.product.id);
              if(product){
                this.currentBid =product.bid;
              }
            }

          }
        );
    }
  }
}
