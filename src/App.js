import React, { Component } from 'react';

// import cesium from "cesium";
const Cesium = require('cesium');
console.log('=cesium=', Cesium);
class App extends Component {
  componentDidMount() {
    var viewer = new Cesium.Viewer(this.cesiumContainer);

    // return;
    //Seed the random number generator for repeatable results.
    Cesium.Math.setRandomNumberSeed(0);
    var testone={"type": "FeatureCollection",
      "features": [{
        "type": "Feature",
        "properties": {
            "name": "1",
        },
        "geometry": {
            "type": "Point",
            "coordinates": [106.525613049398, 29.5924822884825, 0.0]
        }
    }, {
        "type": "Feature",
        "properties": {
            "name": "2",
        },
        "geometry": {
            "type": "Point",
            "coordinates": [106.523411183102, 29.5921146099139, 0.0]
        }
    }, {
        "type": "Feature",
        "properties": {
            "name": "33",
        },
        "geometry": {
            "type": "Point",
            "coordinates": [106.52143331325, 29.5927352704362, 0.0]
        }
    }]
  };
  
    var promise=Cesium.GeoJsonDataSource.load(testone);
    promise.then(function(dataSource) {
      console.log('=dataSource=', dataSource);
      viewer.dataSources.add(dataSource);
      var entities = dataSource.entities.values;
      var colorHash = {};
      for (var i = 0; i < entities.length; i++) {
        var entity = entities[i];
        var name = entity.name;
        var color = colorHash[name];
        if (!color) {
          color = Cesium.Color.fromRandom({
            alpha : 1.0
          });
          colorHash[name] = color;
        }
        entity.polygon.material = color; 
        entity.polygon.outline = false;
        entity.polygon.extrudedHeight =entity.properties.size._value *50;
        // 生成省份注记
        entity.position = Cesium.Cartesian3.fromDegrees(entity.properties.cp._value[0],entity.properties.cp._value[1],entity.properties.size._value *50);//经度、纬度、高程
        /* entity.label = {
          text: entity.name,
          showBackground: true,
          scale: 0.7,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(100.0, 2000000.0),
          disableDepthTestDistance: 10000.0
        }; */
        entity.label={
            text:entity.name,
            color : Cesium.Color.fromCssColorString('#fff'),
            font:'normal 32px MicroSoft YaHei',
            showBackground : true,
            scale : 0.5,
            horizontalOrigin : Cesium.HorizontalOrigin.LEFT_CLICK,
            verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
            disableDepthTestDistance : 100000.0
        };
      }
    }); 
    viewer.flyTo(promise);  

  }

  render() {
    return (
      <div>
        <div id="cesiumContainer" ref={element => this.cesiumContainer = element} />
      </div>
    );
  }
}

export default App