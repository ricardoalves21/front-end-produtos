import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {
  private apiUrl = 'http://localhost:8080/cidade'; // URL base para cidades

  constructor(private http: HttpClient) { }

    // Obter todas as cidades
    getCidades(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl).pipe(
        catchError(this.handleError) // Adiciona tratamento de erro
      );
    }

    // Criar uma nova cidade
    addCidade(cidade: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/criar`, cidade).pipe(
        catchError(this.handleError) // Adiciona tratamento de erro
      );
    }

  // Função para lidar com erros
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
