const React = require('react');
const cheerio = require('cheerio');
const _ = require('lodash');

const { PrefetchFragmentLink } = require('./PrefetchFragmentLink');

exports.onRenderBody = ({ setHeadComponents, bodyHtml }) => {
    if (!bodyHtml) {
        return;
    }

    const $ = cheerio.load(bodyHtml);
    const fragmentPrefetchUrls = _.uniq(
        $('link[rel="cloze:include"]')
            .get()
            .map(element => $(element).attr('href')),
    );

    setHeadComponents(
        <>
            {fragmentPrefetchUrls.map(url => (
                <PrefetchFragmentLink src={url} />
            ))}
        </>,
    );
};
