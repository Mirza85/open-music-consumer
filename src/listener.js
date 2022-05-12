class Listener {
    constructor(notesService, mailSender) {
        this._noteService = notesService;
        this._mailSender = mailSender;

        this.listener = this.listener.bind(this);
    }
    async listener(message) {
        try {
            const { playlistId, targetEmail } = JSON.parse(message.content.toString());
            console.log(playlistId)
            const playlistsData = await this._playlistsService.getPlaylistSongs(playlistId);
            //console.log(playlistData)



            const result = await this._mailSender.sendMail(
                targetEmail,
                playlistsData.playlist.name,
                JSON.stringify(playlistsData),
            )

            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }
}
module.exports = Listener;