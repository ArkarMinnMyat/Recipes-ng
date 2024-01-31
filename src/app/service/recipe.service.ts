import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Recipe } from '../model/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipeSubject$:BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>([]);

  recipies$:Observable<Recipe[]> = this.recipeSubject$.asObservable();

  constructor(private http:HttpClient) {
    this.getRecipes()
    .subscribe(data => this.recipeSubject$.next(data))
    
   }


  getRecipes(): Observable<Recipe[]>{
    return this.http.get<Recipe[]>(`http://localhost:3000/recipes`);
  }
}
