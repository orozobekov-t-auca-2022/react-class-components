export interface IAbility{
  ability: {
    name: string;
  }
};

export interface IForm{
  name: string;
}

export interface IDetailsState{
  name: string,
  description: string,
  imgUrl: string,
  abilities: IAbility[],
  height: number,
  id: number,
  forms: IForm[]
}