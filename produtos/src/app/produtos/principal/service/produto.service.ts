import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Produto } from './produto.model';
import { Cidade } from './cidade.model';
import { CidadeService } from './cidade.service';

@Injectable({
  providedIn: 'root'
})

export class ProdutoService {


  private apiUrl = 'http://localhost:8080/produto'; // URL base para produtos


  constructor(
    private http: HttpClient,
    private cidadeService: CidadeService // Injete o CidadeService
  ) { }

  getApiUrl(): string {
    return this.apiUrl;
  }

  listarProdutos(): Observable<Produto[]> {
    const url = `${this.apiUrl}/listar`;
    return this.http.get<Produto[]>(url).pipe(
      catchError((error) => {
        console.error('Erro ao listar produtos:', error);
        return throwError(error);
      })
    );
  }


  cadastrarProduto(produto: Produto): Observable<Produto> {
    const url = `${this.apiUrl}/criar`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<Produto>(url, produto, { headers }).pipe(
      catchError((error) => {
        console.error('Erro ao cadastrar produto:', error);
        return throwError(error);
      })
    );
  }


  atualizarProduto(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}/atualizar`, produto);
  }


  excluirProduto(id?: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  getCidades(): Observable<Cidade[]> {
    return this.cidadeService.getCidades();
  }


  // Mètodo para tratar erros
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido!';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Código de status: ${error.status}\nMensagem: ${error.message}`;
    }


    return throwError(errorMessage);
  }
}
