export class Endpoint {
  private static _endpoint: string = "";

  static get endpoint(): string {
      return this._endpoint;
  }

  static set endpoint(value: string) {
      this._endpoint = value;
  }
}