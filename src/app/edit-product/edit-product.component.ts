import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product} from "../model/product.model";
import {ProductService} from "../services/product.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  public productId!: number ;
  public productForm!:FormGroup;
constructor(private activateRoute:ActivatedRoute,private productService:ProductService,private fb:FormBuilder) {
}

  ngOnInit(): void {
  this.productId=this.activateRoute.snapshot.params['id']
    this.productService.getProduct(this.productId).subscribe({
      next:(product)=>{
        this.productForm=this.fb.group({
          id:this.fb.control(product.id),
          name:this.fb.control(product.name),
          price:this.fb.control(product.price),
          checked:this.fb.control(product.checked)
          }

        )
      },
      error:(error)=>{
        console.log(error)
      }

      }
    )

  }
  editProduct(){
  let product=this.productForm.value
   this.productService.updateProduct(product).subscribe({
     next:(data)=>{
       alert(JSON.stringify(data))
     }
   })
  }

}
