import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './produtos/footer/footer.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './produtos/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import player from 'lottie-web';
import { PrincipalComponent } from './produtos/principal/principal.component';
import { ProdutoService } from './produtos/principal/service/produto.service';
import { CidadeService } from './produtos/principal/service/cidade.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProdutoEditarComponent } from '../app/produtos/principal/modal/produto-editar/produto-editar.component';


export function playerFactory() {
  return player;
}

@NgModule({ declarations: [
        AppComponent,
        FooterComponent,
        NavbarComponent,
        PrincipalComponent,
        ProdutoEditarComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        CommonModule,
        NgbModule,
      ],
        providers: [
        ProdutoService,
        CidadeService,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule {}
