import React from 'react';
import EmbedToHTML from './EmbedWidget';
import TextToHTML from './TextWidget';
import ImageToHTML from './ImageWidget';
import PortfolioToHTML from './PortfolioWidget';


export function MotherWidget({widget}) {
    console.log(widget);
    console.log(widget.type);
    if (widget.type == 'about') {
        return (
            <TextToHTML text={widget.data.about} />
        );

    } else if (widget.type == 'image') {
        return (
            <ImageToHTML src={widget.data.image_url} width={'100%'} height={'100%'} />
        );

    } else if (widget.type == 'embed') {
        return (
            <EmbedToHTML src={widget.data.external_url} width={'100%'} height={'100%'} />
        )
    } else if (widget.type == 'project') {
        return (
            <PortfolioToHTML name={widget.data.name} desc={widget.data.description} src={widget.data.external_url} />
        )
    }
}

export default MotherWidget;