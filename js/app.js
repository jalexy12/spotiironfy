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
    event.preventDefault();
    var trackURL = album.link;
    $.ajax({
        crossDomain: true,
        url: trackURL
    }).done(function(response) {
        console.log(response);
        response.tracks.items.forEach(function (item){
        	album.addTrack(new TrackClass({
        		title: item.name,
        	}));
        });
        // response.forEach(function (item) {
        //     album.artists.push(new TrackClass({
        //     }));
        // });

    });
}





function addAlbumToList (album) {
	albums.append(albumView(album))
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
    $(".js-albumlist").on('click', '.js-viewtracks', getAlbumInfo(album))
    album.tracks.forEach(function (track) {
        addTrackToAlbum(albumLi.find('.albumtracklist'), track);
    })
    return albumLi;
};

function addTrackToAlbum(track) {
    var trackLi = $(`
	<li class="js-tracklist">
		<h3>${album.tracks.title}</h3>
		<span>${album.tracks.duration}</span>
		<button class="js-play">Play</button>
	</li>
`);
    tracksList.append(trackLi);

}