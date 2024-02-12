import { Personalities } from "./Personalities";
import { PersonalityInfo } from "./PersonalityInfo";
import { RadioInfo } from "./RadioInfo";

export interface RadioTracks {
  // Main
  id?: string;
  radio_info: RadioInfo;
  episode: number;
  radio_oa: string;
  image: string;
  src: string;
  favoritedBy?: number;
  createdAt?: Date;
  updatedAt?: Date;
  // Get
  name?: string;
  name_jp?: string;
  track_image?: string;
  radio_image?: string;
  personalities?: Personalities[];
}
