import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product, Review } from 'src/app/models/models';
import { NavigationService } from 'src/app/services/navigation.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  imageIndex: number = 1;
  product!: Product;
  reviewControl = new FormControl('');
  showError = false;
  reviewSaved = false;
  otherReviews: Review[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    public utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      let id = params.id

      this.navigationService.getProduct(id).subscribe((res: any) => {
        this.product = res
        this.fetchAllReviews()
      })

    })
  }

  submitReview(){
    let review = this.reviewControl.value;

    if (review === '' || review === null){
      this.showError = true;
      return
    }

    let userid = this.utilityService.getUser().id;
    let productid = this.product.id;

    this.navigationService
      .submitReview(userid, productid, review)
      .subscribe((res: any) => {
        this.reviewSaved = true;
        this.fetchAllReviews()
        this.reviewControl.setValue("")
      })

  }


  fetchAllReviews() {
    this.otherReviews = [];
    this.navigationService
      .getAllReviewsOfProduct(this.product.id)
      .subscribe((res: any) => {
        for (let review of res) {
          this.otherReviews.push(review);
          console.log(this.otherReviews)
        }
      })
  }

}
