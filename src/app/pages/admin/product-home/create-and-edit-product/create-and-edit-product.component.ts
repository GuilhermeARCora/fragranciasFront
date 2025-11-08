import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { hasFormError } from '../../../../shared/utils/helpers';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../../core/services/products/products.service';
import { ToastService } from '../../../../core/services/swal/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TextFieldModule } from '@angular/cdk/text-field';
import { DisplayCategoryPipe } from '../../../../shared/pipes/display-category/display-category.pipe';
import { numberValidator } from '../../../../shared/validators/isNumber.validator';
import { BreakPointService } from '../../../../core/services/breakPoint/break-point.service';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InputFileComponent } from './input-file/input-file.component';
import EasyMDE from 'easymde';
import type { MatCheckboxChange } from '@angular/material/checkbox';
import type { Product, ProductForm } from '../../../../shared/types/product';
import type { AfterViewInit, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-and-edit-product',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    InputFileComponent,
    TextFieldModule,
    DisplayCategoryPipe,
    ProductCardComponent
  ],
  templateUrl: './create-and-edit-product.component.html',
  styleUrl: './create-and-edit-product.component.scss'
})
export class CreateAndEditProductComponent implements OnInit, AfterViewInit, OnDestroy{

  hasFormError = hasFormError;
  productService = inject(ProductsService);
  toaster = inject(ToastService);
  breakPointService = inject(BreakPointService);

  router = inject(Router);
  route = inject(ActivatedRoute);
  destroyRef = inject(DestroyRef);

  productForm!: FormGroup;
  allCategories: string[] = ['aromatizadores', 'autoCuidado', 'casaEBemEstar', 'destaque'];

  isEdit:boolean = false;
  id:string | null = null;

  productPlaceholder: Product = {
    _id: 'preenchido',
    name: 'Exemplo',
    fullPrice: 100,
    currentPrice: 90,
    pixPrice: 85.5,
    image: '/assets/img/difusorTomada.webp',
    promoPercentage: 10
  };

  product: Product= this.productPlaceholder;
  easyMDE!: EasyMDE;

