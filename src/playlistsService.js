const { Pool } = require('pg');

class PlaylistsService {
    constructor() {
        this._pool = new Pool();
    }

    async getPlaylistSongs(playlistId) {
        const query = {
            text: 'select playlists.*, songs.id,songs.title as song_title, songs.performer from playlists left join playlist_songs on playlist_songs.playlist_id = playlists.id left join songs on songs.id = playlistsongs.song_id left join users on user.id = playlists.owner where playlists.id = $1',
            values: [playlistId]
        }
        console.log(query);
        const result = await this._pool.query(query);

        return result.rows;
    }
}

module.exports = PlaylistsService;