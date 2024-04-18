import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Router} from "@angular/router";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  public products :Array<Product>=[];
  public keyword : string="";
  public totalPage:number=0;
  public currentPage:number=1;
  public sizePage:number=3;
  constructor(private productService:ProductService,private router:Router) {
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts(this.keyword,this.currentPage,this.sizePage)
      .subscribe({
        next : data => {
          this.products=data.body as Product[];
          let totalProducts:number=parseInt(data.headers.get("x-total-count")!)
          this.totalPage=Math.floor(totalProducts/this.sizePage)
          if(totalProducts % this.sizePage !=0 ) this.totalPage++;
        },
        error : err => {
          console.log(err);
        }
      })
  }


  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product).subscribe({
      next :updatedProduct => {
        product.checked=!product.checked;
      }
    })
  }

  handleDelete(product: Product) {
    if(confirm("Etes vous sûre?"))
    this.productService.deleteProduct(product).subscribe({
      next:value => {
        this.products=this.products.filter(p=>p.id!=product.id);
      }
    })
  }

  searchProducts() {
    this.currentPage=1
    this.sizePage=3
    this.getProducts()
  }
  getProductsPage(page:number){
    this.currentPage=page;
    this.getProducts()
  }
  EditProduct(p:Product){
this.router.navigateByUrl("product/" + p.id)

  }
}
