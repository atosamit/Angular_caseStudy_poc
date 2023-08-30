import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LikesService } from '../services/likes.service';
import {  MatSnackBar, MatSnackBarDismiss } from '@angular/material/snack-bar';

@Component({
  selector: 'app-case-study-details',
  templateUrl: './case-study-details.component.html',
  styleUrls: ['./case-study-details.component.css']
})
export class CaseStudyDetailsComponent  {
 
 
  data: any;
  logo: any;
  projectScope: any;
  challenges: any;
  UxApproch: any;
  PageSolution: any;
  PageArtifacts: any;
  PageKey: any;
  PageArtifacts1: any;
  PageArtifacts2: any;
  PageArtifacts3: any;
  Testimonials: any;
  logoCollection: any;

  

  constructor( private snackBar: MatSnackBar,private http: HttpClient, private route: ActivatedRoute, private likesService: LikesService) { 
    this.likesCount = this.likesService.getLikesCount(this.contentId);
    
  }
  breadcrumbItems = [
    { label: 'Home', route: '/home' },
    { label: 'title', route: '/title' },

  ];

  separator = '>';


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchData(id);
    } else {
      console.error('Invalid ID parameter');
    }
  }

  fetchData(id: string) {
    const endpoint = 'https://graphql.contentful.com/content/v1/spaces/40jcljdzym6w';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer OhON6XBAeZ0LHmYy0hlxfv_wPFAtYwSzuhjdLR991XU'
    });

    const query = `
    query{
      detailsPage(id:"${id}"){
      heroImg{
        url
      }
      image{
        url
      }
      caseStudy
      image1{
        url
      }
      title
      description
      domains
      publishedName
      publishedOnDate
      pointOfContact
      logoCollection{
        items{
          ... on Logo{
            logo{
              url
            }
          }   
        }
      }
      additionalReferencesCollection{
        items{
          ... on  DetailsPageProjectScope{
            title
            description
            scopeListCollection{
              items{
                projectScopeList
              }
            }
            videoImg{
              url
            }
            video{
              url
            }
            teamImg{
              url
            }
            title2
            list
            list1
            list2
            list3
            list4
            list5
          }
          ... on DetailsPageChallanges{
            title
            listCollection{
              items{
                challengesList
              }
            }
            image{
              url
            }
          }
          ... on DetailsPageUxApproch{
            title
            image{
              url
            }
          }
          ... on DetailsPageSolution{
            title1
            listCollection{
              items{
                solutionList
              }
            }
          }
            ... on DetailsPageArtifacts{
              title1
              noOfScreenDesigned
              screen
              toolUsed
              tool
            image{
          url
            }
          }
          ... on DetailsPageKey{
            title
            image{
              url
            }
            listCollection{
              items{
                keysList
              }
            }
          }
          ... on DetailsPageTestimonials{
            title
            note1{
              url
            }
            note2{
              url
            }
            note3{
              url
            }
          }
      }
      }
    }
    }
    `;

    this.http.post(endpoint, {  query, variables: { id } }, { headers }).subscribe(
      (response: any) => {
        // console.log(response.data);
        this.data = response.data.detailsPage;
        console.log(this.data)
        this.logo = response.data.detailsPage.logoCollection.items;
        console.log(this.logo)
        this.projectScope = response.data.detailsPage.additionalReferencesCollection.items[0];
        console.log(this.projectScope)
// challeges from cms
        this.challenges = response.data.detailsPage.additionalReferencesCollection.items[1];
// UxApproch from cms
        this.UxApproch = response.data.detailsPage.additionalReferencesCollection.items[2];
// PageSolution from cms created instance
        this.PageSolution = response.data.detailsPage.additionalReferencesCollection.items[3];

// images using m=cms
        this.PageArtifacts = response.data.detailsPage.additionalReferencesCollection.items[4];
        this.PageArtifacts1 = response.data.detailsPage.additionalReferencesCollection.items[5];
        this.PageArtifacts2 = response.data.detailsPage.additionalReferencesCollection.items[6];
        this.PageArtifacts3 = response.data.detailsPage.additionalReferencesCollection.items[7];

        this.PageKey = response.data.detailsPage.additionalReferencesCollection.items[8];
        this.Testimonials = response.data.detailsPage.additionalReferencesCollection.items[9];

        this.logoCollection=response.data.detailsPage.additionalReferencesCollection.items[10];

        
      },
      (error: any) => {
        console.error('Error while fetching Contentful data', error);
      }
    );
  }

  contentId = 'OhON6XBAeZ0LHmYy0hlxfv_wPFAtYwSzuhjdLR991XU'; // Replace with the actual content ID
  userId = '40jcljdzym6w'; // Replace with the actual user ID
  likesCount = 0;
  comment = '';
  comments: { userId: string; comment: string }[] = [];
  newComment: string = '';
  isLiked = false;
   
  toggleLike(contentId: string, userId: string): void {
    this.likesService.handleLike(contentId, userId);
    this.likesCount = this.likesService.getLikesCount(contentId);
    this.isLiked = !this.isLiked;
  }

  addComment(contentId: string, userId: string, commentText: string): void {
    this.likesService.handleComment(contentId, userId, commentText);
    this.comments = this.likesService.getComments(this.contentId);
  }
  saveComment(commentText: string): void {
    if (commentText.trim().length > 0) {
      this.likesService.handleComment(this.contentId, this.userId, commentText);
      this.comments = this.likesService.getComments(this.contentId);
      this.newComment = ''; // Clear the new comment textarea after saving the comment
    }
  }






