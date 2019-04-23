export class Word {
	string: string;
  id: number;
  properties: AllWordProperties;

  constructor(w: string, id: number, properties: AllWordProperties) {
    this.string = w;
    this.id = id;
    this.properties = properties;
  }
}

export enum PART_OF_SPEECH {
  verb,
  noun
}

export enum VERB_TYPES {
  travelTo,
  examine,
  interact
}

export enum NOUN_TYPES {
  place,
  person,
  object
}

export interface VerbProperties {
  partOfSpeech: PART_OF_SPEECH;
  type: VERB_TYPES;
}

export interface NounProperties {
  partOfSpeech: PART_OF_SPEECH;
  type: NOUN_TYPES;
}

export type AllWordProperties = VerbProperties | NounProperties;
