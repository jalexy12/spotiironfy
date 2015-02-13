/* jshint node: true */
"use strict";
var AlbumClass = require('./album.js');
var TrackClass = require('./track.js');

var firstAlbum = new AlbumClass({
    title: 'Weathered',
    ID: 1,
    duration: 10 * 85,
    price: 10,
    genre: 'Lame stuff',
    label: 'Weirdmusic',
    url: 'https://i.scdn.co/image/f99b89834ea640f848e454db4578e9605aa90ba0',
    release: new Date('12/12/2004'),
});

var secondAlbum = new AlbumClass({
    title: 'My own prison',
    duration: 10 * 85,
    ID: 2,
    price: 10,
    genre: 'Lame stuff',
    label: 'Weirdmusic',
    url: ' https://i.scdn.co/image/65a2df400e61b10e1c40bd664488622e3ef69787',
    release: new Date('12/12/2004'),
});

var thirdAlbum = new AlbumClass({
    title: 'Assasins creed soundtrack',
    duration: 10 * 85,
    price: 10,
    ID: 3,
    genre: 'Lame stuff',
    label: 'Weirdmusic',
    url: 'https://i.scdn.co/image/fadc412cc9f366d4d9ede4c677d125c322176005',
    release: new Date('12/12/2004'),
});

function newAlbumList(){
	return [firstAlbum,
	secondAlbum,
	thirdAlbum
	]
}
var albumList = [];
var trackArray = [];

var firstTrack = new TrackClass({
    title: 'CreedTrakz',
    duration: 90,
    price: 1.10,
    albumID: 1
});

var secondTrack = new TrackClass({
    title: 'CreedTrakz2',
    duration: 90,
    price: 1.10,
    albumID: 1
});

var thirdTrack = new TrackClass({
    title: 'CreedTrakz3',
    duration: 90,
    price: 1.10,
    albumID: 2,
});

var fourthTrack = new TrackClass({
    title: 'Assasins creed track',
    duration: 90,
    price: 1.10,
    albumID: 3
});

var fifthTrack = new TrackClass({
    title: 'Sweet Track',
    duration: 90,
    price: 1.10,
    albumID: 3
});

firstTrack.addArtist('Creed');
firstTrack.addArtist('Nickelback');
firstAlbum.addTrack(firstTrack);

secondTrack.addArtist('Creed');
firstAlbum.addTrack(secondTrack);

thirdTrack.addArtist('Creed');
secondAlbum.addTrack(thirdTrack);

fourthTrack.addArtist('Bill Murray');
thirdAlbum.addTrack(fourthTrack);

fifthTrack.addArtist('Mike Jones');
thirdAlbum.addTrack(fifthTrack);

var search = $('.js-searchalbums');
var submit = $('.js-submit');
var albums = $('.js-list');
var tracksList = $('.js-tracklist')
var baseUrl = ' https://api.spotify.com/v1/search?type=album&query='
submit.on('click', searchForArtist);


function searchForArtist(event){
    event.preventDefault();
    var userInput = search.val()

    var albumsApi = baseUrl + userInput;

    $.ajax({crossDomain: true, url: albumsApi}).done(function (response) {
       albumList= [];
        console.log(response);
        response.albums.items.forEach(function (item) {
            albumList.push(new AlbumClass({
                title: item.name,
                price: 0,
            	cover: item.images[2].url,
            	link: item.external_urls.href
            }));
        });
        updateAlbum();
    });
}


function updateAlbum(){
	albumList.forEach(addAlbumToList);

}


function addAlbumToList (album) {
	albums.append(albumView(album))
	console.log(album.link);
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
    albumLi.find('.js-viewtracks').on('click', function() {
        album.tracks.forEach(function(track) {
            addTrackToAlbum(albumLi.find('.albumtracklist'), track);
        })
        
    });
    return albumLi;
}

function addTrackToAlbum(tracksList, track){
	var trackLi = $(`
	<li class="js-tracklist">
		<h3>${track.title}</h3>
		<span>${track.duration}</span>
		<button class="play">Play</button>
	</li>
`);
	tracksList.append(trackLi);


}