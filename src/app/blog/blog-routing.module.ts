import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { ListingComponent } from './listing/listing.component';

const routes: Routes = [

	{
		path: 'listing',
		component: ListingComponent
	},

  {
		path: 'detail/:id',
		component: DetailComponent
	},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
