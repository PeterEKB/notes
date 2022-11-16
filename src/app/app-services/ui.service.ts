import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable()
export class UIService {
    private add_BSubject = new BehaviorSubject(({} as any))
    add = this.add_BSubject.asObservable()


    set updateAdd(event:Event){
        this.add_BSubject.next(event)
    }
}