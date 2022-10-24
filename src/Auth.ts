export class Endpoint {
  private static _endpoint: string = "localhost:8080";

  static get endpoint(): string {
      return this._endpoint;
  }

  static set endpoint(value: string) {
      this._endpoint = value;
  }
}