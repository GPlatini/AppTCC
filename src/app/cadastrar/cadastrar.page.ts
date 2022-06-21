import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/users';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  public userRegister: User = {};
  private loading: any;

  constructor(
    public router: Router,
    private authService: AuthService,
    private afs: AngularFirestore,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    ) { }

    /*Cadastrar usuário no firebase*/
    async register() {
      await this.presentLoading();

      try {
        const newUser = await this.authService.register(this.userRegister);
        await this.afs.collection('Users').doc(newUser.user.uid).set(this.userRegister);
        const toastSucesso = await this.toastCtrl.create({
          message: 'Usuário cadastrado com sucesso!',
          duration: 3000,
          color:'sucess'});
          await toastSucesso.present()
      } catch (error) {
        const toastErro = await this.toastCtrl.create({
          message: 'Usuário já cadastrado',
          duration: 3000,
          color:'danger'
        });
        await toastErro.present()       
    } finally {
      this.loading.dismiss();
      this.abrirLogin()
    }
    }

    async presentLoading() {
      this.loading = await this.loadingCtrl.create({ message: '' });
      return this.loading.present();
    }

abrirLogin(){
    this.router.navigateByUrl(`/home`);
  }

  ngOnInit() {
  }
}