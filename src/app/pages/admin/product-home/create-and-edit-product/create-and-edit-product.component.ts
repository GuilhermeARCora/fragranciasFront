import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { hasFormError } from '../../../../shared/utils/helpers';
import { CommonModule, Location } from '@angular/common';
import { ProductsService } from '../../../../core/services/products/products.service';
import { InputFileComponent } from "../../../../shared/components/input-file/input-file.component";
import { ToastService } from '../../../../core/services/swal/toast.service';
import { ProductForm } from '../../../../shared/types/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyMask } from '../../../../shared/controlValueAcessor/currency/currency-mask.cva';
import { TextFieldModule } from '@angular/cdk/text-field';
import { PercentageSuffix } from '../../../../shared/controlValueAcessor/percentage-sufix/percentage-sufix.cva';
import { DisplayCategoryPipe } from "../../../../shared/pipes/display-category/display-category.pipe";
import { numberValidator } from '../../../../shared/validators/isNumber.validator';
import { BreakPointService } from '../../../../core/services/breakPoint/break-point.service';

@Component({
  selector: 'app-create-and-edit-product',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    InputFileComponent,
    CurrencyMask,
    PercentageSuffix,
    TextFieldModule,
    DisplayCategoryPipe
],
  templateUrl: './create-and-edit-product.component.html',
  styleUrl: './create-and-edit-product.component.scss'
})
export class CreateAndEditProductComponent implements OnInit{

  hasFormError = hasFormError;
  productService = inject(ProductsService);
  toaster = inject(ToastService);
  breakPointService = inject(BreakPointService);

  location = inject(Location);
  router = inject(Router);
  route = inject(ActivatedRoute);

  productForm!: FormGroup;
  allCategories = ['aromatizadores', 'autoCuidado', 'casaEBemEstar'];

  isEdit = signal<boolean>(false);
  id = signal<string | null>('');
  title = signal<string>('Cadastre um Produto!');

  ngOnInit(): void {
    this.createForm();
    this.isEditCheck();
  };

  isEditCheck():void{
    this.id.set(this.route.snapshot.paramMap.get('id'));

    if(this.id()){
      this.isEdit.set(true);
      this.title.set("Edite um Produto!");

      this.productService.getOneProduct(this.id()).subscribe((res) => {
        this.productForm.patchValue(res);
        this.productForm.updateValueAndValidity();
      })
    };

  };

  createForm():void{

    this.productForm = new FormGroup({
      name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      fullPrice: new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(1), numberValidator] }),
      description: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
          Validators.pattern(/^[\w\sÀ-ÿ.,!?"'()-]*$/)
        ]
      }),
      image: new FormControl<File | null>(null),
      categories: new FormControl<string[]>([], { nonNullable: true, validators: [Validators.required] }),
      promoPercentage: new FormControl<number | null>(null),
      cod: new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(1)] }),
    });

  };

  onCheckboxChange(event: MatCheckboxChange): void {
    const categories = this.productForm.get('categories') as FormControl;
    const currentValue = categories.value as string[];

    if (event.checked) {
      categories.setValue([...currentValue, event.source.value]);
    } else {
      categories.setValue(currentValue.filter(v => v !== event.source.value));
    };

    categories.updateValueAndValidity();
    if(currentValue.length === 0 ) categories.markAsTouched();
  };

  onFileSelected(file: File | null) {
    if (file) {
      this.productForm.patchValue({ image: file });
    } else {
      this.productForm.patchValue({ image: null });
    }
    this.productForm.updateValueAndValidity();
  };

  onSubmit():void{

    const formValue = this.productForm.value as ProductForm;
    const {categories, image} = formValue;

    if(categories.length === 0 ) this.productForm.get('categories')?.markAsTouched();

    if (!this.imageValidation(image)) return;


    if(!this.isEdit()) this.saveProduct(formValue);
    else this.editProduct(formValue);

  };

  preventNegative(event: KeyboardEvent) {
    if (event.key === '-' || event.key === 'Subtract') {
      event.preventDefault();
    }
  };

  imageValidation(image: File | string | null): boolean{

    if (!this.isEdit()) {
      // criação → precisa ser File
      if (!(image instanceof File)) {
        this.toaster.error('A imagem é obrigatória');
        return false;
      }
    } else {
      // edição → pode ser string (mantém), mas se não tiver nada é erro
      if (!image) {
        this.toaster.error('Produto deve ter uma imagem');
        return false;
      }
    };

    return true;
  };

  saveProduct(formValue: ProductForm):void{
    this.productService.createProduct(formValue).subscribe({
        next: () => {
          this.toaster.setTimerEnabled(true);
          this.toaster.success("Produto criado com sucesso!")
          this.router.navigateByUrl("/admin/homeProduct");
        },
        error: (err) => {
          this.toaster.setTimerEnabled(false);
          this.toaster.error(err.error.message);
        }
    });
  };

  editProduct(formValue: ProductForm):void{
    this.productService.editProduct(formValue, this.id()).subscribe({
        next: () => {
          this.toaster.setTimerEnabled(true);
          this.toaster.success("Produto editado com sucesso!")
          this.router.navigateByUrl("/admin/homeProduct");
        },
        error: (err) => {
          this.toaster.setTimerEnabled(false);
          this.toaster.error(err.error.message);
        }
    });
  };

  resetForm():void{

    const categories = this.productForm.get('categories') as FormControl;

    if(categories.value){
      categories.setValue([]);
      categories.markAsPristine();
      categories.markAsUntouched();
      categories.updateValueAndValidity();
    };

    if(this.productForm.touched){
      this.productForm.reset();
      this.productForm.markAsPristine();
      this.productForm.markAsUntouched();
      this.productForm.updateValueAndValidity();
    };

  };

  goBack():void{
    this.location.back();
  };

};
