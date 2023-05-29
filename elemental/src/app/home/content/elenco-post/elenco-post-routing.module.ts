import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ElencoPostComponent} from "./elenco-post.component";
import {PostComponent} from "./post/post.component";

const routes: Routes = [
  {
    path: '',
    component: ElencoPostComponent,
    children: [
      {
        path: 'post',
        component: PostComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElencoPostRoutingModule { }
