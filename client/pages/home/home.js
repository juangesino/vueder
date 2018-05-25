Tracker.autorun(function(){
  let geoLocation = Geolocation.latLng();
  if (geoLocation) {
    Meteor.call('getCurrentWeather', geoLocation, function (err, result) {
      Session.set('currentWeather', result);
      return result;
    })
  }
});

Template.home.onCreated(function () {
  Session.set('currentWeather', undefined);
});

Template.home.helpers({
  getLocation: function () {
    if (Session.get('currentWeather') && Session.get('currentWeather').name) {
      let location = Session.get('currentWeather').name;
      return location;
    } else {
      return '';
    }
  },
  getTemperature: function () {
    if (Session.get('currentWeather') && Session.get('currentWeather').main.temp) {
      let temp = Session.get('currentWeather').main.temp;
      temp = temp - 273.15;
      return Math.round(temp * 10)/10 + '°C';
    } else {
      return '';
    }
  },
  getMinTemperature: function () {
    if (Session.get('currentWeather') && Session.get('currentWeather').main.temp_min) {
      let temp = Session.get('currentWeather').main.temp_min;
      temp = temp - 273.15;
      return Math.round(temp) + '°C';
    } else {
      return '';
    }
  },
  getMaxTemperature: function () {
    if (Session.get('currentWeather') && Session.get('currentWeather').main.temp_max) {
      let temp = Session.get('currentWeather').main.temp_max;
      temp = temp - 273.15;
      return Math.round(temp) + '°C';
    } else {
      return '';
    }
  },
  getIcon: function () {
    if (Session.get('currentWeather') && Session.get('currentWeather').weather) {
      let iconId = Session.get('currentWeather').weather[0].id;
      return 'wi wi-owm-' + iconId;
    } else {
      return 'fa fa-spin fa-circle-o-notch';
    }
  }
});

Template.home.events({

});
