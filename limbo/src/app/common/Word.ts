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
  verb = 'verb',
  noun = 'noun'
}

export enum VERB_TYPES {
  travelTo = 'travelTo',
  examine = 'examine',
  interact = 'interact',
  think = 'think'
}

export enum NOUN_TYPES {
  place = 'place',
  person = 'person',
  object = 'object',
  back = 'back',
  special = 'special'
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
