#Welcome to JAM
##A game engine designed to be renderer agnostic and allow for rapid prototyping.
Jam is a game engine that leaves the choice of renderer up to the user.  Jam
will also have a suite of libraries that support output to commonly-used 
rendering systems.

The Jam source is designed using three core principles:
1) Modular (built using commonjs module syntax)
2) Entity-component-system architecture
3) Functional programming where appropriate

#How to Jam?
Jam games consist of entities which are composed entirely out of pure data
called components.  These entities have no method and instead serve as composed
data structures on which systems will act during each run loop.

A system is a piece of code that runs over the entities in your system and 
operates on a filtered subset of them once per game loop.  For example, the rendering
system would NOT affect entities that do not have a "renderable" component.  

Entities often need to be constructed using a simple constructor which accepts
overrides but also has built-in defaults.  This is achieved by doing the following:

```javascript
//here is the "schema" of a completed instance of Enemy

function Vector (x, y, z) {
  this.x = x
  this.y = y
  this.z = z
}

//Points are the same as vectors but the two names demonstrate intent
var Point = Vector

{
  name: "Enemy",
  position: {
    x: 5,
    y: 5,
    z: 0
  },
  direction: {
    x: 5,
    y: 5,
    z: 0
  },
  size: {
    x: 24,
    y: 24,
    z: 48 
  }
  renderable: {
    sprite: "somespritesheet.png"
  }
  //.... etc etc as needed
}

function Entity () {
  this.uuid = new Uuid()
}

function Size (e, p) {
  this.size = p
}

function Direction (e, v) {
  this.direction = v
}

function Size (e, v) {
  this.size = v
}

function Renderable (e, spriteName) {
  this.renderable = {
    sprite: spriteName
  }
}

function Enemy (overrides) {
  Entity.call(this)
  Size.call(this, new Point(24,24,48))
  Direction.call(this, new Vector(0,0,0))
  Renderable.call(this, "spritesheet.png")
  extend(this, overrides)
}

//example useage
var e = new Enemy({
  position: new Point(5,5,0),
  velocity: new Vector(0,0,15)
})

//we can also use pojo's if we prefer though it's verbose and less expressive sometimes
var e = new Enemy({
  position: {
    x: 5,
    y: 5,
    z: 0,
  },
  velocity: {
    x: 0,
    y: 0,
    z: 15,
  }
});

//e.size.x -> 24
```

You can write custom constructors that are even more concise for simple
entities like bullets.  Let's imagine that a bullet always spawns with 
position and velocity

```javascript
function Bullet (p, v) {
  if (!(this instanceof Bullet)) return new Bullet(p, v) 

  Entity.call(this)
  Size.call(this, new Point(24,24,48))
  Position.call(this, p) 
  Velocity.call(this, v) 
  Renderable.call(this, "bullets.png")
  extend(this, overrides)
}

var b = new Bullet(new Point(0,0,0), new Vector(0,15,0))

//or slightly less verbose but maybe less expressive?
var b = new Bullet({x:0, y:0, z:0}, {x:0, y:15, z:0})
```

Let's imagine we have some system that fires bullets in an arc 
in front of the player at a fixed speed

```javascript
//:: Degrees(Number) -> Radians(Number)
function toRadians (degrees) {
  return Math.PI * degrees / 180
}

//Here for the sake of simplicty we assume we're in the x/y plane
//:: Radians(Number) -> Vector
function radToVec (rad) {
  return new Vector(Math.cos(rad), Math.sin(rad), 0)  
}

//Here for the sake of simplicity we assume we want radians of x/y plane
//:: Vector -> Radians(Number)
function vecToRad (v) {
  return Math.atan2(v.x, v.y)
}

//:: Count(Number) -> Min(Number) -> Max(Number) -> [Number] :: oflength Count
function buildRange (count, min, max) {
  var         = blankRange = new Array(count)
  var chunk   = (max - min) / (count - 1)
  var innerFn = function (li, _) {
    var h    = li[0]
    var next = h - chunk

    li.push(next)
    return li
  }

  if (count === 0) return []
  if (count === 1) return [((max - min) / 2) + min]
  if (count === 2) return [min, max]
  else             return reduce(innerFn, [min], blankRange)
}

//:: Count(Number) -> Angle(Number::Degrees) -> Vector -> [Vector]
function vectorArc (count, angle, v) {
  var totalRad    = toRadians(angle) 
  var centerRad   = vecToRad(v)
  var minRad      = centerRad - (totalRad / 2)
  var maxRad      = centerRad + (totalRad / 2)
  var radianRange = buildRange(count, minRad, maxRad)

  return map(radToVec, radianRange)
}

//:: Player(Entity) -> [Bullet(Entity)]
function createBulletSpray (player) {
  var vArc      = vectorArc(15, 45, player.direction)
  var bAtPlayer = partial(Bullet, player.position)

  return map(bAtPlayer, vArc)
}

//Game.entities.push(createBulletSpray(player))
```
