
interface TvShowProps {
    adult:boolean;
    backdrop_path: string;
    created_by: {
        id: number;
        credit_id: string;
        name: string;
        gender: number;
        profile_path: string | null; 
      }[];
      episode_run_time: number[];
      first_air_date:string;
      genres:{
        id:number;
        name:string;
      }[];
      homepage: string;
      id: number;
      in_production: boolean;
      languages: string[];
      last_air_date: string;
      last_episode_to_air: {
        id: number;
        name: string;
        overview: string;
        vote_average: number;
        vote_count: number;
        air_date: string;
        episode_number: number;
        production_code: string;
        runtime: number;
        season_number: number;
        show_id: number;
        still_path: string | null;
      } | null; 
      name: string;
      next_episode_to_air: null;
      networks: {
        id: number;
        logo_path: string | null; 
        name: string;
        origin_country: string;
      }[];
      number_of_episodes: number;
      number_of_seasons: number;
      origin_country: string[];
      original_language: string;
      original_name: string;
      overview: string;
      popularity: number;
      poster_path: string;
      production_companies: {
        id: number;
        logo_path: string | null; 
        name: string;
        origin_country: string;
      }[];
      production_countries: {
        iso_3166_1: string;
        name: string;
      }[];
      seasons: {
        air_date: string;
        episode_count: number;
        id: number;
        name: string;
        overview: string;
        poster_path: string;
        season_number: number;
        vote_average: number;
      }[];
      spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
      }[];
      status: string;
      tagline: string;
      type: string;
      vote_average: number;
      vote_count: number;
}
interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | any; 
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface WatchedItem {
  _id: string;
  createdAt: Date;
  mediaId: number;
  mediaType: string;
  userId: watchedItemUser;


}


interface watchedItemUser{
  _id:string;
  username:string;
}


interface Film {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface FilmsResponse {
  page: number;
  results: Film[];
}

interface GenreResponse {
  genres: Genre[];

}interface Genre {
  id: number;
  name: string;
}

interface Like {
  userId?: string;
  createdAt?: Date;
}

interface userRatingsProps{
  _id:string;
  userId: string;
  mediaId:number;
  mediaType:string;
  rating:number;
  createdAt:Date;
}

interface Series {
  adult:boolean;
  backdrop_path: string;
  id: number;
  name:string;
  original_language: string;
  original_name:string;
  overview:string;
  poster_path: string;
  media_type:string;
  genre_ids:number[];
  popularity: number;
  first_air_date: string;
  vote_average:number;
  vote_count:number;
  origin_country:string[];


}

interface SeriesResponse {
  page: number;
  results: Series[];
}

interface ActivityProps{
  serializedActivities : serializedActivitiesProps[];
  id:string;
}
type serializedActivitiesProps={
  _id:string;
  userId:string;
  name:string;
  mediaId:number;
  mediaType:string;
  actionType:string;
  createdAt:Date;
  rating?:number;
}
interface GroupedActivities {
  [key: string]: Activity[];
}

interface Activity {
  id: string;
  title: string;
  type: "movie" | "serie"; 
  actionType?: string; 
  name: string;
  userId: string;
  rating: number | null; 
  createdAt: Date;
}
interface combinedActivities {
  id: string;
  title: string;
  type: "movie" | "serie";
  userId: string;
  name: string;
  createdAt: Date;
  activities: ActivityData[];
}
interface ActivityData {
  type: string;
  rating: number | null | undefined;
}
interface RecentReviews{
  createdAt: Date;
  mediaId: number;
  mediaType: string;
  name: string;
  image?:string;
  text: string;
  userId: string;
  __v: number;
  _id: string;
}

interface CommentProps{
  _id: string; 
  userId: CommentUserIdProps;
  mediaId:number,
  mediaType:string;
  image:string | null,
  likes:CommentUserLikeProps[];
  text:string;
  __v:number;
  createdAt: Date;
}
interface CommentUserLikeProps{
  createdAt:Date;
  userId:string;
  _id:string;
}
interface CommentUserIdProps {
  _id:string;
  username:string;
  image?:string;
}
interface CommentType{
  id: string; 
  userId:string;
  name:string;
  mediaId:number;
  image?:string;
  text:string;
  createdAt:Date;
  currentUser: string;
}

interface FavoritesProps {
  favorite:string[];
  numberId:number;
  userId:string;
  type:string;
}


interface Favorite {
  _id: string;
  
}
interface TvDetailsProps {
  id:string;
  likes:string[];
  favorite:string[];
  watched:string[];
  watchlist:string[];
  userRating:RatingProps[];
  comments:RecentReviews[];
  popularComments :PopularComments[];
}
interface SearchProps {
  searchParam:string;
  serializedUsers:searchUsers[];
}

interface searchUsers {
id:string;
image:string;
name:string;
username:string;
}

interface RatingProps {
  _id: string; 
  userId: string;
  mediaId: number;
  mediaType: string;
  rating: number;
  createdAt: Date;
  __v: number;
}
interface PopularSeriesCard {
  serie: Series;
  isMovie:boolean;
}

interface PopularComments {
  _id: string;
  userId: string;
  username: string;
  mediaId: number;
  mediaType: string;
  image: string;
  text: string;
  createdAt: Date;
}

interface userFilmswithData {
  id: number;
  poster_path:string;
  title:string;
  release_year:number;
  createdAt:Date;
}

interface ProfileFilmsProps{
  id:string;
  serializedFilms:WatchedProps[];
}

interface WatchedProps{
  _id:string;
  userId:string;
  mediaId:number;
  createdAt:Date;
}

interface PopularCardProps {
  movie: Film;
  isMovie:boolean;
}

interface ProfileProps{
  id:string;
  name:string;
  username:string;
  image:string;
  follow:FollowProps[];
  followed:FollowedProps[];
  profileComments:UserComments[];
  favorites:number[];
  seriesFavorites:number[];
  userRatings:userRatingsProps[];
  serializedWatchlist: WatchlistProps[];
  serieCount:string[];
  movieCount:string[];
}
interface WatchlistProps{
  _id:string;
  userId:string;
  mediaId:number;
  mediaType:string;
  createdAt:Date;
}

interface UserComments{
  _id:string;
  userId: string;
  mediaId:number;
  mediaType:string;
  text:string;
  createdAt:Date;
  likes: Like[];
}
interface FollowedProps{
  _id:string;
  followedId:string;
  name:string;
}

interface FavoriteItem {
  mediaType: string;
   mediaId:number;
}

interface FollowProps{
  _id:string;
  followerId:string;
  name:string;
}

interface MediaItem {
  id: number;
  poster_path: string;
  title: string;
  release_year: number;
  text: string;
  createdAt: Date;
  likes?: Like[];
  type: string;
  userRating?: number; 
}

interface User {
  _id:string;
  email:string;
  image:string;
  password:string;
  name:string;
  username:string;
  __v:number;
}

interface CombinedWatchlist {
    createdAt:Date;
    id:number;
    poster_path:string;
    release_year:number;
    title:string;
    type:string;
}

interface userLikedFilmsProps{
  id:number;
  poster_path:string;
  createdAt:Date;
  release_year:number;
  type:string;
  title:string;
}
interface userWatchedFilmsProps{
  id:number;
  poster_path:string;
  createdAt:Date;
  release_year:number;
  type:string;
  title:string;
}

interface userReviewedFilmsProps{
  id:number;
  poster_path:string;
  createdAt:Date;
  release_year:number;
  type:string;
  title:string;
  text:string;
  likes:Like[];
}