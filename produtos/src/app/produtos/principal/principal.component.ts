import { Component, OnInit } from '@angular/core';
import { CidadeService } from '../principal/service/cidade.service';
import { ProdutoService } from '../principal/service/produto.service';
import { Cidade } from './service/cidade.model';
import { Produto } from './service/produto.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProdutoEditarComponent } from '../principal/modal/produto-editar/produto-editar.component';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})

export class PrincipalComponent implements OnInit {
  activeTab: string = 'produto'; // Aba ativa inicial
  errorMessage: string | null = null;
  successMessage: string | null = null;
  cidades: Cidade[] = [];
  produto: Produto[] = [];
  produtoSelecionado: Produto | null = null;

  constructor(
    private produtoService: ProdutoService,
    private cidadeService: CidadeService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.cidadeService.getCidades().subscribe(
      (data) => {
        this.cidades = data;
      },
      (error) => {
        this.errorMessage = 'Erro ao carregar cidades';
      }
    );

    this.loadProdutos();
  }

  loadProdutos(): void {
    this.produtoService.listarProdutos().subscribe(
      (      data: any[]) => {
        this.produto = data;
        this.errorMessage = '';
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
        this.errorMessage = '';
      },
      error => {
        this.errorMessage = `Erro ao carregar cidades: ${error}`;
      }
    );
  }

  cadastrarProduto(form: any) {
    this.produtoService.cadastrarProduto(form.value).subscribe(
      (response) => {
        this.successMessage = 'Produto cadastrado com sucesso!';
        setTimeout(() => {
          this.refreshPage();
        }, 3000); // Tempo para mostrar a mensagem antes de atualizar
      },
      (error) => {
        this.errorMessage = 'Erro ao cadastrar produto';
      }
    );
  }

  cadastrarCidade(form: NgForm) {
    if (form.valid) {
      this.cidadeService.cadastrarCidade(form.value).subscribe(
        (response) => {
          this.successMessage = 'Cidade cadastrada com sucesso!';
          setTimeout(() => {
            this.refreshPage();
          }, 3000); // Tempo para mostrar a mensagem antes de atualizar
        },
        (error) => {
          this.errorMessage = 'Erro ao cadastrar cidade';
        }
      );
    }
  }

  editarProduto(produto: Produto) {
    this.produtoService.atualizarProduto(produto).subscribe(
      (response) => {
        this.successMessage = 'Produto atualizado com sucesso!';
        this.loadProdutos();
      },
      (error) => {
        this.errorMessage = 'Erro ao atualizar produto';
      }
    );
  }

  abrirModal(produto: Produto | null): void {
    if (produto === null) {
      console.error('Produto não pode ser null');
      return;
    }

    const modalRef = this.modalService.open(ProdutoEditarComponent);
    modalRef.componentInstance.produto = produto;

    modalRef.result.then((result) => {
      if (result) {
        alert(result); // Exibe a mensagem de sucesso retornada pelo modal
        this.loadProdutos(); // Atualiza a lista de produtos
      }
    }).catch((error) => {
      console.error('Erro ao fechar o modal', error);
    });
  }

  confirmarEdicao(produto: Produto | null): void {
    if (produto === null) {
      console.error('Produto não pode ser null');
      return;
    }

    // Continuar com a lógica de edição do produto
    this.produtoService.atualizarProduto(produto).subscribe(
      (response) => {
        this.successMessage = 'Produto atualizado com sucesso!';
        this.loadProdutos();
      },
      (error) => {
        this.errorMessage = 'Erro ao atualizar produto';
      }
    );
  }


  excluirProduto(id?: number): void {
    if (id !== undefined) {
      this.produtoService.excluirProduto(id).subscribe(
        () => {
          this.loadProdutos();
          alert('Produto excluído com sucesso!');
        },
        (error) => {
          console.error('Erro ao excluir produto', error);
        }
      );
    } else {
      console.error('ID do produto não definido.');

    }
  }

  closeAlert() {
    this.successMessage = null;
    this.errorMessage = null;
  }

  private refreshPage() {
    window.location.reload();
  }


}
