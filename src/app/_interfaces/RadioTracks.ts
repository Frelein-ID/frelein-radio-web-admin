import { Personalities } from "./Personalities";

export interface RadioTracks {
  id: string;
  name: string;
  name_jp: string;
  episode: number;
  radio_oa: string;
  personalities: Array<Personalities>;
  radio_image: string;
  track_image: string;
  src: string;
  createdAt: Date;
  updatedAt: Date;
}
