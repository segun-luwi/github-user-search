import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private dataService: DataService) { }
  total_count: any;
  searchForm: FormGroup;
  isSubmitted  =  false;
  searchResult: any;
  error: boolean = false;
  page: number = 1;
  ngOnInit() {
    this.searchForm  =  this.formBuilder.group({
      search: ['', Validators.required]
    });
  }

  get formControls() { return this.searchForm.controls; }

  // Search function to search users on github
  search(page=''){
    // console.log(this.searchForm.value);
    this.error = false;
    this.isSubmitted = true;
    if(this.searchForm.invalid){
      return;
    }
    const searchTerm = this.searchForm.value.search;
    let tosearch;
    if(page){
      tosearch = 'https://api.github.com/search/users?page='+page+'&'+'q='+searchTerm+'&per_page=10';
    }else{
      tosearch = 'https://api.github.com/search/users?q='+searchTerm+'&per_page=10';
    }
    this.dataService.getUsers(tosearch)
    .subscribe((data: any)=>{
      // console.log(data);
      this.searchResult = data;
      this.total_count = data.total_count;
      if(this.searchResult.items){
        for(let i = 0; i<this.searchResult.items.length; i++){
          let userUrl = this.searchResult.items[i].url;
          this.dataService.getUserInfo(userUrl).subscribe((data:any) =>{
            // console.log(data);
            if(data && data.name){
              this.searchResult.items[i].name = data.name;
              this.searchResult.items[i].location = data.location;
              this.searchResult.items[i].email = data.email;
              this.searchResult.items[i].public_repos = data.public_repos;
              this.searchResult.items[i].public_gists = data.public_gists;
              this.searchResult.items[i].followers = data.followers;
              this.searchResult.items[i].following = data.following;
              this.searchResult.items[i].bio = data.bio;
            }
          })
        }
      }
      },
      error => {
        // console.log("Error : " + error);
        this.error = true;
      }
    )
  }

  // get Current Page
  getPage(num) {
    this.search(num);
  }
}