// ...............................


openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 6000,
  });
}

showSuccessSnackBar() {
  this.openSnackBar('Shared Successfully!','succes');
}

showDownloadSnackBar() {
  this.openSnackBar('Download Successfully!','');
}
showlikeSnackBar() {
  this.openSnackBar('likes Successfully!','');
}
// ..................................


  publish: any = [
    {
      name: "Published Name:",
      date: "Published On:",
      contact: "Point of Contact: "
    }
  ]

  details: any = [
    {
      home:"Home",
      arrow:"  >",
      title:"Nestle C4C Go",
      comments: "11 Comments",
      likes: " 40 Likes"
    }
  ]


 
title:any="our UX approach"
  cx_design: any = [
    {
      img: "assets/team 1.svg",
      heading: "CX design Deliverables",
      text1: "persona",
      text2: "User Journey",
      text3: "Wireframes ",
      text4: " Guerrilla Testing",
      text5: " Visual Design",
      text6: " Design System",
    }
  ]

  persona: any = [
    {
      img: "assets/Group 38.svg",
      heading: "PERSONA",
      text: "Tool Used : ",
      text1: " MS Word & Figma"
    }
  ]

  user_journey: any = [
    {
      img: "assets/img.svg",
      heading: "User Journey",
      text: "Tool Used : ",
      text1: "MS excel & Figma"
    }
  ]

  Wireframes: any = [
    {
      img: "assets/Group 43.svg",
      heading: "Wireframes",
      text1: "No. of Screen Designed  :  ",
      text11: "188",
      text2: "Tool Used  :",
      text21: "Figma"
    }
  ]

  mockups: any = [
    {
      img: "assets/Image.svg",
      heading: "Mockups",
      text1: " No. of Screen Designed : ",
      text11: " 36",
      text2: "Tool Used : ",
      text21: "Figma, Illustrator"
    }
  ]


  keytakeways: any = [
    {
      heading: "Key Takeaways",
      text1: "Designed a powerful Dashboard which accommodates all significant information for CM with no vertical page scroll",
      text2: " Designed a powerful search capability",
      text3: "Reduced task time and learning curve ",
      text4: "  Rich look & feel and intuitive interface that guides the user in accomplishing their task efficiently with minimal effort",
      text5: " Reduced Task time and Learning Curve ",
      img: "assets/key-takeaway-line-icon-on-white-vector 1.svg "
    }
  ]

  testmonials: any = [
    {
      img: "assets/Group 44.svg",
      heading: "Testimonials "
    }
  ]



}

