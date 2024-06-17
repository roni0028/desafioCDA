declare interface Emblems {
  id: string;
  slug: string;
  name: string;
  image: string;
  category: 'Bronze' | 'Silver' | 'Gold';
  enabled: boolean;
}
