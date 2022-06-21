import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { User } from "src/users";

@Component({
  selector: 'app-esqueceu-senha',
  templateUrl: './esqueceu-senha.page.html',
  styleUrls: ['./esqueceu-senha.page.scss'],
})
export class EsqueceuSenhaPage implements OnInit {
  public userLogin: User = {};
  private loading: any;

  constructor(public router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,) { }

  /*Redefinir senha por email*/
  async recuperarSenha(){  
    await this.presentLoading();
    
      try {
        const auth = getAuth();
      await sendPasswordResetEmail(auth, this.userLogin.email)
      const toastSucesso = await this.toastCtrl.create({
        message: 'Enviamos um E-mail para você redefinir sua senha!',
        duration: 3000});
        await toastSucesso.present()
      }
      catch(error) {
        const toastErro = await this.toastCtrl.create({
          message: 'Erro ao redefinir senha',
          duration: 3000
        });
        await toastErro.present()  
      }finally {
        this.loading.dismiss();
        this.abrirLogin()
      }
    
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: '' });
    return this.loading.present();
  }

  ngOnInit() {
  }

  abrirLogin(){
    this.router.navigateByUrl(`/home`);
  }
}
