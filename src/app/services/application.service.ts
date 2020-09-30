import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../model/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  
  constructor(private http: HttpClient) { }
  

  getAllApplications():Observable<Application[]> {
    return this.http.get<Application[]>('http://localhost:8089/applicationList');
  }
  getApplicationById(id:string):Observable<Application> {
    return this.http.get<Application>('http://localhost:8089/applicationList/'+id);
  }
  postApplications(application:Application){
    console.log("adding");
    return this.http.post('http://localhost:8089/application',application, {  responseType: 'text'});
  }
  putApplications(application:Application,id:number) {
    return this.http.put<string>('http://localhost:8089/updateApplication/'+id,application, {  responseType: 'text' as 'json' });
  }
  
  deleteApplications(id:string) {
    return this.http.delete<string>('http://localhost:8089/applicationList'+id, {  responseType: 'text' as 'json' });
  }
  // getAllTrainingPrograms():Observable<Application[]> {
  //   return this.http.get<Application[]>('http://localhost:8762/course-ms/course/trainingprograms');
  // }

  // putTrainingPrograms(trainingprogram:Application) {
  //   return this.http.put<string>('http://localhost:8762/course-ms/course/trainingprograms',trainingprogram, {  responseType: 'text' as 'json' });
  // }
  // postTrainingPrograms(application:Application) {
  //   console.log(application);
  //   return this.http.post<string>('http://localhost:8762/course-ms/course/trainingprograms',trainingprogram, {  responseType: 'text' as 'json' });
  // }
  // deleteTrainingPrograms(id:string) {
  //   return this.http.delete<string>('http://localhost:8762/course-ms/course/trainingprograms/'+id, {  responseType: 'text' as 'json' });
  // }
}
