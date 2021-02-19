from django.conf import settings
import json
import requests
import soundcloud
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

def search_items(string, types):

    credential = \
        SpotifyClientCredentials(client_id='8056d6f1c5264b28b05858a82d4523c6',
                                 client_secret='c76f4bc77dda42bb8340a4a3ae188518')
    spotify = spotipy.Spotify(client_credentials_manager=credential)

    limitation = 10
    if len(types) == 0:
        types.append('track')

    results_list = {}

    track_url, artists_name, track_name, track_image, ids = [], [], [], [], []
    if 'track' in types:
        results = spotify.search(string, limit=limitation, type='track')
        Range = len(results['tracks']['items'])
        for i in range(Range):
            track_url.append(results['tracks']['items'][i]['external_urls']['spotify'][25:])
            artists = ''
            for artist in results['tracks']['items'][i]['artists']:
                artists += artist['name']
                artists += ' & '
            artists_name.append(artists[:-3])
            track_name.append(results['tracks']['items'][i]['name'])
            track_image.append(results['tracks']['items'][i]['album']['images'][0]['url'])
            ids.append(True)

        results = requests.get('https://api-v2.soundcloud.com/search/tracks?q='+ string +'&sc_a_id=c1eb64aec56a5270ec813ade81c718b2752c7789&variant_ids=&facet=genre&client_id=Iy5e1Ri4GTNgrafaXe4mLpmJLXbXEfBR&limit=10&offset=0&linked_partitioning=1&app_version=1587727143&app_locale=en')
        results = results.json()
        Range = len(results['collection'])
        for i in range(Range):
            track_url.append(results['collection'][i]['uri'][27:])
            artists_name.append(None)
            track_name.append(results['collection'][i]['title'])
            track_image.append(results['collection'][i]['artwork_url'])
            ids.append(False)
        
        track_result = [{'track_url': U, 'artists_name': A, 'track_name': T, 'track_image': I, 'ids': Id} for U, A, T, I, Id in
                                                          zip(track_url, artists_name, track_name, track_image, ids)]
        results_list['track'] = track_result


    album_url, album_image, album_name, ids = [], [], [], []
    if 'album' in types:
        results = spotify.search(string, limit=limitation, type='album')
        Range = len(results['albums']['items'])
        for i in range(Range):
            album_url.append(results['albums']['items'][i]['external_urls']['spotify'][25:])
            album_image.append(results['albums']['items'][i]['images'][0]['url'])
            album_name.append(results['albums']['items'][i]['name'])
            ids.append(True)
        
        results = requests.get('https://api-v2.soundcloud.com/search/albums?q='+ string +'&sc_a_id=c1eb64aec56a5270ec813ade81c718b2752c7789&variant_ids=&facet=genre&client_id=Iy5e1Ri4GTNgrafaXe4mLpmJLXbXEfBR&limit=10&offset=0&linked_partitioning=1&app_version=1587727143&app_locale=en')
        results = results.json()
        Range = len(results['collection'])
        for i in range(Range):
            album_url.append(results['collection'][i]['uri'][27:])
            album_image.append(results['collection'][i]['artwork_url'])
            album_name.append(results['collection'][i]['title'])
            ids.append(False)
        
        album_result = [{'album_url': U, 'album_image': I, 'album_name': N, 'ids': Id} for U, I, N, Id in
                                                  zip(album_url, album_image, album_name, ids)]
        results_list['album'] = album_result
    
    artist_name, artist_url, artist_genres, artist_followers, artist_image, ids = [], [], [], [], [], []
    if 'artist' in types:
        results = spotify.search(string, limit=limitation, type='artist')
        Range = len(results['artists']['items'])
        for i in range(Range):
            artist_name.append(results['artists']['items'][i]['name'])
            artist_url.append(results['artists']['items'][i]['external_urls']['spotify'][25:])
            if len(results['artists']['items'][i]['images']) == 0:
                artist_image.append('')
            else :
                artist_image.append(results['artists']['items'][i]['images'][0]['url'])
            genres = ''
            for genre in results['artists']['items'][i]['genres']:
                genres += genre
                genres += ' & '
            artist_genres.append(genres[:-3])
            artist_followers.append(results['artists']['items'][i]['followers']['total'])
            ids.append(True)

        artist_result = [{'artist_name': N, 'artist_url': U, 'artist_genres': G, 'artist_followers': F, 'artist_image': I, 'ids': Id} for N, U, G, F, I, Id in 
                                                                   zip(artist_name, artist_url, artist_genres, artist_followers, artist_image, ids)]
        results_list['artist'] = artist_result

    playlist_name, playlist_url, playlist_image, ids = [], [], [], []
    if 'playlist' in types:
        results = spotify.search(string, limit=limitation, type='playlist')
        Range = len(results['playlists']['items'])
        for i in range(Range):
            playlist_name.append(results['playlists']['items'][i]['name'])
            playlist_url.append(results['playlists']['items'][i]['external_urls']['spotify'][25:])
            playlist_image.append(results['playlists']['items'][i]['images'][0]['url'])
            ids.append(True)
        
        results = requests.get('https://api-v2.soundcloud.com/search/playlists_without_albums?q='+ string +'&sc_a_id=c1eb64aec56a5270ec813ade81c718b2752c7789&variant_ids=&facet=genre&client_id=Iy5e1Ri4GTNgrafaXe4mLpmJLXbXEfBR&limit=10&offset=0&linked_partitioning=1&app_version=1587727143&app_locale=en')
        results = results.json()
        Range = len(results['collection'])
        for i in range(Range):
            playlist_name.append(results['collection'][i]['title'])
            playlist_url.append(results['collection'][i]['uri'][27:])
            playlist_image.append(results['collection'][i]['artwork_url'])
            ids.append(False)

        playlist_result = [{'playlist_name': N, 'playlist_url': U, 'playlist_image': I, 'ids': Id} for N, U, I, Id in
                                                  zip(playlist_name, playlist_url, playlist_image, ids)]
        results_list['playlist'] = playlist_result

    return results_list


def autocomplete(string):
    results_list = {}
    name = []
    results = requests.get('https://api-v2.soundcloud.com/search/queries?q='+ string +'&client_id=Iy5e1Ri4GTNgrafaXe4mLpmJLXbXEfBR&limit=10&offset=0&linked_partitioning=1&app_version=1588249348&app_locale=en')
    results = results.json()
    for i in range(5):
        name.append(results['collection'][i]['output'])

    autocomplete_result = [{'name': N} for N in zip(name)]
    results_list['name'] = autocomplete_result

    return results_list
    