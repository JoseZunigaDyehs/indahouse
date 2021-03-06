'use strict'

var path = require('path');
var fs = require('fs');
//var mongoosePaginate = require('mongoose-pagination');
var Category = require('../models/category');
var Service = require('../models/service');

function getCategory(req, res){
    var categoryId = req.params.id;

    Category.findById(categoryId, (err, category) => {
        if(err){
            res.status(500).send({message: 'Error en la petición.'});
        }else{
            if(!category){
                res.status(404).send({message: 'La categoria no existe'});
            }else{
                res.status(200).send({category});
            }
        }
    })
    
}
function getAllCategories(req, res){
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }
    
    var itemsPerPage = 3;

    Category.find().sort('name').paginate(page, itemsPerPage, function(err, categories, total){
        if(err){
            res.status(500).send({message: 'Error en la petición.'});
        }else{
            if(!categories){
                res.status(404).send({message: 'No hay servicios'});
            }else{
                return res.status(200).send({
                    total_items: total,
                    categories: categories
                });
            } 
        }
    })
}
function saveCategory(req, res){
    var category = new Category();

    var params = req.body;
    category.name = params.name;
    category.description = params.description;
    category.image = params.image;

    category.save((err, categoryStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar el servicio'});
        }else{
            if(!categoryStored){
                res.status(404).send({message: 'El servicio no ha sido guardado'});
            }else{
                res.status(200).send({category: categoryStored});
            }
        }
    });
}
function updateCategory(req, res){
    var categoryId = req.params.id;
    var update = req.body;

    Category.findByIdAndUpdate(categoryId, update, (err, categoryUpdated) => {
        if(err){
            res.status(500).send({message: 'Error al guardar el servicio'});
        }else{
            if(!categoryUpdated){
                res.status(404).send({message: 'El artista no ha sido actualizado'});
            }else{
                res.status(200).send({category: serviceUpdated});
            }
        }
    });
}

function deleteCategory(req, res){
    var categoryId = req.params.id;

    Category.findByIdAndRemove(categoryId, (err, categoryRemoved) => {
        if(err){
            res.status(500).send({message: 'Error al eliminar el servicio'});
        }else{
            if(!categoryRemoved){
                res.status(404).send({message: 'El servicio no ha sido eliminado'}); 
            }else{
                res.status(200).send({categoryRemoved});
                //aquí comienza la eliminacion de los elementos asociados al servicio removido
               /* Category.find({category: categoryRemoved._id}).remove((err, categoryRemoved) => {
                    if(err){
                        res.status(500).send({message: 'Error al eliminar el elemento asociado'});
                    }else{
                        if(!serviceRemoved){
                            res.status(404).send({message: 'El elemento asociado no ha sido eliminado'}); 
                        }else{
                            Comentario.find({service: serviceRemoved._id}).remove((err, comentarioRemoved) => {
                                if(err){
                                    res.status(500).send({message: 'Error al eliminar el elemento hijo asociado'});
                                }else{
                                    if(!comentarioRemoved){
                                        res.status(404).send({message: 'El elemento hijo asociado no ha sido eliminado'}); 
                                    }else{
                                        res.status(200).send({category: categoryRemoved}); 
                                    }
                                }
                            });
                        }
                    }
                });*/
            }
        }
    });
}


module.exports = {
    getCategory,
    saveCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
};