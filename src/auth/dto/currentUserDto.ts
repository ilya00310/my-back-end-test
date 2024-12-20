export class CurrentUserDto {
  readonly id: number;

  readonly email: string;

  readonly avatar?: string;

  readonly created_at: Date;

  constructor(id: number, email: string, avatar: string, created_at: Date) {
    this.id = id;
    this.email = email;
    this.avatar = avatar ?? '';
    this.created_at = created_at;
  }
}
