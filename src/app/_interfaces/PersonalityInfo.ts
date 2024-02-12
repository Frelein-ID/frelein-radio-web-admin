export interface PersonalityInfo {
  // Main
  id: string;
  name: string;
  name_jp: string;
  nickname: string;
  birthdate: string;
  birthplace: string;
  bloodtype: string;
  description: string;
  trivia: string;
  image: string;
  source: string;
  favoritedBy: number;
  createdAt: Date;
  updatedAt: Date;
  // Get from RadioTracks
  personality_id?: string;
  // Update
  old_tracks_id?: string;
  new_tracks_id?: string;
  old_personality_id?: string;
  new_personality_id?: string;
}
