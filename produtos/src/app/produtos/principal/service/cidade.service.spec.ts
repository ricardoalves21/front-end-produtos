import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CidadeService } from './cidade.service';
import { Cidade } from '../service/cidade.model';

describe('CidadeService', () => {
  let service: CidadeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CidadeService]
    });
    service = TestBed.inject(CidadeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('Cadastrar cidade', () => {
    const cidadeTes: Cidade = <any>{};

    service.cadastrarCidade(cidadeTes).subscribe(res => {
      expect(res).toEqual(cidadeTes);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/cidade/criar');
    expect(req.request.method).toBe('POST');
    req.flush(cidadeTes);
  });

  it('Buscar cidades', () => {
    service.getCidades().subscribe(res => {
      expect(res).toEqual([]);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/cidade/listar');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
