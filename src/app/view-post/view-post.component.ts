import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from 'src/app/service/blog-post.service';
import { BlogPost } from 'src/app/models/blog-post';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  loading = true;
  post: BlogPost;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: BlogPostService
  ) {}

  ngOnInit() {
    this.getPost();
  }

  public deletePost() {
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.deletePost(id).subscribe(res => {
      console.log('Deleted Post' + id);
      this.router.navigate(['/home']);
    });
  }

  private parsePost(post: string): void {
    const patt = /<!!img\s*(\d+)!!>\s*<!!\s*caption\s*([A-Za-z0-9\-!.',\s]+)!!>/g;
    let match;
    console.log(post)
    // tslint:disable-next-line:no-conditional-assignment
    while ((match = patt.exec(post)) != null) {
        console.log(match)
        const toExchange: string = match[0];
      // tslint:disable-next-line:max-line-length
        const imageHtml = '<p></p><figure class="figure"><img class = "img-fluid" src="' + this.post.file[match[1]] + '">  <figcaption class="figure-caption text-right">' + match[2] + '</figcaption>\n' +
            '</figure></p>';
        this.post.content = this.post.content.replace(toExchange, imageHtml);

    }
  }

  private getPost(): void {
    const id = this.route.snapshot.paramMap.get('id'); // + is JS conversion from string to int (which id should be)
    console.log('id: ' + id);

    this.postService.GetPost(id).subscribe(post => {
      console.log('post: ' + JSON.stringify(post));
      this.post = post;
      this.parsePost(post.content);
      this.loading = false;
    });
  }
}
