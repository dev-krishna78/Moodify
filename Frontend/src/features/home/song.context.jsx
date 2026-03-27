import { createContext } from "react";
import {useState} from "react";


export const SongContext = createContext()

export const SongContextProvider = ({children})=>{

const [song, setSong] = useState({
 
"url": "https://ik.imagekit.io/Krishnatech/cohort-2/moodify/songs/Pushpa_Pushpa__From__Pushpa_2_The_Rule____-_Hindi__DownloadMing.WS__E0EtF7ehW.mp3",

"posterUrl": "https://ik.imagekit.io/Krishnatech/cohort-2/moodify/posters/Pushpa_Pushpa__From__Pushpa_2_The_Rule____-_Hindi__DownloadMing.WS__Yb8Z6PblG.jpeg",

"title": "Pushpa Pushpa (From \"Pushpa 2 The Rule\")  - Hindi [DownloadMing.WS]",

"mood": "suprised",
  
})

    const [loading, setLoading] = useState(false)

    return(
        <SongContext.Provider value={{loading , setLoading, setSong, song}}>
      {children}
        </SongContext.Provider>
    )

}
