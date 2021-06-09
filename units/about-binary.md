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
`0x0010 = 16` - maybe it is a speed of unit
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

`0x012c = 300` - armor of unit
`0x0258 = 600` - cost of unit
`0x006e = 110` - ??? this can have some meaning
`0x0019 = 25` - it's not a speed
`0x0018 = 24` - maybe it is a speed of unit
`0x000b = 11` - it's not a radius of shooting
`0x002d = 45` - damage per shot