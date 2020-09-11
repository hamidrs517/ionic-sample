import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';
import { CdvphotolibraryPipe } from 'src/app/pipes/cdvphotolibrary.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }])
  ],
  declarations: [Tab3Page, CdvphotolibraryPipe],
  providers: [PhotoLibrary, CdvphotolibraryPipe, FileChooser]
})
export class Tab3PageModule { }
