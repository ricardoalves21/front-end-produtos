import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './produtos/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './produtos/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { LottieCacheModule } from 'ngx-lottie';
import { PrincipalComponent } from './produtos/principal/principal.component';
import { ProdutoService } from './produtos/principal/service/produto.service';
import { CidadeService } from './produtos/principal/service/cidade.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProdutoEditarComponent } from '../app/produtos/principal/modal/produto-editar/produto-editar.component';


export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    PrincipalComponent,
    ProdutoEditarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    NgbModule,
    LottieModule.forRoot({ player: playerFactory }),
    LottieCacheModule.forRoot()
  ],
  providers: [
    ProdutoService,
    CidadeService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
