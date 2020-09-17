import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Platform } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.page.html',
  styleUrls: ['./song.page.scss'],
})
export class SongPage implements OnInit {
  editForm: FormGroup;
  id: any;

  constructor(
    private db: DbService,
    private platform: Platform,
    private router: Router,
    public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    if (this.platform.is('cordova')) {
      this.db.getSong(this.id).then(res => {
        this.editForm.setValue({
          artist_name: res['artist_name'],
          song_name: res['song_name']
        })
      })
    }

  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      artist_name: [''],
      song_name: ['']
    })
  }

  saveForm() {
    this.db.updateSong(this.id, this.editForm.value)
      .then((res) => {
        console.log(res)
        this.router.navigate(['/home']);
      })
  }

}