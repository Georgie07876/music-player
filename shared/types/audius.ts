export interface AudiusUserDto {
  id?: string;
  name?: string;
}

export interface AudiusTrackDto {
  id: string;
  title: string;
  duration?: number;
  user?: AudiusUserDto;
  artwork?: Record<string, string>;
}

export interface AudiusResponse<T> {
  data: T;
}
