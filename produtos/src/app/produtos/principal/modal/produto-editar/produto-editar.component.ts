import { Cidade } from './../../service/cidade.model';
import { ProdutoService } from './../../service/produto.service';
import { Produto } from './../../service/produto.model';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CidadeService } from '../../service/cidade.service';

@Component({
  selector: 'app-produto-editar',
  templateUrl: './produto-editar.component.html',
  styleUrls: ['./produto-editar.component.css']
})

export class ProdutoEditarComponent implements OnInit {

  produto: Produto = {
    id: 0,
    nome: '',
    valor: 0,
    estoque: 0,
    cidade: { id: 0, nome: '' } // Inicializando com o objeto Cidade
  };

  cidades: Cidade[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private produtoService: ProdutoService,
    private cidadeService: CidadeService
  ) {}

  ngOnInit(): void {
    this.carregarCidades();
  }

  carregarCidades(): void {
    this.produtoService.getCidades().subscribe((cidades: Cidade[]) => {
      this.cidades = cidades;
    });
  }

  onSubmit(form: any): void {
    if (form.valid && this.produto) {
      this.produtoService.atualizarProduto(this.produto).subscribe(
        (response) => {
          this.activeModal.close('Produto atualizado com sucesso!');
        },
        (error) => {
          console.error('Erro ao atualizar produto', error);
        }
      );
    } else {
      console.error('Formulário inválido ou produto não definido');
    }
  }

}
