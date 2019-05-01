export class Item {

  name: string;
  id: ITEMS_ID;
  type: ITEMS_TYPE;

	constructor(id: ITEMS_ID) {
    this.id = id;
    this.name = allItems.find(i => i.id === id).name;
    this.type = allItems.find(i => i.id === id).type;
	}
}

export enum ITEMS_ID {
	cold_key,
	limbo_key
}

export enum ITEMS_TYPE {
  goalWords
}

const allItems = [
  {
    id: ITEMS_ID.cold_key,
    name: 'Cold',
    type: ITEMS_TYPE.goalWords
  },
  {
    id: ITEMS_ID.limbo_key,
    name: 'Limbo',
    type: ITEMS_TYPE.goalWords
  }
]
