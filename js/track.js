/* jshint node: true, esnext: true */
"use strict";

/*
title <string>
duration <number>
lyrics <string>
bpm <number>
artist(s) <array>[string]
featuring artist(s) <array>[string]
song writer(s) <array>[string]
producer <array>[string]
genre <string>
price <number>
release day <date>

album <album>
*/

var Utils = require('./utils.js');

class Track {

    constructor(data = {}) {
        Utils.assertString(data.title,'Title should be a string');
        this.title = data.title;

        Utils.assertNumber(data.albumID, 'AlbumID should be a string');
        this.albumID = data.albumID;

        this.media = data.media;
        
        Utils.assertNumber(data.duration, 'Duration should be a number');
        this.duration = data.duration;

        Utils.assertString(data.genre,'Genre should be a string');
        this.genre = data.genre;

        Utils.assertNumber(data.price, 'Price should be a number');
        this.price = data.price;

        this.releaseDay = new Date(data.releaseDay);
        this.artists = [];
        this.featuringArtists = [];
        this.songWriters = [];
        this.producers = [];
    }

    addArtist(artist){
        Utils.assertString(artist, 'Artist should be a string.');
        this.artists.push(artist);
    }

    addFeaturingArtist(featuringArtist){
        Utils.assertString(featuringArtist, 'Featuring artist should be a string.');
        this.featuringArtists.push(featuringArtist);
    }

    addSongWriter(songWriter){
        Utils.assertString(songWriter, 'Song writter should be a string.');
        this.songWriters.push(songWriter);
    }

    addProducer(producer){
        Utils.assertString(producer, 'Producer should be a string.');
        this.producer.push(producer);
    }
}

module.exports = Track;
