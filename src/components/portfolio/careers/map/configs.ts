const configs = {
  // Time allotted for transitions to complete
  transitionDuration: 300,

  // Fade duration when an object is added or removed
  fadeDuration: 1000,

  // Origin of coordinates (around Tokyo station)
  defaultCenter: [128.3989147, 35.6483862],
  //defaultCenter: [148.9819, -35.39847],

  // Default zoom level
  defaultZoom: 10,

  // Default bearing (rotation) of the map
  defaultBearing: 0,

  // Default pitch in degrees
  defaultPitch: 0,

  // Default frame rate for train and aircraft animations in the Eco mode
  defaultEcoFrameRate: 1,

  // Default view mode
  defaultViewMode: 'ground',

  // Default tracking mode
  defaultTrackingMode: 'position',

  // Default clock mode
  defaultClockMode: 'realtime'
}

export default configs
