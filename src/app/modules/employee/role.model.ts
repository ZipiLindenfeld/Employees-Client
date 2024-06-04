export class Role {
  id: number;
  name: string;
  isManagementRole: boolean;
  constructor(id: number = 0) {
    this.id = id;
  }
}
