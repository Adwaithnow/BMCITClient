import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/Service/route.service';

@Component({
  selector: 'app-routehome',
  templateUrl: './routehome.component.html',
  styleUrls: ['./routehome.component.css']
})
export class RoutehomeComponent implements OnInit {
  isRoute:boolean=false;
  routes:any[]
  selectedrouteid:string
  constructor(private route:RouteService) { }

  ngOnInit(): void {
this.route.GetAllRouteForAdmin().subscribe({
  next:(res:any)=>{
    this.routes=res
  }
})
  }
  viewroute(item:string){
    this.selectedrouteid=item
    console.log(this.selectedrouteid);
    
    this.isRoute=true;
  }
}
