import { Meteor } from 'meteor/meteor';

const openWeatherKey = process.env.openWeatherKey || Meteor.settings.secrets.openWeatherKey;

Meteor.methods({
  getCurrentWeather: function (args) {
    this.unblock();
    const lat = args.lat;
    const lon = args.lng;
    try {
      const url = "http://api.openweathermap.org/data/2.5/weather" + "?APPID=" + openWeatherKey + "&lat=" + lat + "&lon=" + lon;
      const result = Meteor.http.get(url);
      return result.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
});
