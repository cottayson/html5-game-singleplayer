# Working with git
git commit --amend --no-edit
Ключ --amend (улучшить, в переводе с английского) позволяет добавить к последнему коммиту новые изменения.

## Placing building
```js
function exampleOfPlacingBuilding() {
  gameMap.camera.x = 7 * 32;
  gameMap.camera.y = 15 * 32;

  const refinery = jsonTextureData["refinery"];
  const palace = jsonTextureData["palace"];
  const factory = jsonTextureData["factory"];
  const wall = jsonTextureData["wall"];
  const concrete = jsonTextureData["concrete"];
  const rocket_turret = jsonTextureData["rocket_turret"];
  const construction_yard = jsonTextureData["construction_yard"];
  const windtrap = jsonTextureData["windtrap"];

  for (let j = 0; j < 10; j++) {
    for (let i = 12; i < 20; i++) {
      this.placeBuilding(concrete, i, 20 + j);
    }
  }

  this.placeBuilding(palace, 10, 20);
  this.placeBuilding(factory, 15, 21);
  this.placeBuilding(construction_yard, 15, 24);
  this.placeBuilding(windtrap, 18, 24);
  this.placeBuilding(refinery, 15, 27);
  for (let i = 19; i < 29; i++) {
    this.placeBuilding(wall, 13, i);
  }
  for (let i = 9; i < 18; i++) {
    this.placeBuilding(wall, i, 19);
  }
  this.placeBuilding(rocket_turret, 19, 19);
}
```
