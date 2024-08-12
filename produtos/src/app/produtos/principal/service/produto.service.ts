import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'http://localhost:8080/produto'; // URL base para produtos

  constructor(private http: HttpClient) { }

  // Método para obter todos os produtos
  getProdutos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listar`).pipe(
      catchError(this.handleError) // Tratando erro
    );
  }

  // Método para criar um novo produto
  addProduto(produto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/criar`, produto).pipe(
      catchError(this.handleError) // Tratando erro
    );
  }

  // Lidando com erros
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
