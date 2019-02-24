import React from 'react';

class Map extends React.Component {
  constructor(props) {
      super(props);

      this.platform = null;
      this.map = null;

      this.state = {
          app_id: props.app_id,
          app_code: props.app_code,
          center: {
              lat: props.lat,
              lng: props.lng,
          },
          zoom: props.zoom,
          theme: props.theme,
          style: props.style,
      }
  }

  // TODO: Add theme selection discussed later HERE

  componentDidMount() {
      this.platform = new window.H.service.Platform(this.state);

      var layer = this.platform.createDefaultLayers();
      var container = document.getElementById('here-map');

      this.map = new window.H.Map(container, layer.normal.map, {
          center: this.state.center,
          zoom: this.state.zoom,
        })

        var events = new window.H.mapevents.MapEvents(this.map);
        // eslint-disable-next-line
        var behavior = new window.H.mapevents.Behavior(events);
        // eslint-disable-next-line
        var ui = new window.H.ui.UI.createDefault(this.map, layer)
        
  }

  componentDidUpdate() {
  }
  
  addCircleToMap(map) {
    map.addObject(new window.H.map.Circle(
      // The central point of the circle
      {lat:this.state.lat, lng:this.state.lng},
      // The radius of the circle in meters
      1000,
      {
        style: {
          strokeColor: 'rgba(55, 85, 170, 0.6)', // Color of the perimeter
          lineWidth: 2,
          fillColor: 'rgba(0, 128, 0, 0.7)'  // Color of the circle
        }
      }
    ));
  }

  render() {
      return (
          <div id="here-map" style={{width: '100%', height: '400px', background: 'grey' }} />
      );
  }
};

export default Map;
