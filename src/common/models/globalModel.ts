export interface LoginForm {
  email: string;
  password: string;
}

export interface IResponse {
  data: object | null,
  errors? :object | null,
  status : string,
  message :string
}
