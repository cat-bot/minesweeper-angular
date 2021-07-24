import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MineSweeperGridSize {
    public width: number = 0; 
    public height: number = 0; 
    public mines: number = 0; 
    public label: string = '';
}