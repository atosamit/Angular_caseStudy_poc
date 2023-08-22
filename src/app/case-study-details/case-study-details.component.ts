import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LikesService } from '../services/likes.service';

@Component({
  selector: 'app-case-study-details',
  templateUrl: './case-study-details.component.html',
  styleUrls: ['./case-study-details.component.css']
})
export class CaseStudyDetailsComponent  {
 
 
  data: any;
  logo: any;
  projectScope: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private likesService: LikesService) { 
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
      detailsPage(id:"3hsx0WpSK1pt0YuHfBaARc"){
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
              screen
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

   
  toggleLike(contentId: string, userId: string): void {
    this.likesService.handleLike(contentId, userId);
    this.likesCount = this.likesService.getLikesCount(contentId);
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

  project_scope: any = [
    {
      heading: "Project Scope ",
      text1: "Design and Develop a Native Mobile App to allow Nestle field users to plan and perform their daily work and collect all required data. ​Key Tasks of Technicians:",
      text2: "  Administer the work. (Beverage dispenser with / without linked Accessory installed, spare part replaced, T&M recorded etc.…).",
      text3: "  Collect information: Details about the beverage dispenser’s and customer outlet’s condition. Sales data (Cup sales), Quality survey (technicians fill a survey to measure- and track the quality of the beverages and the trade assets as well), etc."
    }
  ]

  Challenges: any = [
    {
      heading: "Challenges",
      text1: " Limited UX Budget and Stringent timeline",
      text2: " Selection of Development platform : Mendix instead of bespoke development for a complex App like this. ",
      text3: " Understand the work process either from Documents, video recordings or from a 3rd person instead from the actual user.",
      text4: " Understand Mendix and the widgets available for Native App Development ",
      text5: " Design Screens as per Out of Box widgets available in Mendix and the same time design the best User Experience",
      text6: " Support the Mendix Dev team during custom widget development ",
      text7: " Mis conception of UX/UI not needed for an out of box COTS product ",
      text8: " No Budget to carry out complete UX Process like research, User testing etc.",
      text9: " Create awareness about UX process to incorporate for a rich product output to business"
    }
  ]

  solution: any = [
    {
      heading: "Solution",
      text1: "Adaptive solution to support various targeted form factors",
      text2: "Enhanced reporting by means of dashboard and logical sectioning of huge amount of data",
      text3: "Dynamic reporting and Interactive interface that helps the user access the data at the required grain in few clicks",
      text4: "Data visualization using charts and graphs to make data easily understandable",
      text5: "Mobile accessibility that enables you to make informed decisions and offer a quick response irrespective of the user’s location",
      text6: "Single source of truth by consolidating the data into the app and seamless integration"
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

