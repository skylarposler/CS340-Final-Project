/*Citation for this node module for Streaming Platforms Table
5/25/2023
Modeled after React Project from CS290, our own work*/

/*Table for Streaming Platforms entity*/
import React from 'react';
import StreamingPlatformRow from './StreamingPlatformRow';

function StreamingPlatformTable({ streamingPlatforms, loadStreamingPlatforms }) {
    return (
            <tbody>
                {streamingPlatforms.map((streamingPlatforms, i) => <StreamingPlatformRow streamingPlatform={streamingPlatforms} loadStreamingPlatforms={loadStreamingPlatforms}
                    key={i} />)}
            </tbody>
    );
}

export default StreamingPlatformTable;