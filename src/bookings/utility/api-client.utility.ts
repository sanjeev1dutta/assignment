import { HttpService, NotImplementedException } from '@nestjs/common';

export class ApiClient {
  constructor(private readonly http: HttpService) {}

  post(data) {
    try {
      let custEndpointUrl: string;
      switch ((data['country'] as string).toUpperCase()) {
        case 'EU':
        case 'UK':
          custEndpointUrl = 'http://localhost:4000/customers';
          break;
        case 'USA':
        case 'US':
          custEndpointUrl = 'http://localhost:5000/customers';
          break;
        default:
          throw new NotImplementedException();
      }
      //console.log(custEndpointUrl, data['jwt']);
      this.http
        .post(custEndpointUrl, data['payload'], {
          headers: {
            Authorization: `${data['jwt']}`,
          },
        })
        .subscribe({
          // next(x) {
          //   console.log('got value ' + JSON.stringify(x));
          // },
          error(err) {
            console.error('something wrong occurred: ' + err);
          },
          // complete() {
          //   console.log('done');
          // },
        });
    } catch (err) {}
  }
}
