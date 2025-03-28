/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3107173924")

  // update collection data
  unmarshal({
    "name": "specials"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3107173924")

  // update collection data
  unmarshal({
    "name": "menus"
  }, collection)

  return app.save(collection)
})
