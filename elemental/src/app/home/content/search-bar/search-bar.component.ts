import { Component } from '@angular/core';
import { faSearch, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import {PostService} from "../../../../service/post.service";
import {PostDTO} from "../../../../dto/postdto";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchIcon = faSearch;


  searchTerm = '';
  // @ts-ignore
  allPost: PostDTO[]
  // @ts-ignore
  filterPost: PostDTO[]
  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.postService.getAll().subscribe(x => {
      this.allPost = x;
    } )
  }

  search(value: string): void {
    this.filterPost = this.allPost.filter((val) =>
      val.contenuto.toLowerCase().includes(value)
    );
    this.postService.setFilterPost(this.filterPost)
    console.log(this.filterPost)
  }
}
