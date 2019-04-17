import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TextInterfaceComponent } from './components/text-interface/text-interface.component';

const routes: Routes = [
	{
		path: '',
		component: TextInterfaceComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
