import { playSong } from "@/helper/playSong";
import { MdSkipPrevious } from "react-icons/md";

export const PreButton = () => {
    const handlePre = () => {
        const currentSongIndex = JSON.parse(localStorage.getItem("currentSongIndex"));
        const currentPlaylist = JSON.parse(localStorage.getItem("currentPlaylist"));

        let prevSongIndex = 0;
        if (currentSongIndex <= 0) {
            prevSongIndex = currentPlaylist.length - 1;
        } else {
            prevSongIndex = currentSongIndex - 1;
        }
        localStorage.setItem("currentSong", JSON.stringify(currentPlaylist[prevSongIndex]));
        localStorage.setItem("currentSongIndex", JSON.stringify(prevSongIndex));
        playSong(currentPlaylist[prevSongIndex]);
    }

    return (
        <>
            <button
                onClick={handlePre}
            >
                <MdSkipPrevious />
            </button>
        </>
    );
}