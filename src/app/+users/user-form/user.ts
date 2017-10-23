export class User {

  constructor(
    public name: string,
    public secondName: string,
    public thirdName: string,
    public gender: string,
    public photo: string,
    public position: number,
    public division: number,
    public isCreateDEposite?: boolean,
    public isCloseDEposite?: boolean,
    public isApprovalCredit?: boolean,
    public isApprovalOpenScore?: boolean
  ) {}

}
