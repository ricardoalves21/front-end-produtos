import { PrincipalComponent } from './../principal.component';
import { ProdutoService } from './produto.service';
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Produto } from './produto.model';


describe('ProdutoService', () => {

  let service: ProdutoService;
  let httpTestingController: HttpTestingController;
  let controllerProduto: PrincipalComponent;


  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [PrincipalComponent],
    providers: [ProdutoService],
    imports: [HttpClientTestingModule],
  });
    service = TestBed.inject(ProdutoService);
    httpTestingController = TestBed.inject(HttpTestingController);
    controllerProduto = TestBed.createComponent(PrincipalComponent).componentInstance;
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  it('Cadastrar produto', () => {
    const produtoTest: Produto = <any>{};

    service.cadastrarProduto(produtoTest).subscribe(res => {
      expect(res).toEqual(produtoTest);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/produto/criar');
    expect(req.request.method).toBe('POST');
    req.flush(produtoTest);
  });


  it('Listar produtos', () => {
    service.listarProdutos().subscribe(res => {
      expect(res).toEqual([]);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/produto/listar');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


});
