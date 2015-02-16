/* jshint node: true */
"use strict";
var AlbumClass = require('./album.js');
var TrackClass = require('./track.js');
var search = $('.js-searchalbums');
var submit = $('.js-submit');
var albums = $('.js-list');
var tracksList = $('.js-tracklist');
var baseUrl = ' https://api.spotify.com/v1/search?type=album&query=';
submit.on('click', searchForArtist);


function searchForArtist(event) {
    event.preventDefault();
    var userInput = search.val()
    var albumList = [];
    var albumsApi = baseUrl + userInput;
    albums.empty();
    $.ajax({
        crossDomain: true,
        url: albumsApi
    }).done(function(albumResponse) {
    	// console.log(albumResponse)
        albumResponse.albums.items.forEach(function(item) {
            albumList.push(new AlbumClass({
                title: item.name,
                price: 0,
                cover: item.images[2].url,
                link: item.href
            }));
        });
        updateAlbum(albumList);
    });
}


function updateAlbum(albums){
		albums.forEach(addAlbumToList);
	}

function getAlbumInfo(album) {
    var trackURL = album.link;
    var trackList = [];
    var liElement = albumView(album);
    var li = liElement.find('.albumtracklist');
    var this_li = $('.js-albumlist').closest(li);

    $.ajax({
        crossDomain: true,
        url: trackURL
    }).done(function(response) {
    	album.tracks = [];
        console.log(response.tracks.items);
        response.tracks.items.forEach(function(item){
        		trackView(this_li, album);
        		var track = new TrackClass({
        			title: item.name,
				});
        	album.addTrack(track);
        	
    	});
    });
}


function addAlbumToList (album) {
    var albumElement = albumView(album);
    albums.append(albumElement);
    albumElement.find('.js-viewtracks').on('click', function () {
        getAlbumInfo(album);
    });
}


function albumView(album) {

    var albumLi = $(`
		<li class="js-albumList">
			<h2>${album.title}</h2>
			<img src="${album.cover}">
			<button class="js-viewtracks">View Tracks</button>
            <ol class="albumtracklist">
            </ol>
		</li>
	`);

    return albumLi;
};


function trackView(li, album) {
    // li.find('.albumtracklist').html('');
    album.tracks.forEach(function(track) {
            li.find('.albumtracklist').append(`
	<li class>
		<h3>${track.title}</h3>
		<span>${track.duration}</span>
		<button class="js-play">Play</button>
	</li>`)
        });
    }
