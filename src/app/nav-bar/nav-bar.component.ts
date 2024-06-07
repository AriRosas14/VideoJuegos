import { Component } from '@angular/core';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  visible:boolean =false;
  usuario=false;
  admin =false;
  usuarioAutenticado: boolean = false;

  /*constructor(

    this.auth.onAuthStateChanged((user) =>{
      if(user){
        this.usuarioAutenticado=true;
        const userId = user.uid;
        if(userId == '1CMjiHE3XrOhVud6qvWFErVAvrK2'){
          this.admin=true;
          this.usuario=false;
        }else{
          this.admin=false;
          this.usuario=true;
        }
      }else{
        this.usuarioAutenticado=false;
      }
    })*/
  
  ngOnInit(): void {
  }

/*  salir(){

    this.ss.logOut()
      .then((response) =>{
        console.log(response)
        this.ruta.navigate(['/home'])
        location.reload();
      })
      .catch((error) =>{
        console.log(error);
      })
  }*/

  }
