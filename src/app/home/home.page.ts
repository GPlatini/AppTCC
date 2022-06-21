import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/users';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';
/*import { AngularFireAuthModule } from "@angular/fire/compat/auth";*/

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public userLogin: User = {};
  private loading: any;

  constructor(
    public router: Router,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController, 
    ) {}
    
    /*login authentication firebase*/
    async login() {
      await this.presentLoading();
      
      try {
        await this.authService.login(this.userLogin);
        this.abrirEntrar();
      } catch (error) {
        const toastErroLogin = await this.toastCtrl.create({
          message: 'Usuário ou senha inválidos!',
          duration: 3000,
          color: 'danger'
        })
        await toastErroLogin.present()
      } finally {
        this.loading.dismiss();      
      }
    }

    async presentLoading() {
      this.loading = await this.loadingCtrl.create({ message: '' });
      return this.loading.present();
    }
  
    async presentToast(message: string) {
      const toast = await this.toastCtrl.create({ message, duration: 2000 });
      toast.present();
    }

  abrirCadastrar(){
    this.router.navigateByUrl(`/cadastrar`);
  }

  abrirEntrar(){
    this.router.navigateByUrl(`/tabs`);
  }
  
  abrirEsqueceuSenha(){
    this.router.navigateByUrl(`/esqueceu-senha`);
  }
}
