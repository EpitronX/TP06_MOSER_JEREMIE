import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HTTPExchangeService } from './httpexchange.service';
import { Product } from './product.model';
import { AppComponent } from './app.component';
import { ProductsViewComponent } from './products-view/products-view.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { ProductState } from './states/product.state';
import { NgxsModule } from '@ngxs/store';
import { PanierComponent } from './panier/panier.component';
import { ApiService } from './api.service';
import { ApiHttpInterceptor } from './http-interceptor';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations:
    [
      AppComponent,
      ProductsViewComponent,
      SearchBarComponent,
      PanierComponent,
      LoginComponent
    ],
  imports:
    [
      NgxsModule.forRoot([ProductState]),
      BrowserModule,
      HttpClientModule,
      FormsModule
    ],
  providers:
    [
      { provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true },
      [ApiService],
    ],
  bootstrap: [AppComponent],
})
export class AppModule { }
