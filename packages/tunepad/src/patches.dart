part of TunePad;

Map patches = {
  "bass" : {
    "nodes": [
      {
        "type": "out",
        "cx": 517,
        "cy": 189,
        "id": 0
      },
      {
        "type": "sample",
        "samples": [
          {
            "sample": "packages/synthesizer/sounds/voices/bass/21bassA1",
            "step": 21
          },
          {
            "sample": "packages/synthesizer/sounds/voices/bass/24bassC2",
            "step": 24
          },
          {
            "sample": "packages/synthesizer/sounds/voices/bass/36bassC3",
            "step": 36
          },
          {
            "sample": "packages/synthesizer/sounds/voices/bass/48bassC4",
            "step": 48
          }
        ],
        "id": 1,
        "level": 1,
        "cx": 100,
        "cy": 100
      },
      {
        "type": "adsr",
        "A": 0.04,
        "D": 0.1,
        "S": 1,
        "R": 0.3,
        "level": 1,
        "cx": 300,
        "cy": 188,
        "id": 2
      }
    ],
    "routing": [
      {
        "source": 1,
        "dest": 2,
        "type": "in"
      },
      {
        "source": 2,
        "dest": 0,
        "type": "out"
      }
    ]
  },


  "guitar" : {
    "nodes": [
      {
        "type": "out",
        "cx": 517,
        "cy": 189,
        "id": 0
      },
      {
        "type": "sample",
        "samples": [
          {
            "sample": "packages/synthesizer/sounds/voices/guitar/45acoustic-A2",
            "step": 45
          },
          {
            "sample": "packages/synthesizer/sounds/voices/guitar/50acoustic-D3",
            "step": 50
          },
          {
            "sample": "packages/synthesizer/sounds/voices/guitar/55acoustic-G3",
            "step": 55
          },
          {
            "sample": "packages/synthesizer/sounds/voices/guitar/59acoustic-B3",
            "step": 59
          },
          {
            "sample": "packages/synthesizer/sounds/voices/guitar/64acoustic-E4",
            "step": 64
          }
        ],
        "id": 1,
        "level": 1,
        "cx": 100,
        "cy": 100
      },
      {
        "type": "adsr",
        "A": 0.04,
        "D": 0.1,
        "S": 1,
        "R": 0.3,
        "level": 1,
        "cx": 300,
        "cy": 188,
        "id": 2
      }
    ],
    "routing": [
      {
        "source": 1,
        "dest": 2,
        "type": "in"
      },
      {
        "source": 2,
        "dest": 0,
        "type": "out"
      }
    ]
  },


  "pop-bass" : {
    "nodes": [
      {
        "type": "out",
        "id": 0,
        "cx": 517,
        "cy": 189
      },
      {
        "type": "sample",
        "samples": [
          {
            "sample": "packages/synthesizer/sounds/voices/party/party-C4",
            "step": 60
          }
        ],
        "id": 1,
        "level": 1,
        "cx": 100,
        "cy": 100
      },
      {
        "type": "adsr",
        "A": 0.01,
        "D": 0.1,
        "S": 1,
        "R": 0.3,
        "level": 1,
        "cx": 333,
        "cy": 250,
        "id": 2
      }
    ],
    "routing": [
      {
        "source": 1,
        "dest": 2,
        "type": "in"
      },
      {
        "source": 2,
        "dest": 0,
        "type": "out"
      }
    ]
  },


  "party" : {
    "nodes": [
      {
        "type": "out",
        "id": 0,
        "cx": 517,
        "cy": 189
      },
      {
        "type": "sample",
        "samples": [
          {
            "sample": "packages/synthesizer/sounds/voices/party/party-C4",
            "step": 48
          }
        ],
        "id": 1,
        "level": 1,
        "cx": 100,
        "cy": 100
      },
      {
        "type": "adsr",
        "A": 0.01,
        "D": 0.1,
        "S": 1,
        "R": 0.3,
        "level": 1,
        "cx": 333,
        "cy": 250,
        "id": 2
      }
    ],
    "routing": [
      {
        "source": 1,
        "dest": 2,
        "type": "in"
      },
      {
        "source": 2,
        "dest": 0,
        "type": "out"
      }
    ]
  },

  "marimba" : {
    "nodes": [
      {
        "type": "sample",
        "samples": [
          {
            "sample": "packages/synthesizer/sounds/voices/marimba/marimba-C1",
            "step": 24
          },
          {
            "sample": "packages/synthesizer/sounds/voices/marimba/marimba-C2",
            "step": 36
          },
          {
            "sample": "packages/synthesizer/sounds/voices/marimba/marimba-C3",
            "step": 48
          }
        ],
        "level": 1,
        "cx": 100,
        "cy": 100,
        "id": 0
      },
      {
        "cx": 300,
        "cy": 100,
        "type": "out",
        "id": 1
      }
    ],
    "routing": [
      {
        "source": 0,
        "dest": 1,
        "type": "out"
      }
    ]
  },


  "metronome" : {
    "nodes": [
      {
        "type": "out",
        "id": 0,
        "cx": 517,
        "cy": 189
      },
      {
        "type": "sample",
        "samples": [
          {
            "sample": "packages/synthesizer/sounds/voices/shot-drums/rim",
            "step": 24
          }
        ],
        "id": 1,
        "level": 1,
        "cx": 100,
        "cy": 100
      },
      {
        "type": "adsr",
        "A": 0.01,
        "D": 0.1,
        "S": 1,
        "R": 0.3,
        "level": 1,
        "cx": 258,
        "cy": 228,
        "id": 2
      }
    ],
    "routing": [
      {
        "source": 1,
        "dest": 2,
        "type": "in"
      },
      {
        "source": 2,
        "dest": 0,
        "type": "out"
      }
    ]
  },

  "musicbox" : {
    "nodes": [
      {
        "type": "out",
        "id": 0,
        "cx": 517,
        "cy": 189
      },
      {
        "type": "sample",
        "samples": [
          {
            "sample": "packages/synthesizer/sounds/voices/musicbox/musicbox-D",
            "step": 51
          }
        ],
        "id": 1,
        "level": 1,
        "cx": 100,
        "cy": 100
      },
      {
        "type": "adsr",
        "A": 0.01,
        "D": 0.1,
        "S": 1,
        "R": 0.3,
        "level": 1,
        "cx": 258,
        "cy": 228,
        "id": 2
      }
    ],
    "routing": [
      {
        "source": 1,
        "dest": 2,
        "type": "in"
      },
      {
        "source": 2,
        "dest": 0,
        "type": "out"
      }
    ]
  },

  "organ" : {
    "nodes": [
      {
        "type": "out",
        "cx": 517,
        "cy": 189,
        "id": 0
      },
      {
        "type": "sample",
        "samples": [
          {
            "sample": "packages/synthesizer/sounds/voices/organ/rhodes-C2",
            "step": 36
          },
          {
            "sample": "packages/synthesizer/sounds/voices/organ/rhodes-C3",
            "step": 48
          },
          {
            "sample": "packages/synthesizer/sounds/voices/organ/rhodes-C4",
            "step": 60
          },
          {
            "sample": "packages/synthesizer/sounds/voices/organ/rhodes-C5",
            "step": 72
          },
          {
            "sample": "packages/synthesizer/sounds/voices/organ/rhodes-C6",
            "step": 84
          }
        ],
        "id": 1,
        "level": 1,
        "cx": 100,
        "cy": 100
      },
      {
        "type": "adsr",
        "A": 0.1,
        "D": 0.1,
        "S": 1,
        "R": 0.3,
        "level": 1,
        "cx": 300,
        "cy": 188,
        "id": 2
      }
    ],
    "routing": [
      {
        "source": 1,
        "dest": 2,
        "type": "in"
      },
      {
        "source": 2,
        "dest": 0,
        "type": "out"
      }
    ]
  },

  "piano" : {
    "nodes": [
      {
        "type": "out",
        "id": 0,
        "cx": 517,
        "cy": 189
      },
      {
        "type": "sample",
        "samples": [
          {
            "sample": "packages/synthesizer/sounds/voices/piano/21pianoA0",
            "step": 21
          },
          {
            "sample": "packages/synthesizer/sounds/voices/piano/24pianoC1",
            "step": 24
          },
          {
            "sample": "packages/synthesizer/sounds/voices/piano/28pianoE1",
            "step": 28
          },
          {
            "sample": "packages/synthesizer/sounds/voices/piano/32pianoAb1",
            "step": 32
          },
          {
            "sample": "packages/synthesizer/sounds/voices/piano/36pianoC2",
            "step": 36
          },
          {
            "sample": "packages/synthesizer/sounds/voices/piano/40pianoE2",
            "step": 40
          },
          {
            "sample": "packages/synthesizer/sounds/voices/piano/44pianoAb2",
            "step": 44
          },
          {
            "sample": "packages/synthesizer/sounds/voices/piano/48pianoC3",
            "step": 48
          },
          {
            "sample": "packages/synthesizer/sounds/voices/piano/52pianoE3",
            "step": 52
          },
          {
            "sample": "packages/synthesizer/sounds/voices/piano/56pianoAb3",
            "step": 56
          },
          {
            "sample": "packages/synthesizer/sounds/voices/piano/60pianoC4",
            "step": 60
          },
          {
            "sample": "packages/synthesizer/sounds/voices/piano/64pianoE4",
            "step": 64
          },
          {
            "sample": "packages/synthesizer/sounds/voices/piano/68pianoAb4",
            "step": 68
          },
          {
            "sample": "packages/synthesizer/sounds/voices/piano/72pianoC5",
            "step": 72
          },
          {
            "sample": "packages/synthesizer/sounds/voices/piano/76pianoE5",
            "step": 76
          },
          {
            "sample": "packages/synthesizer/sounds/voices/piano/80pianoAb5",
            "step": 80
          },
          {
            "sample": "packages/synthesizer/sounds/voices/piano/84pianoC6",
            "step": 84
          },
          {
            "sample": "packages/synthesizer/sounds/voices/piano/88pianoE6",
            "step": 88
          },
          {
            "sample": "packages/synthesizer/sounds/voices/piano/92pianoAb6",
            "step": 92
          },
          {
            "sample": "packages/synthesizer/sounds/voices/piano/96pianoC7",
            "step": 96
          },
          {
            "sample": "packages/synthesizer/sounds/voices/piano/100pianoE7",
            "step": 100
          },
          {
            "sample": "packages/synthesizer/sounds/voices/piano/104pianoAb7",
            "step": 104
          },
          {
            "sample": "packages/synthesizer/sounds/voices/piano/108pianoC8",
            "step": 108
          }
        ],
        "id": 1,
        "level": 1,
        "cx": 100,
        "cy": 100
      },
      {
        "type": "adsr",
        "A": 0.01,
        "D": 0.1,
        "S": 1,
        "R": 0.3,
        "level": 1,
        "cx": 300,
        "cy": 188,
        "id": 2
      }
    ],
    "routing": [
      {
        "source": 1,
        "dest": 2,
        "type": "in"
      },
      {
        "source": 2,
        "dest": 0,
        "type": "out"
      }
    ]
  },
  "synthesizer" : {
    "nodes": [
      {
        "type": "sample",
        "id": 0,
        "samples": [
          {
            "sample": "packages/synthesizer/sounds/voices/synth/korg-NSR5-C3",
            "step": 36
          },
          {
            "sample": "packages/synthesizer/sounds/voices/synth/korg-NSR5-C4",
            "step": 48
          }
        ],
        "level": 1,
        "cx": 100,
        "cy": 100
      },
      {
        "cx": 554,
        "cy": 134,
        "type": "out",
        "id": 1
      },
      {
        "type": "adsr",
        "A": 0.01,
        "D": 0.1,
        "S": 1,
        "R": 0.3,
        "level": 1,
        "cx": 317,
        "cy": 169,
        "id": 2
      }
    ],
    "routing": [
      {
        "source": 0,
        "dest": 2,
        "type": "in"
      },
      {
        "source": 2,
        "dest": 1,
        "type": "out"
      }
    ]
  },

  "808-drums" : {
    "nodes": [
      {
        "type": "sample",
        "samples": [
          {
            "sample": "packages/synthesizer/sounds/voices/808-drums/kick1",
            "step": 0,
            "name": "kick"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/808-drums/kick2",
            "step": 1,
            "name": "kick"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/808-drums/snare1",
            "step": 2,
            "name": "snare"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/808-drums/snare2",
            "step": 3,
            "name": "snare"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/808-drums/hihat",
            "step": 4,
            "name": "hat"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/808-drums/openhat",
            "step": 5,
            "name": "hat"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/808-drums/tom1",
            "step": 6,
            "name": "tom"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/808-drums/tom2",
            "step": 7,
            "name": "tom"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/808-drums/tom3",
            "step": 8,
            "name": "tom"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/808-drums/cymb",
            "step": 9,
            "name": "cymbal"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/808-drums/clap",
            "step": 10,
            "name": "clap"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/808-drums/shaker",
            "step": 11,
            "name": "shaker"
          }
        ],
        "level": 1,
        "cx": 100,
        "cy": 100,
        "id": 0
      },
      {
        "type": "adsr",
        "A": 0,
        "D": 0,
        "S": 1,
        "R": 0.3,
        "level": 1,
        "cx": 258,
        "cy": 228,
        "id": 1
      },
      {
        "cx": 300,
        "cy": 100,
        "type": "out",
        "id": 2
      }
    ],
    "routing": [
      {
        "source": 0,
        "dest": 1,
        "type": "in"
      },
      {
        "source": 1,
        "dest": 2,
        "type": "out"
      }
    ]
  },

  "rock-drums" : {
    "nodes": [
      {
        "type": "sample",
        "samples": [
          {
            "sample": "packages/synthesizer/sounds/voices/rock-drums/kick",
            "step": 0,
            "name": "kick"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/rock-drums/rideBell",
            "step": 1,
            "name": "ride"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/rock-drums/snare1",
            "step": 2,
            "name": "snare1"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/rock-drums/snare2",
            "step": 3,
            "name": "snare2"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/rock-drums/closedHat",
            "step": 4,
            "name": "hat"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/rock-drums/openHat",
            "step": 5,
            "name": "open-hat"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/rock-drums/highTom",
            "step": 6,
            "name": "high-tom"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/rock-drums/midTom",
            "step": 7,
            "name": "mid-tom"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/rock-drums/floorTom",
            "step": 8,
            "name": "floor-tom"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/rock-drums/crash",
            "step": 9,
            "name": "crash"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/rock-drums/clap",
            "step": 10,
            "name": "clap"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/rock-drums/shaker",
            "step": 11,
            "name": "shaker"
          }
        ],
        "level": 1,
        "cx": 100,
        "cy": 100,
        "id": 0
      },
      {
        "type": "adsr",
        "A": 0,
        "D": 0,
        "S": 1,
        "R": 0.3,
        "level": 1,
        "cx": 258,
        "cy": 228,
        "id": 1
      },
      {
        "cx": 300,
        "cy": 100,
        "type": "out",
        "id": 2
      }
    ],
    "routing": [
      {
        "source": 0,
        "dest": 1,
        "type": "in"
      },
      {
        "source": 1,
        "dest": 2,
        "type": "out"
      }
    ]
  },
  "shot-drums" : {
    "nodes": [
      {
        "type": "sample",
        "samples": [
          {
            "sample": "packages/synthesizer/sounds/voices/shot-drums/kick",
            "step": 0,
            "name": "kick"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/shot-drums/bell",
            "step": 1,
            "name": "bell"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/shot-drums/perc1",
            "step": 2,
            "name": "perc"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/shot-drums/rim",
            "step": 3,
            "name": "rim"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/shot-drums/shaker1",
            "step": 4,
            "name": "shaker"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/shot-drums/shaker2",
            "step": 5,
            "name": "shaker"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/shot-drums/tick",
            "step": 6,
            "name": "stick"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/shot-drums/pulse",
            "step": 7,
            "name": "pulse"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/shot-drums/snap",
            "step": 8,
            "name": "snap"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/shot-drums/clap1",
            "step": 9,
            "name": "clap"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/shot-drums/clap2",
            "step": 10,
            "name": "clap"
          },
          {
            "sample": "packages/synthesizer/sounds/voices/shot-drums/clap3",
            "step": 11,
            "name": "clap"
          }
        ],
        "level": 1,
        "cx": 100,
        "cy": 100,
        "id": 0
      },
      {
        "type": "adsr",
        "A": 0,
        "D": 0,
        "S": 1,
        "R": 0.3,
        "level": 1,
        "cx": 258,
        "cy": 228,
        "id": 1
      },
      {
        "cx": 300,
        "cy": 100,
        "type": "out",
        "id": 2
      }
    ],
    "routing": [
      {
        "source": 0,
        "dest": 1,
        "type": "in"
      },
      {
        "source": 1,
        "dest": 2,
        "type": "out"
      }
    ]
  }
};
