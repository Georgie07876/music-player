export interface AudiusUserDto {
  id?: string;
  name?: string;
}

export interface AudiusTrackDto {
  id: string;
  title: string;
  duration?: number;
  user?: AudiusUserDto;
}

export interface AudiusResponse<T> {
  data: T;
}
