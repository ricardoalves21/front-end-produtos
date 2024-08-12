import { Component, OnInit } from '@angular/core';
import { CidadeService } from '../principal/service/cidade.service';
import { ProdutoService } from '../principal/service/produto.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  activeTab: string = 'produto'; // Aba ativa inicial
  produtos: any[] = [];
  cidades: any[] = [];
  errorMessage: string = ''; // Variável para armazenar mensagens de erro

  constructor(
    private produtoService: ProdutoService,
    private cidadeService: CidadeService
  ) {}

  ngOnInit(): void {
    this.loadProdutos();
    this.loadCidades();
  }

  loadProdutos(): void {
    this.produtoService.getProdutos().subscribe(
      (      data: any[]) => {
        this.produtos = data;
        this.errorMessage = ''; // Limpa a mensagem de erro em caso de sucesso
      },
      (      error: any) => {
        this.errorMessage = `Erro ao carregar produtos: ${error}`;
      }
    );
  }

  loadCidades(): void {
    this.cidadeService.getCidades().subscribe(
      data => {
        this.cidades = data;
        this.errorMessage = ''; // Limpa a mensagem de erro em caso de sucesso
      },
      error => {
        this.errorMessage = `Erro ao carregar cidades: ${error}`;
      }
    );
  }


  cadastrarProduto(form: any): void {
    const produto = {
      nome: form.value.nome,
      valor: form.value.valor,
      estoque: form.value.estoque,
      cidade: form.value.cidade
    };
    this.produtoService.addProduto(produto).subscribe(
      () => {
        this.loadProdutos();
        this.errorMessage = ''; // Limpa a mensagem de erro em caso de sucesso
      },
      (      error: any) => {
        this.errorMessage = `Erro ao cadastrar produto: ${error}`;
      }
    );
  }

  cadastrarCidade(form: any): void {
    const cidade = {
      nome: form.value.nome
    };
    this.cidadeService.addCidade(cidade).subscribe(
      () => {
        this.loadCidades();
        this.errorMessage = ''; // Limpa a mensagem de erro em caso de sucesso
      },
      (      error: any) => {
        this.errorMessage = `Erro ao cadastrar cidade: ${error}`;
      }
    );
  }
}
