# Binary representation of units in `DuneHack Rebuild - r81b`
## Launcher
```bin
0000 0000 0000 0000 0000 0000 2500 0040
0064 0005 0055 01c2 0012 0000 0004 0000
1802 0000 0001 0002 0003 0000 0000 0078
0050 3b00 0019 0065 8464 0010 0003 0001
0000 001e 0001 0092 ffff 000b 0001 00a2
003c 0009 0070 0003 0013 ffff 
```

`0x0064 = 100` - armor of unit
`0x01c2 = 450` - cost of unit
`0x0078 = 120` - ??? this can have some meaning
`0x0019 = 25` - it's not a speed
`0x0010 = 16` - it's not a speed bacause in game `speed of quad > speed of siege tank`
`0x000b = 11` - it's not a radius of shooting
`0x0070 = 112` - damage per shot

## Siege Tank
```bin
0000 0000 0000 0000 0000 0000 2540 0040
012c 0004 0054 0258 0018 0000 0004 0000
1a03 0000 0001 0002 0003 0000 0000 006e
0046 3f00 0019 0065 8464 0018 0002 0001
0000 0014 0001 0079 007e 000b 000b 00a2
002d 0005 002d 0001 0017 0038 
```
`0x2540 = 37.5`
`0x012c = 300` - armor of unit
`0x0258 = 600` - cost of unit
`0x006e = 110` - ??? this can have some meaning
`0x0019 = 25` - it's not a speed
`0x0018 = 24` - it's not a speed bacause in game `speed of quad > speed of siege tank`
`0x000b = 11` - it's not a radius of shooting
`0x002d = 45` - damage per shot

## Quad
```bin
0000 0000 0000 0000 0000 0000 2500 0040
0082 0002 0056 00c8 000c 0000 0000 0000
0e01 0000 0001 0002 0003 0000 0000 003c
003c 3f00 0019 0065 8574 0010 0001 0003
0000 0032 0002 00ee ffff 000b 0002 0000
0019 0003 000a 0000 0017 003b 
```

`0x0010 = 16` - it's not a speed bacause in game `speed of quad > speed of siege tank`


## Turret
```bin
0000 0000 0000 0000 0000 0000 0080 0040
00fa 0002 004f 007d 0010 0005 0004 0200
1600 0000 0000 0000 0000 0000 0010 004b
0096 3f00 0000 0000 0000 000a 0000 0017
0000 0000 0000 0000 0000 0000 ffff ffff
ffff ffff ffff ffff ffff ffff ffff ffff
0000 0000 0000
```

`0x00fa = 250` - armor of building
`0x007d = 125` - cost of building
`0x000a = 10` - energy * (-1)

# Rocket Turret
```bin
0000 0000 0000 0000 0000 0000 0080 0040
01f4 0005 0050 00fa 0018 0006 0004 0200
1a01 0000 0000 0000 0000 0000 0011 0064
00c8 3f00 0000 0000 0000 0014 0000 0018
0000 0000 0000 0000 0000 0000 ffff ffff
ffff ffff ffff ffff ffff ffff ffff ffff
0000 0000 0000 
```

`0x01f4 = 500` - armor of building
`0x00fa = 250` - cost of building
`0x0018 = 24` - maybe damage?
`0x0014 = 20` - energy * (-1)