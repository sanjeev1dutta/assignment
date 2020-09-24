import { HttpService } from '@nestjs/common';

export class ApiClient {
  constructor(private readonly http: HttpService) {}

  post(data) {
    try {
      let custEndpointUrl: string;
      switch (data['country'].toUpperCase()) {
        case 'US':
          custEndpointUrl = 'http://localhost:5000/customers';
          break;
        case 'GB':
        default:
          custEndpointUrl = 'http://localhost:4000/customers';
          break;
      }

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
    } catch (err) {
      console.log(err);
    }
  }
}
