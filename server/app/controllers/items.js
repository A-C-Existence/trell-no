//:ITEM: MODEL
var Item = require('./app/models/item');

//show :items: by *get* request
exports.showItems = function (req, res){
    Item.find({list_id: req.query.list_id}, function (error, items){
        if(items){
            res.json(items);
        }else if (error){
            console.log(error.stack);
            res.json({status: 400, message: error.message});
        }
    });
};

//create :item: by submitting *post* request
exports.submitItem = function (req, res){
    var item = new Item({
        user_id: req.body.user_id,
        item_name: req.body.item_name,
        list_id: req.body.list_id
    });
    item.save(function (error, item){
        if(item){
            res.json(item);
        }
        else if(error){
            console.error('Save Failed' + error.stack);
            res.json({status: 400, message: error.message});
        }
    });
};


//update :item: by item_id by *post* request
exports.editItem = function (req, res){
    var itemId = {_id: req.params.item_id};
    Item.update(itemId, {item_name: req.query.item_name}, function (error, item){
        if(item){
            res.json(item);
        } else if(error){
            console.log(error.stack);
            res.redirect('/error');
            res.json({status: 400, message: error.message});
        }
    });
};


//delete :item: by item_id by *post* request
exports.deleteItem = function (req, res){
    var item = new Item({_id: req.params.item_id});
    item.remove(function (error, item){
        if(item){
            res.json(item);
        }
        else if(error){
            console.error(error.stack);
            res.json({status: 400, message: error.message});
        }
    });
};
