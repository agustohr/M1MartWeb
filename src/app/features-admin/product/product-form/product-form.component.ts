import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../category/category.service';
import { Category } from '../../category/category.model';
import { ProductService } from '../product.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  @Input() id!: number;
  selectListCategory: Category[] = [];
  fileSrc: string | null = 'no-file';
  form = new FormGroup({
    name: new FormControl('', {validators: [Validators.required]}),
    categoryId: new FormControl<string>('', {validators: [Validators.required]}),
    price: new FormControl<number | null>(null, {validators: [Validators.required]}),
    stock: new FormControl<number | null>(0, {validators: [Validators.required]}),
    description: new FormControl<string | null>(null),
    image: new FormControl<File | null>(null),
    // releaseDate: new FormControl('', {validators: [Validators.required]}),
  });
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor(private categoryService: CategoryService, private productService: ProductService){}
  
  ngOnInit(): void {
    this.getSelectListCategory();
    if(this.id){
      this.productService.getProductById(this.id).subscribe({
        next: (product) => {
          this.form.patchValue({
            name: product.data.name,
            categoryId: product.data.category.id.toString(),
            price: product.data.price,
            stock: product.data.stock,
            description: product.data.description,
            // releaseDate: product.data.releaseDate
          });
        }
      });
      this.fileSrc = `http://localhost:5020/api/v1/Product/${this.id}/product-image`;
    }
  }


  private getSelectListCategory(){
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.selectListCategory = categories.data;
      }
    })
  }

  onSubmit(){
    if(this.form.valid){
      const formData = new FormData();
      formData.append('name', this.form.get('name')?.value!);
      formData.append('categoryId', this.form.get('categoryId')?.value!);
      formData.append('price', (this.form.get('price')?.value!).toString());
      formData.append('stock', (this.form.get('stock')?.value!).toString());
      formData.append('description', this.form.get('description')?.value!);
      formData.append('image', this.form.get('image')?.value!);
      // formData.append('releaseDate', this.form.get('releaseDate')?.value!);
      if(this.id){
        this.productService.updateProduct(this.id, formData).subscribe({
          next: (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: `Product with name ${res.data.name} has been updated`,
              confirmButtonText: 'OK',
            }).then(() => {
              this.router.navigate(['../../'], {relativeTo: this.route});
            })
          },
          error: () => {
            Swal.fire({
              title: 'Product was failed to update!',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          }
        });
      } else {
        this.productService.createProduct(formData).subscribe({
          next: (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: `Product with name ${res.data.name} has been added`,
              confirmButtonText: 'OK',
            }).then(() => {
              this.router.navigate(['../'], {relativeTo: this.route});
            })
          },
          error: () => {
            Swal.fire({
              title: 'Product was failed to add!',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          }
        });
      }
    }
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if(target.files!.length > 0) {
      const file: File | null = target.files![0];
      
      this.form.patchValue({image: file});

      this.fileSrc = URL.createObjectURL(file);
    }
  }
}
