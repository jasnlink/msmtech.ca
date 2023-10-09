import { PropsWithChildren, createContext, useContext } from "react";
import { PlaybackState } from "./DiscoveryAnimation";

interface PlaybackStateProviderProps {
    playbackState: PlaybackState;
}

// Create the context
const PlaybackStateContext = createContext<PlaybackState | undefined>(undefined)

// Create the provider component
export default function PlaybackStateProvider({playbackState, children}:PropsWithChildren<PlaybackStateProviderProps>) {
    return <PlaybackStateContext.Provider value={playbackState}>{children}</PlaybackStateContext.Provider>
}

// Create a custom hook for accessing the playback state
export const usePlaybackState = () => {
    const context = useContext(PlaybackStateContext);
    if (context === undefined) {
        throw new Error('usePlaybackState must be used within a PlaybackStateProvider');
    }
    return context;
};