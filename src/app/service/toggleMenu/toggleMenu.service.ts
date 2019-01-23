import { Injectable } from "@angular/core";

@Injectable()
export class ToggleMenuService {
    isOpen: boolean;
    constructor() {}

    toggle(open) {
        console.log(open);
        
        this.isOpen = open;
    }
}