import 'rxjs/Rx';

import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';

@Injectable()
export class DataStorageService {
  constructor(
    private httpClient: HttpClient, 
    private recipeService: RecipeService,
    private authService: AuthService) {}

  storeRecipes() {
    const req = new HttpRequest(
      'PUT', 
      'https://ng-recipe-book-c3a67.firebaseio.com/recipes.json', 
      this.recipeService.getRecipes(), 
      {reportProgress: true}
    );
    return this.httpClient.request(req);
  }

  getRecipes() {
    this.httpClient.get<Recipe[]>('https://ng-recipe-book-c3a67.firebaseio.com/recipes.json',
    {
      observe: 'body',
      responseType: 'json'
    })
      .map(
        (recipes) => {
          console.log(recipes);
          for (let recipe of recipes) {
            if(!recipe['ingredients']){
              recipe['ingredients']=[];
            }
          }
          return recipes;
        }
      ).subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      )
  }
}