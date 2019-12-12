API Reference

The Venture Care API is organised around REST. Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.

BASE URL:
http://159.65.14.175:3001/api

API CONTENT

Retrieve Make | Model
Retrieve Product Variant
Retrieve Product Options
Retrieve Product Details
Retrieve Tags











RETRIEVE MAKE | MODEL

This method is used to retrieve All Make 
GET - /products/getMake
Return a JSON data = response.data.fields : Array

This method is used to retrieve All Model 
GET - /products/getModel
Return a JSON data type = response.data.fields : Array 

This method is used to retrieve All Models under a selected Make’s Id
GET - /categories/:id/category
Return a JSON data type = response.data.fields : Array

This method is used to retrieve A specific Model, using id of selected Make
GET - /categories/:id
Return a JSON data type = response.data.fields : Object

This method is used to retrieve Grades, using id of selected Model
GET - /products/specificGrades/:id
Return a JSON data type = response.data.fields : Array








RETRIEVE PRODUCT VARIANT

This method is used to retrieve exterior product variant of a Grade
GET - /products/specificVariantExterior/:id
Return a JSON data type = response.data.fields : Array

This method is used to retrieve interior product variant of a Grade
GET - /products/specificVariantInterior/:id
Return a JSON data type = response.data.fields : Array


RETRIEVE PRODUCT OPTIONS

This method is used to retrieve Product Option of a Grade
GET - /products/specificGradeProductOption/:id
Return a JSON data type = response.data.fields : Array


RETRIEVE PRODUCT DETAILS

This method is used to retrieve Product Detail of a Grade with selected Grade ID
GET - /products/specificGradeDetail/:id
Return a JSON data type = response.data.fields : Array


RETRIEVE PRODUCT DETAILS

This method is used to retrieve Product Detail of a Grade with selected Grade ID
GET - /products/specificGradeDetail/:id
Return a JSON data type = response.data.fields : Array


RETRIEVE TAGS

This method is used to retrieve Tags of the Models
GET - /tags/getAllTags
Return a JSON data type = response.data.fields : Array

This method is used to retrieve all Models under a Tag
GET - /tags/getAllTagsModels/:id
Return a JSON data type = response.data.fields : Array
