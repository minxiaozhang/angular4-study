import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product, ProductService, Comment} from '../shared/product.service';

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
  constructor(private  routeInfo: ActivatedRoute,
              private productService: ProductService) { }
  isCommentHidden: boolean = true;
  ngOnInit() {
    const productId: number = this.routeInfo.snapshot.params.productId;
    // this.product = this.productService.getProduct(productId);
    this.productService.getProduct(productId).subscribe(
      product => this.product = product
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
    let sum=this.comments.reduce((sum,comment)=>sum+comment.rating,0);
    this.product.rating=sum/this.comments.length;
    this.newComment = null;
    this.newRating = 5;
    this.isCommentHidden = true ;
  }

}
