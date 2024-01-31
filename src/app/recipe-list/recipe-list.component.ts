import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from '../service/recipe.service';
import { Recipe } from '../model/recipe';
import { CommonModule } from '@angular/common';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent implements OnInit,OnDestroy{
  recipes!:Recipe[];
  recipes$:Observable<Recipe[]> = this.service.recipies$;
  destroy$ = new Subject<void>();
  subscription!:Subscription;
  constructor(private service:RecipeService){

  }
  ngOnInit(): void {
    this.subscription = this.service.getRecipes()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: data => this.recipes = data,
      error: e => console.log(e),
      complete: () => console.log('Complete...')
    });
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe;
    this.destroy$.next();
    this.destroy$.complete;
  }
}
