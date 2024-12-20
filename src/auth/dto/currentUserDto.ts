export class CurrentUserDto {
  readonly id: string;

  readonly email: string;

  readonly avatar?: string;

  readonly created_at: Date;

  constructor(id: string, email: string, created_at: Date) {
    this.id = id;
    this.email = email;
    this.created_at = created_at;
  }
}
