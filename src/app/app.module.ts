import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BgComponent } from './app-bg/bg';
import { HomeComponent } from './app-home/home';
import { MainComponent } from './app-main/main';
import { NoteComponent } from './app-reusables/note/note';

import { AppRoutingModule } from './app-routing.module';
import { NotesService } from './app-services/notes.service';
import { UIService } from './app-services/ui.service';
import { UIComponent } from './app-ui/ui';
import { MgComponent } from './mg-component/mg';

@NgModule({
  declarations: [
    MainComponent,
    BgComponent,
    MgComponent,
    UIComponent,
    HomeComponent,
    NoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [UIService,NotesService],
  bootstrap: [MainComponent]
})
export class AppModule { }
