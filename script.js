require([
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/layers/FeatureLayer",

  "esri/Graphic",
  "esri/geometry/Point",
  "esri/geometry/support/webMercatorUtils",
  "esri/geometry/SpatialReference",
  "dojo/domReady!",
], function (
  WebScene,
  SceneView,
  FeatureLayer,
  Graphic,
  Point,
  webMercatorUtils,
  SpatialReference
) {
  const webscene = new WebScene({
    ground: {
      opacity: 0,
    },
  });

  const view = new SceneView({
    container: "viewDiv",
    map: webscene,
    qualityProfile: "high",
    spatialReference: {
      wkid: 2056,
    },
    camera: {
      position: {
        x: 2694307.39164,
        y: 1245619.17789,
        z: 100890.937,
        spatialReference: 2056,
      },
      heading: 0.0,
      tilt: 0.5,
    },
    alphaCompositingEnabled: true,
    environment: {
      background: {
        type: "color",
        color: [0, 0, 0, 0],
      },
      starsEnabled: false,
      atmosphereEnabled: false,
    },
    constraints: {
      altitude: {
        min: 5000,
        max: 100000,
      },
    },
  });

  const contourLayer = new FeatureLayer({
    url: "https://services2.arcgis.com/cFEFS0EWrhfDeVw9/arcgis/rest/services/ContourLinesZurichDemo/FeatureServer",
    elevationInfo: {
      mode: "absolute-height",
      featureExpressionInfo: {
        expression: "Pow($feature.elevation,1.2)",
      },
    },
    renderer: {
      type: "simple",
      symbol: {
        type: "line-3d",
        symbolLayers: [
          {
            type: "line",
            size: "1px",
            material: {
              color: [86, 72, 31],
            },
          },
        ],
      },
      visualVariables: [
        {
          type: "color",
          field: "elevation",
          stops: [
            { value: 400, color: [0, 255, 0] }, 
            { value: 600, color: [255, 255, 0] },
            { value: 800, color: [255, 165, 0] }, 
            { value: 1000, color: [255, 0, 0] }, 
          ],
        },
      ],
    },
  });
  webscene.add(contourLayer);

  const waterLayer = new FeatureLayer({
    url: "https://services2.arcgis.com/cFEFS0EWrhfDeVw9/arcgis/rest/services/MainWaterbodiesZurichDemo/FeatureServer",
    elevationInfo: {
      mode: "absolute-height",
      featureExpressionInfo: {
        expression: "Pow(400,1.2)",
      },
    },
    renderer: {
      type: "simple",
      symbol: {
        type: "polygon-3d",
        symbolLayers: [
          {
            type: "extrude",
            material: {
              color: [153, 204, 255],
            },
            size: 100,
          },
        ],
      },
    },
    labelingInfo: [
      {
        labelExpressionInfo: {
          expression: "$feature.name",
        },
        where: "name <> Zürichsee AND name <> Limmat",
        symbol: {
          type: "label-3d",
          symbolLayers: [
            {
              type: "text",
              material: {
                color: [244, 239, 227, 0.9],
              },
              font: {
                weight: "bold",
              },
              size: 10,
            },
          ],
        },
      },
    ],
  });
  webscene.add(waterLayer);

  const hillsLayer = new FeatureLayer({
    url: "https://services2.arcgis.com/cFEFS0EWrhfDeVw9/arcgis/rest/services/HillsZurichDemo/FeatureServer",
    elevationInfo: {
      mode: "absolute-height",
      featureExpressionInfo: {
        expression: "Pow(Geometry($feature).Z, 1.2)",
      },
    },
    renderer: {
      type: "simple",
      symbol: {
        type: "point-3d",
        symbolLayers: [
          {
            type: "icon",
            resource: {
              primitive: "circle",
            },
            material: {
              color: [86, 72, 31],
            },
            size: "4px",
          },
        ],
      },
    },
    labelingInfo: [
      {
        labelPlacement: "above-center",
        labelExpressionInfo: {
          expression: "$feature.NAME",
        },
        symbol: {
          type: "label-3d",
          symbolLayers: [
            {
              type: "text",
              material: {
                color: [86, 72, 31],
              },
              halo: {
                color: [244, 239, 227, 0.6],
                size: "3px",
              },
              font: {
                weight: "bold",
              },
              size: 10,
            },
          ],
          verticalOffset: {
            screenLength: 50,
            maxWorldLength: 1000,
            minWorldLength: 20,
          },
          callout: {
            type: "line",
            size: "2px",
            color: [86, 72, 31],
          },
        },
      },
    ],
  });
  webscene.add(hillsLayer);

  const zurichPoint = new Point({
    x: 2682187,
    y: 1247592,
    z: 1400,
    spatialReference: {
      wkid: 2056,
    },
  });

  const zurichLabel = new Graphic({
    symbol: {
      type: "point-3d",
      symbolLayers: [
        {
          type: "text",
          material: {
            color: [86, 72, 31],
          },
          font: {
            weight: "bold",
          },
          halo: {
            color: [244, 239, 227, 0.6],
            size: 2,
          },
          text: "Zürich",
          size: 12,
        },
      ],
      verticalOffset: {
        screenLength: 100,
        maxWorldLength: 1000,
        minWorldLength: 30,
      },
      callout: {
        type: "line",
        size: 1,
        color: [86, 72, 31],
      },
    },
    geometry: zurichPoint,
  });

  const zurichSymbol = new Graphic({
    symbol: {
      type: "point-3d",
      symbolLayers: [
        {
          type: "object",
          resource: {
            primitive: "sphere",
          },
          material: {
            color: [86, 72, 31],
          },
          height: 50,
          width: 250,
          depth: 250,
        },
      ],
    },
    geometry: zurichPoint,
  });

  const lakePoint = new Point({
    x: 2693000,
    y: 1234000,
    z: 1400,
    spatialReference: {
      wkid: 2056,
    },
  });

  const zurichLakeLabel = new Graphic({
    symbol: {
      type: "point-3d",
      symbolLayers: [
        {
          type: "text",
          text: "Zürichsee",
          material: {
            color: [244, 239, 227, 0.9],
          },
          font: {
            weight: "bold",
          },
          size: 10,
        },
      ],
    },
    geometry: lakePoint,
  });

  view.graphics.addMany([zurichLabel, zurichSymbol, zurichLakeLabel]);

  const bookmarks = {
    reset:{
      position: {
        x: 2694307.39164,
        y: 1245619.17789,
        z: 100890.937,
        spatialReference: 2056,
      },
      heading: 0.0,
      tilt: 1,
    },
    home: {
      position: {
        x: 2725234.40979,
        y: 1214254.41892,
        z: 37605.855,
        spatialReference: 2056,
      },
      heading: 311.71,
      tilt: 53.54,
    },
    uetliberg: {
      position: {
        x: 2682273.97784,
        y: 1236917.56282,
        z: 9056.639,
        spatialReference: 2056,
      },
      heading: 357.8,
      tilt: 53.36,
    },
    zurichberg: {
      position: {
        x: 2682687.31596,
        y: 1261426.11554,
        z: 8705.174,
        spatialReference: 2056,
      },
      heading: 174.14,
      tilt: 68.67,
    },
    albis: {
      position: {
        x: 2696309.82122,
        y: 1227266.56746,
        z: 17134.442,
        spatialReference: 2056,
      },
      heading: 315.97,
      tilt: 47.53,
    },
    west: {
      position: {
        x: 2695480.25078,
        y: 1224613.60231,
        z: 21086.465,
        spatialReference: 2056,
      },
      heading: 350.48,
      tilt: 41.51,
    },
  };

  
  Object.keys(bookmarks).forEach(function (key) {
    const elements = document.getElementsByClassName(key);

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      el.addEventListener("click", function () {
        const camera = bookmarks[key];
        view.goTo(camera, {
          duration: 2000,
        });
      });
    }
  });
});
