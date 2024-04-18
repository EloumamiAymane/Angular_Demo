import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  constructor(private productService:ProductService,
              private router:Router,
              public  appState:AppStateService) {
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts(this.appState.productState.keyword,
                                    this.appState.productState.currentPage,
                                    this.appState.productState.pageSize)
      .subscribe({
        next : data => {
          let products=data.body as Product[];
          let totalProducts:number=parseInt(data.headers.get("x-total-count")!)
          let totalPage=Math.floor(totalProducts/this.appState.productState.pageSize )
          if(totalProducts %  this.appState.productState.pageSize !=0 ) totalPage++;
          this.appState.setProductState({
            products:products,
            totalProducts:totalProducts,
            totalPages:totalPage
          })
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
        // this.appState.setProductState({
        //   products:this.appState.productState.products.filter((p:any)=>p.id!=product.id)
        // });
this.getProducts()
      }
    })
  }

  searchProducts() {
    this.appState.setProductState({
      currentPage:1,
      sizePage:3
    })
    this.getProducts()
  }
  getProductsPage(page:number){
    this.appState.setProductState({
      currentPage:page
    })
    this.getProducts()
  }
  EditProduct(p:Product){
this.router.navigateByUrl("product/" + p.id)

  }
}
