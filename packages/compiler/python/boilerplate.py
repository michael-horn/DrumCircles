from random import randint, random
from math import ceil


playhead = 0.0
_last_playhead = 0.0


#---------------------------------------------------------------------
# utility function that generates a tunepad trace event
#---------------------------------------------------------------------
def printEvent(command, when, duration = 0, params = {}):
    e = { }
    e["command"] = command
    e["duration"] = duration
    e["time"] = when
    e["params"] = params
    s = "**TRACE**" + str(e).replace("'", '"')
    print(s)


#---------------------------------------------------------------------
# start a sample
#---------------------------------------------------------------------
def start():
    global playhead, _last_playhead
    playhead = 0.0
    _last_playhead = 0.0
    printEvent("start", 0.0)


#---------------------------------------------------------------------
# end a sample
#---------------------------------------------------------------------
def stop():
    printEvent("stop", playhead)


#---------------------------------------------------------------------
# used to trace python source code line-by-line as programs execute
#---------------------------------------------------------------------
def trace(line):
    printEvent("trace", _last_playhead, params = { "line" : line })


#---------------------------------------------------------------------
# plays a single midi note
#---------------------------------------------------------------------
def playNote(note, beats = 1, velocity = 100, sustain = 0, line = -1):
    global playhead, _last_playhead

    if type(note) is not list: note = [ note ]
    params = { "velocity" : velocity, "sustain" : sustain }
    if line >= 0: params['line'] = line
    for n in note:
        params['note'] = n
        printEvent("play", playhead, duration = beats, params = params)
   
    _last_playhead = playhead
    playhead += beats


#---------------------------------------------------------------------
# pause playback for a period of time
#---------------------------------------------------------------------
def rest(beats = 1):
    global playhead, _last_playhead
    printEvent("rest", playhead, duration = beats)
    _last_playhead = playhead
    playhead += beats


#---------------------------------------------------------------------
# move the playhead to the given time (beats)
#---------------------------------------------------------------------
def moveTo(beats):
    global playhead, _last_playhead
    printEvent("moveTo", beats)
    _last_playhead = playhead
    playhead = beats


#---------------------------------------------------------------------
# rewinds the playhead to the given time delta (beats)
#---------------------------------------------------------------------
def rewind(beats):
    moveTo(playhead - beats)


#---------------------------------------------------------------------
# fastforward the playhead by the given time delta (beats)
#---------------------------------------------------------------------
def fastForward(beats):
    moveTo(playhead + beats)


#---------------------------------------------------------------------
# changes the synthesizer patch configuration (voice name, JSON object)
#---------------------------------------------------------------------
def synthPatch(name, patch):
    printEvent("patch", playhead, params = { "name" : name, "patch" : patch })


#---------------------------------------------------------------------
# set the CSS color for a puck (e.g. "pink", "#335599", "rgb(0, 20, 100)")
#---------------------------------------------------------------------
def setColor(color):
    printEvent("color", playhead, params = { "color" : color })


#---------------------------------------------------------------------
# dynamic effect superclass
#
#    The constructor expects the following parameters
#       * name: The name of the effect or filter (e.g. "lowpass")
#
#       * beats: The duration of the effect in beats. If this parameter
#         is omitted, the effect will not be dynamic.
#
#       * start: An optional start time (how long to wait) before the
#         effect will be applied (in beats). 0 means start immediately
#
#       * Additional parameters passed to the effect. Each parameter can
#         be a single numeric value, an array of values to define
#         change over time, or a function that returns a value given an
#         elapsed time parameter (in beats)
#---------------------------------------------------------------------
class effect(object):
    def __init__(self, name, beats=-1, start=0, *argv):
        self.name = name
        self.beats = beats
        self.start = start
        self.values = [ ]
        for arg in argv: self.values.append(arg)

    def __enter__(self):
        params = { }
        params['effect'] = self.name
        params['beats'] = self.beats
        params['start'] = self.start + playhead
        params['values'] = [ ]
        for p in self.values:
            value = [ ]
            if callable(p):
                t = 0
                while t < self.beats and t < 100:  # FIXME: should this be capped at 100 or higher?
                    value.append(p(t))
                    t += 1/16.0
            else:
                value = p
            params['values'].append(value)
        printEvent('push_fx', playhead, params = params)
        return self.beats

    def __exit__(self, type, value, traceback):
        printEvent('pop_fx', playhead)


#---------------------------------------------------------------------
# pitch bend effect
#---------------------------------------------------------------------
class bend(effect):
    def __init__(self, cents=0, beats=-1, start=0):
        effect.__init__(self, "bend", beats, start, cents)

#---------------------------------------------------------------------
# pan effect
#---------------------------------------------------------------------
class pan(effect):
    def __init__(self, value=0, beats=-1, start=0):
        effect.__init__(self, "pan", beats, start, value)

#---------------------------------------------------------------------
# gain effect
#---------------------------------------------------------------------
class gain(effect):
    def __init__(self, value=0, beats=-1, start=0):
        effect.__init__(self, "gain", beats, start, value)

#---------------------------------------------------------------------
# standard filters
#---------------------------------------------------------------------
class lowpass(effect):
    def __init__(self, frequency=1000, Q=2.0, beats=-1, start=0):
        effect.__init__(self, "lowpass", beats, start, frequency, Q)

class highpass(effect):
    def __init__(self, frequency=3000, Q=2.0, beats=-1, start=0):
        effect.__init__(self, "highpass", beats, start, frequency, Q)

class bandpass(effect):
    def __init__(self, frequency=3000, Q=2.0, beats=-1, start=0):
        effect.__init__(self, "bandpass", beats, start, frequency, Q)

class notch(effect):
    def __init__(self, frequency=3000, Q=0.8, beats=-1, start=0):
        effect.__init__(self, "notch", beats, start, frequency, Q)

start()
