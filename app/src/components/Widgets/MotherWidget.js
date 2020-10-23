import React from 'react';
import EmbedToHTML from './EmbedWidget';
import TextToHTML from './TextWidget';
import ImageToHTML from './ImageWidget';
import YoutubeToHTML from './EmbedWidgetYoutube';
import SpotifyToHTML from './EmbedWidgetSpotify';
import InstagramToHTML from './EmbedWidgetInstagram';
//import LinkedinToHTML from './EmbedWidgetLinkedin';
import TwitterToHTML from './EmbedWidgetTwitter';
import ApplemusicToHTML from './EmbedWidgetApplemusic';


export function MotherWidget({widget}) {
    const w_data = widget.data;
    if (widget.type === 'about') {
        return (
            <TextToHTML text={w_data.about} />
        );
    } else if (widget.type === 'image') {
        return (
            <ImageToHTML src={w_data.image_url} width={'100%'} height={'100%'} />
        );
    } else if (widget.type === 'embed') {
        return (
            <EmbedToHTML src={w_data.external_url} title={widget.public_id} />
        )
    } else if (widget.type === 'spotify_embed') {
        return (
            <SpotifyToHTML src={w_data.external_url} title={widget.public_id} />
        )
    } else if (widget.type === 'instagram_embed') {
        return (
            <InstagramToHTML src={w_data.external_url} title={widget.public_id} />
        )
    } else if (widget.type === 'youtube_embed') {
        return (
            <YoutubeToHTML src={w_data.external_url} title={widget.public_id} />
        )

    /**
    } else if (widget.type === 'linkedin_embed') {
        return (
            <LinkedinToHTML src={w_data.external_url} title={widget.public_id} />
        )
    */

    } else if (widget.type === 'twitter_embed') {
        return (
            <TwitterToHTML src={w_data.external_url} title={widget.public_id} />
        )
    } else if (widget.type === 'applemusic_embed') {
        return (
            <ApplemusicToHTML src={w_data.external_url} title={widget.public_id} />
        )
    }
}

export default MotherWidget;