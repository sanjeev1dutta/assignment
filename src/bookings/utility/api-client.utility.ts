import { HttpService } from '@nestjs/common';

export class ApiClient {
  constructor(private readonly http: HttpService) {}

  async post(
    url,
    data,
    headers = {
      Authorization: `${data['jwt']}`,
    },
  ): Promise<any> {
    try {
      return this.http
        .post(url, data['payload'], {
          headers: headers,
        })
        .toPromise();
    } catch (err) {
      console.log(err);
    }
  }
}
