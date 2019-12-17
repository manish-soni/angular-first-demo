import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import {ParentComponent} from './../parent/parent.component';
import {InputChildComponent} from './../input-child/input-child.component';
import {OutputChildComponent} from './../output-child/output-child.component';
@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, ParentComponent, OutputChildComponent, InputChildComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
