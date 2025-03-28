/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3107173924")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "bool1807797551",
    "name": "is_vegan",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "bool1495966646",
    "name": "is_glutenfree",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3107173924")

  // remove field
  collection.fields.removeById("bool1807797551")

  // remove field
  collection.fields.removeById("bool1495966646")

  return app.save(collection)
})