  ngOnInit(): void {
    this.createForm();
    this.isEditCheck();

    this.productForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.createTheProductForDisplay();
    });
  };

  ngAfterViewInit(): void {
    this.setupDescription();
  };

  isEditCheck():void{
    this.id = this.route.snapshot.paramMap.get('id');

    if(this.id){
      this.isEdit = true;
      const productState = history.state['product'] as Product | undefined;

      if(productState){
        this.productForm.patchValue(productState);
        this.productForm.updateValueAndValidity();
      }else{
        this.productService.getOneProduct(this.id).subscribe((res) => {
          this.productForm.patchValue(res);
          this.productForm.updateValueAndValidity();
        });
      };

      this.createTheProductForDisplay();
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
          Validators.maxLength(3000),
          Validators.pattern(/^(?!.*<[^>]+>)(?!.*\$\w+)[\s\S]*$/)
        ]
      }),
      image: new FormControl<File | null>(null),
      categories: new FormControl<string[]>([], { nonNullable: true, validators: [Validators.required] }),
      promoPercentage: new FormControl<number | null>(0),
      cod: new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(1)] })
    });

  };

  onCheckboxChange(event: MatCheckboxChange):void {
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

  onFileSelected(file: File | null):void {
    if (file) this.productForm.patchValue({ image: file });

    else this.productForm.patchValue({ image: null });

    this.productForm.updateValueAndValidity();
  };

  onSubmit():void{

    const formValue = this.productForm.value as ProductForm;
    const { categories, image } = formValue;

    if(categories.length === 0 ) this.productForm.get('categories')?.markAsTouched();

    if (!this.imageValidation(image)) return;

    if(!this.isEdit) this.saveProduct(formValue);
    else this.editProduct(formValue);
  };

  preventNegative(event: KeyboardEvent) {
    if (event.key === '-' || event.key === 'Subtract') {
      event.preventDefault();
    };
  };

  imageValidation(image: File | string | null): boolean{

    if (!this.isEdit) {
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
        this.toaster.success('Produto criado com sucesso!');
        this.router.navigateByUrl('/admin/produtos');
      },
      error: (err) => {
        this.toaster.setTimerEnabled(false);
        this.toaster.error(err.error.message);
      }
    });
  };

  editProduct(formValue: ProductForm):void{
    this.productService.editProduct(formValue, this.id).subscribe({
      next: () => {
        this.toaster.setTimerEnabled(true);
        this.toaster.success('Produto editado com sucesso!');
        this.router.navigateByUrl('/admin/produtos');
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

    this.productForm.patchValue({
      name: '',
      fullPrice: null,
      promoPercentage: 0,
      cod: null,
      description: '',
      image: null
    });
    this.productForm.updateValueAndValidity();

    this.product = this.productPlaceholder;
  };

  createTheProductForDisplay():void{
    const formValue = this.productForm.value as ProductForm;
    const { name, image, fullPrice, promoPercentage } = formValue;

    let currentPrice = fullPrice;
    if (promoPercentage && promoPercentage > 0) currentPrice = fullPrice * (1 - promoPercentage / 100);

    const pixPrice = currentPrice * (1 - 5 / 100);

    let finalImage: string | File = '';
    if (image instanceof File) {
      // cria uma URL temporária para preview
      finalImage = URL.createObjectURL(image);
    } else {
      finalImage = image;
    };

    this.product = {
      _id: 'preenchido',
      name: name,
      fullPrice: fullPrice,
      currentPrice: currentPrice,
      pixPrice: pixPrice,
      image: finalImage,
      promoPercentage: promoPercentage ?? 0
    };
  };

  setupDescription(): void {
    const textarea = document.getElementById('input-description') as HTMLTextAreaElement;
    if (!textarea) return;

    // Initialize EasyMDE
    this.easyMDE = new EasyMDE({
      element: textarea,
      spellChecker: false,
      placeholder: 'Use markdown para fazer a descrição...',
      toolbar: [
        {
          name: 'bold',
          action: EasyMDE.toggleBold,
          className: 'fa fa-bold',
          title: 'Negrito (Ctrl+B)'
        },
        {
          name: 'italic',
          action: EasyMDE.toggleItalic,
          className: 'fa fa-italic',
          title: 'Itálico (Ctrl+I)'
        },
        {
          name: 'heading',
          action: EasyMDE.toggleHeadingSmaller,
          className: 'fa fa-header',
          title: 'Título (Ctrl+H)'
        },
        '|',
        {
          name: 'quote',
          action: EasyMDE.toggleBlockquote,
          className: 'fa fa-quote-left',
          title: 'Citação (Ctrl+\')'
        },
        {
          name: 'unordered-list',
          action: EasyMDE.toggleUnorderedList,
          className: 'fa fa-list-ul',
          title: 'Lista não ordenada (Ctrl+L)'
        },
        {
          name: 'ordered-list',
          action: EasyMDE.toggleOrderedList,
          className: 'fa fa-list-ol',
          title: 'Lista ordenada (Ctrl+Alt+L)'
        },
        '|',
        {
          name: 'link',
          action: EasyMDE.drawLink,
          className: 'fa fa-link',
          title: 'Inserir link (Ctrl+K)'
        },
        {
          name: 'line-break',
          action: editor => {
            const cm = editor.codemirror;
            const pos = cm.getCursor();
            cm.replaceRange('<br>\n', pos);
            cm.focus();
          },
          className: 'fa fa-level-down',
          title: 'Quebra de linha (<br>)'
        },
        '|',
        {
          name: 'preview',
          action: EasyMDE.togglePreview,
          className: 'fa fa-eye no-disable',
          title: 'Pré-visualizar (Ctrl+P)'
        }
      ]
    });

    // Keep form and EasyMDE in sync
    this.easyMDE.codemirror.on('change', () => {
      const value = this.easyMDE.value();
      this.productForm.get('description')?.setValue(value);
    });

    // If editing an existing product, set content
    const current = this.productForm.get('description')?.value;
    if (current) this.easyMDE.value(current);
  };

  goBack():void{
    this.router.navigateByUrl('/admin/produtos');
  };

  ngOnDestroy(): void {
    if (this.product?.image && typeof this.product.image === 'string' && this.product.image.startsWith('blob:')) {
      URL.revokeObjectURL(this.product.image);
    };

    if (this.easyMDE) {
      this.easyMDE.toTextArea();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.easyMDE = undefined as any;
    }
  };

};
