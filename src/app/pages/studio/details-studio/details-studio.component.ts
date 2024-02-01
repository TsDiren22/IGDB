import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Studio } from 'src/app/models/studio.model';
import { StudioService } from 'src/app/services/studio.service';

@Component({
  selector: 'app-details-studio',
  templateUrl: './details-studio.component.html',
  styleUrls: ['./details-studio.component.css']
})

export class DetailsStudioComponent implements OnInit {
  studio: Studio | undefined;
  constructor(private studioService: StudioService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    
    const routeParams = this.route.snapshot.paramMap;
    const studioIdFromRoute = String(routeParams.get('id'));
    this.studioService.onGetStudio(studioIdFromRoute).subscribe((studio) =>{
      this.studio = studio;
    });

  }

}
