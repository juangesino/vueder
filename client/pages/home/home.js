Tracker.autorun(function(){
  let geoLocation = Geolocation.latLng();
  if (geoLocation) {
    Meteor.call('getCurrentWeather', geoLocation, function (err, result) {
      Session.set('currentWeather', result);
      return result;
    })
    Meteor.call('getForecastWeather', geoLocation, function (err, result) {
      Session.set('getForecastWeather', result);
      return result;
    })
  }
});

Template.home.onRendered(function() {
   $.getScript("/assets/js/swipejs/swipe.js");
});

Template.home.onCreated(function () {
  Session.set('currentWeather', undefined);
});

Template.currentWeather.helpers({
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

Template.forecastWeather.helpers({
  forecastList: function () {
    if (Session.get('getForecastWeather') && Session.get('getForecastWeather').list) {
      let list = Session.get('getForecastWeather').list.slice(0,10);
      return list;
    }
  },
  getLocation: function () {
    if (Session.get('getForecastWeather') && Session.get('getForecastWeather').city) {
      let location = Session.get('getForecastWeather').city.name;
      return location;
    } else {
      return '';
    }
  },
  getTime: function (data) {
    if (data && data.dt_txt) {
      let time = moment(data.dt_txt);
      return time.format('hh:mm');;
    }
  },
  getTemperature: function (data) {
    if (data && data.main.temp) {
      let temp = data.main.temp;
      temp = temp - 273.15;
      return Math.round(temp * 1)/1 + '°C';
    } else {
      return '';
    }
  },
  getIcon: function (data) {
    if (data && data.weather) {
      let iconId = data.weather[0].id;
      return 'wi wi-owm-' + iconId;
    }
  },
  getMinTemperature: function (data) {
    if (data && data.main.temp_min) {
      let temp = data.main.temp_min;
      temp = temp - 273.15;
      return Math.round(temp) + '°C';
    }
  },
  getMaxTemperature: function (data) {
    if (data && data.main.temp_max) {
      let temp = data.main.temp_max;
      temp = temp - 273.15;
      return Math.round(temp) + '°C';
    }
  },
})
