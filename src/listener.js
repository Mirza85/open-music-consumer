class Listener {
    constructor(playlistsService, mailSender) {
        this._playlistsService = playlistsService;
        this._mailSender = mailSender;

        this.listen = this.listen.bind(this);
    }
    async listen(message) {
        try {
            const { playlistId, targetEmail } = JSON.parse(message.content.toString());
            // console.log(targetEmail);
            // console.log(playlistId)
            const playlistsData = await this._playlistsService.getPlaylists(playlistId);
            //console.log(playlistData)
            const songs = await this._playlistsService.getSongs(playlistId);


            console.log(playlistsData.id)
            const result = await this._mailSender.sendEmail(
                targetEmail,
                JSON.stringify({
                    playlists: {
                        id: playlistsData.id,
                        name: playlistsData.name,
                        songs
                    }
                }),
            )

            console.log(result);
        } catch (error) {
            console.error(error);

        }
    }
}
module.exports = Listener;