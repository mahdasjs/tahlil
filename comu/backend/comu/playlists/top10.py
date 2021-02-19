from django.conf import settings
import json
import requests

import spotipy
import soundcloud
from spotipy.oauth2 import SpotifyClientCredentials


def get_featured_playlists():
    credential = \
        SpotifyClientCredentials(client_id='8056d6f1c5264b28b05858a82d4523c6',
                                 client_secret='c76f4bc77dda42bb8340a4a3ae188518')
    spotify = spotipy.Spotify(client_credentials_manager=credential)
    playlists = spotify.featured_playlists(limit=50)
    url, name, image, ids = [], [], [], []
    for i in range(10):
        url.append(playlists['playlists']['items'][i]['external_urls']['spotify'][25:])
        name.append(playlists['playlists']['items'][i]['name']) 
        image.append(playlists['playlists']['items'][i]['images'][0]['url'])
        ids.append(False)
        

    soundcloud_top_playlists = requests.get('https://api-v2.soundcloud.com/mixed-selections?client_id=Iy5e1Ri4GTNgrafaXe4mLpmJLXbXEfBR&limit=100&offset=0&linked_partitioning=1&app_version=1586958409&app_locale=en')
    soundcloud_top_playlists = soundcloud_top_playlists.json()
    for i in range(3):
        for j in range(10):
            if 'uri' in soundcloud_top_playlists['collection'][i]['items']['collection'][j].keys():
                url.append(soundcloud_top_playlists['collection'][i]['items']['collection'][j]['uri'][27:])
                name.append(soundcloud_top_playlists['collection'][i]['items']['collection'][j]['title']) 
                image.append(soundcloud_top_playlists['collection'][i]['items']['collection'][j]['artwork_url'])
                ids.append(True)
    
    playlists_info = [{'url': U, 'name': N, 'image': I, 'ids': Id} for U, N, I, Id in zip(url, name, image, ids)]
    return playlists_info


def get_top_tracks():
    credential = \
        SpotifyClientCredentials(client_id='8056d6f1c5264b28b05858a82d4523c6',
                                 client_secret='c76f4bc77dda42bb8340a4a3ae188518')
    spotify = spotipy.Spotify(client_credentials_manager=credential)
    playlists = spotify.featured_playlists(limit=1)
    playlist_url = playlists['playlists']['items'][0]['external_urls']['spotify']

    tracks = spotify.playlist_tracks(playlist_url, limit=10)
    url, name, image, artist, ids = [], [], [], [], []
    for i in range(10):
        url.append(tracks['items'][i]['track']['external_urls']['spotify'][25:])
        name.append(tracks['items'][i]['track']['name'])
        image.append(tracks['items'][i]['track']['album']['images'][2]['url'])
        artist.append(tracks['items'][i]['track']['album']['artists'][0]['name'])
        ids.append(False)
    
    soundcloud_top_playlists = requests.get('https://api-v2.soundcloud.com/mixed-selections?client_id=Iy5e1Ri4GTNgrafaXe4mLpmJLXbXEfBR&limit=10&offset=0&linked_partitioning=1&app_version=1586958409&app_locale=en')
    soundcloud_top_playlists = soundcloud_top_playlists.json()
    playlist_id = str(soundcloud_top_playlists['collection'][0]['items']['collection'][0]['id'])
    soundcloud_top_track = requests.get('https://api-v2.soundcloud.com/playlists/'+playlist_id+'?representation=full&client_id=Iy5e1Ri4GTNgrafaXe4mLpmJLXbXEfBR&app_version=1586958409&app_locale=en')
    soundcloud_top_track = soundcloud_top_track.json()

    for i in range(5):
        url.append(soundcloud_top_track['tracks'][i]['uri'][27:])
        name.append(soundcloud_top_track['tracks'][i]['title']) 
        image.append(soundcloud_top_track['tracks'][i]['artwork_url'])
        artist.append(None)
        ids.append(True)

    playlist_id = str(soundcloud_top_playlists['collection'][0]['items']['collection'][1]['id'])
    soundcloud_top_track = requests.get('https://api-v2.soundcloud.com/playlists/'+playlist_id+'?representation=full&client_id=Iy5e1Ri4GTNgrafaXe4mLpmJLXbXEfBR&app_version=1586958409&app_locale=en')
    soundcloud_top_track = soundcloud_top_track.json()

    for i in range(5):
        url.append(soundcloud_top_track['tracks'][i]['uri'][27:])
        name.append(soundcloud_top_track['tracks'][i]['title']) 
        image.append(soundcloud_top_track['tracks'][i]['artwork_url'])
        artist.append(None)
        ids.append(True)

    tracks_info = [{'url': U, 'name': N, 'image': I, 'artist': A, 'ids': Id} for U, N, I, A, Id in zip(url, name, image, artist, ids)]
    
    return tracks_info
