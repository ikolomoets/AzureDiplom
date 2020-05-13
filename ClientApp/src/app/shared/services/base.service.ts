import { throwError } from 'rxjs';


export abstract class BaseService {  
    
    constructor() { }

    protected handleError(error: any) {
    var applicationError //= error.headers.get('Application-Error');

    // either applicationError in header or model error in body
    console.log(applicationError, error)
    if (applicationError) {
      return throwError(applicationError);
    }

    var modelStateErrors: string = '';
    var serverError = JSON.parse(JSON.stringify(error));

    if (!serverError.type) {
      for (var key in serverError) {
        if (serverError[key])
          modelStateErrors += serverError[key] + '\n';
      }
    }

    modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
    return throwError(modelStateErrors || 'Server error');
  }
}